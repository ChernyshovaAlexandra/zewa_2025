import styled from 'styled-components';
import { ZewaButton } from '@/shared/ui';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 10px;
  padding-top: calc(
    10px + var(--twa-safe-area-top, 0px) + (min(var(--twa-safe-area-top, 0px), 1px) * 30)
  );
  padding-bottom: calc(
    20px + var(--twa-safe-area-bottom, 0px) + (min(var(--twa-safe-area-bottom, 0px), 1px) * 30)
  );
  height: 100vh;
  background: #182f5d;
  color: #fff;
  box-sizing: border-box;
  touch-action: pan-y;
  --intro-ease: cubic-bezier(0.33, 1, 0.68, 1);
`;

export const SlidesViewport = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 8px;
  user-select: none;
  touch-action: pan-y;
`;

export const SlideTrack = styled.div<{ $offset: number; $isDragging: boolean }>`
  display: flex;
  width: 100%;
  transform: translate3d(${({ $offset }) => $offset}%, 0, 0);
  transition: ${({ $isDragging }) =>
    $isDragging ? 'none' : 'transform 500ms cubic-bezier(0.23, 1, 0.32, 1)'};
  will-change: transform;
`;

export const Slide = styled.div`
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-inline: 6px;
  box-sizing: border-box;
`;

export const Header = styled.h1<{ $introReady: boolean }>`
  color: #fff;
  text-align: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: 'Foco Trial';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%;
  margin-top: 20px;
  white-space: pre-wrap;
  opacity: ${({ $introReady }) => ($introReady ? 1 : 0)};
  transform: translate3d(0, ${({ $introReady }) => ($introReady ? '0' : '8px')}, 0);
  transition:
    opacity 500ms var(--intro-ease),
    transform 500ms var(--intro-ease);
  transition-delay: var(--intro-delay, 0ms);
  will-change: opacity, transform;
`;

export const Image = styled.img<{ $introReady: boolean }>`
  width: 100%;
  background-color: #fff;
  aspect-ratio: 370 / 400;
  object-fit: cover;
  object-position: bottom;
  border-radius: 20px;
  margin-bottom: 15px;
  opacity: ${({ $introReady }) => ($introReady ? 1 : 0)};
  transform: scale(${({ $introReady }) => ($introReady ? 1 : 0.95)});
  transition:
    opacity 500ms var(--intro-ease),
    transform 500ms var(--intro-ease);
  transition-delay: var(--intro-delay, 0ms);
  will-change: opacity, transform;
  max-height: 47vh;

  @media screen and (min-height: 750px) {
    aspect-ratio: 370 / 430;
    max-height: unset;
  }
`;

export const Text = styled.p`
  color: #fff;
  text-align: center;
  font-feature-settings:
    'liga' off,
    'clig' off;

  font-family: 'Foco Trial';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin-top: 8px;
`;

export const Pagination = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export const Dot = styled.span<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? '#fff' : 'rgba(255, 255, 255, 0.5)')};
`;

export const SkipButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-family: 'Foco Trial';
  font-size: 16px;
  margin-top: 8px;
  cursor: pointer;
  text-decoration: underline;
`;

export const ActionButton = styled(ZewaButton)<{ $introReady: boolean }>`
  margin-top: auto;
  width: 180px;
  font-size: 18px;
  font-weight: 700;
  text-transform: none;
  opacity: ${({ $introReady }) => ($introReady ? 1 : 0)};
  transform: translate3d(0, ${({ $introReady }) => ($introReady ? '0' : '8px')}, 0);
  transition:
    opacity 500ms var(--intro-ease),
    transform 500ms var(--intro-ease);
  transition-delay: var(--intro-delay, 0ms);
  will-change: opacity, transform;
`;
