import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          z: 50,  
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="min-h-screen bg-black text-white py-20">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left side - Ryde Project */}
          <div ref={rydeRef} className="flex flex-col justify-center">
            <div className="relative">
              <img 
                src="/assets/project1.png" 
                alt="Ryde App Interface" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="mt-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                On-Demand Rides Made Simple with a Powerful, User-Friendly App called Ryde
              </h2>
              <p className="text-gray-400 text-lg md:text-xl">
                An app built with React Native, Expo, & TailwindCSS for a fast, user-friendly experience.
              </p>
            </div>
          </div>

          {/* Right side - Other Projects */}
          <div className="flex flex-col gap-8">
            <div className="project" ref={libraryRef}>
              <div className="bg-[#FFEFDB] rounded-lg p-6">
                <img
                  src="/assets/project2.png"
                  alt="Library Management Platform"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mt-4">
                The Library Management Platform
              </h2>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div className="bg-[#FFE7EB] rounded-lg p-6">
                <img 
                  src="/assets/project3.png" 
                  alt="YC Directory App"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mt-4">
                YC Directory - A Startup Showcase App
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;