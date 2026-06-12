import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SavedItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
};

type SavedState = {
  items: SavedItem[];
  toggle: (item: SavedItem) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useSaved = create<SavedState>()(
  persist(
    (set) => ({
      items: [],
      toggle: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id);
          return {
            items: exists
              ? state.items.filter((i) => i.id !== item.id)
              : [...state.items, item],
          };
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: "crown-saved" }
  )
);