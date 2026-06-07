import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_KITTENS_DATA } from './data';
import { Kitten, Reservation } from './types';
import catteryLogo from './assets/images/cattery_logo_user_1780819450448.png';

// Importing views split out to keep files modular, readable and optimized
import HomeView from './components/HomeView';
import BreedView from './components/BreedView';
import KittensView from './components/KittensView';
import SoldView from './components/SoldView';
import PedigreeView from './components/PedigreeView';
import ContactView from './components/ContactView';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<string>(() => {
    const saved = localStorage.getItem('little_sun_active_tab');
    return saved || 'home';
  });

  // State for kittens (so that active preorders change status locally)
  const [kittens, setKittens] = useState<Kitten[]>(() => {
    const saved = localStorage.getItem('little_sun_kittens_state');
    if (saved) {
      return JSON.parse(saved);
    }
    return INITIAL_KITTENS_DATA;
  });

  // Keep track of reservations
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('little_sun_reservations');
    return saved ? JSON.parse(saved) : [];
  });

  // Breeding standards explanation modal state
  const [showStandards, setShowStandards] = useState(false);

  // Synchronise state with local storage
  useEffect(() => {
    localStorage.setItem('little_sun_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('little_sun_kittens_state', JSON.stringify(kittens));
  }, [kittens]);

  useEffect(() => {
    localStorage.setItem('little_sun_reservations', JSON.stringify(reservations));
  }, [reservations]);

  // Handle a new customer preorder submission
  const onSubmitReservation = (newRes: Omit<Reservation, 'id' | 'createdAt'>) => {
    const reservation: Reservation = {
      ...newRes,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toLocaleString()
    };

    setReservations(prev => [...prev, reservation]);

    // Update the reserved status of the respective kitten
    setKittens(prevKittens => 
      prevKittens.map(kit => 
        kit.id === reservation.kittenId 
          ? { ...kit, status: 'reserved', statusLabel: '已预订' }
          : kit
      )
    );
  };

  // Switch tabs helper (used for quick links on home page)
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-[100dvh] flex flex-col relative overflow-hidden selection:bg-amber-500/30 selection:text-white">
      
      {/* Atmospheric Blur Spheres for Frosted Glass Depth */}
      <div className="absolute top-[-5%] left-[-15%] w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-[90px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[8%] right-[-15%] w-[450px] h-[450px] rounded-full bg-orange-600/10 blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-[35%] right-[5%] w-[250px] h-[250px] rounded-full bg-purple-600/8 blur-[80px] pointer-events-none z-0"></div>

      {/* Top Header App Bar */}
      <header className="flex justify-between items-center px-4 h-16 w-full z-40 bg-slate-950/45 backdrop-blur-xl fixed top-0 border-b border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.4)] max-w-lg mx-auto inset-x-0">
        <div className="flex items-center gap-2 select-none">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-500/20 bg-slate-900 shadow-sm flex items-center justify-center">
            <img 
              alt="Little Sun Abyssinian Logo"             className="w-full h-full object-cover scale-[1.2] select-none" 
              src={catteryLogo}
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-base font-bold tracking-tight text-white font-sans leading-none">
            小太阳阿比猫屋
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowStandards(true)}
            title="繁育标准"
            className="w-9 h-9 flex items-center justify-center hover:bg-white/10 active:scale-95 rounded-full transition-all text-amber-400 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
          </button>
          <button 
            onClick={() => handleNavigate('contact')}
            title="联系地址"
            className="w-9 h-9 flex items-center justify-center hover:bg-white/10 active:scale-95 rounded-full transition-all text-orange-400 animate-pulse cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">location_on</span>
          </button>
        </div>
      </header>

      {/* Main Body Layout Frame */}
      <main className="flex-1 pt-20 pb-24 px-4 w-full max-w-lg mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <HomeView 
              key="home" 
              onNavigate={handleNavigate} 
              onOpenStandards={() => setShowStandards(true)} 
            />
          )}
          {activeTab === 'cats' && (
            <BreedView 
              key="cats" 
            />
          )}
          {activeTab === 'kittens' && (
            <KittensView 
              key="kittens" 
              kittens={kittens}
              onReserveKitten={(id) => {}}
              reservations={reservations}
              onSubmitReservation={onSubmitReservation}
            />
          )}
          {activeTab === 'sold' && (
            <SoldView 
              key="sold" 
            />
          )}
          {activeTab === 'pedigree' && (
            <PedigreeView 
              key="pedigree" 
            />
          )}
          {activeTab === 'contact' && (
            <ContactView 
              key="contact" 
            />
          )}
        </AnimatePresence>
      </main>

      {/* Breeding Standards Overlay Dialog */}
      <AnimatePresence>
        {showStandards && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowStandards(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-slate-900/90 backdrop-blur-2xl max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl border border-white/12 max-h-[80vh] flex flex-col text-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 overflow-y-auto space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <h3 className="font-bold text-base text-amber-400 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-400">verified_user</span>
                    小太阳家庭繁育标准
                  </h3>
                  <button
                    onClick={() => setShowStandards(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>

                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <div className="space-y-1">
                    <h4 className="font-bold text-amber-400 text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">home_work</span>
                      1. 坚决不使用笼养
                    </h4>
                    <p className="opacity-90">我们提倡阳光自由生活。每一只阿比西尼亚猫都在全屋高通风采光环境中成长。保证充足的自然日光浴，保持肌肉结实与心情高昂舒畅。</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-amber-400 text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">clinical_notes</span>
                      2. 严密的健康筛查
                    </h4>
                    <p className="opacity-90">猫舍种母种公定期筛查FIV、FeLV高危传染性疾病。产出幼崽按期全程驱虫并注入双重品质疫苗。所有幼猫必须通过完整抗原体检方可安排交付家长。</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-amber-400 text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">badge</span>
                      3. 五代血统证书溯源印证
                    </h4>
                    <p className="opacity-90">秉承诚信繁殖。支持原产溯源查询，绝无混繁杂交，保证每一代纯正阿比西尼亚猫血统优雅、品德纯正。</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-amber-400 text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">support_agent</span>
                      4. 终生喂养沟通指导
                    </h4>
                    <p className="opacity-90">凡在猫舍结缘成功的小宝贝，我们都提供一对一科学喂养全程支持、免疫指引、常备用药咨询及紧急情况售后保障，为您做无忧家长保驾护航。</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
                <button
                  onClick={() => setShowStandards(false)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white h-11 rounded-xl text-xs font-bold hover:opacity-95 active:scale-95 transition-transform cursor-pointer shadow-lg shadow-amber-500/10"
                >
                  支持正规繁育 · 关闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Global Navigation Tab Bar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-1 py-1 bg-slate-950/45 backdrop-blur-xl border-t border-white/8 z-40 max-w-lg mx-auto inset-x-0 rounded-t-[20px] shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
        
        {/* 首页 Home */}
        <button
          onClick={() => handleNavigate('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-150 relative cursor-pointer ${
            activeTab === 'home' 
              ? 'text-amber-400 font-bold scale-[1.03]' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span 
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className="text-[10px] tracking-tight mt-0.5">首页</span>
          {activeTab === 'home' && (
            <motion.div layoutId="active-dot" className="absolute bottom-0 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-md" />
          )}
        </button>

        {/* 种猫 Cats */}
        <button
          onClick={() => handleNavigate('cats')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-150 relative cursor-pointer ${
            activeTab === 'cats' 
              ? 'text-amber-400 font-bold scale-[1.03]' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span 
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: activeTab === 'cats' ? "'FILL' 1" : "'FILL' 0" }}
          >
            pets
          </span>
          <span className="text-[10px] tracking-tight mt-0.5">种猫</span>
          {activeTab === 'cats' && (
            <motion.div layoutId="active-dot" className="absolute bottom-0 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-md" />
          )}
        </button>

        {/* 幼崽 Kittens */}
        <button
          onClick={() => handleNavigate('kittens')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-150 relative cursor-pointer ${
            activeTab === 'kittens' 
              ? 'text-amber-400 font-bold scale-[1.03]' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span 
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: activeTab === 'kittens' ? "'FILL' 1" : "'FILL' 0" }}
          >
            face_6
          </span>
          <span className="text-[10px] tracking-tight mt-0.5">幼崽</span>
          {activeTab === 'kittens' && (
            <motion.div layoutId="active-dot" className="absolute bottom-0 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-md" />
          )}
        </button>

        {/* 已售 Sold */}
        <button
          onClick={() => handleNavigate('sold')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-150 relative cursor-pointer ${
            activeTab === 'sold' 
              ? 'text-amber-400 font-bold scale-[1.03]' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span 
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: activeTab === 'sold' ? "'FILL' 1" : "'FILL' 0" }}
          >
            history
          </span>
          <span className="text-[10px] tracking-tight mt-0.5">已售</span>
          {activeTab === 'sold' && (
            <motion.div layoutId="active-dot" className="absolute bottom-0 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-md" />
          )}
        </button>

        {/* 族谱 Pedigree */}
        <button
          onClick={() => handleNavigate('pedigree')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-150 relative cursor-pointer ${
            activeTab === 'pedigree' 
              ? 'text-amber-400 font-bold scale-[1.03]' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span 
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: activeTab === 'pedigree' ? "'FILL' 1" : "'FILL' 0" }}
          >
            account_tree
          </span>
          <span className="text-[10px] tracking-tight mt-0.5">族谱</span>
          {activeTab === 'pedigree' && (
            <motion.div layoutId="active-dot" className="absolute bottom-0 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-md" />
          )}
        </button>

        {/* 联系 Contact */}
        <button
          onClick={() => handleNavigate('contact')}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-150 relative cursor-pointer ${
            activeTab === 'contact' 
              ? 'text-amber-400 font-bold scale-[1.03]' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span 
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: activeTab === 'contact' ? "'FILL' 1" : "'FILL' 0" }}
          >
            chat_bubble
          </span>
          <span className="text-[10px] tracking-tight mt-0.5">联系</span>
          {activeTab === 'contact' && (
            <motion.div layoutId="active-dot" className="absolute bottom-0 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-md" />
          )}
        </button>

      </nav>
    </div>
  );
}
