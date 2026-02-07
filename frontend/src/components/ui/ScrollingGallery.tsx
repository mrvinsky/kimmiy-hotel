'use client';

import { motion } from 'framer-motion';

const images = [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop', // Hotel Exterior
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1964&auto=format&fit=crop', // Room
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop', // Restaurant
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', // Pool/Exterior
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop', // Lounge
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop', // Exterior Night
];

export function ScrollingGallery() {
    return (
        <div className="w-full overflow-hidden">
            <div className="flex">
                <motion.div
                    className="flex space-x-6 flex-nowrap"
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30, // Adjust speed here
                    }}
                    style={{ width: "max-content" }}
                >
                    {/* Double the images to create seamless loop */}
                    {[...images, ...images].map((src, idx) => (
                        <div
                            key={idx}
                            className="relative w-[300px] h-[200px] md:w-[400px] md:h-[300px] shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/20 group cursor-pointer"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url(${src})` }}
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
