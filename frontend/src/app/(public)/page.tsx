'use client';

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

            {/* Split Hero Section */}
            <section className="relative min-h-[90vh] flex items-center bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-12 md:py-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="space-y-8 animate-fade-in-up">
                            <div>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
                                    {t.hero.welcome} <br />
                                    <span className="text-blue-600 dark:text-blue-400">{t.hero.welcomeSpan}</span>
                                </h1>
                                <h2 className="text-xl sm:text-2xl text-zinc-500 dark:text-zinc-400 font-light">
                                    {t.hero.subtitle}
                                </h2>
                            </div>

                            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed border-l-4 border-blue-500 pl-6">
                                {t.hero.description}
                            </p>

                            <Link
                                href="/rooms"
                                className="inline-flex items-center space-x-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
                            >
                                <span>{t.hero.cta}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>

                        {/* Image Side */}
                        <div className="relative h-[400px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 group">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop)' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 dark:bg-blue-900/10 -skew-x-12 translate-x-32 z-0"></div>
            </section>

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
