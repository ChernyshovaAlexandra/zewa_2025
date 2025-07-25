import React, { useCallback } from 'react';
import {
  ScrollContainer,
  StyledCell,
  Bubble,
  Zewa,
  StyledSpan,
  StyledSpanPink,
  SpanDraw,
  PrizeImg,
} from './styles';

import useWindowSize from '@/helpers/windowSize';
import { prize_types_data } from '../prizes/mocks';
import { useUserStore } from '@/shared/model';
import { Coupon } from '@/types';
import { ZewaButton } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';

interface PrizesListProps {
  isDrawerOpen: boolean;
}

const PrizesList: React.FC<PrizesListProps> = ({ isDrawerOpen }) => {
  const userData = useUserStore((s) => s.userData);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const prizeRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const { isMobile } = useWindowSize();
  const navigate = useNavigate();
  // Активированные и новые купоны из данных пользователя
  const activatedCouponsArray = React.useMemo(
    () =>
      userData?.coupons?.map((i: Coupon) => ({
        activated: true,
        points: i.points,
        type: 'coupon',
        name: i.name,
      })) || [],
    [userData],
  );

  const modifiedPrizes = React.useMemo(() => {
    if (!userData) return [];

    const emptyPrize = {
      points: 0,
      type: 'empty',
      name: '',
      new: false,
      activated: false,
    };

    const coupons = activatedCouponsArray;

    const prizesWithoutDuplicates = userData.prizes.filter(
      (p) => !coupons.some((c) => c.points === p.points),
    );

    const sorted = [...prizesWithoutDuplicates, ...coupons].sort((a, b) => a.points - b.points);

    return [emptyPrize, ...sorted];
  }, [userData, activatedCouponsArray]);

  const lastActivatedIndex = modifiedPrizes.reduce((lastIndex, prize, index) => {
    if (!userData) return 0;
    if (userData.user.points >= prize.points || prize.activated) {
      return index;
    }
    return lastIndex;
  }, -1);

  const renderPrizeCells = React.useMemo(() => {
    if (!modifiedPrizes.length || !userData) return null;
    const { points } = userData.user;

    return modifiedPrizes.map((prize, id) => {
      const isActivated = prize.activated;

      return (
        <StyledCell
          $isFirstEmpty={id === 1 && points < 2}
          ref={(el) => {
            prizeRefs.current[id] = el;
          }}
          $isEmpty={prize.type === 'empty'}
          $isOpen={isDrawerOpen}
          $isActivated={id === 0 ? true : points >= prize.points}
          $showPaper={id === lastActivatedIndex}
          key={`${prize.points}-${id}`}
        >
          <Bubble $isOpen={isDrawerOpen} $activated={isActivated}>
            <StyledSpanPink>
              {prize.type === 'coupon' ? null : points >= prize.points ? (
                <SpanDraw>Участвуете</SpanDraw>
              ) : null}
            </StyledSpanPink>

            {prize.type !== 'coupon' && (
              <>
                {!isMobile && points < prize.points && (
                  <video
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: '-1rem',
                      opacity: 1,
                    }}
                    autoPlay
                    controls={false}
                    loop
                    src="/lottie/prize.webm"
                  />
                )}

                <PrizeImg src={prize_types_data[prize.name]?.img_thumb} alt={prize.name} />
              </>
            )}

            <StyledSpan maxWidth={100} maxLines={2}>
              {prize.name}
            </StyledSpan>
            {isActivated ? (
              <ZewaButton variant="white-small" onClick={() => navigate('/prizes')}>
                Получить
              </ZewaButton>
            ) : (
              <></>
            )}
          </Bubble>
          <Zewa
            $isOpen={isDrawerOpen}
            $isActivated={id === 0 ? true : userData.user.points >= prize.points}
          >
            {prize.points}
          </Zewa>
        </StyledCell>
      );
    });
  }, [modifiedPrizes, userData, isDrawerOpen, lastActivatedIndex, isMobile, navigate]);

  const scrollToLastActivatedPrize = useCallback(() => {
    if (scrollContainerRef.current && prizeRefs.current[lastActivatedIndex]) {
      const prizeElement = prizeRefs.current[lastActivatedIndex];
      const scrollContainer = scrollContainerRef.current;

      if (prizeElement) {
        const prizeRect = prizeElement.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();

        // Вычисляем позицию, на которую нужно прокрутить контейнер
        const offset =
          prizeRect.left - containerRect.left + scrollContainer.scrollLeft - prizeRect.width;

        // Прокручиваем контейнер
        scrollContainer.scrollTo({
          left: offset,
          behavior: 'smooth',
        });
      }
    }
  }, [lastActivatedIndex]);

  React.useEffect(() => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTo({ left: 1000000 });

    const animationDelay = 900;

    const timer = setTimeout(() => {
      if (isDrawerOpen) {
        scrollToLastActivatedPrize();
      } else {
        // setPaperWidth('23%');
      }
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [isDrawerOpen, modifiedPrizes, scrollToLastActivatedPrize, userData]);

  return (
    <ScrollContainer
      data-twa-scroll="true"
      getRootRef={scrollContainerRef}
      showArrows={false}
      getScrollToLeft={(i) => i - 250}
      getScrollToRight={(i) => i + 250}
      scrollOnAnyWheel
    >
      <div style={{ minWidth: '300px', position: 'relative', zIndex: 10 }}>{renderPrizeCells}</div>
    </ScrollContainer>
  );
};

export default React.memo(PrizesList);
