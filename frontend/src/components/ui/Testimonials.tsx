import { useLanguage } from '@/context/LanguageContext';

interface TestimonialsProps {
    variant?: 'grid' | 'scroll';
}

export function Testimonials({ variant = 'grid' }: TestimonialsProps) {
    const { t } = useLanguage();

    const mockImages = [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop', // Maria
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop', // Jenny
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop', // Neslihan
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'  // Adrian
    ];



    if (!t.about.testimonials) return null;

    // Double the items for infinite scroll effect
    const testimonials = variant === 'scroll'
        ? [...t.about.testimonials, ...t.about.testimonials]
        : t.about.testimonials;

    return (
        <div className={`relative ${variant === 'grid' ? 'py-24 my-16 rounded-[3rem]' : 'py-16'} overflow-hidden`}>
            {/* Background Image - Only for Grid View */}
            {variant === 'grid' && (
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop)' }}
                    />
                    <div className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm" />
                </>
            )}

            <div className={`relative z-10 ${variant === 'grid' ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : 'w-full'}`}>
                <div className="text-center mb-16 space-y-4">
                    <h2 className={`text-3xl md:text-5xl font-bold ${variant === 'grid' ? 'text-white' : 'text-zinc-900 dark:text-white'} mb-4`}>
                        Misafirlerimiz Neler Söylüyor?
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.about.testimonials.map((review: any, index: number) => (
                        <div key={index} className="group relative bg-white/10 dark:bg-zinc-900/40 backdrop-blur-md p-8 pt-12 rounded-3xl border border-white/20 dark:border-white/10 shadow-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 mt-8">

                            {/* Profile Image */}
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                <div className="relative w-16 h-16 rounded-full p-1 bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg">
                                    <img
                                        src={mockImages[index % mockImages.length]}
                                        alt={review.name}
                                        className="w-full h-full rounded-full object-cover border-2 border-white/20"
                                    />
                                </div>
                            </div>

                            <div className="flex text-yellow-400 mb-6 mt-4 justify-center">
                                {[...Array(review.rating)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-100 dark:text-gray-200 mb-6 italic text-sm leading-relaxed opacity-90 font-light text-center">
                                "{review.text}"
                            </p>
                            <div className="pt-6 border-t border-white/10 text-center">
                                <span className="font-medium text-white tracking-wide">
                                    {review.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
