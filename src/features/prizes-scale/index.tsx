import React from 'react';
import { DrawerContent, DrawerWrapper, ScaleTitle } from './styles';
import DomovenokImages from './DomovenokImages';
import PrizesList from './PrizesList';

const SWIPE_THRESHOLD = 50;
const HANDLE_ACTIVE_ZONE = 80;

const PrizesScale: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [paperWidth, setPaperWidth] = React.useState('0%');
  const swipeStartYRef = React.useRef<number | null>(null);
  const isSwipeActiveRef = React.useRef(false);
  const skipClickOnceRef = React.useRef(false);

  const updateDrawerState = React.useCallback(
    (nextOpen: boolean) => {
      if (nextOpen === isDrawerOpen) return;
      setDrawerOpen(nextOpen);
    },
    [isDrawerOpen],
  );

  const toggleDrawer = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.stopPropagation();

      if (skipClickOnceRef.current) {
        skipClickOnceRef.current = false;
        return;
      }

      updateDrawerState(!isDrawerOpen);
    },
    [isDrawerOpen, updateDrawerState],
  );

  React.useEffect(() => {
    setPaperWidth('95%');
  }, []);

  const resetSwipeTracking = React.useCallback(() => {
    swipeStartYRef.current = null;
    isSwipeActiveRef.current = false;
  }, []);

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetY = event.clientY - rect.top;
      const isWithinHandle = !isDrawerOpen || offsetY <= HANDLE_ACTIVE_ZONE;

      isSwipeActiveRef.current = isWithinHandle;
      swipeStartYRef.current = isWithinHandle ? event.clientY : null;
    },
    [isDrawerOpen],
  );

  const handlePointerUp = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isSwipeActiveRef.current || swipeStartYRef.current === null) {
        resetSwipeTracking();
        return;
      }

      const deltaY = event.clientY - swipeStartYRef.current;
      if (Math.abs(deltaY) >= SWIPE_THRESHOLD) {
        skipClickOnceRef.current = true;
        if (deltaY < 0) {
          updateDrawerState(true);
        } else {
          updateDrawerState(false);
        }
      }

      resetSwipeTracking();
    },
    [resetSwipeTracking, updateDrawerState],
  );

  return (
    <>
      <DrawerWrapper
        $isOpen={isDrawerOpen}
        onClick={toggleDrawer}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={resetSwipeTracking}
        onPointerCancel={resetSwipeTracking}
      >
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
