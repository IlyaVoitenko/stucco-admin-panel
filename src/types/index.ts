export type modeFormsType = "create" | "edit";
export type entityTypes = "category" | "product";
export type typesProduct = "piece" | "meter";

export interface PieceSize {
  id: number | null;
  width?: number | null | string;
  height?: number | null | string;
  depth?: number | null | string;
  diameter?: number | null | string;
  itemPrice?: number | null | string;
}
export interface Category {
  id: number | null;
  name: string | null;
  image: string | null;
  hasWidth?: boolean;
  hasHeight?: boolean;
  hasDepth?: boolean;
  hasDiameter?: boolean;
}
export interface Product {
  id: number | null;
  nameProduct: string;
  description: string;
  images: string[];
  material: string;
  price: number;
  sku?: string; // stock keeping unit
  type: typesProduct; // piece, meter
  categoryId: number | null;
  sizes?: PieceSize[] | null;
  name?: string; // for category link purpose
}
