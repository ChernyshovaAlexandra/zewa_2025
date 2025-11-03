export type ItemKind =
  | 'book'
  | 'ball'
  | 'roller'
  | 'pencil-red'
  | 'pencil-blue'
  | 'pencil-yellow'
  | 'books-stack'
  | 'palette'
  | 'ruler'
  | 'triangle-ruler'
  | 'sharpener'
  | 'sharpener2'
  | 'scissors'
  | 'pen'
  | 'zewa1'
  | 'zewa2'
  | 'zewa3'
  | 'zewa4'
  | 'zewa5'
  | 'zewa6'
  | 'zewa7'
  | 'hammer'
  | 'boomerang'
  | 'slingshot'
  | 'tennis-racket'
  | 'gamepad'
  | 'skateboard'
  | 'girya'
  | 'iron'
  | 'icecream'
  | 'headphones'
  | 'kettle'
  | 'hairdryer';

export interface ItemMeta {
  kind: ItemKind;
  texture: string;
  radius: number;
  scale: 1;
  width: number;
  height: number;
  isGood: boolean;
  isZewaProduct?: boolean;
  spawnWeight?: number;
  spawnLimit?: number;
}

export const coinMeta = {
  texture: './assets/images/coin3.png',
  width: 48,
  height: 48,
  isGood: true,
};

