'use client';

import { motion } from 'framer-motion';

const images = [
    '/gallery/1.jpg',
    '/gallery/2.jpg',
    '/gallery/3.jpg',
    '/gallery/4.jpg',
    '/gallery/5.jpg',
    // Duplicate some to ensure loop smoothness if needed, or rely on component loop logic
    '/gallery/1.jpg',
    '/gallery/2.jpg',
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
