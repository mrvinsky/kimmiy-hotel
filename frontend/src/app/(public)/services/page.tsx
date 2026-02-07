'use client';

import Link from 'next/link';
import { Hero } from '@/components/ui/Hero';
import { useLanguage } from '@/context/LanguageContext';


export default function ServicesPage() {
    const { t } = useLanguage();
    // const [lang, setLang] = useState<Language>('TR'); -> Removed
    // const t = translations[lang]; -> Removed

    const services = [
        {
            icon: '✈️',
            title: t.services.transfer.title,
            desc: t.services.transfer.desc,
            bg: 'from-blue-500/10 to-purple-500/10'
        },
        {
            icon: '🍳',
            title: t.services.restaurant.title,
            desc: t.services.restaurant.desc,
            bg: 'from-orange-500/10 to-red-500/10'
        },
        {
            icon: '📶',
            title: t.services.wifi.title,
            desc: t.services.wifi.desc,
            bg: 'from-emerald-500/10 to-teal-500/10'
        },
        {
            icon: '🅿️',
            title: t.services.parking.title,
            desc: t.services.parking.desc,
            bg: 'from-zinc-500/10 to-gray-500/10'
        }
    ];

    return (
        <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-900">
            {/* LanguageSwitcher removed */}

            {/* Split Hero Section containing VIP Transfer Highlight */}
            <div className="relative pt-32 pb-12 lg:pt-48 lg:pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <div className="space-y-8 relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold tracking-wider text-sm uppercase">
                                <span>✨</span>
                                <span>{t.services.title}</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white leading-tight">
                                {t.services.transfer.title}
                            </h1>

                            <p className="text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-lg">
                                {t.services.transfer.desc} <br className="hidden md:block" />
                                {t.services.transfer.desc} <br className="hidden md:block" />
                                {/* removed redundant check */}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/rooms"
                                    className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
                                >
                                    <span>🚙</span>
                                    <span>{t.navbar.bookNow}</span>
                                </Link>
                            </div>
                        </div>

                        {/* Image Content */}
                        <div className="relative h-[500px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group rotate-3 hover:rotate-0 transition-transform duration-700 border-4 border-white dark:border-zinc-800">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop)' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-8 left-8 right-8 backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl text-white">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-600 rounded-xl">
                                        <span className="text-2xl">⚡</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">VIP Service</p>
                                        <p className="text-sm text-white/80">24/7 Available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-gradient-to-l from-blue-50 dark:from-blue-900/10 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.slice(1).map((service, idx) => (
                        <div
                            key={idx}
                            className={`group relative overflow-hidden backdrop-blur-xl bg-white/50 dark:bg-zinc-900/40 border border-white/20 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
                        >
                            {/* Decorative background gradient */}
                            <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br ${service.bg} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700`}></div>

                            <div className="relative z-10 flex flex-col items-start gap-4">
                                <span className="text-5xl mb-2 p-4 bg-white/50 dark:bg-white/5 rounded-2xl shadow-inner border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </span>
                                <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
