import React from 'react';
import {
  ArrowIcon,
  DrawerContent,
  DrawerHeader,
  DrawerWrapper,
  Gradient,
  PaperRoll,
  PaperUnrolled,
  RollingLine,
} from './styles';
import useGlobal from '@/contexts/GlobalProvider';
import DomovenokImages from './DomovenokImages';
import PrizesList from './PrizesList';

const PrizesScale: React.FC = () => {
  const { prizes, audioManager } = useGlobal();

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [paperWidth, setPaperWidth] = React.useState('23%');

  const toggleDrawer = React.useCallback(
    (e: React.SyntheticEvent) => {
      audioManager.playClickSound();
      // isDrawerOpen ? audioManager.playoOwSound() : audioManager.playLaughSound();
      e.stopPropagation();
      setDrawerOpen(!isDrawerOpen);
    },
    [isDrawerOpen, audioManager],
  );

  React.useEffect(() => {
    setPaperWidth('95%');
  }, []);

  if (!prizes) return null;

  return (
    <>
      <DrawerWrapper $isOpen={isDrawerOpen}>
        <Gradient $isOpen={isDrawerOpen} />
        <RollingLine $isOpen={isDrawerOpen}>
          <PaperUnrolled $width={paperWidth}>
            <PaperRoll />
          </PaperUnrolled>
        </RollingLine>
        <DrawerHeader onClick={toggleDrawer}>
          <ArrowIcon $isOpen={isDrawerOpen} />
          <h3>Шкала призов</h3>
        </DrawerHeader>
        <DrawerContent $isOpen={isDrawerOpen}>
          <PrizesList isDrawerOpen={isDrawerOpen} />
        </DrawerContent>
      </DrawerWrapper>
      <DomovenokImages isDrawerOpen={isDrawerOpen} paperWidth={paperWidth} />
    </>
  );
};

export default React.memo(PrizesScale);
