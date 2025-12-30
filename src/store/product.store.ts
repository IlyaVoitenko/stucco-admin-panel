import { create } from "zustand";
import type { Product } from "../types";

interface ProductState extends Product {
  setSelectedProduct: (value: Product) => void;
}

export const useProduct = create<ProductState>((set) => ({
  nameProduct: "",
  description: "",
  images: [],
  material: "",
  dimensions: "",
  price: 0,
  sku: "", // stock keeping unit
  type: "",
  categoryId: null,
  sizes: null,

  setSelectedProduct: (value: Product) => set({ ...value }),
}));
