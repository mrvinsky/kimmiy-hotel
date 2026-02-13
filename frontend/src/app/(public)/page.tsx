'use client';

import React from 'react';

import { LocationGallery } from '@/components/ui/LocationGallery';
import { ScrollingGallery } from '@/components/ui/ScrollingGallery';
import { Hero } from '@/components/ui/Hero';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Testimonials } from '@/components/ui/Testimonials';

export default function HomePage() {
    const { t } = useLanguage();

    return (
        <div className="relative">

            {/* Hero Section - Full Background with Subtle Neon & Star Rain */}
            {(() => {
                const [isHovered, setIsHovered] = React.useState(false);
                const stars = React.useMemo(() =>
                    Array.from({ length: 60 }, (_, i) => ({
                        id: i,
                        top: `${-(Math.random() * 15)}%`,
                        right: `${Math.random() * 100}%`,
                        size: 2 + Math.random() * 3,
                        duration: 4 + Math.random() * 3,
                        delay: Math.random() * 4,
                        brightness: 0.4 + Math.random() * 0.4,
                    })), []
                );


                return (
                    <section
                        className={`relative min-h-[90vh] flex items-center overflow-hidden cursor-pointer`}
                        style={{ fontFamily: 'var(--font-playfair), serif' }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <style>{`
                            @keyframes starfall {
                                0% { transform: translate(0, 0); opacity: 1; }
                                70% { opacity: 0.8; }
                                100% { transform: translate(-110vw, 110vh); opacity: 0; }
                            }
                        `}</style>

                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out"
                            style={{
                                backgroundImage: 'url(/hero-bg.jpg)',
                                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                            }}
                        ></div>

                        {/* Dark gradient overlay - bottom to top */}
                        <div
                            className="absolute inset-0 transition-all duration-700 ease-out"
                            style={{
                                background: isHovered
                                    ? 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 100%)'
                                    : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                            }}
                        ></div>

                        {/* Star Rain - neon glow */}
                        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
                            {stars.map((star) => (
                                <div
                                    key={star.id}
                                    style={{
                                        position: 'absolute',
                                        top: star.top,
                                        right: star.right,
                                        width: `${star.size}px`,
                                        height: `${star.size}px`,
                                        background: 'rgba(180, 220, 255, 1)',
                                        borderRadius: '50%',
                                        boxShadow: `0 0 ${star.size * 3}px ${star.size}px rgba(96,165,250,${star.brightness}), 0 0 ${star.size * 8}px ${star.size * 2.5}px rgba(96,165,250,${star.brightness * 0.4})`,
                                        opacity: isHovered ? 1 : 0,
                                        animation: isHovered
                                            ? `starfall ${star.duration}s ${star.delay}s linear infinite`
                                            : 'none',
                                        transition: 'opacity 0.5s ease',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center py-12 md:py-0">
                            <div className="space-y-8 animate-fade-in-up transition-all duration-700">
                                <div>
                                    {/* Title - subtle neon glow, slightly brighter on hover */}
                                    <h1
                                        className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white mb-4 transition-all duration-700"
                                        style={{
                                            textShadow: isHovered
                                                ? '0 0 12px rgba(96,165,250,0.4), 0 0 30px rgba(96,165,250,0.25)'
                                                : '0 0 6px rgba(96,165,250,0.25), 0 0 18px rgba(96,165,250,0.15)',
                                        }}
                                    >
                                        {t.hero.welcome} <br />
                                        <span
                                            className="text-blue-400 transition-all duration-700"
                                            style={{
                                                color: isHovered ? undefined : undefined,
                                                textShadow: isHovered
                                                    ? '0 0 15px rgba(96,165,250,0.5), 0 0 35px rgba(96,165,250,0.3)'
                                                    : '0 0 8px rgba(96,165,250,0.35), 0 0 20px rgba(96,165,250,0.2)',
                                            }}
                                        >
                                            {t.hero.welcomeSpan}
                                        </span>
                                    </h1>

                                    {/* Subtitle */}
                                    <h2
                                        className="text-xl sm:text-2xl font-light italic transition-all duration-700"
                                        style={{
                                            color: isHovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)',
                                            textShadow: isHovered ? '0 0 10px rgba(255,255,255,0.25)' : 'none',
                                        }}
                                    >
                                        {t.hero.subtitle}
                                    </h2>
                                </div>

                                {/* Description */}
                                <p
                                    className="text-lg leading-relaxed max-w-2xl mx-auto text-left transition-all duration-700 border rounded-xl px-6 py-4 backdrop-blur-sm"
                                    style={{
                                        color: isHovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)',
                                        borderColor: isHovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)',
                                        backgroundColor: isHovered ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.15)',
                                        textShadow: isHovered ? '0 0 8px rgba(96,165,250,0.2)' : 'none',
                                    }}
                                >
                                    {t.hero.description}
                                </p>

                                {/* CTA Button */}
                                <Link
                                    href="/rooms"
                                    className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-700 hover:scale-105 shadow-xl"
                                    style={{
                                        fontFamily: 'var(--font-geist-sans), sans-serif',
                                        borderColor: isHovered ? 'rgba(96,165,250,0.4)' : 'rgba(255,255,255,0.2)',
                                        boxShadow: isHovered ? '0 0 15px rgba(96,165,250,0.15)' : undefined,
                                        backgroundColor: isHovered ? 'rgba(96,165,250,0.1)' : 'rgba(255,255,255,0.1)',
                                    }}
                                >
                                    <span>{t.hero.cta}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Bottom gradient fade */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-50 dark:from-zinc-900 to-transparent z-10"></div>
                    </section>
                );
            })()}

            {/* Gallery Section */}
            <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm">{t.gallery.badge}</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-zinc-900 dark:text-white">{t.gallery.title}</h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        {t.gallery.description}
                    </p>
                </div>
                <ScrollingGallery />
            </section>

            {/* Quote Section */}
            <section className="py-24 bg-zinc-900 text-white flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-4xl mx-auto px-6 text-center z-10">
                    <span className="text-6xl text-blue-500/30 font-serif absolute -top-8 left-1/2 -translate-x-1/2">"</span>
                    <blockquote className="text-2xl md:text-4xl font-light italic leading-relaxed tracking-wide font-serif">
                        "{t.quote.text}"
                    </blockquote>
                    <cite className="block mt-8 text-sm font-semibold tracking-widest uppercase text-blue-400">
                        — {t.quote.author}
                    </cite>
                </div>
            </section>

            {/* About Us Visual Section */}
            <section className="relative py-24 overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-50"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Side */}
                        <div className="relative group order-2 lg:order-1">
                            <div className="relative h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl rotate-3 transition-transform duration-500 group-hover:rotate-0">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop)' }}
                                ></div>
                                <div className="absolute inset-0 bg-black/10"></div>
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center p-4 shadow-xl hidden md:flex animate-pulse">
                                <div className="text-center text-zinc-900 dark:text-white">
                                    <span className="block text-3xl font-bold">10+</span>
                                    <span className="text-xs tracking-widest uppercase font-semibold">{t.about.experience}</span>
                                </div>
                            </div>
                        </div>

                        {/* Text Side with Glass Effect */}
                        <div className="backdrop-blur-md bg-white/30 dark:bg-zinc-900/30 border border-white/20 p-8 md:p-12 rounded-[2rem] shadow-xl order-1 lg:order-2">
                            <h3 className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-4">{t.about.badge}</h3>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-zinc-900 dark:text-white leading-tight">
                                {t.about.title} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{t.about.titleSpan}</span>
                            </h2>
                            <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                                {t.about.desc1}
                            </p>
                            <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8 leading-relaxed">
                                {t.about.desc2}
                            </p>

                            <Link href="/about" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 transition-colors group">
                                <span>{t.about.cta}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Highlight */}
            <section className="py-24 bg-zinc-50 dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-zinc-900 dark:text-white">
                        {t.services.title} <span className="text-blue-600 dark:text-blue-400">{t.services.titleSpan}</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Transfer Card */}
                        <div className="group relative h-96 rounded-[2rem] overflow-hidden shadow-xl cursor-pointer">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop)' }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="mb-4 bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                    <span className="text-3xl">✈️</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{t.services.transfer.title}</h3>
                                <p className="text-gray-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {t.services.transfer.desc}
                                </p>
                            </div>
                        </div>

                        {/* Wifi Card */}
                        <div className="group relative h-96 rounded-[2rem] overflow-hidden shadow-xl cursor-pointer">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop)' }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="mb-4 bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                    <span className="text-3xl">📶</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{t.services.wifi.title}</h3>
                                <p className="text-gray-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {t.services.wifi.desc}
                                </p>
                            </div>
                        </div>

                        {/* Parking Card */}
                        <div className="group relative h-96 rounded-[2rem] overflow-hidden shadow-xl cursor-pointer">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop)' }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="mb-4 bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                    <span className="text-3xl">🅿️</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{t.services.parking.title}</h3>
                                <p className="text-gray-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {t.services.parking.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section (Scrolling) */}
            <Testimonials variant="scroll" />

            {/* Map & Image Section with Glass Effect */}
            <section className="relative py-24 flex items-center justify-center">
                {/* Background for Glass Effect */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop)' }}
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="backdrop-blur-xl bg-white/10 dark:bg-black/40 border border-white/20 p-4 md:p-8 rounded-3xl shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Hotel Image Gallery */}
                            <LocationGallery />

                            {/* Map */}
                            <div className="h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-lg border border-white/10 grayscale-[50%] contrast-125 hover:grayscale-0 transition-all duration-500">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.7!2d20.2!3d44.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDQ4JzAwLjAiTiAyMMKwMTInMDAuMCJF!5e0!3m2!1sen!2srs!4v1600000000000!5m2!1sen!2srs"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="block w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
