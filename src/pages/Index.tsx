import { useState, useEffect, useRef } from 'react';

interface EmojiEvent {
  id: number;
  emoji: string;
  position: number;
}

const EMOJI_LIST = ['🐕', '🦄', '🐉', '🦖', '🚀', '🛸', '🐱', '🦊', '🐺', '🦁', '🐒', '🦅', '🐘', '🦈', '🐧', '🦇', '🐍', '🦋', '🐢', '🦑'];

const Index = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [score, setScore] = useState(0);
  const [activeEmojis, setActiveEmojis] = useState<EmojiEvent[]>([]);
  const [showScreamer, setShowScreamer] = useState(false);
  const emojiIdCounterRef = useRef(0);
  const lastMilestoneRef = useRef(0);
  const lastScreamerRef = useRef(0);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (showScreamer) return;
    
    setIsAnimating(true);
    setScore(prev => prev + 1);
    
    if (!clickAudioRef.current) {
      clickAudioRef.current = new Audio('https://www.myinstants.com/media/sounds/fart-with-reverb.mp3');
      clickAudioRef.current.volume = 0.2;
    }
    clickAudioRef.current.currentTime = 0;
    clickAudioRef.current.play().catch(() => {});
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    const currentMilestone = Math.floor(score / 15) * 15;
    
    if (score > 0 && score % 15 === 0 && currentMilestone > lastMilestoneRef.current) {
      const randomEmoji = EMOJI_LIST[Math.floor(Math.random() * EMOJI_LIST.length)];
      const randomPosition = Math.random() * 60 + 20;
      
      const newEmojiId = emojiIdCounterRef.current;
      const newEmoji: EmojiEvent = {
        id: newEmojiId,
        emoji: randomEmoji,
        position: randomPosition,
      };
      
      emojiIdCounterRef.current += 1;
      setActiveEmojis(prev => [...prev, newEmoji]);
      lastMilestoneRef.current = currentMilestone;
      
      setTimeout(() => {
        setActiveEmojis(prev => prev.filter(e => e.id !== newEmojiId));
      }, 3000);
    }
  }, [score]);

  useEffect(() => {
    const currentScreamerMilestone = Math.floor(score / 150) * 150;
    
    if (score > 0 && score % 150 === 0 && currentScreamerMilestone > lastScreamerRef.current) {
      lastScreamerRef.current = currentScreamerMilestone;
      
      if (clickAudioRef.current) {
        clickAudioRef.current.pause();
        clickAudioRef.current.currentTime = 0;
      }
      
      const screamerAudio = new Audio('https://www.myinstants.com/media/sounds/woman-scream.mp3');
      screamerAudio.volume = 1.0;
      screamerAudio.play().catch(() => {});
      
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 400, 100, 200]);
      }
      
      setShowScreamer(true);
      
      setTimeout(() => {
        setShowScreamer(false);
      }, 3000);
    }
  }, [score]);

  const progressPercentage = ((score % 150) / 150) * 100;

  if (showScreamer) {
    return (
      <div className="min-h-screen w-full fixed inset-0 z-50 bg-black">
        <img 
          src="https://cdn.poehali.dev/files/1000023709.png" 
          alt="Screamer" 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-[#9b87f5] via-[#7E69AB] to-[#10b981] bg-[length:200%_200%] animate-gradient-shift">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 animate-fade-in">
        <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border-2 border-white/40">
          <p className="text-2xl font-bold text-white">
            🎯 Очки: <span className="text-yellow-200">{score}</span>
          </p>
        </div>
        
        <div className="mt-3 w-full bg-white/20 backdrop-blur-sm rounded-full h-4 border-2 border-white/40 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="h-full w-full animate-pulse bg-white/20"></div>
          </div>
        </div>
      </div>

      {activeEmojis.map((emojiEvent) => (
        <div 
          key={emojiEvent.id}
          className="absolute text-9xl animate-dog-run z-30"
          style={{ bottom: `${emojiEvent.position}%` }}
        >
          {emojiEvent.emoji}
        </div>
      ))}
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300/20 rounded-full blur-lg animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-green-300/15 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-pink-300/20 rounded-full blur-lg animate-float-delayed"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-yellow-300/15 rounded-full blur-xl animate-float"></div>
        
        <div className="absolute top-1/4 left-1/2 text-white/5 text-9xl animate-spin-slow">✨</div>
        <div className="absolute bottom-1/4 right-1/4 text-white/5 text-7xl animate-spin-slow">🌟</div>
        <div className="absolute top-1/2 left-1/4 text-white/5 text-6xl animate-float">💫</div>
        <div className="absolute bottom-1/3 left-1/3 text-white/5 text-8xl animate-float-delayed">⭐</div>
      </div>
      
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