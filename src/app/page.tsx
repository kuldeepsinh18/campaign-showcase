"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { campaigns } from "../data/campaigns";

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (sessionStorage.getItem('hasSeenPreloader')) {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {isClient && isLoading && (
          <Preloader onComplete={() => {
            setIsLoading(false);
            sessionStorage.setItem('hasSeenPreloader', 'true');
          }} />
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

        {/* 2. ALL CAMPAIGNS SECTION */}
        <section className="relative z-20 px-4 md:px-8 lg:px-12 pb-24 pt-4 max-w-[1400px] mx-auto bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {campaigns.map((campaign, i) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/campaign/${campaign.id}`} className="block relative aspect-[4/5] rounded-xl md:rounded-2xl overflow-hidden group shadow-2xl shadow-transparent cursor-pointer">
                  
                  {/* Standard Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-neutral-900 opacity-0 group-hover:opacity-40 transition duration-1000 group-hover:duration-500 pointer-events-none mix-blend-overlay z-10" />

                  <Image
                    src={campaign.coverImage}
                    alt={`${campaign.title} Cover`}
                    fill
                    quality={100}
                    unoptimized
                    priority={i < 3}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col items-start z-20">
                    <span className="text-xs md:text-sm font-mono text-white/70 uppercase tracking-widest mb-2">
                      Case Study
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-medium tracking-tight brutalist-text transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                      {campaign.title}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. CONTACT SECTION */}
        <section className="relative z-20 border-t border-neutral-900 px-4 md:px-8 py-24 md:py-32 bg-black overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 md:mb-20"
            >
              <h2 className="brutalist-text text-3xl md:text-5xl lg:text-6xl text-white tracking-tighter mb-4">
                CONTACT INFO
              </h2>
              <p className="text-neutral-400 text-xs md:text-sm uppercase tracking-[0.2em] font-light">
                Get in touch with us
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* WhatsApp Card */}
              <motion.a
                href="https://wa.me/918866035771"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center gap-6 p-10 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-neutral-900/40 backdrop-blur-xl border border-white/5 hover:border-white/20 hover:bg-neutral-800/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all group"
              >
                <div className="p-5 md:p-6 bg-white/5 rounded-full group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500">
                  <WhatsappIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-mono text-neutral-400 uppercase tracking-widest mb-3 group-hover:text-white transition-colors">WhatsApp</h3>
                  <p className="text-xl md:text-2xl text-white font-light tracking-wide">
                    +91 88660 35771
                  </p>
                </div>
              </motion.a>

              {/* Email Card */}
              <motion.a
                href="mailto:zalahardip70@gmail.com"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center gap-6 p-10 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-neutral-900/40 backdrop-blur-xl border border-white/5 hover:border-white/20 hover:bg-neutral-800/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all group"
              >
                <div className="p-5 md:p-6 bg-white/5 rounded-full group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500">
                  <Mail className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-mono text-neutral-400 uppercase tracking-widest mb-3 group-hover:text-white transition-colors">Email</h3>
                  <p className="text-xl md:text-2xl text-white font-light tracking-wide break-all">
                    zalahardip70@gmail.com
                  </p>
                </div>
              </motion.a>
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
      </main>
    </>
  );
}
