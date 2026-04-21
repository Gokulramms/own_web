import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: "SGR"
    // Stage 1: "Smart Generative Reality"
    // Stage 2: "S GOKULRAMM"
    
    const timers = [
      setTimeout(() => setStage(1), 1500),
      setTimeout(() => setStage(2), 3500),
      setTimeout(() => setStage(3), 5500),
      setTimeout(() => onComplete(), 6500)
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 3 && (
        <motion.div 
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100vh", opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[#0A0A02] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
          
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.h1 
                key="stage0"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: {duration: 0.5} }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-oswald text-[15vw] font-black text-[#D4AF37] uppercase tracking-widest"
              >
                SGR
              </motion.h1>
            )}

            {stage === 1 && (
              <motion.h2 
                key="stage1"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -50, filter: "blur(10px)", transition: {duration: 0.5} }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-body text-2xl md:text-5xl font-light text-white uppercase tracking-[0.5em] text-center"
              >
                Smart Generative <br/> <span className="text-[#D4AF37] font-bold">Reality</span>
              </motion.h2>
            )}

            {stage === 2 && (
              <motion.div 
                key="stage2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)", transition: {duration: 0.8} }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center gap-4"
              >
                <h1 className="font-oswald text-[8vw] font-black text-white uppercase tracking-tighter mix-blend-exclusion z-10 relative">
                  S GOKULRAMM
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "100%" }} 
                    transition={{ duration: 1.5, delay: 0.2, ease: "circInOut" }}
                    className="absolute top-1/2 left-0 h-[2px] bg-[#D4AF37] z-20"
                  />
                </h1>
                <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4AF37]">SYSTEM INITIATED</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gold Progress Bar */}
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5.5, ease: "linear" }}
            className="absolute bottom-0 left-0 h-1 bg-[#D4AF37]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
