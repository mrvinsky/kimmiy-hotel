'use client';

import { Hero } from '@/components/ui/Hero';
import { useLanguage } from '@/context/LanguageContext';
import { Testimonials } from '@/components/ui/Testimonials';

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-900">

            <Hero
                title={t.about.badge}
                subtitle={t.about.title + ' ' + t.about.titleSpan}
                backgroundImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                height="h-[60vh]"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">

                {/* Introduction Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold tracking-wider text-sm uppercase">
                            <span>🏢</span>
                            <span>{t.about.badge}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
                            {t.about.title} <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                {t.about.titleSpan}
                            </span>
                        </h2>
                        <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            <p className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                {t.about.desc1}
                            </p>
                            <p>
                                {t.about.desc2}
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl group border-8 border-white dark:border-zinc-800">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop)' }}
                        />
                        {/* Stats Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md p-8 border-t border-white/20">
                            <div className="flex justify-around text-white">
                                <div className="text-center">
                                    <div className="text-4xl font-bold">10+</div>
                                    <div className="text-sm opacity-80">{t.about.experience}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold">25</div>
                                    <div className="text-sm opacity-80">Premium Oda</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold">4.9</div>
                                    <div className="text-sm opacity-80">Müşteri Puanı</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <Testimonials />



            </div>
        </div>
    );
}
