export interface FallingItem {
  id: string;
  x: number;
  y: number;
  speed: number;
  texture: string;
  category: 'good' | 'bad';
}
