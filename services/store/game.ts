import { create } from 'zustand';
import { SoundLibrary, sound } from '@pixi/sound';
import { THRUST } from '~~/constant/flappypuppy';

sound.add('fly', '/images/game/flappypuppy/sound/flap.wav');
sound.add('die', '/images/game/flappypuppy/sound/die.wav');
sound.add('score', '/images/game/flappypuppy/sound/score.wav');
sound.add('start', '/images/game/flappypuppy/sound/start.wav');

type GameState = {
    screen: {width: number, height: number};
    scale: number,
    pipeSize: { width: number , height: number },
    birdSize: { width: number , height: number },
    gap: number,
    initGame: boolean,
    score: number,
    gameState: boolean,
    birdX: number,
    birdY: number,
    birdR: number,
    speed: number,
    birdCash: boolean,
    playerAccount: string,
    totalScore: number,
    pipe: { x: number, y: number , moved: boolean },
    setScreen: (newScreen: { width: number, height: number }) => void;
    setPlayerAccount: (account: string, score: number) => void;
    insScore: () => void;
    updateGameState: (newState: any) => void;
    setBirdCash: () => void;
    updateBirdY: (newBirdY: number) => void;
    updateBirdR: (newBirdR: number) => void;
    changeSpeed: (newSpeed: number) => void;
    updatePipePosition: (newX: number, newY: number, newState: boolean) => void;
    updateGameStart: () => void;
    sound: SoundLibrary;
    setScale: (newScale: number) => void;
    setBirdSize: (newBirdSize: any) => void;
    setPipeSize: (newSize: any) => void;
    setGap: (newGap: number) => void;
    setInitGame: () => void;
};

export const useStore = create<GameState>(set => ({
  totalScore: 0,
  playerAccount: "0x42F10Bb701ed230222aC6F748320040A0e3ddfAD",
  sound: sound,
  scale: 1,
  gap: 84,
  screen: { width: 0, height: 0 },
  birdSize: { width: 39 , height: 38  },
  initGame: false,
  birdCash: false,
  score: 0,
  gameState: false,
  birdX: 100,
  birdY: 140,
  birdR: 81.7,
  speed: 0,
  pipe: { x: 476, y: 20 , moved: false },
  pipeSize: { width: 52 , height: 400 },
  setScale: (newScale: number) => set({ scale: newScale }),
  setPipeSize: (newSize: any) => set({ pipeSize: newSize }),
  setBirdSize: (newBirdSize: any) => set({ birdSize: newBirdSize }),
  setGap: (newGap: number) => set({ gap: newGap }),
  setScreen: (newScreen: any) => set({ screen: newScreen }),
  setInitGame: () => set({ initGame: true, score: 0 }),
  insScore: () => set((state: { score: number; }) => ({ score: state.score + 1 })),
  updateGameState: (newState: any) => set({ gameState: newState }),
  updateBirdY: (newBirdY: number) => set({ birdY: newBirdY }),
  updateBirdR: (newBirdR: number) => set({ birdR: newBirdR }),
  changeSpeed: (newSpeed: number) => set({ speed: newSpeed }),
  flap: () => set((state: { speed: number; }) => ({ speed: state.speed - THRUST})),
  updatePipePosition: (newX: number, newY: number, newState: boolean) => set({ pipe: { x: newX, y: newY, moved: newState } }),
  setBirdCash: () => set(() => ({ birdCash: true})),
  updateGameStart: () => set(() => ({ pipe: { x: 476, y: 100 , moved: false }, birdY: 140, speed: 0, score: 0, birdR: 81.7, birdCash: false, gameState: false, initGame: false})),
  setPlayerAccount: (account: string, score: number) => set({playerAccount: account, totalScore: score}),
}));
