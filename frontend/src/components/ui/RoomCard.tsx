'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface Room {
    id: number;
    name: Record<string, string>;
    description: Record<string, string>;
    price: number;
    capacity: number;
    images: string[];
}

interface RoomCardProps {
    room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { t, language } = useLanguage();

    const nextSlide = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation();
        setCurrentSlide((prev) => (room.images && prev === room.images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation();
        setCurrentSlide((prev) => (room.images && prev === 0 ? room.images.length - 1 : prev - 1));
    };

    // Helper to get localized content safely
    const getName = () => room.name[language] || room.name['EN'] || Object.values(room.name)[0] || '';
    const getDescription = () => room.description[language] || room.description['EN'] || Object.values(room.description)[0] || '';

    return (
        <div className="group relative bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 h-full flex flex-col">
            {/* Image Container */}
            <div className="relative h-72 w-full overflow-hidden group/image">
                {room.images && room.images.length > 0 ? (
                    <>
                        {room.images.map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                alt={`${getName()} - ${index + 1}`}
                                fill
                                className={`object-cover transition-all duration-700 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 absolute inset-0'
                                    }`}
                                priority={index === 0}
                            />
                        ))}

                        {/* Navigation Buttons */}
                        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover/image:opacity-100 transition-opacity">
                            <button
                                onClick={prevSlide}
                                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                            {room.images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-white/50 bg-black/50">Görsel Yok</div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 pointer-events-none"></div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white z-10">
                    <span className="font-bold text-lg">€{room.price}</span>
                    <span className="text-xs text-white/70 ml-1">{t.rooms.night}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow text-white">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{getName()}</h3>

                <p className="text-gray-300 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                    {getDescription()}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="flex items-center space-x-2 text-sm text-gray-300 bg-white/5 p-2 rounded-lg border border-white/5">
                        <span>👥</span>
                        <span>{room.capacity} {t.rooms.capacity}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300 bg-white/5 p-2 rounded-lg border border-white/5">
                        <span>📐</span>
                        <span>35 m²</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300 bg-white/5 p-2 rounded-lg border border-white/5">
                        <span>📶</span>
                        <span>{t.rooms.features.wifi}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300 bg-white/5 p-2 rounded-lg border border-white/5">
                        <span>❄️</span>
                        <span>{t.rooms.features.ac}</span>
                    </div>
                </div>

                <Link
                    href={`/rooms/${room.id}`}
                    className="block w-full text-center bg-white text-zinc-900 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all hover:scale-[1.02] shadow-lg"
                >
                    {t.rooms.detailsButton}
                </Link>
            </div>
        </div>
    );
}
