import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Heart, Calendar, MapPin, Music, Volume2, VolumeX, 
  ChevronRight, ChevronLeft, Bell, Sparkles, Star, Flame, MailOpen
} from "lucide-react";
import { 
  BRIDE_NAME, GROOM_NAME, VENUE_NAME, VENUE_LOCATION, 
  WEDDING_DATES, WEDDING_EVENTS 
} from "../data";
import { WeddingEvent } from "../types";
import { WeddingAudio } from "../utils/audio";
import CountdownTimer from "./CountdownTimer";

const CALENDAR_URL_DAY1 = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shriya+%26+Subramanian+Wedding+-+Day+1&dates=20260830T020000Z/20260830T183000Z&details=Haldi+Ceremony%2C+Janavasam%2C+Engagement%2C+and+Sangeet+Night.+Join+us+for+an+elegant+celebration%21&location=Muhurat+Resort%2C+Raipur%2C+Chhattisgarh";
const CALENDAR_URL_DAY2 = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shriya+%26+Subramanian+Wedding+-+Day+2&dates=20260831T030000Z/20260831T180000Z&details=Muhurtham+followed+by+the+Reception.+Join+us+for+blessings+and+celebration%21&location=Muhurat+Resort%2C+Raipur%2C+Chhattisgarh";
const CALENDAR_URL_BOTH = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shriya+%26+Subramanian+Wedding+Celebrations&dates=20260830T020000Z/20260831T180000Z&details=You+are+cordially+invited+to+the+celebrations+of+Shriya+weds+Subramanian.+Haldi%2C+Janavasam%2C+Engagement%2C+Sangeet+on+Aug+30+%26+Muhurtham%2C+Reception+on+Aug+31.&location=Muhurat+Resort%2C+Raipur%2C+Chhattisgarh";

