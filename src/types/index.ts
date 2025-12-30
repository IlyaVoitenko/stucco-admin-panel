export type modeFormsType = "create" | "edit";
export type entityTypes = "category" | "product";

export interface PieceSize {
  width: number;
  height: number;
  itemPrice: number;
}
export interface Product {
  nameProduct: string;
  description: string;
  images: string[];
  material: string;
  price: number;
  sku?: string; // stock keeping unit
  type: "piece" | "meter"; // piece, meter
  categoryId: number | null;
  sizes?: PieceSize[] | null;
}
