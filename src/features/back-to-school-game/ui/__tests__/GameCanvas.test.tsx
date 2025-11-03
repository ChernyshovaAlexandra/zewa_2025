/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, beforeEach, expect } from 'vitest';

vi.mock('@pixi/react', () => ({
  Stage: ({ children }: any) => <div data-testid="stage">{children}</div>,
  Container: ({ children }: any) => <div>{children}</div>,
  Sprite: ({ children }: any) => <div>{children}</div>,
  useTick: () => {},
}));

vi.mock('@/hooks', () => ({
  useContainerSize: () => ({ ref: { current: null }, width: 300, height: 200 }),
}));

import { GameCanvas } from '../GameCanvas';
import { useGameModelStore } from '@/features/back-to-school-game/model/gameModelStore';

const setCanvasWidth = vi.fn();

beforeEach(() => {
  useGameModelStore.setState({ x: 0, setCanvasWidth });
});

describe('GameCanvas', () => {
  it('renders stage and backpack', () => {
    render(<GameCanvas />);
    expect(screen.getByTestId('stage')).toBeInTheDocument();
    expect(setCanvasWidth).toHaveBeenCalledWith(300);
  });
});
