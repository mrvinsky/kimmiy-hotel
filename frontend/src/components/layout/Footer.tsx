'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

import { useState } from 'react';
import api from '@/lib/api';

export function Footer() {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubscribe = async () => {
        if (!email) return;
        setStatus('loading');
        try {
            await api.post('/subscribers', { email });
            setStatus('success');
            setEmail('');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <footer className="bg-[#292524] text-[#f5f5f4] pt-24 pb-12 border-t border-[#44403c]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top Section with Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 pb-12 border-b border-zinc-900">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">{t.footer.newsletter.title}</h2>
                        <p className="text-zinc-400">{t.footer.newsletter.description}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-4">
                            <input
                                type="email"
                                placeholder={t.footer.newsletter.placeholder}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading' || status === 'success'}
                                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-900 transition-all text-white disabled:opacity-50"
                            />
                            <button
                                onClick={handleSubscribe}
                                disabled={status === 'loading' || status === 'success'}
                                className="px-8 py-4 bg-white text-zinc-950 font-bold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
                            >
                                {status === 'loading' ? '...' : t.footer.newsletter.button}
                            </button>
                        </div>
                        {status === 'success' && <p className="text-emerald-500 text-sm ml-2">✓ {t.footer.newsletter.success || 'Subscribed successfully!'}</p>}
                        {status === 'error' && <p className="text-red-500 text-sm ml-2">⚠ {t.footer.newsletter.error || 'Subscription failed.'}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold tracking-tighter">KIMMIY HOTEL</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            {t.footer.brandDesc}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">{t.footer.sections.discover}</h4>
                        <ul className="space-y-4 text-sm text-zinc-400">
                            <li><Link href="/" className="hover:text-white transition-colors">{t.footer.links.home}</Link></li>
                            <li><Link href="/rooms" className="hover:text-white transition-colors">{t.footer.links.rooms}</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">{t.footer.links.services}</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">{t.footer.links.about}</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">{t.footer.sections.services}</h4>
                        <ul className="space-y-4 text-sm text-zinc-400">
                            <li><Link href="/services" className="hover:text-white transition-colors">{t.footer.links.transfer}</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">{t.footer.links.restaurant}</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">{t.footer.links.spa}</Link></li>
                            <li><Link href="/rooms" className="hover:text-white transition-colors">{t.footer.links.meeting}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">{t.footer.sections.contact}</h4>
                        <ul className="space-y-4 text-sm text-zinc-400">
                            <li className="flex items-start gap-3">
                                <span className="text-zinc-600">📍</span>
                                <span>Surčin, Belgrad, Sırbistan</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-zinc-600">📞</span>
                                <span>+381 11 123 4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-zinc-600">✉️</span>
                                <span>info@kimmiyhotel.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900 text-sm text-zinc-500">
                    <p>&copy; {new Date().getFullYear()} Kimmiy Hotel. {t.footer.rights}</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
                        <Link href="#" className="hover:text-white transition-colors">{t.footer.terms}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
