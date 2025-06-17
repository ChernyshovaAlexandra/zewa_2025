import { create } from "zustand";
import type { ItemKind } from "@/features/game/constants/items";

interface SpawnLimitStore {
  limits: Partial<Record<ItemKind, number>>;
  setLimits: (limits: Partial<Record<ItemKind, number>>) => void;
  getLimit: (kind: ItemKind) => number | undefined;
}

export const useSpawnLimitStore = create<SpawnLimitStore>((set, get) => ({
  limits: {},
  setLimits: (limits) => set({ limits }),
  getLimit: (kind) => get().limits[kind],
}));
