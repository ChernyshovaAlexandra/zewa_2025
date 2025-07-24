import React, { useCallback } from 'react';
import {
  ScrollContainer,
  Button,
  StyledCell,
  Bubble,
  Zewa,
  StyledSpan,
  StyledSpanPink,
  SpanDraw,
  PrizeImg,
} from './styles';

import { Icon20CheckAlt } from '@vkontakte/icons';
import useGlobal from '@/contexts/GlobalProvider';
import useWindowSize from '@/helpers/windowSize';
import { prize_types_data } from '../prizes/mocks';
import { useUserStore } from '@/shared/model';
import { Coupon } from '@/types';

interface PrizesListProps {
  isDrawerOpen: boolean;
}

const PrizesList: React.FC<PrizesListProps> = ({ isDrawerOpen }) => {
  const { setActivePanel } = useGlobal();
  const userData = useUserStore((s) => s.userData);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const prizeRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const { isMobile } = useWindowSize();
  // Активированные и новые купоны из данных пользователя
  const activatedCouponsArray = React.useMemo(
    () =>
      userData?.user?.this_period_activated_coupons?.map((i: Coupon) => ({
        activated: true,
        points: i.points_cost,
        value: i.value,
        type: 'coupon',
        name: `Купон на скидку ${i.value}%`,
      })) || [],
    [userData],
  );

  const newCouponsArray = React.useMemo(
    () =>
      userData?.user?.this_period_new_coupons?.map((i) => ({
        points: i.points_cost,
        value: i.value,
        type: 'coupon',
        name: `Купон на скидку ${i.value}%`,
      })) || [],
    [userData],
  );

  // Обработка и модификация списка призов с учетом купонов
  const modifiedPrizes = React.useMemo(() => {
    if (!userData?.prizes) return [];

    // Добавляем пустой приз в начало массива
    const emptyPrize = {
      points: 0,
      type: 'empty',
      name: '',
      new: false,
      activated: false,
    };

    const result = userData?.prizes.reduce(
      (acc, prize) => {
        const matchingNewCoupons = newCouponsArray.filter(
          (coupon) => coupon.points === prize.points && prize.type === 'coupon',
        );

        const matchingActivatedCoupons = activatedCouponsArray.filter(
          (coupon) => coupon.points === prize.points && prize.type === 'coupon',
        );

        if (matchingNewCoupons.length > 0) {
          matchingNewCoupons.forEach((coupon) => {
            acc.push({
              ...prize,
              name: `Купон на скидку ${coupon.value}%`,
              points: coupon.points,
              type: 'coupon',
              new: true,
            });
          });
        } else if (matchingActivatedCoupons.length > 0) {
          matchingActivatedCoupons.forEach((coupon) => {
            acc.push({
              ...prize,
              name: `Купон на скидку ${coupon.value}%`,
              points: coupon.points,
              type: 'coupon',
              activated: true,
            });
          });
        } else {
          acc.push(prize);
        }

        return acc;
      },
      [] as typeof userData.prizes,
    );

    // Сортируем весь массив и добавляем пустой приз перед остальными
    return [emptyPrize, ...result.sort((a, b) => a.points - b.points)];
  }, [userData, newCouponsArray, activatedCouponsArray]);

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
      const isNewCoupon = prize.new;

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
          <Bubble
            $isOpen={isDrawerOpen}
            $activated={points >= prize.points || isActivated || isNewCoupon || false}
          >
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
                      opacity: 0.5,
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
              {/* {prize.type !== 'coupon' && prize.name.includes('Сертификат')
                ? 'Сертификат'
                : prize.name} */}
              {prize.name}
            </StyledSpan>
            <div style={{ position: 'relative', zIndex: 16 }}>
              {isNewCoupon && (
                <Button variant="accent" onClick={() => setActivePanel('prizes')}>
                  Получить
                </Button>
              )}
              {isActivated && (
                <Button variant="regular" disabled={true}>
                  Получено <Icon20CheckAlt />
                </Button>
              )}
            </div>
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
  }, [modifiedPrizes, userData, isDrawerOpen, lastActivatedIndex, isMobile, setActivePanel]);

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
