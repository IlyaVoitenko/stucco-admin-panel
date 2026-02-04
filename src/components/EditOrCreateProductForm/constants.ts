import * as Yup from "yup";
import type { modeFormsType, PieceSize, Product } from "../../types";

export const normalizedSizes = (values: PieceSize[]) =>
  values.map((size) => ({
    width: toNumberOrNull(size.width),
    height: toNumberOrNull(size.height),
    depth: toNumberOrNull(size.depth),
    diameter: toNumberOrNull(size.diameter),
    itemPrice: toNumberOrNull(size.itemPrice),
  })) ?? [];

export const getSchema = (mode: modeFormsType) =>
  Yup.object({
    name: Yup.string().min(3).required(),
    description: Yup.string().min(3).required(),
    material: Yup.string().min(3).required(),
    price: Yup.number().positive().required(),
    sku: Yup.string().min(3).optional().nullable(),
    type: Yup.string().min(3).required(),
    sizes: Yup.array()
      .of(
        Yup.object({
          depth: Yup.number().nullable(),
          diameter: Yup.number().nullable(),
          width: Yup.number().nullable(),
          height: Yup.number().nullable(),
          itemPrice: Yup.number().nullable(),
        }),
      )
      .nullable()
      .optional(),

    image:
      mode === "create"
        ? Yup.mixed().required("image is required")
        : Yup.mixed().nullable(),
  });
export const toNumberOrNull = (v: unknown) => {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};
export const productInitialValues: Product = {
  id: 0,
  nameProduct: "",
  description: "",
  images: [],
  material: "",
  price: 0,
  sku: "",
  type: "piece",
  categoryId: 0,
  sizes: [
    {
      id: 0,
      width: "",
      height: "",
      depth: "",
      diameter: "",
      itemPrice: "",
    },
  ],
};
