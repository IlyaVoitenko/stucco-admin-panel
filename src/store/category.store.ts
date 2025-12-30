import { create } from "zustand";
import type { Category } from "../types";

interface CategoryState extends Category {
  setSelectedCategory: (value: Category) => void;
}

export const useCategory = create<CategoryState>((set) => ({
  hasWidth: false,
  hasHeight: false,
  hasDepth: false,
  hasDiameter: false,
  image: null,
  name: null,
  id: null,

  setSelectedCategory: (value: Category) => set({ ...value }),
}));
