'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
    {
        src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
        alt: 'Dış Görünüm',
        title: 'Merkezi Konum',
        desc: 'Şehrin kalbinde, her yere yakın.'
    },
    {
        src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1964&auto=format&fit=crop',
        alt: 'Lüks Odalar',
        title: 'Konforlu Odalar',
        desc: 'Modern tasarım ve rahatlık bir arada.'
    },
    {
        src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
        alt: 'Restoran',
        title: 'Leziz Mutfak',
        desc: 'Dünya mutfağından seçkin lezzetler.'
    }
];

export function LocationGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative h-[400px] md:h-[500px] group rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${images[currentIndex].src})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 p-8 text-white z-10 w-full">
                <motion.div
                    key={`text-${currentIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="text-3xl font-bold mb-2">{images[currentIndex].title}</h3>
                    <p className="text-white/80">{images[currentIndex].desc}</p>
                </motion.div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 text-white border border-white/20"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 text-white border border-white/20"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute top-4 right-4 flex space-x-2 z-20">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
}
