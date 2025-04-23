import { create } from 'zustand';

interface AffirmationState {
  affirmations: string[];
  currentIndex: number;
  nextAffirmation: () => void;
  previousAffirmation: () => void;
  shuffleAffirmations: () => void;
  speakAffirmation: (text: string) => void;
}

const defaultAffirmations = [
  "I am stronger than my urges and gain power every time I resist.",
  "My brain is rewiring itself to healthier patterns with each day.",
  "I choose to fill my life with meaningful activities that fuel my growth.",
  "I deserve a life free from addictive behaviors that don't serve me.",
  "Every challenge I overcome makes me mentally stronger.",
  "I am in control of my actions and make conscious choices.",
  "My streak represents my commitment to the person I'm becoming.",
  "I honor my future self by making positive choices today.",
  "I am creating new neural pathways that support my goals.",
  "My willpower is like a muscle that grows stronger with every challenge."
];

export const useAffirmationsStore = create<AffirmationState>((set, get) => ({
  affirmations: defaultAffirmations,
  currentIndex: 0,
  
  nextAffirmation: () => {
    set((state) => ({
      currentIndex: (state.currentIndex + 1) % state.affirmations.length
    }));
  },
  
  previousAffirmation: () => {
    set((state) => ({
      currentIndex: (state.currentIndex - 1 + state.affirmations.length) % state.affirmations.length
    }));
  },
  
  shuffleAffirmations: () => {
    set((state) => {
      const shuffled = [...state.affirmations].sort(() => Math.random() - 0.5);
      return { affirmations: shuffled, currentIndex: 0 };
    });
  },
  
  speakAffirmation: (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 0.9;
      speech.pitch = 1.0;
      window.speechSynthesis.speak(speech);
    }
  }
}));