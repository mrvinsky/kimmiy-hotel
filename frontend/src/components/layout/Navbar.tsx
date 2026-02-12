'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const navLinks = [
        { href: '/', label: t.navbar.home },
        { href: '/rooms', label: t.navbar.rooms },
        { href: '/services', label: t.navbar.services },
        { href: '/about', label: t.navbar.about },
        { href: '/contact', label: t.navbar.contact },
    ];

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'EN', label: 'English', flag: '🇬🇧' },
        { code: 'SR', label: 'Srpski', flag: '🇷🇸' },
        { code: 'ZH', label: '中文', flag: '🇨🇳' },
    ];

    const currentFlag = languages.find(l => l.code === language)?.flag || '🇹🇷';

    return (
        <nav className="fixed top-4 left-4 right-4 z-50 bg-white/35 backdrop-blur-xl border border-white/25 dark:bg-zinc-900/40 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 font-bold text-2xl tracking-tighter text-zinc-900 dark:text-white">
                        KIMMIY HOTEL
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Language Switcher Desktop */}
                            <div className="relative">
                                <button
                                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                                    className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                >
                                    <span className="text-lg">{currentFlag}</span>
                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{language}</span>
                                </button>

                                {langMenuOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white/80 backdrop-blur-xl dark:bg-zinc-900/80 rounded-xl shadow-xl border border-white/20 dark:border-white/10 py-2 overflow-hidden">
                                        {languages.map((langItem) => (
                                            <button
                                                key={langItem.code}
                                                onClick={() => {
                                                    setLanguage(langItem.code);
                                                    setLangMenuOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors ${language === langItem.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'text-zinc-700 dark:text-zinc-300'}`}
                                            >
                                                <span className="text-xl">{langItem.flag}</span>
                                                <span className="text-sm font-medium">{langItem.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/rooms"
                                className="bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
                            >
                                {t.navbar.bookNow}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-2 rounded-lg"
                        >
                            <span className="text-xl">{currentFlag}</span>
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-zinc-700 hover:text-zinc-900 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Language Menu (Dropdown style below header for mobile) */}
            {langMenuOpen && (
                <div className="md:hidden absolute top-20 right-4 w-48 bg-white/80 backdrop-blur-xl dark:bg-zinc-900/80 rounded-xl shadow-xl border border-white/20 dark:border-white/10 py-2 overflow-hidden z-50">
                    {languages.map((langItem) => (
                        <button
                            key={langItem.code}
                            onClick={() => {
                                setLanguage(langItem.code);
                                setLangMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors ${language === langItem.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'text-zinc-700 dark:text-zinc-300'}`}
                        >
                            <span className="text-xl">{langItem.flag}</span>
                            <span className="text-sm font-medium">{langItem.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/15 backdrop-blur-xl dark:bg-zinc-900/30 border-t border-white/10 absolute w-full z-40 rounded-b-2xl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/rooms"
                            className="block w-full text-center mt-4 bg-zinc-900 text-white px-5 py-3 rounded-md text-base font-medium hover:bg-zinc-800"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.navbar.bookNow}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