export const ITEM_CATALOG: Record<ItemKind, ItemMeta> = {
  book: {
    kind: 'book',
    texture: './assets/images/items/book.png',
    radius: 1,
    scale: 1,
    width: 92,
    height: 84,
    isGood: true,
  },
  girya: {
    kind: 'girya',
    texture: './assets/images/items/girya.png',
    radius: 1,
    scale: 1,
    width: 64,
    height: 85,
    isGood: false,
  },
  icecream: {
    kind: 'icecream',
    texture: './assets/images/items/icecream.png',
    radius: 1,
    scale: 1,
    width: 41,
    height: 85,
    isGood: false,
  },
  iron: {
    kind: 'iron',
    texture: './assets/images/items/iron.png',
    radius: 1,
    scale: 1,
    width: 100,
    height: 85,
    isGood: false,
  },
  kettle: {
    kind: 'kettle',
    texture: './assets/images/items/kettle.png',
    radius: 1,
    scale: 1,
    width: 84,
    height: 85,
    isGood: false,
  },
  hairdryer: {
    kind: 'hairdryer',
    texture: './assets/images/items/hairdryer.png',
    radius: 1,
    scale: 1,
    width: 94,
    height: 85,
    isGood: false,
  },
  palette: {
    kind: 'palette',
    texture: './assets/images/items/palette.png',
    radius: 1,
    scale: 1,
    width: 80,
    height: 69,
    isGood: true,
  },
  scissors: {
    kind: 'scissors',
    texture: './assets/images/items/scissors.png',
    radius: 1,
    scale: 1,
    width: 82,
    height: 61,
    isGood: true,
  },
  pen: {
    kind: 'pen',
    texture: './assets/images/items/pen.png',
    radius: 1,
    scale: 1,
    width: 42,
    height: 68.5,
    isGood: true,
  },
  sharpener: {
    kind: 'sharpener',
    texture: './assets/images/items/sharpener.png',
    radius: 1,
    scale: 1,
    width: 44,
    height: 43,
    isGood: true,
  },
  sharpener2: {
    kind: 'sharpener2',
    texture: './assets/images/items/sharpener2.png',
    radius: 1,
    scale: 1,
    width: 47,
    height: 44,
    isGood: true,
  },
  ruler: {
    kind: 'ruler',
    texture: './assets/images/items/ruler.png',
    radius: 1,
    scale: 1,
    width: 31.5,
    height: 65,
    isGood: true,
  },
  'triangle-ruler': {
    kind: 'triangle-ruler',
    texture: './assets/images/items/triangle-ruler.png',
    radius: 1,
    scale: 1,
    width: 93,
    height: 56,
    isGood: true,
  },
  'books-stack': {
    kind: 'books-stack',
    texture: './assets/images/items/books-stack.png',
    radius: 1,
    scale: 1,
    width: 104,
    height: 105,
    isGood: true,
  },
  'pencil-red': {
    kind: 'pencil-red',
    texture: './assets/images/items/pencil-red.png',
    radius: 1,
    scale: 1,
    width: 54,
    height: 58,
    isGood: true,
  },
  'pencil-blue': {
    kind: 'pencil-blue',
    texture: './assets/images/items/pencil-blue.png',
    radius: 1,
    scale: 1,
    width: 54,
    height: 46,
    isGood: true,
  },
  'pencil-yellow': {
    kind: 'pencil-yellow',
    texture: './assets/images/items/pencil-yellow.png',
    radius: 1,
    scale: 1,
    width: 54,
    height: 44,
    isGood: true,
  },

  ball: {
    kind: 'ball',
    texture: './assets/images/items/ball.png',
    radius: 1,
    scale: 1,
    width: 82,
    height: 82,
    isGood: false,
  },
  roller: {
    kind: 'roller',
    texture: './assets/images/items/skates.png',
    radius: 1,
    scale: 1,
    width: 92.5,
    height: 91,
    isGood: false,
  },
  zewa1: {
    kind: 'zewa1',
    texture: './assets/images/items/zewa1.png',
    radius: 1,
    scale: 1,
    width: 25,
    height: 48,
    isGood: true,
    isZewaProduct: true,
  },
  zewa2: {
    kind: 'zewa2',
    texture: './assets/images/items/zewa2.png',
    radius: 1,
    scale: 1,
    width: 25,
    height: 48,
    isGood: true,
    isZewaProduct: true,
  },
  zewa3: {
    kind: 'zewa3',
    texture: './assets/images/items/zewa3.png',
    radius: 1,
    scale: 1,
    width: 25,
    height: 48,
    isGood: true,
    isZewaProduct: true,
  },
  zewa4: {
    kind: 'zewa4',
    texture: './assets/images/items/zewa4.png',
    radius: 1,
    scale: 1,
    width: 25,
    height: 48,
    isGood: true,
    isZewaProduct: true,
  },
  zewa5: {
    kind: 'zewa5',
    texture: './assets/images/items/zewa5.png',
    radius: 1,
    scale: 1,
    width: 25,
    height: 48,
    isGood: true,
    isZewaProduct: true,
  },
  zewa6: {
    kind: 'zewa6',
    texture: './assets/images/items/zewa6.png',
    radius: 1,
    scale: 1,
    width: 55,
    height: 35,
    isGood: true,
    isZewaProduct: true,
  },
  zewa7: {
    kind: 'zewa7',
    texture: './assets/images/items/zewa7.png',
    radius: 1,
    scale: 1,
    width: 55,
    height: 35,
    isGood: true,
    isZewaProduct: true,
  },

  hammer: {
    kind: 'hammer',
    texture: './assets/images/items/hammer.png',
    radius: 1,
    scale: 1,
    width: 86,
    height: 75,
    isGood: false,
  },
  boomerang: {
    kind: 'boomerang',
    texture: './assets/images/items/boomerang.png',
    radius: 1,
    scale: 1,
    width: 60,
    height: 60,
    isGood: false,
  },
  slingshot: {
    kind: 'slingshot',
    texture: './assets/images/items/slingshot.png',
    radius: 1,
    scale: 1,
    width: 45,
    height: 63,
    isGood: false,
  },
  'tennis-racket': {
    kind: 'tennis-racket',
    texture: './assets/images/items/tennis-racket.png',
    radius: 1,
    scale: 1,
    width: 110,
    height: 153,
    isGood: false,
  },
  gamepad: {
    kind: 'gamepad',
    texture: './assets/images/items/gamepad.png',
    radius: 1,
    scale: 1,
    width: 70,
    height: 48,
    isGood: false,
  },
  skateboard: {
    kind: 'skateboard',
    texture: './assets/images/items/skateboard.png',
    radius: 1,
    scale: 1,
    width: 130,
    height: 120,
    isGood: false,
  },
  headphones: {
    kind: 'headphones',
    texture: './assets/images/items/headphones.png',
    radius: 1,
    scale: 1,
    width: 65,
    height: 60,
    isGood: false,
  },
};
