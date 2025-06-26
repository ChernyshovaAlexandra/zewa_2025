import React from "react";
import { ScrollContainer, StyledCell, Bubble, Zewa, StyledSpan, StyledSpanPink, SpanDraw, PrizeImg } from "./styles";
import { Button } from "../prizes/style";
import { Icon20CheckAlt } from "@vkontakte/icons";
import useGlobal from "@/contexts/GlobalProvider";
import useAuth from "@/contexts/AuthProvider";
import { prize_types_data } from "../prizes/mocks";
import useWindowSize from "@/helpers/windowSize";

interface PrizesListProps {
    isDrawerOpen: boolean;
}

const PrizesList: React.FC<PrizesListProps> = ({ isDrawerOpen }) => {
    const { prizes, setActivePanel } = useGlobal();
    const { userData } = useAuth();
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const prizeRefs = React.useRef<Array<HTMLDivElement | null>>([]); // refs for each prize
    const { isMobile } = useWindowSize();
    // Активированные и новые купоны из данных пользователя
    const activatedCouponsArray = React.useMemo(
        () => userData?.user.this_period_activated_coupons.map(i => ({
            activated: true,
            points: i.points_cost,
            value: i.value,
            type: "coupon",
            name: `Купон на скидку ${i.value}%`
        })) || [],
        [userData]
    );

    const newCouponsArray = React.useMemo(
        () => userData?.user.this_period_new_coupons.map(i => ({
            points: i.points_cost,
            value: i.value,
            type: "coupon",
            name: `Купон на скидку ${i.value}%`
        })) || [],
        [userData]
    );

    // Обработка и модификация списка призов с учетом купонов
    const modifiedPrizes = React.useMemo(() => {
        if (!prizes) return [];

        // Добавляем пустой приз в начало массива
        const emptyPrize = {
            points: 0,
            type: "empty",
            name: "",
            new: false,
            activated: false,
        };

        const result = prizes.reduce((acc, prize) => {
            const matchingNewCoupons = newCouponsArray.filter(coupon =>
                coupon.points === prize.points && prize.type === "coupon");

            const matchingActivatedCoupons = activatedCouponsArray.filter(coupon =>
                coupon.points === prize.points && prize.type === "coupon");

            if (matchingNewCoupons.length > 0) {
                matchingNewCoupons.forEach((coupon) => {
                    acc.push({
                        ...prize,
                        name: `Купон на скидку ${coupon.value}%`,
                        points: coupon.points,
                        type: "coupon",
                        new: true,
                    });
                });
            } else if (matchingActivatedCoupons.length > 0) {
                matchingActivatedCoupons.forEach((coupon) => {
                    acc.push({
                        ...prize,
                        name: `Купон на скидку ${coupon.value}%`,
                        points: coupon.points,
                        type: "coupon",
                        activated: true,
                    });
                });
            } else {
                acc.push(prize);
            }

            return acc;
        }, [] as typeof prizes);

        // Сортируем весь массив и добавляем пустой приз перед остальными
        return [emptyPrize, ...result.sort((a, b) => a.points - b.points)];
    }, [prizes, newCouponsArray, activatedCouponsArray]);


    const lastActivatedIndex = modifiedPrizes.reduce((lastIndex, prize, index) => {
        if (!userData) return 0
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
                    ref={el => { prizeRefs.current[id] = el }}
                    $isEmpty={prize.type === "empty"}
                    $isOpen={isDrawerOpen}

                    $isActivated={id === 0 ? true : (points >= prize.points)}
                    $showPaper={id === lastActivatedIndex}
                    key={`${prize.points}-${id}`}>
                    <Bubble
                        $isOpen={isDrawerOpen}
                        $activated={(points >= prize.points) || isActivated || isNewCoupon || false}
                    >
                        <StyledSpanPink>
                            {prize.type === "coupon" ? null :
                                points >= prize.points ? <SpanDraw>Участвуете</SpanDraw> : null
                            }
                        </StyledSpanPink>

                        {prize.type !== "coupon" &&
                            <>
                                {!isMobile && (points < prize.points) &&
                                    <video
                                        style={{
                                            position: "absolute",
                                            zIndex: 1,
                                            top: "-1rem",
                                            opacity: .5
                                        }}
                                        autoPlay controls={false} loop src="/lottie/prize.webm" />}

                                <PrizeImg>
                                    <source srcSet={prize_types_data[prize.name]?.img_thumb} type="image/webp" />
                                    <img src={prize_types_data[prize.name]?.img_thumb} alt={prize.name} />
                                </PrizeImg>
                            </>
                        }

                        <StyledSpan>
                            {(prize.type !== "coupon" && prize.name.includes("Сертификат")) ?
                                "Сертификат" :
                                prize.name
                            }
                        </StyledSpan>
                        <div style={{ position: "relative", zIndex: 16 }}>
                            {isNewCoupon && (
                                <Button variant="accent" onClick={() => setActivePanel("prizes")}>
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
                    <Zewa $isOpen={isDrawerOpen}
                        $isActivated={id === 0 ? true : (userData.user.points >= prize.points)}
                    >
                        {prize.points}
                    </Zewa>
                </StyledCell>
            );
        });
    }, [modifiedPrizes, isDrawerOpen, setActivePanel, userData]);

    const scrollToLastActivatedPrize = () => {
        if (scrollContainerRef.current && prizeRefs.current[lastActivatedIndex]) {
            const prizeElement = prizeRefs.current[lastActivatedIndex];
            const scrollContainer = scrollContainerRef.current;

            if (prizeElement) {
                const prizeRect = prizeElement.getBoundingClientRect();
                const containerRect = scrollContainer.getBoundingClientRect();

                // Вычисляем позицию, на которую нужно прокрутить контейнер
                const offset = prizeRect.left - containerRect.left + scrollContainer.scrollLeft - prizeRect.width;

                // Прокручиваем контейнер
                scrollContainer.scrollTo({
                    left: offset,
                    behavior: 'smooth'
                });
            }
        }
    };

    React.useEffect(() => {
        if (!scrollContainerRef.current) return;
        scrollContainerRef.current.scrollTo({ left: 1000000 });

        const animationDelay = 900;

        const timer = setTimeout(() => {
            if (isDrawerOpen) {
                scrollToLastActivatedPrize();
            }
            else {
                // setPaperWidth('23%');
            }
        }, animationDelay);

        return () => clearTimeout(timer);
    }, [isDrawerOpen, modifiedPrizes, userData]);

    return (
        <ScrollContainer
            getRef={scrollContainerRef}
            showArrows={isMobile ? false : true}
            getScrollToLeft={(i) => i - 250}
            getScrollToRight={(i) => i + 250}
            scrollOnAnyWheel={true}>
            <div style={{ position: "relative", zIndex: 10 }}>
                {renderPrizeCells}
            </div>
        </ScrollContainer>
    );
};


export default React.memo(PrizesList);
