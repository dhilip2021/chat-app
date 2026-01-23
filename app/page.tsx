'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

const SplashScreen: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // 3 seconds delay
    const timer = setTimeout(() => {
      router.push('/gender');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    /**
     * fixed & inset-0: Screen-ah lock panni full view-la fix pannum.
     * h-screen & w-screen: Extra space illama exact-ah fit aagum.
     * overflow-hidden: Scroll aagatha maathiri lock pannum.
     */
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center bg-[#0f172a] text-white overflow-hidden touch-none select-none">
      
      <div className="relative flex flex-col items-center">
        
        {/* Logo Container - Object-fit focus */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px]"
        >
          {/* Subtle Glow */}
          <div className="absolute inset-0 blur-[40px] bg-blue-500/20 rounded-full"></div>
          
          <Image
            src="/images/logo.png"
            alt="Chatoo Logo"
            fill
            priority
            sizes="(max-width: 768px) 120px, 160px"
            className="object-contain" // Preserves original logo aspect ratio
          />
        </motion.div>

        {/* Text Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-center"
        >
          <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Chatoo
          </h1>
          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.3em] text-blue-400/70">
            Smart Chat • Voice • Video
          </p>
        </motion.div>

        {/* Realistic Loading Bar */}
        <div className="mt-12 w-32 h-[2px] bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2.5, 
              ease: "easeInOut" 
            }}
            className="h-full bg-blue-500"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-10">
         <p className="text-[9px] text-gray-500 uppercase tracking-widest font-medium opacity-50">
           © 2026 Chatoo Inc.
         </p>
      </div>
    </div>
  );
};

export default SplashScreen;