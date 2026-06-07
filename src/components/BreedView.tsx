import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KINGS_DATA, QUEENS_DATA } from '../data';
import { Cat } from '../types';

interface BreedViewProps {
  onSelectedCat?: (cat: Cat) => void;
  key?: string;
}

export default function BreedView({ onSelectedCat }: BreedViewProps) {
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  // Simulated weight data/history for the cat detail modal
  const getCatDetails = (catId: string) => {
    switch (catId) {
      case 'sun':
        return {
          weight: '4.2 kg',
          vaccines: '妙三多已接种 (3针) + 妙宠爱驱虫',
          character: '极度亲人、爱撒娇，总是跟着人。在家里的外号是“复读机”，喜欢喵喵叫吸引注意力。',
          bloodType: 'A型',
          fivFelv: '双阴性 (阴性)',
          titers: '抗体滴度极佳'
        };
      case 'cobra':
        return {
          weight: '4.8 kg',
          vaccines: '妙三多已接种 (3针) + 妙宠爱驱虫',
          character: '稳重如爵士，举手投足非常有分寸。体格强健、肌肉感饱满，弹跳力极强。',
          bloodType: 'A型',
          fivFelv: '双阴性 (阴性)',
          titers: '抗体滴度极佳'
        };
      case 'moon':
        return {
          weight: '3.1 kg',
          vaccines: '已完成进口疫苗接种 + 驱虫',
          character: '像林间的小精灵。好奇心极强，任何细微的声音都能引起她的注意。胃口很好。',
          bloodType: 'A型',
          fivFelv: '双阴性 (阴性)',
          titers: '优秀'
        };
      case 'sailor':
        return {
          weight: '3.3 kg',
          vaccines: '已完成进口疫苗接种 + 驱虫',
          character: '智商极高，能够分辨自己的名字。感知力极其敏锐，能快速安抚人的小情绪。',
          bloodType: 'A型',
          fivFelv: '双阴性 (阴性)',
          titers: '优秀'
        };
      case 'cotton':
        return {
          weight: '3.6 kg',
          vaccines: '已完成进口疫苗接种 + 驱虫',
          character: '性格就像她的名字一样绵软。被抱起时会完全放松，浑身奶油质感，非常温柔。',
          bloodType: 'A型',
          fivFelv: '双阴性 (阴性)',
          titers: '优秀'
        };
      default:
        return {
          weight: '3.5 kg',
          vaccines: '已接种',
          character: '活泼好动，体态优雅，亲近人类。',
          bloodType: '未知',
          fivFelv: '双阴性',
          titers: '合格'
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="pb-16 max-w-lg mx-auto"
    >
      {/* Sires Section */}
      <section className="mb-8">
        <div className="section-divider flex items-center mb-6 text-primary">
          <span className="material-symbols-outlined mr-2">home_storage</span>
          <h2 className="text-xl font-bold tracking-tight font-headline-md">Kings of Little Sun</h2>
        </div>

        <div className="space-y-6">
          {KINGS_DATA.map((king) => (
            <motion.article
              whileHover={{ y: -4 }}
              onClick={() => setSelectedCat(king)}
              key={king.id}
              className="bg-white rounded-[24px] overflow-hidden card-shadow border border-outline-variant/30 cursor-pointer transition-transform"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-dim">
                <img
                  alt={king.name}
                  className="w-full h-full object-cover"
                  src={king.image}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {king.roleLabel}
                </span>
                <span className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded">
                  点击查看详情
                </span>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-on-surface">
                    {king.name} / {king.englishName}
                  </h3>
                  <div className="flex items-center text-primary-container text-sm font-semibold">
                    <span className="material-symbols-outlined text-[16px] mr-1">grade</span>
                    <span>{king.constellation}</span>
                  </div>
                </div>
                <div className="flex items-center text-on-surface-variant text-xs gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span>生日: {king.birthday}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {king.traits.map((trait, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-surface-container-low text-primary rounded-full text-xs font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Queens Section */}
      <section className="mb-8">
        <div className="section-divider flex items-center mb-6 text-primary">
          <span className="material-symbols-outlined mr-2">pets</span>
          <h2 className="text-xl font-bold tracking-tight font-headline-md">Queens of Little Sun</h2>
        </div>

        <div className="space-y-6">
          {QUEENS_DATA.filter(q => q.image).map((queen) => (
            <motion.article
              whileHover={{ y: -4 }}
              onClick={() => setSelectedCat(queen)}
              key={queen.id}
              className="bg-white rounded-[24px] overflow-hidden card-shadow border border-outline-variant/30 cursor-pointer transition-transform"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-dim">
                <img
                  alt={queen.name}
                  className="w-full h-full object-cover"
                  src={queen.image}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {queen.roleLabel}
                </span>
                <span className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded">
                  点击查看详情
                </span>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-on-surface">
                    {queen.name} / {queen.englishName}
                  </h3>
                  <div className="flex items-center text-primary-container text-sm font-semibold">
                    <span className="material-symbols-outlined text-[16px] mr-1">grade</span>
                    <span>{queen.constellation}</span>
                  </div>
                </div>
                <div className="flex items-center text-on-surface-variant text-xs gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span>生日: {queen.birthday}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {queen.traits.map((trait, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-surface-container-low text-primary rounded-full text-xs font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Cat Details Modal Overlay */}
      <AnimatePresence>
        {selectedCat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedCat(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-background max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Profile */}
              <div className="relative aspect-[4/3] bg-surface-dim">
                <img
                  src={selectedCat.image}
                  alt={selectedCat.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedCat(null)}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <span className="bg-primary px-3 py-0.5 rounded-full text-[10px] text-white font-bold inline-block mb-1">
                    {selectedCat.role === 'sire' ? '公种 / Sire' : '母种 / Dam'}
                  </span>
                  <h3 className="text-white text-xl font-bold">
                    {selectedCat.name} • {selectedCat.englishName}
                  </h3>
                </div>
              </div>

              {/* Scrollable details */}
              <div className="p-5 space-y-4 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-surface-container-low p-2.5 rounded-xl">
                    <p className="text-on-surface-variant font-medium">体重 / Weight</p>
                    <p className="text-on-surface text-sm font-bold mt-0.5">
                      {getCatDetails(selectedCat.id).weight}
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-2.5 rounded-xl">
                    <p className="text-on-surface-variant font-medium">血型 / Blood Type</p>
                    <p className="text-on-surface text-sm font-bold mt-0.5">
                      {getCatDetails(selectedCat.id).bloodType}
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-2.5 rounded-xl">
                    <p className="text-on-surface-variant font-medium">毛色 / Fur Color</p>
                    <p className="text-on-surface text-xs font-bold mt-0.5">
                      {selectedCat.color}
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-2.5 rounded-xl">
                    <p className="text-on-surface-variant font-medium">猫体健康诊断</p>
                    <p className="text-on-surface text-[11px] font-bold mt-0.5 text-green-700">
                      {getCatDetails(selectedCat.id).fivFelv}（阴性）
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container p-3 rounded-2xl space-y-1">
                  <p className="text-xs text-on-surface-variant font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">health_and_safety</span>
                    疫苗与免疫记录 (Vaccine Status)
                  </p>
                  <p className="text-xs text-on-surface">
                    {getCatDetails(selectedCat.id).vaccines}
                  </p>
                </div>

                <div className="bg-surface-container p-3 rounded-2xl space-y-1">
                  <p className="text-xs text-on-surface-variant font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">favorite</span>
                    性格特征 / Personality
                  </p>
                  <p className="text-xs text-on-surface leading-relaxed text-slate-700">
                    {getCatDetails(selectedCat.id).character}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed-variant px-2.5 py-0.5 rounded-full font-bold">
                    {selectedCat.constellation}
                  </span>
                  <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed-variant px-2.5 py-0.5 rounded-full font-bold">
                    生日: {selectedCat.birthday}
                  </span>
                </div>
              </div>

              {/* Close Button footer */}
              <div className="p-4 bg-surface-container-lowest border-t border-surface-container">
                <button
                  onClick={() => setSelectedCat(null)}
                  className="w-full bg-primary text-white h-11 rounded-xl text-xs font-bold hover:opacity-90 active:scale-95 transition-transform"
                >
                  我知道了
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
