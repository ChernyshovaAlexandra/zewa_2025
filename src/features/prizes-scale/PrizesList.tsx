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
  ButtonScale,
} from './styles';

import { prize_types_data } from '../prizes/mocks';
import { useUserStore } from '@/shared/model';
// import { Coupon } from '@/types';
import { useNavigate } from 'react-router-dom';
import { Coupon } from '@/types';

interface PrizesListProps {
  isDrawerOpen: boolean;
}

const PrizesList: React.FC<PrizesListProps> = ({ isDrawerOpen }) => {
  const userData = useUserStore((s) => s.userData);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const prizeRefs = React.useRef<Array<HTMLDivElement | null>>([]);
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
  }, [activatedCouponsArray, userData]);
  // const modifiedPrizes = React.useMemo(() => {
  //   return [
  //     { points: 0, type: 'empty', name: '', new: false, activated: false },
  //     {
  //       points: 10,
  //       name: 'Купон на 20%',
  //       value: 10,
  //       code: 'dasdasd',
  //       activated: true,
  //       type: 'coupon',
  //     },
  //     {
  //       points: 20,
  //       name: 'Годовой запас Zewa',
  //       value: 20,
  //       code: 'dasdasd',
  //       activated: true,
  //       type: 'prize',
  //     },
  //     {
  //       points: 30,
  //       name: '1',
  //       value: 20,
  //       code: 'dasdasd',
  //       activated: false,
  //       type: 'coupon',
  //     },
  //     {
  //       points: 40,
  //       name: '1',
  //       value: 20,
  //       code: 'dasdasd',
  //       activated: false,
  //       type: 'coupon',
  //     },
  //     {
  //       points: 90,
  //       name: '1',
  //       value: 20,
  //       code: 'dasdasd',
  //       activated: false,
  //       type: 'coupon',
  //     },
  //   ];
  // }, []);

  const lastActivatedIndex = modifiedPrizes.reduce((lastIndex, prize, index) => {
    if (!userData) return 0;
    if (userData.user.coins >= prize.points || prize.activated) {
      return index;
    }
    return lastIndex;
  }, -1);

  const renderPrizeCells = React.useMemo(() => {
    if (!modifiedPrizes.length || !userData) return null;
    const { coins: points } = userData.user;

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
            {prize.type === 'coupon' ? null : points >= prize.points ? (
              <StyledSpanPink>
                <SpanDraw>Участвуете в розыгрыше</SpanDraw>{' '}
              </StyledSpanPink>
            ) : null}

            {prize.type !== 'coupon' && (
              <>
                <PrizeImg src={prize_types_data[prize.name]?.img_thumb} alt={prize.name} />
              </>
            )}

            <StyledSpan>{prize.name}</StyledSpan>
            {isActivated && prize.type !== 'prize' ? (
              <ButtonScale variant="white-small" onClick={() => navigate('/prizes')}>
                Мои призы
              </ButtonScale>
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
  }, [isDrawerOpen, lastActivatedIndex, modifiedPrizes, navigate, userData]);

  const scrollToLastActivatedPrize = useCallback(() => {
    if (scrollContainerRef.current && prizeRefs.current[lastActivatedIndex]) {
      const prizeElement = prizeRefs.current[lastActivatedIndex];
      const scrollContainer = scrollContainerRef.current;

      if (prizeElement) {
        const prizeRect = prizeElement.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();

        const offset =
          prizeRect.left - containerRect.left + scrollContainer.scrollLeft - prizeRect.width;

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
