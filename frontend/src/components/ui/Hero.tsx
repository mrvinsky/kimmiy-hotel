interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  height?: string;
}

export function Hero({
  title,
  subtitle,
  backgroundImage = '/hero-placeholder.jpg', // Default placeholder
  children,
  height = 'h-[70vh]'
}: HeroProps) {
  return (
    <div className={`relative w-full ${height} flex items-center justify-center text-center overflow-hidden`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-white">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light font-sf-pro tracking-wide mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl sm:text-2xl md:text-3xl font-thin mb-10 text-white/90 tracking-wider">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
