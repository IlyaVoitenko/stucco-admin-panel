import { create } from "zustand";
import type { Category } from "../types";

interface CategoryState extends Category {
  setSelectedCategory: (value: Category) => void;
  setCategoryList: (value: Category[]) => void;
  categoryList: Category[];
}

export const useCategory = create<CategoryState>((set) => ({
  hasWidth: false,
  hasHeight: false,
  hasDepth: false,
  hasDiameter: false,
  image: null,
  name: null,
  id: null,
  categoryList: [],
  setCategoryList: (value: Category[]) => set({ categoryList: value }),
  setSelectedCategory: (value: Category) => set({ ...value }),
}));
