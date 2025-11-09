/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, FC, ReactNode, useContext } from 'react';
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
  animatedCoin: boolean;
  animateCoin: (arg: boolean) => void;
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

        animatedCoin,
        animateCoin,
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
