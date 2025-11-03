import React from 'react';
import { DrawerContent, DrawerWrapper, ScaleTitle } from './styles';
import useGlobal from '@/contexts/GlobalProvider';
import DomovenokImages from './DomovenokImages';
import PrizesList from './PrizesList';

const PrizesScale: React.FC = () => {
  const { audioManager } = useGlobal();

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [paperWidth, setPaperWidth] = React.useState('0%');

  const toggleDrawer = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.stopPropagation();

      audioManager.playClickSound();
      if (isDrawerOpen) {
        audioManager.playoOwSound();
      } else {
        audioManager.playLaughSound();
      }

      setDrawerOpen(!isDrawerOpen);
    },
    [isDrawerOpen, audioManager],
  );

  React.useEffect(() => {
    setPaperWidth('95%');
  }, []);

  return (
    <>
      <DrawerWrapper $isOpen={isDrawerOpen} onClick={toggleDrawer}>
        <ScaleTitle>Шкала призов</ScaleTitle>

        {isDrawerOpen && (
          <DrawerContent $isOpen={isDrawerOpen}>
            <PrizesList isDrawerOpen={isDrawerOpen} />
          </DrawerContent>
        )}
      </DrawerWrapper>
      {isDrawerOpen && <DomovenokImages isDrawerOpen={isDrawerOpen} paperWidth={paperWidth} />}
    </>
  );
};

export default React.memo(PrizesScale);
