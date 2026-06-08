import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { INITIAL_KITTENS_DATA } from './src/data.js';
import { Kitten, Reservation, Consultation } from './src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), 'data-store.json');

// Interface for database structure
interface DataStore {
  kittens: Kitten[];
  reservations: Reservation[];
  consultations: Consultation[];
}

// Function to read data from data-store.json
function readStore(): DataStore {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading data-store.json, resetting to defaults:', error);
  }

  // Default initial store if file doesn't exist
  const defaultStore: DataStore = {
    kittens: INITIAL_KITTENS_DATA,
    reservations: [],
    consultations: []
  };
  writeStore(defaultStore);
  return defaultStore;
}

// Function to write data to data-store.json
function writeStore(store: DataStore) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to data-store.json:', error);
  }
}

async function startServer() {
  const app = express();

  // Parse JSON payloads
  app.use(express.json());

  // Initialize store. This guarantees that data-store.json exists with default data.
  readStore();

  // API Route - Get all kittens
  app.get('/api/kittens', (req, res) => {
    const store = readStore();
    res.json(store.kittens);
  });

  // API Route - Create a reservation
  app.post('/api/reservations', (req, res) => {
    const { clientName, phone, wechat, remarks, kittenId, kittenName } = req.body;

    if (!clientName || !phone || !wechat || !kittenId) {
      return res.status(400).json({ error: 'Missing required reservation fields' });
    }

    const store = readStore();

    // Check if the kitten is already reserved or exists
    const kittenIndex = store.kittens.findIndex(k => k.id === kittenId);
    if (kittenIndex === -1) {
      return res.status(404).json({ error: 'Kitten not found' });
    }

    if (store.kittens[kittenIndex].status === 'reserved') {
      return res.status(400).json({ error: 'This kitten is already reserved' });
    }

    // Create the reservation
    const newReservation: Reservation = {
      id: Math.random().toString(36).substring(2, 9),
      kittenId,
      kittenName: kittenName || store.kittens[kittenIndex].name,
      clientName,
      phone,
      wechat,
      remarks: remarks || '',
      createdAt: new Date().toLocaleString()
    };

    // Update kitten status both in kittens list and inside store
    store.kittens[kittenIndex].status = 'reserved';
    store.kittens[kittenIndex].statusLabel = '已预订';

    store.reservations.push(newReservation);
    writeStore(store);

    res.status(201).json({
      success: true,
      reservation: newReservation,
      kittens: store.kittens
    });
  });

  // API Route - Get all reservations
  app.get('/api/reservations', (req, res) => {
    const store = readStore();
    res.json(store.reservations);
  });

  // API Route - Create a consultation
  app.post('/api/consultations', (req, res) => {
    const { subject, content, phone, wechat } = req.body;

    if (!subject || !content || !wechat) {
      return res.status(400).json({ error: 'Missing required consultation fields' });
    }

    const store = readStore();

    const newConsultation: Consultation = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'standard',
      subject,
      content,
      phone: phone || '',
      wechat,
      createdAt: new Date().toLocaleString()
    };

    store.consultations.push(newConsultation);
    writeStore(store);

    res.status(201).json({
      success: true,
      consultation: newConsultation
    });
  });

  // API Route - Get all consultations
  app.get('/api/consultations', (req, res) => {
    const store = readStore();
    res.json(store.consultations);
  });

  // Serve static assets / run Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    // In development mode, mount Vite dev server as middleware helper
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production mode, serve physical bundled static files in dist/
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Cattery Backend] Running full-stack server on http://localhost:${PORT}`);
  });
}

startServer();
