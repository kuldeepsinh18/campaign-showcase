"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import NextImage, { ImageProps } from "next/image";
import React, { useState, useEffect, memo, useRef, useCallback } from "react";
import { Mail, Phone, ArrowLeft } from "lucide-react";

const Image = (props: ImageProps) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 ${props.className || ''}`}>
        <span className="text-neutral-500 font-mono text-[10px] md:text-xs uppercase tracking-widest text-center px-4">Image Unavailable</span>
      </div>
    );
  }

  return (
    <NextImage
      {...props}
      onError={(e) => {
        console.error(`Failed to load image: ${props.src}`);
        setError(true);
        if (props.onError) props.onError(e);
      }}
    />
  );
};
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCampaignById, Campaign } from "../../../data/campaigns";

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const scrollInput = [0, 1];
const scrollOutput = [0, 300];

const LazyVideo = memo(({ item }: { item: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div ref={ref} className="w-full h-full relative">
      {isInView && (
        <video
          preload="metadata"
          playsInline={true}
          muted={true}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        >
          <source src={`${item.src}#t=0.1`} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="w-[52px] h-[52px] md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transform transition-all duration-500 group-hover:scale-110 group-hover:bg-black/50 group-hover:border-white/40" style={{ willChange: "transform", transform: "translateZ(0)" }}>
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white fill-white transition-transform duration-500 group-hover:scale-95" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>
  );
});
LazyVideo.displayName = "LazyVideo";

