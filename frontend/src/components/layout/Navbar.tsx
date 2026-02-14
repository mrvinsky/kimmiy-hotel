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

    const languages: { code: Language; label: string; }[] = [
        { code: 'EN', label: 'English' },
        { code: 'SR', label: 'Srpski' },
        { code: 'ZH', label: '中文' },
    ];

    return (
        <nav className="fixed top-4 left-4 right-4 z-50 bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 relative">

                    {/* Desktop Logo (Left) */}
                    <Link href="/" className="hidden md:block flex-shrink-0 select-none">
                        <img
                            src="/logo.png"
                            alt="Kimmiy Hotel"
                            className="h-[72px] w-auto object-contain rounded-md opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </Link>

                    {/* Mobile Hamburger Button (Left) */}
                    <div className="md:hidden flex items-center z-20">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                    {/* Mobile Logo (Absolute Center) */}
                    <Link href="/" className="md:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-shrink-0 select-none">
                        <img
                            src="/logo.png"
                            alt="Kimmiy Hotel"
                            className="h-14 w-auto object-contain rounded-md opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </Link>

                    {/* Mobile Language Button (Right) */}
                    <div className="md:hidden flex items-center z-20">
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-zinc-300"
                        >
                            <span className="text-sm font-bold">{language}</span>
                        </button>
                    </div>

                    {/* Desktop Menu (Hidden on Mobile) */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Language Switcher Desktop */}
                            <div className="relative">
                                <button
                                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <Globe className="w-4 h-4 text-zinc-400" />
                                    <span className="text-sm font-bold text-zinc-300">{language}</span>
                                </button>

                                {langMenuOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-32 bg-zinc-950 border border-white/10 rounded-xl shadow-xl py-2 overflow-hidden">
                                        {languages.map((langItem) => (
                                            <button
                                                key={langItem.code}
                                                onClick={() => {
                                                    setLanguage(langItem.code);
                                                    setLangMenuOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 flex items-center justify-between hover:bg-white/10 transition-colors ${language === langItem.code ? 'text-blue-400' : 'text-zinc-400'}`}
                                            >
                                                <span className="text-sm font-bold">{langItem.code}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/rooms"
                                className="bg-white text-zinc-950 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
                            >
                                {t.navbar.bookNow}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Language Menu (Dropdown style below header for mobile) */}
            {langMenuOpen && (
                <div className="md:hidden absolute top-20 right-4 w-32 bg-zinc-950 border border-white/10 rounded-xl shadow-xl py-2 overflow-hidden z-50">
                    {languages.map((langItem) => (
                        <button
                            key={langItem.code}
                            onClick={() => {
                                setLanguage(langItem.code);
                                setLangMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/10 transition-colors ${language === langItem.code ? 'text-blue-400' : 'text-zinc-400'}`}
                        >
                            <span className="text-sm font-bold">{langItem.code}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Mobile Menu - Solid Background */}
            {isOpen && (
                <div className="md:hidden bg-zinc-950 border-t border-white/10 absolute w-full z-40 rounded-b-2xl shadow-2xl">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block px-4 py-3 rounded-xl text-base font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/rooms"
                            className="block w-full text-center mt-6 bg-white text-zinc-950 px-5 py-4 rounded-xl text-base font-bold hover:bg-zinc-200 shadow-lg"
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
