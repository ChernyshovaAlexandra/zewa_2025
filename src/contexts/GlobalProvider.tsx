/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, FC, ReactNode, useContext, useEffect } from 'react';

import AudioManager from '@/helpers/AudioManager';
import { Prize } from '@/types';

interface GlobalContextProps {
  isLogged: boolean;
  prizes?: Prize[];
  status: string;
  modal: boolean;
  points: number;
  setIsLogged: (isLogged: boolean) => void;
  setStatus: (status: string) => void;
  setModal: (modal: boolean) => void;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  activePanel: string;
  activeView: string;
  setActivePanel: React.Dispatch<React.SetStateAction<string>>;
  setActiveView: React.Dispatch<React.SetStateAction<string>>;
  turnOnAudio: (enabled: boolean) => void;
  audio: boolean;
  playSound: (sound: number) => void;
  animatedCoin: boolean;
  animateCoin: (arg: boolean) => void;
  audioManager: typeof AudioManager;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [status, setStatus] = useState('');
  const [modal, setModal] = useState(false);
  const [points, setPoints] = useState(0);
  const [activePanel, setActivePanel] = useState('main');
  const [activeView, setActiveView] = useState('view_initial');
  const [prizes] = useState<Prize[]>();
  const [animatedCoin, animateCoin] = useState(true);

  const [audio, turnOnAudio] = useState(false);

  useEffect(() => {
    AudioManager.initializeAudio();
  }, []);

  useEffect(() => {
    AudioManager.setAudioEnabled(audio);
    if (audio) {
      AudioManager.playBackgroundMusic();
    } else {
      AudioManager.stopBackgroundMusic();
    }
  }, [audio]);

  // Обновление управления звуками через AudioManager
  const playSound = (sound: number) => {
    switch (sound) {
      case 1:
        AudioManager.playLaughSound();
        break;
      case 2:
        AudioManager.playBrrSound();
        break;
      case 3:
        AudioManager.playoOwSound();
        break;
      case 4:
        AudioManager.playUguhSound();
        break;
      case 5:
        AudioManager.playCutPaperSound();
        break;
      case 6:
        AudioManager.playToiletPaperSound();
        break;
      case 7:
        AudioManager.stopToiletPaperSound();
        break;
      default:
        AudioManager.playLaughSound();
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        status,
        modal,
        points,
        setIsLogged,
        setStatus,
        setModal,
        setPoints,
        activePanel,
        setActivePanel,
        setActiveView,
        activeView,
        prizes,
        audio,
        turnOnAudio,
        playSound,
        animatedCoin,
        animateCoin,
        audioManager: AudioManager,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};

export default useGlobal;
