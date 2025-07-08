import React from 'react';
import {
  DrawerContent,
  DrawerWrapper,
  PaperRoll, PaperUnrolled, RollingLine
} from './styles';
import useGlobal from '@/contexts/GlobalProvider';
import DomovenokImages from './DomovenokImages';
import PrizesList from './PrizesList';
import { Text } from '@/shared/ui';
import { Vtylka } from './Vtylka';

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
        <Text align="center" size="p1" weight={900} color="#1235AB">
          Шкала призов
        </Text>
        {/* {isDrawerOpen && (
          <RollingLine $isOpen={isDrawerOpen}>
            <PaperUnrolled $width={paperWidth}>
              <PaperRoll />
              <Vtylka />
            </PaperUnrolled>
          </RollingLine>
        )} */}
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
