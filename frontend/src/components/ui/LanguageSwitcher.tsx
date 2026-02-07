'use client';

import { motion } from 'framer-motion';
import { translations, Language } from '@/lib/translations';
import { useState } from 'react';

interface LanguageSwitcherProps {
    currentLang: Language;
    onLanguageChange: (lang: Language) => void;
}

export function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false);

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'TR', label: 'Türkçe', flag: '🇹🇷' },
        { code: 'EN', label: 'English', flag: '🇬🇧' },
        { code: 'SR', label: 'Srpski', flag: '🇷🇸' },
        { code: 'ZH', label: '中文', flag: '🇨🇳' },
    ];

    return (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
            <div className="backdrop-blur-xl bg-white/10 dark:bg-black/40 border border-white/20 p-2 rounded-full shadow-2xl flex flex-col gap-2">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => onLanguageChange(lang.code)}
                        className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${currentLang === lang.code
                                ? 'bg-white/20 shadow-inner scale-110 border border-white/40'
                                : 'hover:bg-white/10'
                            }`}
                        title={lang.label}
                    >
                        <span className="text-xl" role="img" aria-label={lang.label}>
                            {lang.flag}
                        </span>
                        {currentLang === lang.code && (
                            <motion.div
                                layoutId="activeLang"
                                className="absolute inset-0 rounded-full border-2 border-blue-400"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
