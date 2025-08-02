import { useState, useEffect, useMemo } from "react";

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll events with throttling for performance
  useEffect(() => {
    let ticking = false;
    
    const updateScrollY = () => {
      setScrollY(window.scrollY);
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollY);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
    return () => window.removeEventListener('scroll', requestTick);
  }, []);

  // Calculate parallax offsets
  const scrollProgress = Math.min(scrollY / (window.innerHeight || 1000), 1);
  const mountain3Y = scrollProgress * 50;
  const mountain2Y = scrollProgress * 25;
  const mountain1Y = scrollProgress * 10;
  const cloudsX = scrollProgress * -15;

  // Generate optimized falling stars
  const stars = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 10,
      duration: 3 + Math.random() * 4,
      size: 1 + Math.random() * 2,
    }));
  }, []);

  return (
    <section className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Gradient Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900" />
      
      {/* Twinkling Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Falling Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute opacity-80"
            style={{
              left: `${star.left}%`,
              top: "-10px",
              animationDelay: `${star.animationDelay}s`,
            }}
          >
            <div
              className="w-0.5 bg-gradient-to-b from-white to-transparent animate-bounce"
              style={{
                height: `${star.size * 20}px`,
                animation: `fallingStar ${star.duration}s linear infinite`,
                animationDelay: `${star.animationDelay}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Floating Clouds */}
      <div
        className="absolute inset-0 opacity-20 transition-transform duration-75"
        style={{ transform: `translateX(${cloudsX}%)` }}
      >
        <div className="absolute top-20 left-10 w-32 h-16 bg-white/10 rounded-full blur-sm" />
        <div className="absolute top-32 right-20 w-24 h-12 bg-white/8 rounded-full blur-sm" />
        <div className="absolute top-16 left-1/3 w-28 h-14 bg-white/6 rounded-full blur-sm" />
      </div>

      {/* Mountain Layer 3 - Furthest */}
      <div
        className="absolute inset-0 transition-transform duration-75"
        style={{ transform: `translateY(${mountain3Y}%)` }}
      >
        <svg
          className="absolute bottom-0 w-full h-96 text-slate-800/60"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          <path
            d="M0,400 L0,200 Q300,100 600,180 Q900,80 1200,160 L1200,400 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Mountain Layer 2 - Middle */}
      <div
        className="absolute inset-0 transition-transform duration-75"
        style={{ transform: `translateY(${mountain2Y}%)` }}
      >
        <svg
          className="absolute bottom-0 w-full h-80 text-slate-700/80"
          viewBox="0 0 1200 350"
          preserveAspectRatio="none"
        >
          <path
            d="M0,350 L0,250 Q200,150 400,200 Q600,120 800,180 Q1000,140 1200,200 L1200,350 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Mountain Layer 1 - Closest */}
      <div
        className="absolute inset-0 transition-transform duration-75"
        style={{ transform: `translateY(${mountain1Y}%)` }}
      >
        <svg
          className="absolute bottom-0 w-full h-64 text-slate-600"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
        >
          <path
            d="M0,300 L0,220 Q150,180 300,200 Q450,160 600,190 Q750,170 900,185 Q1050,160 1200,180 L1200,300 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Foreground Glow Effect */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-purple-900/20 to-transparent" />

      {/* Content Area */}
      {/* <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Parallax Magic
          </h1>
          <p className="text-xl opacity-80">Scroll to see the magic happen</p>
        </div>
      </div> */}

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes fallingStar {
          0% {
            transform: translateY(-10px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(50px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

// Demo component with scrollable content
const Demo = () => {
  return (
    <div className="relative">
      <ParallaxBackground />
      
      {/* Scrollable content */}
      <div className="relative z-20 bg-transparent">
        <div className="h-screen" /> {/* Spacer for parallax effect */}
        
        <div className="bg-gradient-to-b from-slate-900 to-black text-white p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-center mb-8">Content Section</h2>
            
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-2xl font-semibold mb-4">Section {i + 1}</h3>
                <p className="text-gray-300 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;