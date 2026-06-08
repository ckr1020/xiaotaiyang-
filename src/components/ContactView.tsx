import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Consultation } from '../types';

export default function ContactView() {
  const [copied, setCopied] = useState(false);
  const [consultations, setConsultations] = useState<Consultation[]>(() => {
    const saved = localStorage.getItem('little_sun_consultations');
    return saved ? JSON.parse(saved) : [];
  });
  const [formInput, setFormInput] = useState({
    subject: '',
    content: '',
    phone: '',
    wechat: ''
  });
  const [formSuccess, setFormSuccess] = useState(false);

  // Load consultations from backend on mount
  useEffect(() => {
    const loadConsultations = async () => {
      try {
        const response = await fetch('/api/consultations');
        if (response.ok) {
          const data = await response.json();
          setConsultations(data);
        }
      } catch (err) {
        console.warn('Backend server unreachable, running consultations offline:', err);
      }
    };
    loadConsultations();
  }, []);

  // Copy to Clipboard
  const handleCopyWeChat = () => {
    navigator.clipboard.writeText('Abiabi2369521').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      // Fallback
      alert('微信号: Abiabi2369521 已复制');
    });
  };

  // Submit consultation
  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = {
      subject: formInput.subject,
      content: formInput.content,
      phone: formInput.phone,
      wechat: formInput.wechat
    };

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.consultation) {
          const updated = [...consultations, result.consultation];
          setConsultations(updated);
          localStorage.setItem('little_sun_consultations', JSON.stringify(updated));
          setFormSuccess(true);
          setFormInput({ subject: '', content: '', phone: '', wechat: '' });
          setTimeout(() => setFormSuccess(false), 3000);
          return;
        }
      }
    } catch (err) {
      console.error('Backend submission failed, falling back to local storage:', err);
    }

    // Offline Fallback flow
    const newConsultation: Consultation = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'standard',
      subject: formInput.subject,
      content: formInput.content,
      phone: formInput.phone,
      wechat: formInput.wechat,
      createdAt: new Date().toLocaleString()
    };
    const updated = [...consultations, newConsultation];
    setConsultations(updated);
    localStorage.setItem('little_sun_consultations', JSON.stringify(updated));

    setFormSuccess(true);
    setFormInput({ subject: '', content: '', phone: '', wechat: '' });
    setTimeout(() => setFormSuccess(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="pb-16 max-w-lg mx-auto"
    >
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-xxl aspect-[16/9] flex flex-col justify-end p-5 group shadow-md mb-6">
        <img
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          alt="Abyssinian Cat"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBk725HaGJwyefjMTd7iKiVFH_ARtZIZx1I5ygDKsi0yywgYxUYodCeDY4vPxnGj-tMO9owFpFaQzTdqGxnqsxHrR0HHOUIQ9nigOYYwx_-LxjZfnyctQB8dJvspWi0FFlh6tjMJOILJwBtVf2I7VZqcMWnEHGX3-oMxmbgmRSt18y42zTHa2FmwX8H_1IzmAcAUNYdhX5AkzBw7H1JbnaOhhUYm1BHMUIe9TrjMkYvnFsp3GK3oS7HBkHjXdGmZ8ehP4e72ibbiHI"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
        <div className="relative z-10 text-white">
          <h2 className="text-xl md:text-2xl font-bold font-headline-lg mb-1">居家阳光</h2>
          <p className="text-white/80 text-xs md:text-sm font-body-md leading-relaxed text-balance">
            在专业的家庭繁育环境中感受温暖，健康与快乐是我们的标准。
          </p>
        </div>
      </section>

      <div className="space-y-6">
        {/* WeChat Block */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] text-center flex flex-col items-center border border-outline-variant/20">
          <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-secondary">chat_bubble</span>
          </div>
          <h3 className="font-bold text-base text-on-surface">微信联系</h3>
          <p className="text-on-surface-variant text-xs mb-5 font-medium">每日更新与幼崽照片</p>
          
          <div className="bg-white p-3.5 rounded-2xl border border-outline-variant mb-5 inline-block">
            <img
              alt="WeChat QR Code"
              className="w-28 h-28 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZoZljvAUSGU4BJBllJjmCkK-WryRh15Ac36kgZJtVASsuolDktcHg7Va-RbY2EZaaWDejbmSPy6oceR-Zph06amc59ps0vq1STE68GLNkt8gpJgCHOeUVYmrqMmnQp-LAwgF2X5mBr2chdup2dl9U5PFdX4zkIlwEncvqahxIf7PPFpUmGjzRnOPmLCxlh9Bldzl6y6qWrnboDCLv_sjacyqwqyqha5Phy3bRUn5cgViTk8YLwS6vx4P0Cz1bn0tj6gQK3g4SKNnH"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="bg-surface-container px-6 py-2.5 rounded-xl mb-4 w-full">
            <span className="text-primary font-bold tracking-wider text-base">Abiabi2369521</span>
          </div>

          <button
            onClick={handleCopyWeChat}
            className="w-full h-11 bg-primary text-white font-bold rounded-full flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity active:scale-95 duration-150 cursor-pointer text-sm shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            {copied ? '已复制成功！' : '复制微信号'}
          </button>
        </div>

        {/* Phone Block */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] text-center flex flex-col items-center border border-outline-variant/20">
          <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-secondary">phone_android</span>
          </div>
          <h3 className="font-bold text-base text-on-surface">直接通话</h3>
          <p className="text-on-surface-variant text-xs mb-5 font-medium">专业建议与健康咨询</p>
          <p className="text-primary font-bold text-2xl mb-5 tracking-wide">185 8299 6111</p>
          <a
            className="w-full h-11 bg-primary text-white font-bold rounded-full flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity active:scale-95 duration-150 text-sm shadow-sm"
            href="tel:18582996111"
          >
            <span className="material-symbols-outlined text-white text-[16px]">call</span>
            立即拨打
          </a>
        </div>

        {/* Address Block */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] text-center flex flex-col items-center border border-outline-variant/20">
          <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
          </div>
          <h3 className="font-bold text-base text-on-surface">猫舍地址</h3>
          <p className="text-on-surface-variant text-xs mb-5 leading-normal">
            中国 山西省 晋中市 恒大华府
          </p>
          
          <div className="w-full h-44 rounded-2xl overflow-hidden mb-5 relative group shadow-inner border border-surface-container">
            <img
              alt="Location Map"
              className="w-full h-full object-cover grayscale opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGSbgXeZW450bAGbhCGnGNxrQcUdrGqs76CSzAWIh3M3jFAUiuGmKjg12kiHm2_JRXHbTWbazNV6dSo5jK7dnNLDAY3gpSqFWzjzpoGQvq4xh_3--4FJBc-PW7l05Pkjqrt0py5mbImSsI4wrwogZ-CGRpGi00n8YEy5AtqFIjDqMfv3jjOwXFX5Do5njLnsVZY1U-Gmh76rdJnCxEdchvgZP5rXge7wKTa8vZx6JIwknGYENQUWbsJw-Q6oUWKDWVohy4OTTecpSY"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  location_on
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              window.open('https://uri.amap.com/marker?position=112.723,37.685&name=恒大华府', '_blank');
            }}
            className="w-full h-11 border-2 border-primary text-primary font-bold rounded-full flex items-center justify-center gap-1.5 hover:bg-primary/5 transition-colors active:scale-95 text-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">navigation</span>
            查看路线
          </button>
        </div>

        {/* Dynamic Consultation Form */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/20 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-container">
            <span className="material-symbols-outlined text-primary">edit_note</span>
            <h3 className="font-bold text-base text-secondary">在线留言 / 意向登记</h3>
          </div>

          <form onSubmit={handleConsultationSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant">咨询主题 (Subject)</label>
              <input
                type="text"
                required
                placeholder="例如: 想要预定原始色男孩"
                value={formInput.subject}
                onChange={e => setFormInput(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full h-10 px-3 text-xs bg-white border border-outline-variant rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant">想对我们说的话 (Details)</label>
              <textarea
                required
                rows={3}
                placeholder="请详细描述您的购猫意向或遇到的喂养问题..."
                value={formInput.content}
                onChange={e => setFormInput(prev => ({ ...prev, content: e.target.value }))}
                className="w-full p-3 text-xs bg-white border border-outline-variant rounded-xl focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pb-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant">微信号 (Required)</label>
                <input
                  type="text"
                  required
                  placeholder="微信号"
                  value={formInput.wechat}
                  onChange={e => setFormInput(prev => ({ ...prev, wechat: e.target.value }))}
                  className="w-full h-10 px-3 text-xs bg-white border border-outline-variant rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant">联系电话 (Required)</label>
                <input
                  type="tel"
                  required
                  placeholder="手机号"
                  value={formInput.phone}
                  onChange={e => setFormInput(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full h-10 px-3 text-xs bg-white border border-outline-variant rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-primary text-white font-bold rounded-xl text-xs hover:opacity-90 active:scale-95 transition-transform cursor-pointer shadow-sm"
            >
              提交在线咨询
            </button>
          </form>

          {/* Success Prompt */}
          <AnimatePresence>
            {formSuccess && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-xl text-xs space-y-1 text-center"
              >
                <p className="font-bold flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  意向提交成功！
                </p>
                <p className="opacity-95 text-[11px]">我们将在24小时内尽快回复您的留言沟通。感谢信赖！</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Historical consultations (Local Only) */}
        {consultations.length > 0 && (
          <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/30 space-y-3">
            <div className="flex justify-between items-center text-xs pb-1.5 border-b border-outline-variant/30">
              <span className="font-bold text-on-surface-variant">您的咨询记录 (My Consultations)</span>
              <button 
                onClick={() => {
                  setConsultations([]);
                  localStorage.removeItem('little_sun_consultations');
                }}
                className="text-red-600 underline font-semibold select-none"
              >
                清空记录
              </button>
            </div>
            
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {consultations.map((item) => (
                <div key={item.id} className="bg-white p-3 rounded-xl border border-surface-container space-y-1 shadow-xs text-xs">
                  <div className="flex justify-between items-center font-bold text-primary">
                    <span>{item.subject}</span>
                    <span className="text-[10px] text-on-surface-variant font-normal">{item.createdAt.split(' ')[0]}</span>
                  </div>
                  <p className="text-on-surface-variant text-[11px] leading-relaxed italic">
                    “{item.content}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