const MediaGridItem = memo(({ item, i, isSelected, onClick }: any) => {
  const aspectClass = 'aspect-[4/5]';
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: (i % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${aspectClass} rounded-xl md:rounded-2xl transition-all duration-500 media-item ${isSelected ? 'is-selected' : ''} z-10`}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
    >
      {!isSelected && (
        <motion.div
          layoutId={`media-${item.id}`}
          className="w-full h-full relative rounded-xl md:rounded-2xl overflow-hidden group shadow-2xl shadow-transparent cursor-pointer"
          onClick={() => onClick(item.id)}
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-neutral-900 opacity-0 group-hover:opacity-40 transition duration-1000 group-hover:duration-500 pointer-events-none mix-blend-overlay z-10" />
          
          {item.type === 'post' ? (
            <Image
              src={item.src}
              alt={item.alt || item.title}
              fill
              quality={100}
              unoptimized
              priority={i < 4}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              style={{ willChange: "transform", transform: "translateZ(0)" }}
            />
          ) : (
            <LazyVideo item={item} />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

          <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 flex justify-between items-end z-20 pointer-events-none">
            <span className="text-xs md:text-sm font-mono text-white/90 uppercase tracking-widest backdrop-blur-md bg-black/40 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 shadow-lg flex items-center gap-2">
              {item.type === 'video' && (
                <svg className="w-3 h-3 md:w-4 md:h-4 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
              {item.title}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
});
MediaGridItem.displayName = "MediaGridItem";

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const campaign = getCampaignById(id);

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, scrollInput, scrollOutput);

  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const handleItemClick = useCallback((id: string) => {
    setSelectedPost(id);
    setVideoError(false);
    setVideoLoading(true);
  }, []);

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

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPost]);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Campaign not found
      </div>
    );
  }

  return (
    <>
      {/* DISMISS OVERLAY */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] bg-black cursor-pointer"
            onClick={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>

      {/* ZOOMED POST */}
      {selectedPost && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          {campaign.media.map(item => {
            if (item.id === selectedPost) {
              return (
                <motion.div
                  key={`selected-${item.id}`}
                  layoutId={`media-${item.id}`}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl pointer-events-auto bg-neutral-900"
                  style={{
                    width: '85vw',
                    maxWidth: item.type === 'post' ? 'calc(85vh * 0.8)' : 'calc(85vh * 0.5625)',
                    aspectRatio: item.type === 'post' ? '4/5' : '9/16'
                  }}
                  onClick={(e) => {
                    // Allow clicking image to close, but not video so controls work
                    if (item.type === 'post') {
                      setSelectedPost(null);
                    }
                  }}
                >
                  {item.type === 'post' ? (
                    <>
                      <Image
                        src={item.src}
                        alt={item.alt || item.title}
                        fill
                        quality={100}
                        unoptimized
                        priority
                        sizes="100vw"
                        className="object-cover object-center cursor-pointer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 pointer-events-none z-10" />
                      <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 flex justify-between items-end z-20 pointer-events-none">
                        <span className="text-sm md:text-base font-mono text-white/90 uppercase tracking-widest backdrop-blur-md bg-black/40 px-4 py-2 md:px-6 md:py-3 rounded-full border border-white/10 shadow-lg">
                          {item.title}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full relative flex items-center justify-center bg-black">
                      {/* Loading Spinner / Error Fallback */}
                      {(videoLoading || videoError) && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black gap-4 px-6 text-center">
                          {videoError ? (
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-2 border border-red-500/30">
                                <span className="text-red-500 font-bold text-xl">!</span>
                              </div>
                              <span className="text-xs md:text-sm font-mono text-white/90 uppercase tracking-widest">Video format not supported</span>
                              <span className="text-[10px] md:text-xs text-white/50 max-w-[250px] leading-relaxed mt-1">This reel requires H.264 Web Optimized MP4 encoding to play on mobile.</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-4">
                              <div className="w-10 h-10 border-4 border-white/20 border-t-white/100 rounded-full animate-spin" />
                              <span className="text-[10px] md:text-xs font-mono text-white/50 uppercase tracking-widest">Loading Reel...</span>
                            </div>
                          )}
                        </div>
                      )}
                      <video
                        ref={(el) => {
                          if (el) {
                            el.defaultMuted = true;
                            el.muted = true;
                          }
                        }}
                        preload="metadata"
                        playsInline={true}
                        muted={true}
                        controls
                        autoPlay
                        onLoadStart={(e) => {
                          const target = e.currentTarget as any;
                          target._loadTimer = setTimeout(() => {
                            if (target.readyState < 3) {
                              setVideoError(true);
                              setVideoLoading(false);
                            }
                          }, 5000);
                        }}
                        onLoadedData={() => {
                          // Data loaded, but wait for canPlay to remove loader
                        }}
                        onCanPlay={(e) => {
                          const target = e.currentTarget as any;
                          if (target._loadTimer) clearTimeout(target._loadTimer);
                          setVideoLoading(false);
                          setVideoError(false);
                        }}
                        onError={(e) => {
                          const target = e.currentTarget as any;
                          if (target._loadTimer) clearTimeout(target._loadTimer);
                          setVideoError(true);
                          setVideoLoading(false);
                        }}
                        className={`w-full h-full object-cover relative z-10 transition-opacity duration-300 ${videoLoading ? 'opacity-0' : 'opacity-100'}`}
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>
                    </div>
                  )}
                </motion.div>
              )
            }
            return null;
          })}
        </div>
      )}

      <main className="relative bg-black min-h-screen selection:bg-white selection:text-black">
        <div className="noise-overlay" />

        {/* NAVIGATION */}
        <div className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex items-center justify-between pointer-events-none">
          <Link href="/" className="pointer-events-auto flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-mono uppercase tracking-widest hidden md:block">Back to Portfolio</span>
          </Link>
        </div>

        {/* 1. HERO SECTION */}
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden z-10 px-6">
          {/* Cinematic Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src={campaign.coverImage}
              alt={`${campaign.title} Cover`}
              fill
              quality={100}
              priority
              unoptimized
              className="object-cover object-center scale-105"
            />
            {/* Dark Overlay & Subtle Blur */}
            <div className="absolute inset-0 bg-black/65 backdrop-blur-[6px]" />
            {/* Gradient to blend seamlessly into the grid below */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
          </div>

          <motion.div
            style={{ y: yHero }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-center z-10"
          >
            <h1 className={`font-semibold text-4xl md:text-5xl lg:text-6xl text-white tracking-wide mb-6 leading-tight drop-shadow-2xl text-center uppercase ${campaign.id !== 'mahalaxmi-masala' ? 'whitespace-nowrap' : ''}`}>
              {campaign.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
          </motion.div>
        </section>

        {/* 2. UNIFIED MEDIA GRID (MASONRY) */}
        <section className="relative z-20 px-4 md:px-8 lg:px-12 pb-24 pt-8 bg-black min-h-[50vh]">
          <div className="max-w-[1600px] mx-auto relative">
            <motion.div
              className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 xl:gap-6 ${selectedPost ? 'has-selection' : ''}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
            >
              {campaign.media.map((item, i) => (
                <MediaGridItem
                  key={item.id}
                  item={item}
                  i={i}
                  isSelected={selectedPost === item.id}
                  onClick={handleItemClick}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="relative z-20 border-t border-neutral-900 px-4 md:px-8 py-24 md:py-32 bg-black overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />
          
          <div className="max-w-2xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="brutalist-text text-2xl md:text-4xl lg:text-5xl text-white tracking-tighter mb-3">
                CONTACT INFO
              </h2>
              <p className="text-neutral-400 text-[10px] md:text-xs uppercase tracking-[0.2em] font-light">
                Get in touch with us
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6">
              {/* WhatsApp Button */}
              <motion.a
                href="https://wa.me/918866035771"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.05 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 md:gap-3 px-6 py-2.5 md:px-8 md:py-4 rounded-full bg-neutral-900/40 backdrop-blur-xl border border-white/10 hover:border-white/30 hover:bg-neutral-800/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all group justify-center cursor-pointer"
              >
                <WhatsappIcon className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform duration-500" />
                <span className="text-[11px] md:text-sm font-mono text-white/90 uppercase tracking-widest group-hover:text-white transition-colors">WhatsApp</span>
              </motion.a>

              {/* Email Button */}
              <motion.a
                href="mailto:zalahardip70@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.05 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 md:gap-3 px-6 py-2.5 md:px-8 md:py-4 rounded-full bg-neutral-900/40 backdrop-blur-xl border border-white/10 hover:border-white/30 hover:bg-neutral-800/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all group justify-center cursor-pointer"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform duration-500" />
                <span className="text-[11px] md:text-sm font-mono text-white/90 uppercase tracking-widest group-hover:text-white transition-colors">Email</span>
              </motion.a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
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
      </main>
    </>
  );
}
