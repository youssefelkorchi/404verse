import { useEffect, useRef, useState } from 'react';
import { Home, Star } from 'lucide-react';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stars = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  const geometricElements = [
    { id: 1, type: 'circle', size: 120, left: 15, top: 20, rotation: 0 },
    { id: 2, type: 'triangle', size: 80, left: 85, top: 15, rotation: 45 },
    { id: 3, type: 'square', size: 60, left: 90, top: 75, rotation: 0 },
    { id: 4, type: 'pentagon', size: 100, left: 10, top: 80, rotation: 0 },
  ];

  const handleReturnHome = () => {
    // In a real app, this would navigate to home
    window.location.href = '/';
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen overflow-hidden relative flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #0B0B2B 0%, #2C1B47 100%)',
      }}
    >
      {/* Animated Background Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div className="w-full h-full bg-white rounded-full opacity-70" />
        </div>
      ))}

      {/* Shooting Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="shooting-star" />
        <div className="shooting-star" style={{ animationDelay: '5s' }} />
        <div className="shooting-star" style={{ animationDelay: '12s' }} />
      </div>

      {/* Floating Geometric Elements */}
      {geometricElements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-float opacity-20"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px) rotate(${element.rotation}deg)`,
            animationDelay: `${element.id * 0.5}s`,
            animationDuration: `${4 + element.id}s`,
          }}
        >
          {element.type === 'circle' && (
            <div className="w-full h-full border-2 border-purple-300 rounded-full" />
          )}
          {element.type === 'triangle' && (
            <div className="w-full h-full border-2 border-blue-300 polygon-triangle" />
          )}
          {element.type === 'square' && (
            <div className="w-full h-full border-2 border-pink-300 rotate-45" />
          )}
          {element.type === 'pentagon' && (
            <div className="w-full h-full border-2 border-cyan-300 polygon-pentagon" />
          )}
        </div>
      ))}

      {/* Main Content */}
      <div 
        className="text-center z-10 px-4 sm:px-6 lg:px-8"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      >
        {/* Large 404 Text */}
        <div
          className={`text-8xl sm:text-9xl lg:text-[12rem] font-bold text-white mb-8 transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(147, 51, 234, 0.2)',
            letterSpacing: '0.05em',
          }}
        >
          404
        </div>

        {/* Main Heading */}
        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            animationDelay: '0.3s',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
          }}
        >
          Lost in Space?
        </h1>

        {/* Subheading */}
        <p
          className={`text-lg sm:text-xl lg:text-2xl text-purple-300 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            animationDelay: '0.6s',
          }}
        >
          Houston, we have a problem. This page doesn't exist in our universe.
        </p>

        {/* Return Button */}
        <button
          onClick={handleReturnHome}
          className={`group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg rounded-full transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            animationDelay: '0.9s',
            boxShadow: '0 10px 30px rgba(147, 51, 234, 0.3)',
          }}
          aria-label="Return to homepage"
        >
          <Home size={24} className="transition-transform duration-300 group-hover:scale-110" />
          <span>Return to Earth</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </button>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 opacity-30">
          <Star size={16} className="text-yellow-300 animate-pulse" />
        </div>
        <div className="absolute -bottom-4 -right-4 opacity-30">
          <Star size={20} className="text-blue-300 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes shootingStar {
          0% {
            transform: translateX(-100px) translateY(100px);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) translateY(-100px);
            opacity: 0;
          }
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .shooting-star {
          position: absolute;
          top: 20%;
          left: -10px;
          width: 2px;
          height: 2px;
          background: linear-gradient(45deg, #ffffff, #87ceeb);
          border-radius: 50%;
          animation: shootingStar 8s linear infinite;
        }

        .shooting-star::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50px;
          height: 2px;
          background: linear-gradient(45deg, transparent, #ffffff, transparent);
          transform-origin: 0 0;
          transform: translateX(-50px);
        }

        .polygon-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          border: none;
          background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent);
        }

        .polygon-pentagon {
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
          border: none;
          background: linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.3), transparent);
        }

        @media (max-width: 768px) {
          .shooting-star {
            width: 1px;
            height: 1px;
          }

          .shooting-star::before {
            width: 30px;
            height: 1px;
            transform: translateX(-30px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-twinkle,
          .animate-float,
          .shooting-star {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default App;