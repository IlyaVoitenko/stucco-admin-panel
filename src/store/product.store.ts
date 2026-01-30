import { create } from "zustand";
import type { Product } from "../types";

interface ProductState extends Product {
  setSelectedProduct: (value: Product) => void;
  setListProducts: (value: Product[]) => void;
  listProducts: Product[];
}

export const useProduct = create<ProductState>((set) => ({
  id: null,
  nameProduct: "",
  description: "",
  images: [],
  material: "",
  price: 0,
  sku: "", // stock keeping unit
  type: "piece",
  categoryId: null,
  sizes: null,
  listProducts: [],

  setSelectedProduct: (value: Product) => set({ ...value }),
  setListProducts: (value: Product[]) => set({ listProducts: value }),
}));
