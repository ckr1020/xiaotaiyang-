import React from 'react';
import { motion } from 'motion/react';
import catteryLogo from '../assets/images/cattery_logo_user_1780819450448.png';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onOpenStandards: () => void;
  key?: string;
}

export default function HomeView({ onNavigate, onOpenStandards }: HomeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pt-4 pb-12"
    >
      {/* Hero Section */}
      <section className="text-center space-y-4 py-4 md:py-8 flex flex-col items-center justify-center">
        {/* Large Premium Logo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 120 }}
          className="relative w-32 h-32 mb-2 group select-none pointer-events-auto"
        >
          {/* Outer Gold Pulse Ring */}
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-amber-500/30 to-orange-500/30 blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Glowing border */}
          <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 opacity-20 group-hover:opacity-40 blur-sm transition duration-500"></div>
          
          {/* Main Logo Container */}
          <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/12 bg-white group-hover:border-amber-400/30 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-center">
            <img 
              alt="小太阳阿比猫屋 Logo" 
              className="w-full h-full object-cover scale-[1.2] select-none" 
              src={catteryLogo}
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-amber-400 font-bold tracking-widest text-xs uppercase"
        >
          小太阳阿比猫屋 | 专注家庭繁育 · 科学喂养
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white font-bold text-3xl md:text-4xl tracking-tight text-balance"
        >
          专注阿比西尼亚家庭繁育
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-slate-300 text-sm md:text-base opacity-90"
        >
          用心喂养 · 陪伴成长 · 终身售后支持
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full max-w-sm mx-auto">
          <button 
            onClick={() => onNavigate('kittens')}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white h-12 rounded-2xl font-bold hover:opacity-95 active:scale-95 transition-all shadow-lg shadow-amber-500/15 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
            咨询在售幼崽
          </button>
          <button 
            onClick={onOpenStandards}
            className="w-full border border-white/12 text-amber-400 h-12 rounded-2xl font-bold bg-white/4 backdrop-blur-md hover:bg-white/10 hover:border-amber-400/40 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
            繁育标准
          </button>
        </div>
      </section>

      {/* Category Grid / Quick Links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Breed Stocks */}
        <div 
          onClick={() => onNavigate('cats')}
          className="relative overflow-hidden rounded-[24px] aspect-[16/9] shadow-md group cursor-pointer border border-white/8"
        >
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDBCEESptMp39FXIDO5tZb5MOXNJXFNnQc3uUt0Xw8Q7Uz1gD8RRfoBgMiO5ofYLTZv9aeB6VVU3rfLKcDoHPvWRd9FiwB0_kxvL0_4QkYc3sFbLWqiN3N8QksLZWlgd2S_ZpetKGEDtqGAdu0gtb5wJ1Hzx_geN4BbXzwZVyjXVbDCHxpf3DpeyjxqZYcZImMhp5I_C20UJvoFoJ6LHpfMYjPMxMFlEoEa4sn9KtwTZ4HxuKCiaIVKyXozYhQjMrEymrGrWT9B4pf" 
            alt="Breed Stocks"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
            <h3 className="text-white text-base font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">pets</span> 种公种母
            </h3>
            <p className="text-white/80 text-xs mt-1">查看优良血统传承</p>
          </div>
        </div>

        {/* Available Kittens */}
        <div 
          onClick={() => onNavigate('kittens')}
          className="relative overflow-hidden rounded-[24px] aspect-[16/9] shadow-md group cursor-pointer border border-white/8"
        >
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFzIEHuz9ygsvvpVI-5xS1DIFeDc17I_eHskz0yksLWHLFiyN38W97ffl3Clwr-5N2dPoKC_JqCr7LoEc07v02MhdHXP8vav7wS3sbP86-TIQ14cGrv33Nn788AAnmFag1aRyFU3ITQqyu-Q8vDKAEr_Wg9OIwkUV7CdqJMYWBsEiC8LvbGPjudGmOFgn9Sbk7MWMDC7237YwrGkOjR6xG0PlMtbFD-m9F66MonBTYXgCwOPGn0G7zf2AuBpESKnZl4U04Qp8z6Bgy" 
            alt="Available Kittens"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
            <h3 className="text-white text-base font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">face_6</span> 在售幼崽
            </h3>
            <p className="text-white/80 text-xs mt-1">寻找您的阳光新成员</p>
          </div>
        </div>

        {/* Sold Kittens */}
        <div 
          onClick={() => onNavigate('sold')}
          className="relative overflow-hidden rounded-[24px] aspect-[16/9] shadow-md group cursor-pointer border border-white/8"
        >
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHdr36r8HwMbDhdWWzmkfYXXOb6Cqk41SwmVqrIR3ITZDr8n-33TnylVYNIdvmwsw1P8Aex0dKa-2alW248jL-DYss_LRCOSunGrpMkTmKQ99C5LN2a4RUd4pzfGVFF9nUvdXOoG7oPjdoSMhOms9og0f0ExS7R2S6GNPTRrDG25Ny7G5JcdO4q_kdhFSPsiSV-IFfkGRmLsgE-TgHivo2VDi64H5HOiSO74MUBDUWIlRJR9rmChpaL4VxX19ia-2xJJX2JTMPo679" 
            alt="Sold Kittens"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
            <h3 className="text-white text-base font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">history</span> 已售幼崽
            </h3>
            <p className="text-white/80 text-xs mt-1">往期家长真实反馈</p>
          </div>
        </div>
      </section>

      {/* Breeding Environment */}
      <section className="space-y-4">
        <h2 className="text-slate-100 font-bold text-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-400">house</span> 家庭繁育环境
        </h2>
        <div className="glass-card rounded-[24px] p-5 space-y-4 border border-white/8">
          <p className="text-slate-300 text-sm leading-relaxed opacity-95">
            我们拒绝笼养。所有种猫与幼崽均在全采光、高通风的家庭环境中自由活动。每日进行紫外线除菌与空气净化，确保每一只小太阳都在爱与洁净中成长。
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/15">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>无菌化管理</span>
            </div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/15">
              <span className="material-symbols-outlined text-[16px]">wb_sunny</span>
              <span>全天候采光</span>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-sm aspect-[16/10] border border-white/8">
            <img 
              alt="Environment" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAsp9mjL9HdY9G5TKwvOmOZ_lm0TKFSU21VbEA9Liw2GiIiMhWtZn4ZCD9u4WK6ZJDEvgS17-TxQY8VWyfjY2A02rc35gbbQV-sJ0LQFn5nu229CzfGmTVtd-AngIuQlbu6M1FsNMac-y2UH2FVy2KUD5Uo-Gk0KWAh6i0ywViRzaa8hKrqE2h8M6Fypg4SsWNTO1ydMvHaAiKmclSURN_UbURp5TEAsqpXlAfJdYE080ksfGHU2JPuaTVX2Aob-v9_x66jsrHKGIL"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
