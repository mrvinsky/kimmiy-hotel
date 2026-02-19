'use client';

import { Hero } from '@/components/ui/Hero';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
    const { t } = useLanguage();

    return (
        <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-900">

            <Hero
                key="contact-hero"
                title={t.contact.badge}
                subtitle={t.contact.title}
                backgroundImage="https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=2070&auto=format&fit=crop"
                height="h-[60vh]"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-32 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 shadow-2xl rounded-3xl overflow-hidden">

                    {/* Contact Info (Dark Glass Side) */}
                    <div className="lg:col-span-1 backdrop-blur-xl bg-zinc-900/80 dark:bg-black/60 border border-white/10 text-white p-12 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                        </div>

                        <div className="space-y-8 relative z-10">
                            <h2 className="text-3xl font-bold">{t.contact.infoTitle}</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                {t.hero.description.split('.')[0]}.
                            </p>

                            <div className="space-y-6 mt-8">
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                                        📍
                                    </div>
                                    <div>
                                        <p className="font-bold text-zinc-300 mb-1">{t.contact.address}</p>
                                        <p className="font-medium">Surčin, Belgrad, Sırbistan</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                                        📞
                                    </div>
                                    <div>
                                        <p className="font-bold text-zinc-300 mb-1">{t.contact.phone}</p>
                                        <p className="font-medium hover:text-blue-400 transition-colors cursor-pointer">+381 11 123 4567</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                                        ✉️
                                    </div>
                                    <div>
                                        <p className="font-bold text-zinc-300 mb-1">{t.contact.email}</p>
                                        <p className="font-medium hover:text-blue-400 transition-colors cursor-pointer">info@kimmiyhotel.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-zinc-800 relative z-10">
                            {/* Socials placeholder */}
                            <div className="flex gap-4">
                                {['instagram', 'twitter', 'facebook'].map((social) => (
                                    <div key={social} className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all cursor-pointer">
                                        <span className="capitalize text-xs">{social[0]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Glass Side) */}
                    <div className="lg:col-span-2 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40 border border-white/10 p-12 lg:p-16 relative">
                        <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white relative z-10">{t.contact.formTitle}</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{t.contact.form.name}</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-700/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all backdrop-blur-sm"
                                        placeholder="..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{t.contact.form.email}</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-700/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all backdrop-blur-sm"
                                        placeholder="..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 relative z-10">
                                <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{t.contact.form.subject}</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-700/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all backdrop-blur-sm"
                                    placeholder="..."
                                />
                            </div>

                            <div className="space-y-2 relative z-10">
                                <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{t.contact.form.message}</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-zinc-200/50 dark:border-zinc-700/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none backdrop-blur-sm"
                                    placeholder="..."
                                ></textarea>
                            </div>

                            <button className="px-8 py-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold rounded-xl hover:scale-105 transition-transform shadow-lg w-full md:w-auto">
                                {t.contact.form.button}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-24 h-[400px] rounded-3xl overflow-hidden shadow-xl border border-white/20">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.7!2d20.2!3d44.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDQ4JzAwLjAiTiAyMMKwMTInMDAuMCJF!5e0!3m2!1sen!2srs!4v1600000000000!5m2!1sen!2srs"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'grayscale(100%) invert(10%) contrast(80%)' }}
                        allowFullScreen
                        loading="lazy"
                        className="dark:invert dark:grayscale"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
