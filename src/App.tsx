import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f2f5',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ color: '#1a1a1a', marginBottom: '2rem' }}>
        🐱 小太阳阿比西尼亚猫屋
      </h1>
      <p style={{ color: '#666', marginBottom: '1rem' }}>网站部署成功啦！</p >
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '0.8rem 1.5rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: 'none',
          background: '#2563eb',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        点击试试：{count}
      </button>
    </div>
  );
}

export default App;
