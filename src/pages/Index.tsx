import { useState } from 'react';

const Index = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-[#9b87f5] via-[#7E69AB] to-[#10b981] bg-[length:200%_200%] animate-gradient-shift">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <h1 
          className={`text-7xl md:text-9xl lg:text-[12rem] font-black text-white tracking-tight leading-none cursor-pointer select-none transition-transform ${isAnimating ? 'animate-bounce-text' : ''}`}
          onClick={handleClick}
        >
          Abobe
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-green-200 to-white">
            Meow
          </span>
        </h1>
        
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="h-1 w-16 bg-white/80 rounded-full"></div>
          <div className="h-1 w-8 bg-white/60 rounded-full"></div>
          <div className="h-1 w-4 bg-white/40 rounded-full"></div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm font-light tracking-widest">
        MODERN DESIGN
      </div>
    </div>
  );
};

export default Index;
