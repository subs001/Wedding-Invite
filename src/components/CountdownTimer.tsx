import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    // August 30, 2026 at 07:30 AM (months are 0-indexed in JS, so August is 7)
    const weddingDate = new Date(2026, 7, 30, 7, 30, 0).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isCompleted: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  const timerItems = [
    { label: "DAYS", value: formatNumber(timeLeft.days) },
    { label: "HOURS", value: formatNumber(timeLeft.hours) },
    { label: "MINS", value: formatNumber(timeLeft.minutes) },
    { label: "SECS", value: formatNumber(timeLeft.seconds) },
  ];

  if (timeLeft.isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto my-6 px-6 py-4 rounded-2xl bg-[#500a15]/30 border border-[#c5a059]/50 text-center flex items-center justify-center space-x-3 shadow-xs"
        id="countdown-completed-banner"
      >
        <Sparkles className="w-5 h-5 text-[#f1d092] animate-pulse" />
        <span className="font-serif text-sm tracking-[0.15em] font-bold text-[#f1d092] uppercase animate-pulse">
          The Wedding Celebration is Live ✨
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-md mx-auto my-6 p-5 rounded-2xl bg-[#40050d]/40 relative overflow-hidden shadow-xs"
      id="countdown-timer-container"
    >
      {/* Decorative floral accent background or ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_80%)] pointer-events-none" />

      <p className="text-center text-[10px] tracking-[0.25em] text-[#eae2ca]/80 font-sans font-bold uppercase mb-4">
        COUNTDOWN TO THE CELEBRATION
      </p>

      <div className="grid grid-cols-4 gap-2 md:gap-4 relative z-10">
        {timerItems.map((item, idx) => (
          <div key={item.label} className="flex flex-col items-center relative">
            <div className="w-full py-2 bg-[#500a15]/80 rounded-xl border border-[#c5a059]/35 flex items-center justify-center shadow-2xs">
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#f1d092]">
                {item.value}
              </span>
            </div>
            <span className="text-[9px] text-[#eae2ca]/70 tracking-[0.15em] font-sans font-bold mt-2">
              {item.label}
            </span>

            {/* Separator dot */}
            {idx < 3 && (
              <span className="absolute top-1/3 -right-2 md:-right-3 text-[#c5a059] opacity-60 font-bold hidden xs:inline select-none animate-pulse">
                •
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
