import { useState, useEffect, useRef } from 'react';

interface EmojiEvent {
  id: number;
  emoji: string;
  position: number;
}

const EMOJI_EVENTS = [
  { emoji: '🐕', sound: 'https://cdn.freesound.org/previews/419/419509_7447151-lq.mp3' },
  { emoji: '🦄', sound: 'https://cdn.freesound.org/previews/387/387232_6971891-lq.mp3' },
  { emoji: '🐉', sound: 'https://cdn.freesound.org/previews/442/442774_3248244-lq.mp3' },
  { emoji: '🦖', sound: 'https://cdn.freesound.org/previews/344/344687_5858296-lq.mp3' },
  { emoji: '🚀', sound: 'https://cdn.freesound.org/previews/346/346630_4539788-lq.mp3' },
  { emoji: '🛸', sound: 'https://cdn.freesound.org/previews/156/156859_2538033-lq.mp3' },
  { emoji: '🐱', sound: 'https://cdn.freesound.org/previews/634/634803_10699318-lq.mp3' },
  { emoji: '🦊', sound: 'https://cdn.freesound.org/previews/415/415643_5121236-lq.mp3' },
  { emoji: '🐺', sound: 'https://cdn.freesound.org/previews/320/320873_527080-lq.mp3' },
  { emoji: '🦁', sound: 'https://cdn.freesound.org/previews/546/546116_11861866-lq.mp3' },
  { emoji: '🐒', sound: 'https://cdn.freesound.org/previews/178/178879_1015240-lq.mp3' },
  { emoji: '🦅', sound: 'https://cdn.freesound.org/previews/415/415510_6263379-lq.mp3' },
  { emoji: '🐘', sound: 'https://cdn.freesound.org/previews/391/391660_6885613-lq.mp3' },
  { emoji: '🦈', sound: 'https://cdn.freesound.org/previews/521/521615_1523318-lq.mp3' },
  { emoji: '🐧', sound: 'https://cdn.freesound.org/previews/408/408419_4019029-lq.mp3' },
  { emoji: '🦇', sound: 'https://cdn.freesound.org/previews/345/345852_3905925-lq.mp3' },
  { emoji: '🐍', sound: 'https://cdn.freesound.org/previews/352/352281_6189251-lq.mp3' },
  { emoji: '🦋', sound: 'https://cdn.freesound.org/previews/387/387232_6971891-lq.mp3' },
  { emoji: '🐢', sound: 'https://cdn.freesound.org/previews/424/424850_3976619-lq.mp3' },
  { emoji: '🦑', sound: 'https://cdn.freesound.org/previews/521/521615_1523318-lq.mp3' },
];

const Index = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [score, setScore] = useState(0);
  const [activeEmojis, setActiveEmojis] = useState<EmojiEvent[]>([]);
  const [showScreamer, setShowScreamer] = useState(false);
  const emojiIdCounterRef = useRef(0);
  const lastMilestoneRef = useRef(0);
  const screamerTriggeredRef = useRef(false);

  const handleClick = () => {
    setIsAnimating(true);
    setScore(prev => prev + 1);
    
    const audio = new Audio('https://www.myinstants.com/media/sounds/fart-with-reverb.mp3');
    audio.volume = 0.35;
    audio.play().catch(() => {});
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    const currentMilestone = Math.floor(score / 15) * 15;
    
    if (score > 0 && score % 15 === 0 && currentMilestone > lastMilestoneRef.current) {
      const randomEvent = EMOJI_EVENTS[Math.floor(Math.random() * EMOJI_EVENTS.length)];
      const randomPosition = Math.random() * 60 + 20;
      
      const newEmojiId = emojiIdCounterRef.current;
      const newEmoji: EmojiEvent = {
        id: newEmojiId,
        emoji: randomEvent.emoji,
        position: randomPosition,
      };
      
      emojiIdCounterRef.current += 1;
      setActiveEmojis(prev => [...prev, newEmoji]);
      lastMilestoneRef.current = currentMilestone;
      
      const audio = new Audio(randomEvent.sound);
      audio.volume = 0.6;
      audio.play().catch((err) => console.log('Audio play error:', err));
      
      setTimeout(() => {
        setActiveEmojis(prev => prev.filter(e => e.id !== newEmojiId));
      }, 3000);
    }
  }, [score]);

  useEffect(() => {
    if (score >= 150 && !screamerTriggeredRef.current) {
      screamerTriggeredRef.current = true;
      setShowScreamer(true);
      
      const screamerAudio = new Audio('https://www.myinstants.com/media/sounds/scary-scream.mp3');
      screamerAudio.volume = 1.0;
      screamerAudio.play().catch(() => {});
      
      setTimeout(() => {
        setShowScreamer(false);
      }, 3000);
    }
  }, [score]);

  const progressPercentage = Math.min((score / 150) * 100, 100);

  if (showScreamer) {
    return (
      <div className="min-h-screen w-full fixed inset-0 z-50 animate-fade-in">
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
            🎯 Очки: <span className="text-yellow-200">{score}</span> / 150
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
