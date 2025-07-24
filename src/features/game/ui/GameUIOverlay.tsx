/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { useGameModelStore } from '@/features/game/model/gameModelStore';
import { renderPauseModal } from '@/features/game/lib';
import { HeartIcon, PauseIcon } from '@/shared/ui';
import { Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export const GameUIOverlay = () => {
  const score = useGameModelStore((s) => s.score);
  const lives = useGameModelStore((s) => s.lives);
  const coins = useGameModelStore((s) => s.coins);
  const coins_available = useGameModelStore((s) => s.coins_available);

  const navigate = useNavigate();
  const coinTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // сохраняем ссылку глобально
    if (coinTargetRef.current) {
      (window as any).__coinTarget = coinTargetRef.current;
    }
  }, []);

  return (
    <Wrapper>
      <TopRow>
        <InfoBlock>
          <Flex gap="4px">
            {Array.from({ length: 3 }).map((_, i) => (
              <HeartIcon key={i} fill={i < lives ? '#F23177' : 'none'} stroke="#F23177" />
            ))}
          </Flex>
        </InfoBlock>
        <Flex gap="10px">
          <InfoBlock>
            <Flex gap="15px">
              {coins_available ? (
                <Flex gap="4px" align="center">
                  <div style={{ width: 'fit-content', height: 'fit-content' }} ref={coinTargetRef}>
                    <img src="./assets/images/items/coin3.png" alt="иконка монета" />
                  </div>
                  {coins}/{coins_available}
                </Flex>
              ) : <></>}
              <Flex gap="4px" align="center">
                <img src="./assets/images/backpack-icon.png" alt="иконка рюкзак" />
                {score}
              </Flex>
            </Flex>
          </InfoBlock>
          <InfoBlock
            style={{ width: '50px', height: '50px' }}
            as="button"
            onClick={() => {
              renderPauseModal(navigate);
            }}
          >
            <PauseIcon />
          </InfoBlock>
        </Flex>
      </TopRow>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  /* pointer-events: none; */
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
`;

export const InfoBlock = styled.div`
  border-radius: var(--10, 10px);
  background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
  box-shadow:
    0px 1px 2px 0px rgba(255, 255, 255, 0.6) inset,
    0px -2px 3px 0px #b3c7e9 inset,
    0px 3px 0px 0px #b3c7e9,
    0px 5px 5px 0px rgba(0, 53, 116, 0.3);
  height: 50px;
  padding: 0px 10px;
  display: grid;
  place-items: center;
  color: #1235ab;
  text-align: center;
  font-family: 'Foco Trial';
  font-size: 21px;
  font-style: normal;
  font-weight: 900;
  line-height: 1.5;
  border: none;

  svg {
    width: 20px;
    height: 20px;
  }
  img {
    width: 25px;
    height: auto;
    flex-shrink: 0;
    display: block;
    object-fit: contain;
  }
`;