function ScrollLeftToRightSection({ 
  children, 
  id, 
  className 
}: { 
  children: React.ReactNode; 
  id?: string; 
  className?: string; 
  key?: React.Key;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 0.15"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={containerRef}
      id={id}
      style={{ x, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function InvitationMain() {
  const isPlaying = false;
  
  // Filter events into Day 1 and Day 2 groupings
  const day1Events = WEDDING_EVENTS.filter((e) => 
    ["haldi", "janavasam", "engagement", "sangeet"].includes(e.id)
  );
  const day2Events = WEDDING_EVENTS.filter((e) => 
    ["kalyanam", "reception"].includes(e.id)
  );

  const [activeTab, setActiveTab] = useState<number>(-1); // -1 means Cover page
  const [funCounter, setFunCounter] = useState<number>(0);
  
  // Ref to track if smooth scrolling is currently active to prevent IntersectObserver feedback loops
  const isScrollingRef = useRef(false);

  // Calendar Dropdown state
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  // RSVP Form States
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Interactive Particles State for Haldi / Kalyanam / Sparklers
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; rotate: number; type: string; color: string }[]>([]);
  const particleIdRef = useRef(0);

  // Engagement Ring game state
  const [ringsMerged, setRingsMerged] = useState(false);

  // Janvasam car drive state
  const [carDriving, setCarDriving] = useState(false);

  // Diya lighting states
  const [diyas, setDiyas] = useState<boolean[]>([true, false, true]);

  // Play page transitions sound effect and handle scrolling to designated ceremony
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    isScrollingRef.current = true;
    setTimeout(() => {
      let element: HTMLElement | null = null;
      if (index === -1) {
        element = document.getElementById("cover-card-view");
      } else if (index === 2) {
        element = document.getElementById("rsvp-page-container");
      } else if (index === 0) {
        element = document.getElementById("ceremony-section-day1");
      } else if (index === 1) {
        element = document.getElementById("ceremony-section-day2");
      }
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }, 50);
  };

  // Helper to map event ID to corresponding premium custom golden icon
  const getCustomTimelineIcon = (id: string) => {
    switch (id) {
      case "haldi":
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#b08d48] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Bowl with turmeric powder */}
            <path d="M4 11c0 5 4 8 8 8s8-3 8-8H4z" fill="currentColor" fillOpacity="0.15" />
            <path d="M8 19.5h8" strokeWidth="2" />
            <path d="M6 11h12" />
            <path d="M6 11c1-2.5 3-4 6-4s5 1.5 6 4" fill="currentColor" fillOpacity="0.3" />
          </svg>
        );
      case "janavasam":
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#b08d48] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Two interlocking wedding rings */}
            <circle cx="8.5" cy="13.5" r="4.5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="14.5" cy="11.5" r="4.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M14.5 5L16 6.5L14.5 8L13 6.5Z" fill="currentColor" />
            <path d="M8 7.5l.5.5M11 6l-.5.5" />
          </svg>
        );
      case "sangeet":
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#b08d48] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Music note symbol */}
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" fill="currentColor" fillOpacity="0.25" />
            <circle cx="18" cy="16" r="3" fill="currentColor" fillOpacity="0.25" />
            <path d="M12 10l1 1M5 10l.8.8M20 7l-.8.8" />
          </svg>
        );
      case "kalyanam":
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#b08d48] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Standalone Sacred Havan Kund (Fire Altar) */}
            {/* Base Layer 1 - Broadest */}
            <path d="M 3 21 L 21 21 L 19 18 L 5 18 Z" fill="currentColor" fillOpacity="0.1" />
            <path d="M 3 21 L 21 21" strokeWidth="1.2" />
            <path d="M 5 18 L 19 18" strokeWidth="1.2" />

            {/* Base Layer 2 - Middle Step */}
            <path d="M 5 18 L 19 18 L 17.5 15 L 6.5 15 Z" fill="currentColor" fillOpacity="0.2" />
            <path d="M 6.5 15 L 17.5 15" strokeWidth="1.2" />

            {/* Base Layer 3 - Rim */}
            <path d="M 6.5 15 L 17.5 15 L 16 13 L 8 13 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.2" />
            
            {/* Elegant Side Handles */}
            <path d="M 5 18 C 3.5 18, 3 17, 3 16 C 3 15, 4 15.5, 5 15.5" strokeWidth="1.2" />
            <path d="M 19 18 C 20.5 18, 21 17, 21 16 C 21 15, 20 15.5, 19 15.5" strokeWidth="1.2" />

            {/* Crossed Firewood Logs */}
            <path d="M 8.5 14 L 15.5 11.5" strokeWidth="1.5" />
            <path d="M 15.5 14 L 8.5 11.5" strokeWidth="1.5" />
            
            {/* Rich multi-layered Sacred Fire Flames rising tall and centered */}
            {/* Outer Flame */}
            <path d="M 12 2.5 C 8.5 6.5, 7.5 9.5, 12 13 C 16.5 9.5, 15.5 6.5, 12 2.5 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />
            {/* Inner Flame Core */}
            <path d="M 12 5 C 9.5 8, 9.5 10.5, 12 13 C 14.5 10.5, 14.5 8, 12 5 Z" fill="currentColor" fillOpacity="0.45" />
            {/* Left Flame lick */}
            <path d="M 10 7.5 C 8.5 9, 9 10.5, 11 11" strokeWidth="1.2" />
            {/* Right Flame lick */}
            <path d="M 14 7.5 C 15.5 9, 15 10.5, 13 11" strokeWidth="1.2" />
          </svg>
        );
      case "reception":
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#b08d48] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Party ball cord and cap */}
            <path d="M 12 2 L 12 5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M 10.5 5 L 13.5 5" stroke="currentColor" strokeWidth="1.5" />
            
            {/* Main Disco Ball */}
            <circle cx="12" cy="11" r="5.5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
            
            {/* Grid lines of the party ball */}
            <path d="M 6.5 11 C 9 13.5, 15 13.5, 17.5 11" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            <path d="M 7 9 C 9 11, 15 11, 17 9" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            <path d="M 7 13 C 9 15, 15 15, 17 13" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            <path d="M 12 5.5 C 10 9, 10 13, 12 16.5" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            <path d="M 12 5.5 C 14 9, 14 13, 12 16.5" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            
            {/* Four-pointed sparkles surrounding the party ball */}
            {/* Top-left sparkle */}
            <path d="M 5 5 C 5 4, 5 4, 4 4 C 5 4, 5 4, 5 3 C 5 4, 5 4, 6 4 C 5 4, 5 4, 5 5 Z" fill="currentColor" stroke="none" />
            {/* Top-right sparkle */}
            <path d="M 19 6 C 19 5, 19 5, 18 5 C 19 5, 19 5, 19 4 C 19 5, 19 5, 20 5 C 19 5, 19 5, 19 6 Z" fill="currentColor" stroke="none" />
            {/* Bottom-left sparkle */}
            <path d="M 5 17 C 5 16, 5 16, 4 16 C 5 16, 5 16, 5 15 C 5 16, 5 16, 6 16 C 5 16, 5 16, 5 17 Z" fill="currentColor" stroke="none" />
            {/* Bottom-right sparkle */}
            <path d="M 19 16 C 19 15, 19 15, 18 15 C 19 15, 19 15, 19 14 C 19 15, 19 15, 20 15 C 19 15, 19 15, 19 16 Z" fill="currentColor" stroke="none" />
            
            {/* Miniature ambient circular stars */}
            <circle cx="8" cy="3.5" r="0.5" fill="currentColor" stroke="none" />
            <circle cx="16" cy="18" r="0.5" fill="currentColor" stroke="none" strokeWidth="0" />
            <circle cx="3" cy="10" r="0.4" fill="currentColor" stroke="none" strokeWidth="0" />
            <circle cx="21" cy="11" r="0.4" fill="currentColor" stroke="none" strokeWidth="0" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#b08d48]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
    }
  };

  // Synchronize scroll position with active indicators
  useEffect(() => {
    // Scroll to the very top immediately on mount
    window.scrollTo({ top: 0, left: 0 });

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -45% 0px", // Trigger when the element is centered in the viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          if (targetId === "cover-card-view") {
            setActiveTab(-1);
          } else if (targetId === "rsvp-page-container") {
            setActiveTab(2);
          } else if (targetId === "ceremony-section-day1") {
            setActiveTab(0);
          } else if (targetId === "ceremony-section-day2") {
            setActiveTab(1);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const coverEl = document.getElementById("cover-card-view");
    if (coverEl) observer.observe(coverEl);

    const day1El = document.getElementById("ceremony-section-day1");
    if (day1El) observer.observe(day1El);

    const day2El = document.getElementById("ceremony-section-day2");
    if (day2El) observer.observe(day2El);

    const rsvpEl = document.getElementById("rsvp-page-container");
    if (rsvpEl) observer.observe(rsvpEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Helper to spawn floating particles (flowers/rice/sparklers)
  const spawnParticles = (type: "marigold" | "rice" | "spark", count = 12) => {
    const newItems = Array.from({ length: count }).map(() => {
      const id = particleIdRef.current++;
      // Random coordinates & specs
      const startX = Math.random() * 80 + 10; // percentage
      const angle = Math.random() * 360;
      const sizeList = {
        marigold: ["#E68C60", "#F9E7B9", "#db662c", "#ff9d00"][Math.floor(Math.random() * 4)],
        rice: ["#ffe89c", "#ffffff", "#FFF9C4"][Math.floor(Math.random() * 3)],
        spark: ["#FFF9C4", "#FFEB3B", "#FF5722", "#E68C60"][Math.floor(Math.random() * 4)]
      };
      return {
        id,
        x: startX,
        y: type === "spark" ? Math.random() * 60 + 20 : -10, // vertical starting point
        rotate: angle,
        type,
        color: sizeList[type]
      };
    });

    setParticles((prev) => [...prev, ...newItems]);
    setFunCounter((prev) => prev + count);

    // Fade and delete from state to keep heap clean
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newItems.some((n) => n.id === p.id)));
    }, 3200);
  };

  // Sparkler trailing cursor effect tracker
  const handleSparklerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const id = particleIdRef.current++;
    const colors = ["#F9E7B9", "#E68C60", "#FFD700", "#FFF"];
    const newSpark = {
      id,
      x,
      y,
      rotate: Math.random() * 360,
      type: "spark",
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setParticles((prev) => [...prev, newSpark]);
    if (isPlaying && id % 8 === 0) {
      WeddingAudio.playMohanamNote(0.2);
    }

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1200);
  };

  const handleRingMerge = () => {
    if (ringsMerged) return;
    setRingsMerged(true);
    if (isPlaying) {
      WeddingAudio.playTempleBell(0.6);
    }
    spawnParticles("spark", 24);
  };

  const runCarProcession = () => {
    if (carDriving) return;
    setCarDriving(true);
    if (isPlaying) {
      WeddingAudio.playDholBeat("treble");
      // sound double beep!
      setTimeout(() => WeddingAudio.playDholBeat("bass"), 150);
    }
    setTimeout(() => setCarDriving(false), 3000);
  };

  const ringTempleBell = () => {
    spawnParticles("rice", 20);
  };

  const playSangeetBeat = (type: "bass" | "treble") => {
    if (isPlaying) {
      WeddingAudio.playDholBeat(type);
    }
  };

  // Auto clean audio on unmount
  useEffect(() => {
    return () => {
      WeddingAudio.toggleDrone(false);
    };
  }, []);

  return (
    <div 
      className="min-h-screen relative flex flex-col font-sans select-none overflow-x-hidden text-stone-800 bg-[#fcf9f4]"
      id="invitation-main-root"
    >
      {/* Background and particles removed for a completely clean look */}

      {/* Primary Content Window */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 pt-6 pb-[10vh] md:pt-12 md:pb-[15vh] z-10 gap-12 md:gap-16" id="main-ceremony-renderer">
        {/* Section 1: Welcome Cover / Invitation Card Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          id="cover-card-view"
          className="bg-[#540b17] rounded-3xl py-8 px-4 sm:py-10 sm:px-6 md:py-12 md:px-8 text-center text-[#eae2ca] relative overflow-hidden shadow-xl flex flex-col items-center justify-between min-h-[75vh] md:min-h-[580px] max-h-[90vh]"
        >
          {/* Inner Decorative Beige Border Inside the Section */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#fcf9f4]/30 rounded-[20px] pointer-events-none z-10" />

          {/* Section 1: Header (Everything till the names of the bride and groom) */}
          <div className="w-full flex flex-col items-center justify-center space-y-1 md:space-y-2 p-4">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#f1d092] tracking-[0.3em] text-[10px] md:text-[11px] font-sans font-semibold uppercase"
            >
              Together with our families
            </motion.p>

            <h2 className="font-serif text-[#eae2ca] text-xs sm:text-sm md:text-base tracking-[0.15em] uppercase font-medium">
              We Invite You to Celebrate
            </h2>
            <h3 className="font-serif text-[#eae2ca]/70 text-[9px] sm:text-[10px] tracking-[0.08em] uppercase">
              The Auspicious Wedding Ceremony Of
            </h3>
          </div>

          {/* Section 2: Main Text (Emphasized Bride and Groom names) */}
          <div className="w-full py-4 md:py-6 flex flex-col items-center justify-center">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-8 px-2 w-full">
              <div className="max-w-xs md:max-w-none">
                <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#f1d092] leading-tight font-bold tracking-wide break-words drop-shadow-md">
                  {BRIDE_NAME}
                </h1>
                <p className="text-[9px] xs:text-[10px] tracking-[0.12em] font-sans text-[#eae2ca]/80 uppercase mt-1.5 font-bold">D/O Smt. Seema Rathor & Shri Krishna Rathor</p>
              </div>
              
              <div className="font-cursive text-3xl sm:text-4xl text-[#dfba73] py-1 md:py-0 select-none">&amp;</div>
              
              <div className="max-w-xs md:max-w-none">
                <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#f1d092] leading-tight font-bold tracking-wide break-words drop-shadow-md">
                  {GROOM_NAME}
                </h1>
                <p className="text-[9px] xs:text-[10px] tracking-[0.12em] font-sans text-[#eae2ca]/80 uppercase mt-1.5 font-bold">S/O Smt. Chitra V & Shri Venkittanarayanan S</p>
              </div>
            </div>
          </div>

          {/* Section 3: Event Details (Similar visual footprint to Section 1) */}
          <div className="w-full max-w-lg z-20 py-1 sm:py-2 px-2 sm:px-4">
            <div className="grid grid-cols-2 text-center items-stretch w-full">
              <div className="relative flex flex-col items-center justify-center px-1">
                <button
                  onClick={() => setShowCalendarMenu(!showCalendarMenu)}
                  className="flex flex-col items-center justify-center hover:bg-[#c5a059]/10 p-1.5 sm:p-2 rounded-xl transition-all cursor-pointer group w-full"
                  title="Add to Google Calendar"
                  id="calendar-add-btn"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#f1d092] mb-1 group-hover:scale-110 transition-transform" />
                  <span className="font-serif text-[10px] sm:text-xs md:text-sm text-[#eae2ca] font-bold group-hover:text-[#f3cd85] transition-colors line-clamp-1">{WEDDING_DATES} ↗</span>
                </button>

                {showCalendarMenu && (
                  <div className="absolute top-full mt-2 w-48 bg-[#450711] border border-[#c5a059]/50 rounded-xl shadow-lg z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="text-[9px] text-[#eae2ca]/60 tracking-[0.1em] text-center font-bold uppercase pb-1 border-b border-stone-800 mb-1">
                      Add to Calendar
                    </p>
                    <a
                      href={CALENDAR_URL_DAY1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 py-1.5 text-[10px] text-[#eae2ca] hover:bg-[#c5a059]/15 font-medium transition-colors"
                      onClick={() => setShowCalendarMenu(false)}
                    >
                      <span>🗓️</span>
                      <span>Day 1 (Aug 30)</span>
                    </a>
                    <a
                      href={CALENDAR_URL_DAY2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 py-1.5 text-[10px] text-[#eae2ca] hover:bg-[#c5a059]/15 font-medium transition-colors"
                      onClick={() => setShowCalendarMenu(false)}
                    >
                      <span>🗓️</span>
                      <span>Day 2 (Aug 31)</span>
                    </a>
                    <a
                      href={CALENDAR_URL_BOTH}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 py-1.5 text-[10px] text-[#f1d092] hover:bg-[#c5a059]/15 font-bold transition-colors"
                      onClick={() => setShowCalendarMenu(false)}
                    >
                      <span>✨</span>
                      <span>Both Days</span>
                    </a>
                  </div>
                )}
              </div>
              
              <div className="px-1 flex flex-col items-center justify-center">
                <a
                  href="https://maps.app.goo.gl/bkb4YwJYpZXz6XaE8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center hover:bg-[#c5a059]/10 p-1.5 sm:p-2 rounded-xl transition-all cursor-pointer group w-full"
                  title="Open in Google Maps"
                  id="venue-link-map"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#f1d092] mb-1 group-hover:scale-110 transition-transform" />
                  <span className="font-serif text-[10px] sm:text-xs md:text-sm text-[#eae2ca] font-bold group-hover:text-[#f3cd85] transition-colors line-clamp-1">{VENUE_NAME} ↗</span>
                  <span className="text-[8px] sm:text-[9px] text-[#eae2ca]/70 font-semibold line-clamp-1">{VENUE_LOCATION}</span>
                </a>
              </div>
            </div>

            {/* Split section underlines, perfectly center-aligned and taking up exactly 80% width */}
            <div className="grid grid-cols-2 w-full mt-3.5">
              <div className="flex justify-center w-full">
                <div className="w-4/5 h-[1px] bg-[#c5a059]/40 animate-pulse" />
              </div>
              <div className="flex justify-center w-full">
                <div className="w-4/5 h-[1px] bg-[#c5a059]/40 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Section 4: Countdown Timer */}
          <div className="w-full">
            <CountdownTimer />
          </div>

          <p className="text-[10px] tracking-[0.3em] text-[#c5a059] font-sans mt-1 font-semibold select-none">
            ✦ ✦ ✦
          </p>
        </motion.div>

        {/* Section 2: Scrollable Itinerary list showing all events sequentially */}
        <div className="w-full flex flex-col space-y-12 md:space-y-12" id="itinerary-scrollable-container">
          
          {/* Day 1 - Aug 30th Card */}
          <ScrollLeftToRightSection
            id="ceremony-section-day1"
            className={`bg-white border rounded-3xl overflow-hidden shadow-xl flex flex-col w-full min-h-0 md:min-h-[500px] transition-[border-color,box-shadow] duration-500 scroll-mt-24 ${
              activeTab === 0 
                ? "border-[#c5a059] ring-2 ring-[#c5a059]/20 shadow-2xl scale-[1.01]" 
                : "border-[#c5a059]/20 opacity-95 shadow-md"
            }`}
          >
            {/* Day 1 Header */}
            <div className="bg-gradient-to-r from-[#540b17] to-[#450711] text-[#eae2ca] py-5 px-6 md:px-8 flex flex-col items-center justify-center border-b border-[#c5a059]/30 relative text-center">
              <div className="absolute inset-1 border border-[#eae2ca]/10 rounded-2xl pointer-events-none" />
              <span className="font-sans text-[10px] tracking-[0.25em] font-extrabold text-[#f1d092] uppercase">Sunday</span>
              <h3 className="font-serif text-lg md:text-xl font-bold tracking-wide">Day 1 — August 30, 2026</h3>
            </div>

            {/* Day 1 Events list */}
            <div className="w-full p-6 md:p-10 flex flex-col justify-between text-stone-800 relative bg-white flex-1">
              {/* Vertical timeline of events with spacious padding for new custom icons */}
              <div className="relative pl-10 md:pl-14 border-l border-[#c5a059]/30 flex flex-col gap-12 sm:gap-14">
                {day1Events.map((event) => (
                  <div key={event.id} className="relative group text-left">
                    {/* Golden custom icon indicator */}
                    <div className="absolute -left-10 md:-left-14 -translate-x-1/2 top-0.5 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#c5a059]/30 bg-[#faf8f5] flex items-center justify-center shadow-xs group-hover:border-[#b08d48] transition-all duration-300 z-10">
                      {getCustomTimelineIcon(event.id)}
                    </div>

                    <div className="border-b border-stone-100 pb-6 last:border-0 last:pb-0 text-left">
                      {/* Text Details */}
                      <div>
                        <div className="mb-3">
                          <h4 className="font-serif text-[#b08d48] text-lg font-bold tracking-wide uppercase leading-tight">
                            {event.title}
                          </h4>
                          <div className="text-[10px] font-sans font-bold text-stone-500 mt-1 flex items-center gap-1">
                            <span>🕒</span> {event.time}
                          </div>
                        </div>
                        
                        <p className="text-xs text-stone-600 leading-relaxed font-normal mb-4">
                          {event.description}
                        </p>

                        {/* Dress Code tag */}
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-serif text-[9px] tracking-wider text-[#b08d48] uppercase font-bold">
                            Dress Code:
                          </span>
                          <span className="text-[11px] text-stone-700 font-semibold bg-[#faf8f5] border border-[#c5a059]/15 px-3 py-1 rounded-lg">
                            {event.dressTheme}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


            </div>
          </ScrollLeftToRightSection>

          {/* Day 2 - Aug 31st Card */}
          <ScrollLeftToRightSection
            id="ceremony-section-day2"
            className={`bg-white border rounded-3xl overflow-hidden shadow-xl flex flex-col w-full min-h-0 md:min-h-[500px] transition-[border-color,box-shadow] duration-500 scroll-mt-24 ${
              activeTab === 1 
                ? "border-[#c5a059] ring-2 ring-[#c5a059]/20 shadow-2xl scale-[1.01]" 
                : "border-[#c5a059]/20 opacity-95 shadow-md"
            }`}
          >
            {/* Day 2 Header */}
            <div className="bg-gradient-to-r from-[#540b17] to-[#450711] text-[#eae2ca] py-5 px-6 md:px-8 flex flex-col items-center justify-center border-b border-[#c5a059]/30 relative text-center">
              <div className="absolute inset-1 border border-[#eae2ca]/10 rounded-2xl pointer-events-none" />
              <span className="font-sans text-[10px] tracking-[0.25em] font-extrabold text-[#f1d092] uppercase">Monday</span>
              <h3 className="font-serif text-lg md:text-xl font-bold tracking-wide">Day 2 — August 31, 2026</h3>
            </div>

            {/* Day 2 Events list */}
            <div className="w-full p-6 md:p-10 flex flex-col justify-between text-stone-800 relative bg-white flex-1">
              {/* Vertical timeline of events with spacious padding for new custom icons */}
              <div className="relative pl-10 md:pl-14 border-l border-[#c5a059]/30 flex flex-col gap-12 sm:gap-14">
                {day2Events.map((event) => (
                  <div key={event.id} className="relative group text-left">
                    {/* Golden custom icon indicator */}
                    <div className="absolute -left-10 md:-left-14 -translate-x-1/2 top-0.5 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#c5a059]/30 bg-[#faf8f5] flex items-center justify-center shadow-xs group-hover:border-[#b08d48] transition-all duration-300 z-10">
                      {getCustomTimelineIcon(event.id)}
                    </div>

                    <div className="border-b border-stone-100 pb-6 last:border-0 last:pb-0 text-left">
                      {/* Text Details */}
                      <div>
                        <div className="mb-3">
                          <h4 className="font-serif text-[#b08d48] text-lg font-bold tracking-wide uppercase leading-tight">
                            {event.title}
                          </h4>
                          <div className="text-[10px] font-sans font-bold text-stone-500 mt-1 flex items-center gap-1">
                            <span>🕒</span> {event.time}
                          </div>
                        </div>
                        
                        <p className="text-xs text-stone-600 leading-relaxed font-normal mb-4">
                          {event.description}
                        </p>

                        {/* Dress Code tag */}
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-serif text-[9px] tracking-wider text-[#b08d48] uppercase font-bold">
                            Dress Code:
                          </span>
                          <span className="text-[11px] text-stone-700 font-semibold bg-[#faf8f5] border border-[#c5a059]/15 px-3 py-1 rounded-lg">
                            {event.dressTheme}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


            </div>
          </ScrollLeftToRightSection>

        </div>

        {/* Section 3: RSVP Page */}
        <ScrollLeftToRightSection
          className={`bg-white border rounded-3xl overflow-hidden shadow-xl flex flex-col w-full min-h-[80vh] md:min-h-[500px] transition-[border-color,box-shadow] duration-500 scroll-mt-24 ${
            activeTab === 2
              ? "border-[#c5a059] ring-2 ring-[#c5a059]/20 shadow-2xl scale-[1.01]" 
              : "border-[#c5a059]/20 opacity-95 shadow-md"
          }`}
          id="rsvp-page-container"
        >
          {/* RSVP Form container */}
          <div className="w-full p-6 md:p-10 flex flex-col justify-between text-stone-800 relative bg-white flex-1">
            <div className="my-auto w-full">
              <div className="flex items-center justify-between border-b border-[#c5a059]/25 pb-4 mb-4 animate-none">
                <div className="text-left">
                  <span className="font-serif text-[10px] tracking-[0.2em] text-[#b08d48] uppercase font-bold">RESERVATION</span>
                  <h4 className="font-serif text-[#66121f] text-lg md:text-xl font-bold tracking-wide mt-1">
                    Confirm Attendance ✦
                  </h4>
                </div>
              </div>

              <p className="text-xs text-stone-500 mb-6 font-semibold text-left">
                We can't wait to share our special moments with you! Please submit your details below to construct an email reservation.
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  
                  // Construct the body message
                  const subject = encodeURIComponent(`RSVP Reservation: Shriya & Subramanian's Wedding`);
                  const body = encodeURIComponent(
                    `Dear Shriya & Subramanian,\n\n` +
                    `I am writing to confirm my RSVP for your wedding.\n\n` +
                    `- Guest Email: ${rsvpEmail}\n\n` +
                    `Looking forward to celebrating this beautiful event with you both!\n\n` +
                    `Warm regards,\n[Your Name]`
                  );
                  
                  const mailtoUrl = `mailto:subraraze@gmail.com?subject=${subject}&body=${body}`;
                  
                  // Set success state
                  setRsvpSubmitted(true);
                  
                  // Open default mail client
                  window.location.href = mailtoUrl;

                  // Display auto-reset or instructions
                  setTimeout(() => {
                    setRsvpSubmitted(false);
                  }, 10000);
                }}
                className="space-y-4 text-left"
              >
                {/* Guest Email */}
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.1em] font-bold text-stone-500 uppercase mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email"
                    required
                    value={rsvpEmail}
                    onChange={(e) => setRsvpEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-[#b08d48] text-xs font-semibold text-stone-800 bg-[#faf8f5]/50 focus:bg-white transition-all shadow-2xs"
                  />
                </div>

                {/* Submit RSVP Button */}
                <motion.button
                  whileHover={{ scale: rsvpEmail ? 1.02 : 1 }}
                  whileTap={{ scale: rsvpEmail ? 0.98 : 1 }}
                  type="submit"
                  className="w-full mt-10 sm:mt-8 py-3 bg-gradient-to-r from-[#b08d48] to-[#c5a059] hover:from-[#c5a059] hover:to-[#b08d48] transition-all text-white rounded-xl text-xs font-sans tracking-[0.2em] font-bold focus:outline-none flex items-center justify-center space-x-2 shadow-md cursor-pointer uppercase font-semibold"
                >
                  <span>Send RSVP via Email ✉️</span>
                </motion.button>

                {rsvpSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2.5 bg-[#fbf9f4] border border-[#c5a059]/30 rounded-lg text-center"
                  >
                    <p className="text-[10px] text-[#b08d48] font-bold uppercase animate-pulse">
                      ✉️ Mail Client Opened! ✉️
                    </p>
                    <p className="text-[9px] text-stone-500 font-semibold mt-0.5 animate-none">
                      Please tap send in your mail app to submit to subraraze@gmail.com
                    </p>
                  </motion.div>
                )}
              </form>
            </div>

            {/* Event Index Quick Page Stepper for RSVP */}
            <div className="flex items-center justify-end border-t border-stone-200 pt-4 mt-auto">
              <button
                onClick={() => handleTabChange(-1)} // circle back to cover
                id="next-ceremony-btn-rsvp"
                className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#b08d48] hover:bg-[#c5a059] active:scale-95 text-xs text-white border border-[#c5a059]/30 rounded-lg transition-transform font-bold cursor-pointer"
              >
                <span>BACK TO TOP</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </ScrollLeftToRightSection>

        {/* Wedding counts header */}
        {funCounter > 0 && (
          <p className="text-center text-[10px] text-stone-500 mt-4 tracking-wider uppercase font-bold">
            💖 Showered blessings: {funCounter} times
          </p>
        )}
      </main>
    </div>
  );
}
