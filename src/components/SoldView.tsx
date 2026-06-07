import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SOLD_KITTENS_DATA } from '../data';
import { Kitten } from '../types';

export default function SoldView() {
  const [selectedKitten, setSelectedKitten] = useState<Kitten | null>(null);

  // Parent review feedback simulator
  const getParentReview = (kittenId: string) => {
    switch (kittenId) {
      case 'diandian':
        return {
          owner: '林女士 (北京)',
          review: '小点点回家半年啦，超级粘人！我们在洗手洗澡她也一定要坐在门边等。体检指标都非常好，医生夸她骨骼肌肉很结实。特别感谢猫舍主人的耐心指引！',
          score: 5,
          daysAgo: '180天前反馈'
        };
      case 'kege':
        return {
          owner: '张先生 (上海)',
          review: '克哥真的是名副其实的大暖男！超级沉稳，对家里的小小朋友也特别有耐心，从来不哈人或出爪。长得非常帅，金黄色的被毛阳光下亮得跟锦缎一样，太招人爱了。',
          score: 5,
          daysAgo: '120天前反馈'
        };
      case 'rubi':
        return {
          owner: '王女士 (深圳)',
          review: '噜比精力超旺盛！每天在家里跑酷、叼玩具找我飞接。真的是阿比里的社交达人，家里来客人都争着凑上去撒娇。性格极好，猫舍专业繁育令人放心！',
          score: 5,
          daysAgo: '90天前反馈'
        };
      case 'dudu':
      default:
        return {
          owner: '赵先生 (杭州)',
          review: '嘟嘟特别聪明，回到家第一天就学会了用猫砂盆，完全没有认生。每天打呼噜的声音像小马达一样，特别治愈！体格非常棒，非常省心。',
          score: 5,
          daysAgo: '45天前反馈'
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="pb-16 max-w-lg mx-auto space-y-6 relative"
    >
      {/* Header Section */}
      <section className="flex flex-col gap-1.5" id="sold-header">
        <h2 className="text-amber-400 font-bold text-2xl tracking-tight leading-none" id="sold-title">已售幼猫回访</h2>
        <p className="text-xs md:text-sm text-slate-300 opacity-90 leading-relaxed" id="sold-desc">
          每一只结缘的小猫都是我们对健康亲人承诺的见证。在此记录它们在新家庭中开启幸福生活的温馨瞬间。
        </p>
      </section>

      {/* Cat Cards Grid */}
      <div className="grid grid-cols-1 gap-6" id="sold-grid">
        {SOLD_KITTENS_DATA.map((kitten) => (
          <motion.article
            whileHover={{ y: -4 }}
            onClick={() => setSelectedKitten(kitten)}
            key={kitten.id}
            className="glass-card-interactive rounded-3xl overflow-hidden cursor-pointer relative group"
            id={`sold-card-${kitten.id}`}
          >
            {/* Image section */}
            <div className="relative aspect-[4/5] bg-slate-900 overflow-hidden">
              <img
                alt={`Ruddy Abyssinian kitten named ${kitten.name}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                src={kitten.image}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              
              {/* Glass Overlay Stamp */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                <div className="bg-slate-950/60 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-white/20 transform -rotate-12 shadow-2xl flex flex-col items-center">
                  <span className="text-amber-400 font-bold tracking-widest text-base">已售结缘</span>
                  <span className="text-white/80 text-[10px] mt-0.5 tracking-normal font-normal">点击查看温暖反馈</span>
                </div>
              </div>
            </div>

            {/* Profile section */}
            <div className="p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-white">{kitten.name}</h3>
                <span className="text-amber-400 font-semibold text-xs bg-amber-500/10 px-2 py-0.5 rounded-full">
                  {kitten.color}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {kitten.traits.map((trait, idx) => (
                  <span
                    key={idx}
                    className="glass-badge px-3 py-1 rounded-full text-[10px] font-medium"
                    id={`sold-trait-${kitten.id}-${idx}`}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Parents Feedback Overlay Modal */}
      <AnimatePresence>
        {selectedKitten && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedKitten(null)}
            id="sold-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-slate-900/90 backdrop-blur-2xl max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl border border-white/12 flex flex-col text-slate-100"
              onClick={(e) => e.stopPropagation()}
              id="sold-modal-container"
            >
              {/* Header profile */}
              <div className="relative aspect-[16/10] bg-slate-950">
                <img
                  src={selectedKitten.image}
                  alt={selectedKitten.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedKitten(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/75 transition-colors border border-white/10 cursor-pointer"
                  id="sold-modal-close-btn"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-base font-bold">
                    {selectedKitten.name} • {selectedKitten.color}
                  </h3>
                  <p className="text-slate-300 text-xs mt-0.5 opacity-90">
                    {selectedKitten.genderLabel} • {selectedKitten.constellation}
                  </p>
                </div>
              </div>

              {/* Feedbacks details body */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-400 text-[20px]">forum</span>
                    <span className="text-sm font-bold text-amber-400">家长回访与反馈</span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full font-medium">
                    {getParentReview(selectedKitten.id).daysAgo}
                  </span>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl relative space-y-3 border border-white/8 shadow-inner">
                  <span className="absolute right-4 top-2 text-amber-400/10 text-5xl font-serif select-none pointer-events-none">
                    ”
                  </span>
                  
                  {/* Stars indicators */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(getParentReview(selectedKitten.id).score)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-200 leading-loose italic">
                    "{getParentReview(selectedKitten.id).review}"
                  </p>

                  <div className="pt-1 text-right text-xs text-slate-400 font-bold">
                    —— 家长: {getParentReview(selectedKitten.id).owner}
                  </div>
                </div>

                <div className="bg-emerald-500/10 text-emerald-300 p-3 rounded-xl border border-emerald-500/20 text-xs flex gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified_user</span>
                  <div className="space-y-0.5">
                    <span className="font-bold text-[11px]">体检证书与终生健康保障已签署</span>
                    <p className="opacity-95 text-[10px] leading-relaxed">该幼猫在接运前已接受完整抗原体检，并由买卖双方签署健康保障合同。</p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 bg-white/5 border-t border-white/10">
                <button
                  onClick={() => setSelectedKitten(null)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white h-11 rounded-xl text-xs font-bold hover:opacity-95 active:scale-95 transition-transform cursor-pointer"
                  id="sold-modal-bottom-close-btn"
                >
                  关闭反馈
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
