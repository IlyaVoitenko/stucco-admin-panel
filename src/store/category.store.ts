import { create } from "zustand";

interface CategoryState {
  image: string | null;
  name: string | null;
  id: number | null;

  setSelectedCategory: (value: {
    image: string | null;
    name: string | null;
    id: number | null;
  }) => void;
}

export const useCategory = create<CategoryState>((set) => ({
  image: null,
  name: null,
  id: null,

  setSelectedCategory: (value: {
    image: string | null;
    name: string | null;
    id: number | null;
  }) => set({ image: value.image, name: value.name, id: value.id }),
}));
