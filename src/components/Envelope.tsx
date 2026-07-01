import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import sealImg from "../assets/images/seal.png";

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope(props: EnvelopeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleOpenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isClicked) return;
    setIsClicked(true);
    // Directly transition to the main invitation cover page after flap opening animation (0.55s)
    setTimeout(() => {
      props.onOpen();
    }, 550);
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-[#12110f] z-50 select-none p-0 sm:p-6 md:p-8"
      id="envelope-root-container"
      onClick={handleOpenClick}
    >
      {/* Desktop Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_80%)] pointer-events-none" />

      {/* Main Responsive Envelope Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.05, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full sm:h-[85vh] sm:max-w-md sm:rounded-3xl sm:shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-0 sm:border border-[#c5a059]/20 overflow-hidden bg-[#fcf9f4] flex flex-col justify-between transition-all cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle repeating pattern of elegant flowers in the background */}
        <div 
          className="absolute inset-0 opacity-[0.09] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23c5a059' stroke-width='0.6' stroke-opacity='0.5'%3E%3Ccircle cx='30' cy='30' r='2' fill='%23c5a059' fill-opacity='0.2'/%3E%3Cpath d='M30,30 C27,20 33,20 30,14 C27,20 33,20 30,30'/%3E%3Cpath d='M30,30 C27,40 33,40 30,46 C27,40 33,40 30,30'/%3E%3Cpath d='M30,30 C20,27 20,33 14,30 C20,27 20,33 30,30'/%3E%3Cpath d='M30,30 C40,27 40,33 46,30 C40,27 40,33 30,30'/%3E%3Cpath d='M30,30 C21,21 27,15 19,19 C27,15 21,21 30,30'/%3E%3Cpath d='M30,30 C39,39 33,45 41,41 C33,45 39,39 30,30'/%3E%3Cpath d='M30,30 C21,39 27,45 19,41 C27,45 21,39 30,30'/%3E%3Cpath d='M30,30 C39,21 33,15 41,19 C33,15 39,21 30,30'/%3E%3Ccircle cx='5' cy='5' r='1' fill='%23c5a059' fill-opacity='0.15'/%3E%3Ccircle cx='55' cy='5' r='1' fill='%23c5a059' fill-opacity='0.15'/%3E%3Ccircle cx='5' cy='55' r='1' fill='%23c5a059' fill-opacity='0.15'/%3E%3Ccircle cx='55' cy='55' r='1' fill='%23c5a059' fill-opacity='0.15'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Gold Borders and Minimalist Ornaments */}
        <div className="absolute inset-4 sm:inset-5 pointer-events-none z-10">
          {/* Subtle thin gold inner rect border */}
          <div className="absolute inset-2 border border-[#c5a059]/25 rounded-2xl">
            <div className="absolute inset-0.5 border border-dashed border-[#c5a059]/15 rounded-xl" />
            
            {/* Minimalist corner line-art ornaments (clean & elegant) */}
            {/* Top-Left */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#c5a059]/35 rounded-tl-sm" />
            <div className="absolute top-3.5 left-3.5 w-1.5 h-1.5 border-t border-l border-[#c5a059]/20 rounded-tl-xs" />
            
            {/* Top-Right */}
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#c5a059]/35 rounded-tr-sm" />
            <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 border-t border-r border-[#c5a059]/20 rounded-tr-xs" />
            
            {/* Bottom-Left */}
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#c5a059]/35 rounded-bl-sm" />
            <div className="absolute bottom-3.5 left-3.5 w-1.5 h-1.5 border-b border-l border-[#c5a059]/20 rounded-bl-xs" />
            
            {/* Bottom-Right */}
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#c5a059]/35 rounded-br-sm" />
            <div className="absolute bottom-3.5 right-3.5 w-1.5 h-1.5 border-b border-r border-[#c5a059]/20 rounded-br-xs" />

            {/* Delicate minimalist celestial motif in the bottom center */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-90">
              {/* Hashtag in the same elegant burgundy red as the wax seal */}
              <p className="font-[Georgia,serif] italic text-[#66121f] text-sm sm:text-base font-bold tracking-wide mb-3">
                #ShriyaTookTheSubWay
              </p>
              
              {/* Ultra-fine horizontal line with 3 central diamonds/stars */}
              <div className="flex items-center space-x-3 w-32 sm:w-40">
                <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-[#c5a059]/40" />
                <div className="flex items-center space-x-1.5">
                  <svg width="6" height="6" viewBox="0 0 24 24" fill="none" className="text-[#c5a059]/60">
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="currentColor" />
                  </svg>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-[#c5a059]">
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="currentColor" />
                  </svg>
                  <svg width="6" height="6" viewBox="0 0 24 24" fill="none" className="text-[#c5a059]/60">
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="currentColor" />
                  </svg>
                </div>
                <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-[#c5a059]/40" />
              </div>
            </div>
          </div>
        </div>

        {/* 3D Envelope Flap Wrapper with perspective covering full height */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{ perspective: "1200px" }}
        >
          {/* 2. TOP V-SHAPE FLAP with realistic drop shadow */}
          <motion.div
            id="envelope-top-flap"
            style={{ 
              clipPath: "polygon(0% 0%, 100% 0%, 100% 33%, 50% 55%, 0% 33%)", 
              transformOrigin: "top",
              transformStyle: "preserve-3d"
            }}
            animate={
              isClicked 
                ? { rotateX: -140, opacity: 0, scaleY: 0.95, y: "-10%" } 
                : { rotateX: 0, opacity: 1, scaleY: 1, y: 0 }
            }
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 bg-[#fbf9f4] border-b border-[#c5a059]/20 shadow-[0_8px_16px_rgba(0,0,0,0.06)] flex items-center justify-center"
          >
            {/* Repeating flower pattern on the top flap */}
            <div 
              className="absolute inset-0 opacity-[0.09] pointer-events-none mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23c5a059' stroke-width='0.6' stroke-opacity='0.5'%3E%3Ccircle cx='30' cy='30' r='2' fill='%23c5a059' fill-opacity='0.2'/%3E%3Cpath d='M30,30 C27,20 33,20 30,14 C27,20 33,20 30,30'/%3E%3Cpath d='M30,30 C27,40 33,40 30,46 C27,40 33,40 30,30'/%3E%3Cpath d='M30,30 C20,27 20,33 14,30 C20,27 20,33 30,30'/%3E%3Cpath d='M30,30 C40,27 40,33 46,30 C40,27 40,33 30,30'/%3E%3Cpath d='M30,30 C21,21 27,15 19,19 C27,15 21,21 30,30'/%3E%3Cpath d='M30,30 C39,39 33,45 41,41 C33,45 39,39 30,30'/%3E%3Cpath d='M30,30 C21,39 27,45 19,41 C27,45 21,39 30,30'/%3E%3Cpath d='M30,30 C39,21 33,15 41,19 C33,15 39,21 30,30'/%3E%3Ccircle cx='5' cy='5' r='1' fill='%23c5a059' fill-opacity='0.15'/%3E%3Ccircle cx='55' cy='5' r='1' fill='%23c5a059' fill-opacity='0.15'/%3E%3Ccircle cx='5' cy='55' r='1' fill='%23c5a059' fill-opacity='0.15'/%3E%3Ccircle cx='55' cy='55' r='1' fill='%23c5a059' fill-opacity='0.15'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />

            {/* Gold Borders and Minimalist Ornaments on the Top Flap */}
            <div className="absolute inset-4 sm:inset-5 pointer-events-none z-0">
              <div className="absolute inset-2 border border-[#c5a059]/25 rounded-2xl">
                <div className="absolute inset-0.5 border border-dashed border-[#c5a059]/15 rounded-xl" />
                
                {/* Minimalist corner line-art ornaments (clean & elegant) */}
                {/* Top-Left */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#c5a059]/35 rounded-tl-sm" />
                <div className="absolute top-3.5 left-3.5 w-1.5 h-1.5 border-t border-l border-[#c5a059]/20 rounded-tl-xs" />
                
                {/* Top-Right */}
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#c5a059]/35 rounded-tr-sm" />
                <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 border-t border-r border-[#c5a059]/20 rounded-tr-xs" />
              </div>
            </div>

            {/* Elegant cursive "You are Invited" text in the top half */}
            <div className="absolute top-[14%] sm:top-[17%] left-0 right-0 text-center z-10">
              <p className="font-cursive text-[#66121f] text-3xl sm:text-4xl md:text-[2.6rem] font-light tracking-wide leading-none select-none opacity-90">
                You are Invited
              </p>
            </div>

            {/* Elegant V-Flap Border (single gold edge with CSS shadow) */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
              <path 
                d="M 0 33 L 50 55 L 100 33" 
                stroke="#c5a059" 
                strokeWidth="0.8" 
                fill="none" 
                opacity="0.9" 
                style={{ filter: "drop-shadow(0px 1px 1.5px rgba(0, 0, 0, 0.55))" }}
              />
            </svg>
          </motion.div>
        </div>

        {/* 3. WAX SEAL centered exactly at the tip (50%, 55%) of the flap */}
<div className="absolute inset-0 flex items-start justify-center z-30 pointer-events-none">
  <div 
    className="absolute flex items-center justify-center"
    style={{ top: "55%", left: "50%", transform: "translate(-50%, -50%)" }}
  >
    <motion.div 
      id="envelope-wax-seal"
      animate={
        isClicked 
          ? { scale: 0.4, opacity: 0, rotate: -35, y: -80 } 
          : isHovered 
          ? { scale: 1.1, rotate: 5, y: 0 } 
          : { scale: 1, rotate: 0, y: 0 }
      }
      transition={
        isClicked
          ? { duration: 0.45, ease: "easeOut" }
          : { type: "spring", stiffness: 180, damping: 14 }
      }
      className="w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center pointer-events-auto cursor-pointer relative"
      style={{
        filter: isHovered 
          ? "drop-shadow(0 14px 20px rgba(65, 50, 35, 0.45))" 
          : "drop-shadow(0 8px 12px rgba(65, 50, 35, 0.35))"
      }}
    >
      <img 
        src={sealImg} 
        alt="Shriya & Subramanian Monogram" 
        style={{ width: "120%", height: "120%" }} 
        className="absolute inset-0 m-auto object-contain opacity-100 pointer-events-none select-none transition-transform duration-300"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  </div>
</div>

        {/* Elegant footer indicator */}
        <div className="absolute bottom-7 sm:bottom-8.5 inset-x-0 text-center z-10 pointer-events-none">
          <motion.p
            animate={isClicked ? { opacity: 0, scale: 0.8 } : { opacity: [0.8, 1, 0.8], scale: [0.93, 1.07, 0.93] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-[11px] sm:text-xs text-[#c5a059] font-sans font-light tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
          >
            Click on the seal to open the envelope
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
