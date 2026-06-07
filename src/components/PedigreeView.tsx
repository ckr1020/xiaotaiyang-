import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KINGS_DATA, QUEENS_DATA } from '../data';

// Helper to look up images dynamically from our central data.ts definitions
const getCatImage = (id: string, gender: 'male' | 'female'): string => {
  if (gender === 'male') {
    return KINGS_DATA.find(k => k.id === id)?.image || '';
  } else {
    const lookupId = id.replace(/-queen|-child/, '');
    return QUEENS_DATA.find(q => q.id === lookupId)?.image || '';
  }
};

export default function PedigreeView() {
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  // Lineage mapper to highlight parent-child relationships
  // active ID can be a parent or child. Returns true if related.
  const isRelated = (targetId: string) => {
    if (!activeHighlight) return false;
    
    // Relationships mapping
    const relations: Record<string, string[]> = {
      // Offspring -> Parents
      'guoyourou-child': ['sun', 'moon', 'guoyourou-queen'],
      'mote-child': ['cobra', 'sailor', 'mote-queen'],
      'xiaolu-child': ['sun', 'cotton', 'xiaolu-queen'],
      
      // Parents -> Offspring and Spouse
      'sun': ['guoyourou-child', 'xiaolu-child', 'moon', 'cotton'],
      'cobra': ['mote-child', 'sailor'],
      'moon': ['guoyourou-child', 'sun'],
      'sailor': ['mote-child', 'cobra'],
      'cotton': ['xiaolu-child', 'sun'],
      'guoyourou-queen': ['guoyourou-child', 'sun'],
      'mote-queen': ['mote-child', 'cobra'],
      'xiaolu-queen': ['xiaolu-child', 'sun']
    };

    return relations[activeHighlight]?.includes(targetId) || activeHighlight === targetId;
  };

  const handleNodeClick = (id: string) => {
    if (activeHighlight === id) {
      setActiveHighlight(null);
    } else {
      setActiveHighlight(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20 px-1 select-none"
    >
      {/* Kings Section */}
      <section className="flex flex-col items-center mb-6">
        <div className="bg-primary-container text-on-primary-container px-6 py-1 rounded-full text-xs font-bold mb-6 shadow-sm">
          父亲 (Kings)
        </div>
        
        <div className="flex justify-center gap-10">
          {/* King 1 - 小太阳 */}
          <div 
            onClick={() => handleNodeClick('sun')}
            className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${
              activeHighlight && !isRelated('sun') ? 'opacity-30 scale-95' : 'scale-100'
            }`}
          >
            <div className={`w-20 h-20 rounded-2xl p-0.5 bg-primary-container shadow-md transition-all duration-300 ${
              activeHighlight === 'sun' ? 'ring-4 ring-primary' : ''
            }`}>
              <img 
                className="w-full h-full object-cover rounded-xl"
                src={getCatImage('sun', 'male')} 
                alt="小太阳"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-bold text-xs text-on-surface">小太阳</span>
          </div>

          {/* King 2 - 眼镜蛇 */}
          <div 
            onClick={() => handleNodeClick('cobra')}
            className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${
              activeHighlight && !isRelated('cobra') ? 'opacity-30 scale-95' : 'scale-100'
            }`}
          >
            <div className={`w-20 h-20 rounded-2xl p-0.5 bg-primary-container shadow-md transition-all duration-300 ${
              activeHighlight === 'cobra' ? 'ring-4 ring-primary' : ''
            }`}>
              <img 
                className="w-full h-full object-cover rounded-xl"
                src={getCatImage('cobra', 'male')} 
                alt="眼镜蛇"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-bold text-xs text-on-surface">眼镜蛇</span>
          </div>
        </div>
      </section>

      {/* Pedigree Connector Line */}
      <div className="w-full flex justify-center mb-2">
        <div className={`pedigree-line-v h-8 transition-opacity duration-300 ${activeHighlight ? 'opacity-30' : 'opacity-100'}`}></div>
      </div>

      {/* Queens Section */}
      <section className="flex flex-col items-center mb-8">
        <div className="relative w-full flex justify-center items-center mb-6">
          <div className="pedigree-line-h absolute w-full max-w-xs -z-10 bg-outline-variant"></div>
          <div className="bg-secondary text-white px-6 py-1 rounded-full text-xs font-bold shadow-md z-10">
            母亲 (Queens)
          </div>
        </div>

        <div className="grid grid-cols-3 gap-y-6 gap-x-3 w-full max-w-md mx-auto">
          {/* Queen 1 - 小月亮 */}
          <div 
            onClick={() => handleNodeClick('moon')}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 ${
              activeHighlight && !isRelated('moon') ? 'opacity-30 scale-95' : 'scale-100'
            }`}
          >
            <div className={`w-16 h-16 rounded-full p-0.5 bg-secondary-fixed shadow-sm transition-all duration-300 ${
              activeHighlight === 'moon' ? 'ring-4 ring-secondary' : ''
            }`}>
              <img 
                className="w-full h-full object-cover rounded-full" 
                src={getCatImage('moon', 'female')} 
                alt="小月亮"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs font-bold text-on-surface">小月亮</span>
          </div>

          {/* Queen 2 - 水冰月 */}
          <div 
            onClick={() => handleNodeClick('sailor')}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 ${
              activeHighlight && !isRelated('sailor') ? 'opacity-30 scale-95' : 'scale-100'
            }`}
          >
            <div className={`w-16 h-16 rounded-full p-0.5 bg-secondary-fixed shadow-sm transition-all duration-300 ${
              activeHighlight === 'sailor' ? 'ring-4 ring-secondary' : ''
            }`}>
              <img 
                className="w-full h-full object-cover rounded-full" 
                src={getCatImage('sailor', 'female')} 
                alt="水冰月"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs font-bold text-on-surface">水冰月</span>
          </div>

          {/* Queen 3 - 小鹿 */}
          <div 
            onClick={() => handleNodeClick('xiaolu-queen')}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 ${
              activeHighlight && !isRelated('xiaolu-queen') ? 'opacity-30 scale-95' : 'scale-100'
            }`}
          >
            <div className={`w-16 h-16 rounded-full p-0.5 bg-secondary-fixed shadow-sm transition-all duration-300 ${
              activeHighlight === 'xiaolu-queen' ? 'ring-4 ring-secondary' : ''
            }`}>
              <img 
                className="w-full h-full object-cover rounded-full" 
                src={getCatImage('xiaolu-queen', 'female')} 
                alt="小鹿"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs font-bold text-on-surface">小鹿</span>
          </div>

          {/* Queen 4 - 蓝姐姐 */}
          <div 
            onClick={() => handleNodeClick('bluesister')}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 ${
              activeHighlight && !isRelated('bluesister') ? 'opacity-30 scale-95' : 'scale-100'
            }`}
          >
            <div className={`w-16 h-16 rounded-full p-0.5 bg-secondary-fixed shadow-sm transition-all duration-300 ${
              activeHighlight === 'bluesister' ? 'ring-4 ring-secondary' : ''
            }`}>
              <img 
                className="w-full h-full object-cover rounded-full" 
                src={getCatImage('bluesister', 'female')} 
                alt="蓝姐姐"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs font-bold text-on-surface">蓝姐姐</span>
          </div>

          {/* Queen 5 - 绵绵 */}
          <div 
            onClick={() => handleNodeClick('cotton')}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 ${
              activeHighlight && !isRelated('cotton') ? 'opacity-30 scale-95' : 'scale-100'
            }`}
          >
            <div className={`w-16 h-16 rounded-full p-0.5 bg-secondary-fixed shadow-sm transition-all duration-300 ${
              activeHighlight === 'cotton' ? 'ring-4 ring-secondary' : ''
            }`}>
              <img 
                className="w-full h-full object-cover rounded-full" 
                src={getCatImage('cotton', 'female')} 
                alt="绵绵"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs font-bold text-on-surface">绵绵</span>
          </div>

          {/* Queen 6 - 过油肉 */}
          <div 
            onClick={() => handleNodeClick('guoyourou-queen')}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 ${
              activeHighlight && !isRelated('guoyourou-queen') ? 'opacity-30 scale-95' : 'scale-100'
            }`}
          >
            <div className={`w-16 h-16 rounded-full p-0.5 bg-secondary-fixed shadow-sm transition-all duration-300 ${
              activeHighlight === 'guoyourou-queen' ? 'ring-4 ring-secondary' : ''
            }`}>
              <img 
                className="w-full h-full object-cover rounded-full" 
                src={getCatImage('guoyourou-queen', 'female')} 
                alt="过油肉"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs font-bold text-on-surface">过油肉</span>
          </div>

          {/* Queen 7 - 模特 */}
          <div 
            onClick={() => handleNodeClick('mote-queen')}
            className={`col-start-2 flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 ${
              activeHighlight && !isRelated('mote-queen') ? 'opacity-30 scale-95' : 'scale-100'
            }`}
          >
            <div className={`w-16 h-16 rounded-full p-0.5 bg-secondary-fixed shadow-sm transition-all duration-300 ${
              activeHighlight === 'mote-queen' ? 'ring-4 ring-secondary' : ''
            }`}>
              <img 
                className="w-full h-full object-cover rounded-full" 
                src={getCatImage('mote-queen', 'female')} 
                alt="模特"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs font-bold text-on-surface">模特</span>
          </div>
        </div>
      </section>

      {/* Offspring Section */}
      <section className="mt-8">
        <div className="flex justify-center mb-6">
          <div className="bg-outline text-white px-6 py-1 rounded-full text-xs font-bold shadow-sm">
            后代 (Offspring)
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* Offspring Card 1 */}
          <div 
            onClick={() => handleNodeClick('guoyourou-child')}
            className={`bg-white rounded-2xl p-4 shadow-sm border border-surface-container flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${
              activeHighlight && !isRelated('guoyourou-child') ? 'opacity-30 scale-95' : 'scale-100'
            } ${activeHighlight === 'guoyourou-child' ? 'ring-4 ring-primary' : ''}`}
          >
            <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container flex items-center justify-center border border-secondary-fixed/30">
              {getCatImage('guoyourou-child', 'female') ? (
                <img 
                  className="w-full h-full object-cover" 
                  src={getCatImage('guoyourou-child', 'female')} 
                  alt="过油肉"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="material-symbols-outlined text-2xl text-primary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-bold text-sm text-on-surface">过油肉</h3>
              <p className="text-[10px] text-on-surface-variant">一代后代</p>
            </div>
          </div>

          {/* Offspring Card 2 */}
          <div 
            onClick={() => handleNodeClick('mote-child')}
            className={`bg-white rounded-2xl p-4 shadow-sm border border-surface-container flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${
              activeHighlight && !isRelated('mote-child') ? 'opacity-30 scale-95' : 'scale-100'
            } ${activeHighlight === 'mote-child' ? 'ring-4 ring-primary' : ''}`}
          >
            <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container flex items-center justify-center border border-secondary-fixed/30">
              {getCatImage('mote-child', 'female') ? (
                <img 
                  className="w-full h-full object-cover" 
                  src={getCatImage('mote-child', 'female')} 
                  alt="模特"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="material-symbols-outlined text-2xl text-primary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-bold text-sm text-on-surface">模特</h3>
              <p className="text-[10px] text-on-surface-variant">一代后代</p>
            </div>
          </div>

          {/* Offspring Card 3 */}
          <div 
            onClick={() => handleNodeClick('xiaolu-child')}
            className={`bg-white rounded-2xl p-4 shadow-sm border border-surface-container flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${
              activeHighlight && !isRelated('xiaolu-child') ? 'opacity-30 scale-95' : 'scale-100'
            } ${activeHighlight === 'xiaolu-child' ? 'ring-4 ring-primary' : ''}`}
          >
            <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container flex items-center justify-center border border-secondary-fixed/30">
              {getCatImage('xiaolu-child', 'female') ? (
                <img 
                  className="w-full h-full object-cover" 
                  src={getCatImage('xiaolu-child', 'female')} 
                  alt="小鹿"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="material-symbols-outlined text-2xl text-primary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-bold text-sm text-on-surface">小鹿</h3>
              <p className="text-[10px] text-on-surface-variant">一代后代</p>
            </div>
          </div>
        </div>

        {/* Tip text box */}
        <AnimatePresence mode="wait">
          {activeHighlight ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 text-center"
            >
              <p className="text-xs font-bold text-primary flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[16px]">info</span>
                血统联结关系已突出显示 (Lineage relationships highlighted!)
              </p>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                {activeHighlight === 'sun' && '“小太阳”是“过油肉”和“小鹿”的生父(Sire)。'}
                {activeHighlight === 'cobra' && '“眼镜蛇”是“模特”的生父(Sire)。'}
                {activeHighlight === 'moon' && '“小月亮”是“过油肉”的亲生母亲(Dam)。与“小太阳”配对。'}
                {activeHighlight === 'sailor' && '“水冰月”是“模特”的亲生母亲(Dam)。与“眼镜蛇”配对。'}
                {activeHighlight === 'cotton' && '“绵绵”是“小鹿”的亲生母亲(Dam)。与“小太阳”库配对。'}
                {activeHighlight === 'guoyourou-child' && '“过油肉”是“小太阳”公猫与“小月亮”母猫一代后代。'}
                {activeHighlight === 'mote-child' && '“模特”是“眼镜蛇”公猫与“水冰月”母猫一代后代。'}
                {activeHighlight === 'xiaolu-child' && '“小鹿”是“小太阳”公猫与“绵绵”母猫一代后代。'}
                {activeHighlight.endsWith('queen') && '此处为母代族谱占位记录，可在上表进一步查询繁育血系。'}
              </p>
              <button 
                onClick={() => setActiveHighlight(null)}
                className="mt-3 text-[10px] text-primary underline underline-offset-2 font-bold focus:outline-none"
              >
                重置高亮关系
              </button>
            </motion.div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center text-xs text-on-surface-variant italic"
            >
              提示: 点击任何猫咪或后代，可直观高亮溯源其血统配对关系
            </motion.p>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
}
