"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const postsData = [
  { id: 1, src: "/images/Post1.png", alt: "Campaign Post 1" },
  { id: 2, src: "/images/Post2.png", alt: "Campaign Post 2" },
  { id: 3, src: "/images/Post3.png", alt: "Campaign Post 3" },
  { id: 4, src: "/images/Post4.png", alt: "Campaign Post 4" },
  { id: 5, src: "/images/Post5.png", alt: "Campaign Post 5" },
  { id: 6, src: "/images/Post6.png", alt: "Campaign Post 6" },
  { id: 7, src: "/images/Post7.png", alt: "Campaign Post 7" },
  { id: 8, src: "/images/Post8.png", alt: "Campaign Post 8" },
];

const videosData = [
  { id: 1, src: "/reel.mp4", thumbnail: "/images/Post1.png", title: "Campaign Reel 1", type: "vertical" },
  { id: 2, src: "/reel.mp4", thumbnail: "/images/Post2.png", title: "Commercial Edit", type: "horizontal" },
];

const scrollInput = [0, 1];
const scrollOutput = [0, 300];

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 2 seconds duration
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center px-6"
    >
      <div className="text-center z-10 flex flex-col items-center justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="brutalist-text text-3xl md:text-5xl lg:text-6xl text-white tracking-tighter mb-12 leading-[0.85]"
        >
          CAMPAIGN
          <br />
          SHOWCASE
        </motion.h1>
        
        {/* Loading Line */}
        <div className="w-48 md:w-64 h-[1px] bg-neutral-900 overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function CampaignShowcase() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, scrollInput, scrollOutput);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'campaign' | 'video'>('campaign');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPost(null);
        setSelectedVideo(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleTabSwitch = (tab: 'campaign' | 'video') => {
    setActiveTab(tab);
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <main className={`relative bg-black min-h-screen selection:bg-white selection:text-black ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <div className="noise-overlay" />

        {/* 1. HERO SECTION */}
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden z-10 px-6">
          <motion.div
            style={{ y: yHero }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: isLoading ? 0 : 0.2 }}
            className="text-center z-10"
          >
            <h1 className="brutalist-text text-5xl md:text-8xl lg:text-9xl text-white tracking-tighter mb-6 leading-[0.85]">
              CAMPAIGN
              <br />
              SHOWCASE
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ delay: isLoading ? 0 : 1.2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
          </motion.div>
        </section>

        {/* TABS SECTION (DESKTOP) */}
        <section className="relative z-20 px-6 pt-12 pb-8 bg-black hidden md:flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 md:gap-4 border border-white/10 p-1 md:p-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md"
          >
            <button
              onClick={() => setActiveTab('campaign')}
              className={`relative px-6 py-2.5 md:px-8 md:py-3 rounded-full text-xs md:text-sm uppercase tracking-widest transition-colors duration-500 ${activeTab === 'campaign' ? 'text-black font-medium' : 'text-white hover:text-neutral-300'}`}
            >
              {activeTab === 'campaign' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Post Showcase</span>
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`relative px-6 py-2.5 md:px-8 md:py-3 rounded-full text-xs md:text-sm uppercase tracking-widest transition-colors duration-500 ${activeTab === 'video' ? 'text-black font-medium' : 'text-white hover:text-neutral-300'}`}
            >
              {activeTab === 'video' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Video Showcase</span>
            </button>
          </motion.div>
        </section>

        <AnimatePresence mode="wait">
          {/* 2. INSTAGRAM STYLE GRID */}
          {activeTab === 'campaign' && (
            <motion.section 
              key="campaign"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 px-4 md:px-8 lg:px-12 pb-24 pt-8 bg-black min-h-[50vh]"
            >
              {/* DISMISS OVERLAY */}
          <AnimatePresence>
            {(selectedPost || selectedVideo) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md cursor-pointer"
                onClick={() => {
                  setSelectedPost(null);
                  setSelectedVideo(null);
                }}
              />
            )}
          </AnimatePresence>

          {/* ZOOMED POST */}
          {selectedPost && (
            <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none">
              {postsData.map(post => {
                if (post.id === selectedPost) {
                  return (
                    <motion.div
                      key={`selected-${post.id}`}
                      layoutId={`post-${post.id}`}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl pointer-events-auto cursor-pointer"
                      style={{
                        width: '85vw',
                        maxWidth: 'calc(85vh * 0.8)',
                        aspectRatio: '4/5'
                      }}
                      onClick={() => setSelectedPost(null)}
                    >
                      <Image
                        src={post.src}
                        alt={post.alt}
                        fill
                        quality={100}
                        unoptimized
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 pointer-events-none z-10" />
                      <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 flex justify-between items-end z-20">
                        <span className="text-sm md:text-base font-mono text-white/90 uppercase tracking-widest backdrop-blur-md bg-black/40 px-4 py-2 md:px-6 md:py-3 rounded-full border border-white/10 shadow-lg">
                          POST - {post.id.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </motion.div>
                  )
                }
                return null;
              })}
            </div>
          )}

          <div className="max-w-[1600px] mx-auto relative">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {postsData.map((post, i) => {
                const isSelected = selectedPost === post.id;

                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: (i % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative aspect-[4/5] rounded-xl md:rounded-2xl transition-all duration-500 ${selectedPost && !isSelected ? 'opacity-40 blur-[2px] grayscale-[30%]' : 'opacity-100'
                      } z-10`}
                  >
                    {!isSelected && (
                      <motion.div
                        layoutId={`post-${post.id}`}
                        className="w-full h-full relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group shadow-2xl shadow-transparent"
                        onClick={() => setSelectedPost(post.id)}
                      >
                        {/* Standard Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-neutral-900 opacity-0 group-hover:opacity-40 transition duration-1000 group-hover:duration-500 pointer-events-none mix-blend-overlay z-10" />

                        <Image
                          src={post.src}
                          alt={post.alt}
                          fill
                          quality={100}
                          unoptimized
                          priority={i < 4} // Priority for only first 4 posts
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                        <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 flex justify-between items-end z-20">
                          <span className="text-xs md:text-sm font-mono text-white/90 uppercase tracking-widest backdrop-blur-md bg-black/40 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 shadow-lg">
                            POST - {post.id.toString().padStart(2, '0')}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>
        )}

        {/* 3. VIDEO SHOWCASE SECTION */}
        {activeTab === 'video' && (
        <motion.section 
          key="video"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 px-4 md:px-8 lg:px-12 pb-24 pt-8 bg-black min-h-[50vh]"
        >
          <div className="max-w-[1200px] mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 md:mb-16 text-center"
            >
              <h2 className="brutalist-text text-3xl md:text-5xl lg:text-6xl text-white tracking-tighter mb-4">
                VIDEO SHOWCASE
              </h2>
              <p className="text-neutral-400 text-xs md:text-sm uppercase tracking-[0.2em] font-light">
                Selected Motion & Commercial Work
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[400px] mx-auto rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 bg-neutral-900/30 p-2 md:p-3"
            >
              <div className="relative rounded-[1.5rem] overflow-hidden bg-black aspect-[9/16] w-full">
                <video
                  controls
                  preload="auto"
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src="/videos/Mahalaxmi Masala Brand Film.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="px-4 py-5 md:py-6 flex flex-col justify-center items-center text-center">
                <h3 className="text-xl md:text-2xl text-white font-light tracking-tight">
                  REEL - 01
                </h3>
              </div>
            </motion.div>
          </div>
        </motion.section>
        )}
        </AnimatePresence>

        {/* 4. CONTACT SECTION */}
        <section className="relative z-20 border-t border-neutral-900 px-6 py-24 md:py-32 bg-black">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="brutalist-text text-2xl md:text-4xl text-white tracking-tighter mb-16 md:mb-24 leading-[0.85]"
            >
              CONTACT
              <br />
              INFO
            </motion.h2>

            <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-2"
              >
                <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">WhatsApp</h3>
                <a href="https://wa.me/919662250041" className="text-xl md:text-2xl text-white font-light hover:text-neutral-400 transition-colors">
                  +91 96622 50041
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex flex-col gap-2"
              >
                <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">Email</h3>
                <a href="mailto:zalakuldipsinh366@gmail.com" className="text-xl md:text-2xl text-white font-light hover:text-neutral-400 transition-colors">
                  zalakuldipsinh366@gmail.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col gap-2"
              >
                <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">Call</h3>
                <a href="tel:+919662250041" className="text-xl md:text-2xl text-white font-light hover:text-neutral-400 transition-colors">
                  +91 96622 50041
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. FOOTER */}
        <footer className="relative z-20 border-t border-neutral-900 py-24 md:py-32 bg-black flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="brutalist-text text-lg md:text-2xl text-white mb-6 leading-tight max-w-2xl mx-auto">
              Looking Forward To Creating A Memorable Campaign For Your Brand
            </h2>
            <p className="text-neutral-500 text-sm tracking-widest uppercase">
              © {new Date().getFullYear()} FORWORD STUDIO
            </p>
          </motion.div>
        </footer>

        {/* MOBILE BOTTOM NAVIGATION */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] w-max md:hidden"
        >
          <div className="flex items-center gap-1 p-1 rounded-[20px] bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
            <button
              onClick={() => handleTabSwitch('campaign')}
              className={`relative px-5 py-2.5 rounded-[16px] text-[12px] uppercase tracking-widest transition-all duration-500 ${activeTab === 'campaign' ? 'text-black font-medium' : 'text-white/60 hover:text-white'}`}
            >
              {activeTab === 'campaign' && (
                <motion.div
                  layoutId="mobileActiveTabIndicator"
                  className="absolute inset-0 bg-white rounded-[16px]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
                Post Showcase
              </span>
            </button>
            
            <button
              onClick={() => handleTabSwitch('video')}
              className={`relative px-5 py-2.5 rounded-[16px] text-[12px] uppercase tracking-widest transition-all duration-500 ${activeTab === 'video' ? 'text-black font-medium' : 'text-white/60 hover:text-white'}`}
            >
              {activeTab === 'video' && (
                <motion.div
                  layoutId="mobileActiveTabIndicator"
                  className="absolute inset-0 bg-white rounded-[16px]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
                Video Showcase
              </span>
            </button>
          </div>
        </motion.div>
      </main>
    </>
  );
}
