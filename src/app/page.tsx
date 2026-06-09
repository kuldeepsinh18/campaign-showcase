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

const scrollInput = [0, 1];
const scrollOutput = [0, 300];

export default function CampaignShowcase() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, scrollInput, scrollOutput);

  // Store the ID of the selected post (number for posts, string 'reel' for video)
  const [selectedPost, setSelectedPost] = useState<number | string | null>(null);

  // Handle ESC key to dismiss the selected post
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPost(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="relative bg-black min-h-screen selection:bg-white selection:text-black">
      <div className="noise-overlay" />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden z-10 px-6">
        <motion.div
          style={{ y: yHero }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-center z-10"
        >
          <h1 className="brutalist-text text-5xl md:text-8xl lg:text-9xl text-white tracking-tighter mb-6 leading-[0.85]">
            MAHALAXMI
            <br />
            MASALA
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-neutral-400 text-xs md:text-lg uppercase tracking-[0.2em] font-light"
          >
            Campaign Showcase
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-neutral-500">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
        </motion.div>
      </section>

      {/* 2. INSTAGRAM STYLE 3x3 GRID */}
      <section className="relative z-20 px-4 md:px-8 lg:px-12 py-24 bg-black">
        {/* Subtle dim overlay for selected post */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px]"
              onClick={() => setSelectedPost(null)}
            />
          )}
        </AnimatePresence>

        <div className="max-w-[1600px] mx-auto relative">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}

          >
            {/* The 8 Image Posts */}
            {postsData.map((post, i) => {
              const isSelected = selectedPost === post.id;

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    animate={{
                      scale: isSelected ? 1.08 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`group relative flex flex-col gap-4 cursor-pointer w-full h-full ${isSelected ? "z-50" : "z-10"}`}
                    onClick={() => setSelectedPost(isSelected ? null : post.id)}
                  >
                    {/* Active/Selected Glow */}
                    <motion.div
                      animate={{ opacity: isSelected ? 0.8 : 0 }}
                      className="absolute -inset-8 bg-gradient-to-tr from-neutral-800 to-neutral-900 rounded-[2.5rem] blur-2xl transition duration-500 pointer-events-none"
                    />

                    {/* Standard Hover Glow (only visible when not selected) */}
                    {!isSelected && (
                      <div className="absolute -inset-4 bg-gradient-to-tr from-neutral-800 to-neutral-900 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-40 transition duration-1000 group-hover:duration-500 pointer-events-none" />
                    )}

                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-neutral-900 shadow-2xl border border-neutral-800/60 z-10 drop-shadow-2xl">
                      <Image
                        src={post.src}
                        alt={post.alt}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />

                      <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
                        <span className="text-sm font-mono text-white/90 uppercase tracking-widest backdrop-blur-md bg-black/30 px-4 py-2 rounded-full border border-white/10 shadow-lg">
                          Vol. {post.id.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* The 9th Grid Item: Video Reel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                animate={{
                  scale: selectedPost === 'reel' ? 1.08 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`group relative flex flex-col gap-4 cursor-pointer w-full h-full ${selectedPost === 'reel' ? "z-50" : "z-10"}`}
                onClick={() => setSelectedPost(selectedPost === 'reel' ? null : 'reel')}
              >
                {/* Active/Selected Glow */}
                <motion.div
                  animate={{ opacity: selectedPost === 'reel' ? 0.8 : 0 }}
                  className="absolute -inset-8 bg-gradient-to-tr from-neutral-800 to-neutral-900 rounded-[2.5rem] blur-2xl transition duration-500 pointer-events-none"
                />

                {!selectedPost && (
                  <div className="absolute -inset-4 bg-gradient-to-tr from-neutral-800 to-neutral-900 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-40 transition duration-1000 group-hover:duration-500 pointer-events-none" />
                )}

                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-neutral-950 shadow-2xl border border-neutral-800/60 z-10 drop-shadow-2xl">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain"
                  >
                    <source src="/reel.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Play Icon / Reel Indicator */}
                  <div className="absolute top-6 right-6">
                    <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
                    <span className="text-sm font-mono text-white/90 uppercase tracking-widest backdrop-blur-md bg-black/30 px-4 py-2 rounded-full border border-white/10 shadow-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      Reel
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. CONTACT SECTION */}
      <section className="relative z-20 border-t border-neutral-900 px-6 py-24 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 md:gap-8">
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
      </section>

      {/* 4. FOOTER */}
      <footer className="relative z-20 border-t border-neutral-900 py-24 md:py-32 bg-black flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        ><h2 className="brutalist-text text-xl md:text-4xl text-white mb-6 leading-tight">
            Looking Forward To Creating A Memorable Campaign For Your Brand
          </h2>
          <p className="text-neutral-500 text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} FORWORD STUDIO
          </p>
        </motion.div>
      </footer>
    </main>
  );
}
