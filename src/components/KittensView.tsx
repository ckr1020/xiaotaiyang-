import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Kitten, Reservation } from '../types';

interface KittensViewProps {
  kittens: Kitten[];
  onReserveKitten: (kittenId: string) => void;
  reservations: Reservation[];
  onSubmitReservation: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => void;
  key?: string;
}

export default function KittensView({
  kittens,
  onReserveKitten,
  reservations,
  onSubmitReservation
}: KittensViewProps) {
  const [bookingKitten, setBookingKitten] = useState<Kitten | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    wechat: '',
    remarks: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookingClick = (kitten: Kitten) => {
    if (kitten.status !== 'available') return;
    setBookingKitten(kitten);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingKitten) return;

    onSubmitReservation({
      kittenId: bookingKitten.id,
      kittenName: bookingKitten.name,
      clientName: formData.clientName,
      phone: formData.phone,
      wechat: formData.wechat,
      remarks: formData.remarks
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingKitten(null);
      setFormData({ clientName: '', phone: '', wechat: '', remarks: '' });
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="pb-16 max-w-lg mx-auto space-y-6"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xxl aspect-[16/9] flex flex-col justify-end p-5 group shadow-md">
        <img
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          alt="A warm interior with an Abyssinian kitten playing"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQYopZ3ZXZtnw9U_vaNNfnz31feLU01TRM-ifU6dlOHjOSsw5M1MDZagOSidKsRqObRC8v7ZC4qc4gIQ4kLX3379ee30UWXi9A9IOwojLHbRQCFhsmqMxpAod6vZd3fFxxIev2Oo_KY9X34CBlsDp6Sgi0HjOTSFiSbUx4qwvxlhJ8v_NxMb7TMIotZxVDtNTl4GZxbKgs3H2Xp4Kzu4mS3E6fnUdhBV8sYuhzqjxBmisVQ44b5_mP5gSYzxWkGut05JpWxZKTPOAQ"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
        <div className="relative z-10 text-white">
          <h2 className="text-xl md:text-2xl font-bold font-headline-lg mb-1">寻找您的新家人</h2>
          <p className="text-white/80 text-xs md:text-sm font-body-md leading-relaxed text-balance">
            每一只幼猫都经过精心的社会化训练和严格的健康筛选，确保带着满格的幸福感加入您的家庭。
          </p>
        </div>
      </section>

      {/* Section Title & Delivery Info */}
      <div className="flex items-center justify-between">
        <h3 className="text-secondary font-bold text-lg font-headline-md font-bold">
          待售幼猫 (Current Kittens)
        </h3>
        <div className="flex items-center gap-1 px-2.5 py-0.5 bg-surface-container-low rounded-full">
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">local_shipping</span>
          <span className="text-[11px] font-medium text-on-surface-variant">全国配送</span>
        </div>
      </div>

      {/* Kittens Grid */}
      <div className="space-y-6">
        {kittens.map((kitten) => {
          const isKittenReserved = kitten.status === 'reserved';
          return (
            <motion.div
              layoutId={`kitten-${kitten.id}`}
              key={kitten.id}
              className="bg-surface-container-lowest rounded-xxl overflow-hidden card-shadow border border-surface-container"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                  alt={`Abyssinian kitten named ${kitten.name}`}
                  src={kitten.image}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-4 right-4 glass-badge px-3 py-1 rounded-full font-bold text-xs ${isKittenReserved ? 'text-green-700' : 'text-primary'}`}>
                  {isKittenReserved ? '已预定' : kitten.statusLabel}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-on-surface font-bold text-lg">{kitten.name}</h4>
                    <p className="text-on-surface-variant text-xs font-body-md mt-0.5">
                      {kitten.constellation} • {kitten.birthday}
                    </p>
                  </div>
                  <span className={`material-symbols-outlined text-primary-fixed-dim ${isKittenReserved ? 'text-green-500' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    pets
                  </span>
                </div>
                <div className="text-primary font-bold text-lg flex items-baseline gap-1">
                  <span className="text-sm font-semibold">¥</span>
                  <span>{kitten.price.toLocaleString()}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-surface-container-high rounded-full text-xs font-medium text-on-surface-variant">
                    {kitten.genderLabel}
                  </span>
                  {kitten.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-surface-container-high rounded-full text-xs font-medium text-on-surface-variant"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => handleBookingClick(kitten)}
                  disabled={isKittenReserved}
                  className={`w-full h-11 rounded-full flex items-center justify-center gap-2 font-bold text-sm transition-all duration-150 cursor-pointer ${
                    isKittenReserved
                      ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
                      : 'bg-primary-container text-white hover:opacity-90 active:scale-95'
                  }`}
                >
                  {isKittenReserved ? '您已成功预定' : '立即预定'}
                  {!isKittenReserved && (
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Booking Form Dialog */}
      <AnimatePresence>
        {bookingKitten && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setBookingKitten(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-background max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Form Content */}
              {!bookingSuccess ? (
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-surface-container">
                    <h3 className="font-bold text-lg text-secondary flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary">shopping_basket</span>
                      预定幼猫: {bookingKitten.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setBookingKitten(null)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>

                  <p className="text-xs text-on-surface-variant">
                    提交以下预定意向，我们将第一时间通过微信/电话联系您确认情况。无需线上订金，沟通满意后再付。
                  </p>

                  <div className="space-y-3 pt-2">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1">
                        您的姓名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        required
                        value={formData.clientName}
                        onChange={handleInputChange}
                        placeholder="请输入姓名"
                        className="w-full h-10 px-3 text-sm bg-white border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    {/* WeChat */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant">
                        微信号 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="wechat"
                        required
                        value={formData.wechat}
                        onChange={handleInputChange}
                        placeholder="请输入微信号"
                        className="w-full h-10 px-3 text-sm bg-white border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant">
                        手机号码 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="请输入手机号"
                        className="w-full h-10 px-3 text-sm bg-white border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    {/* Remarks */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant">备注/说点什么（如养猫经验等）</label>
                      <textarea
                        name="remarks"
                        rows={2}
                        value={formData.remarks}
                        onChange={handleInputChange}
                        placeholder="可输入您的叮嘱或咨询问题..."
                        className="w-full p-2.5 text-sm bg-white border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setBookingKitten(null)}
                      className="w-1/2 h-11 border border-outline-variant rounded-xl text-xs font-bold text-on-surface-variant active:bg-surface-container"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 h-11 bg-primary text-white rounded-xl text-xs font-bold hover:opacity-90 active:scale-95 transition-transform"
                    >
                      提交预定
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                  <motion.div
                    initial={{ scale: 0.5, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2"
                  >
                    <span className="material-symbols-outlined text-3xl font-bold">check_circle</span>
                  </motion.div>
                  <h3 className="font-bold text-lg text-secondary">提交成功!</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    谢谢您，<b>{formData.clientName}</b>！<br />
                    您已成功提交对 <b>{bookingKitten.name}</b> 的预定意向。我们将在稍后通过微信（{formData.wechat}）与您联系。
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
