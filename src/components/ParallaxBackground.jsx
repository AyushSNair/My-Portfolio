import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";

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
  const mountain3Y = scrollProgress * 1250;
  const mountain2Y = scrollProgress * 30;
  const mountain1Y = scrollProgress * 0;
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

      {/* Mountain Layer 3 */}
<div
  className="absolute inset-0"
  style={{
    backgroundImage: "url(/assets/mountain-3.png)",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    transform: `translateY(${mountain3Y}px)`,
    zIndex: +10,
  }}
/>

{/* Mountain Layer 2 */}
<motion.div
  className="absolute inset-0"
  style={{
    backgroundImage: "url(/assets/mountain-2.png)",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: +20,
  }}
  animate={{ y: mountain2Y }}
  transition={{ type: "tween", ease: "linear", duration: 0 }}
/>

{/* Mountain Layer 1 */}
<motion.div
  className="absolute inset-0"
  style={{
    backgroundImage: "url(/assets/mountain-1.png)",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: +40,
  }}
  animate={{ y: mountain1Y }}
  transition={{ type: "tween", ease: "linear", duration: 0 }}
/>

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
      <style>{`
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
      
      
    </div>
  );
};

export default Demo;