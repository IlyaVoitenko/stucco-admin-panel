import { useState } from "react";
import useImages from "../../hooks/useImages";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import {} from "../../service/auth";
import type { modeFormsType, Product } from "../../types";
import { useCategory } from "../../store/category.store";

interface EditOrCreateProductFormProps {
  mode?: modeFormsType;
}

const getSchema = (mode: modeFormsType) =>
  Yup.object({
    nameProduct: Yup.string().min(3).required(),
    description: Yup.string().min(3).required(),
    material: Yup.string().min(3).required(),
    dimensions: Yup.string().min(3).required(),
    price: Yup.number().positive().required(),
    sku: Yup.string().min(3).optional(),
    type: Yup.string().min(3).required(),
    categoryId: Yup.number().required(),
    sizes: Yup.array()
      .of(
        Yup.object({
          meterPrice: Yup.number().nullable(),
          width: Yup.number().nullable(),
          height: Yup.number().nullable(),
          itemPrice: Yup.number().nullable(),
        })
      )
      .nullable()
      .optional(),

    images:
      mode === "create"
        ? Yup.mixed().required("image is required")
        : Yup.mixed().nullable(),
  });
const productInitialValues: Product = {
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
};

const EditOrCreateProductForm = ({
  mode = "create",
}: EditOrCreateProductFormProps) => {
  const image = useImages({ multiple: true });
  const [isFetchSuccess, setIsFetchSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { id: categoryId } = useCategory();
  let controller: AbortController | null = null;

  return (
    <main className={styles.container}>
      {isFetchSuccess && (
        <p className={styles.successMessage}>Category added successfully!</p>
      )}
      {error && <p className={styles.errorField}>Error adding category</p>}
      {image.previews.length !== 0 && (
        <img
          src={image.previews[0]}
          className={styles.imagePreview}
          alt="preview"
        />
      )}
      {mode === "edit" && categoryImage && image.previews.length === 0 && (
        <img
          src={categoryImage}
          className={styles.imagePreview}
          alt="preview"
        />
      )}
      <Formik
        enableReinitialize
        initialValues={
          mode === "create"
            ? { ...productInitialValues, categoryId }
            : { name: categoryName ?? "", image: categoryImage ?? undefined }
        }
        validationSchema={getSchema(mode)}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            // const formData = new FormData();
            // if (image.files) formData.append("image", image.files[0]);
            // if (values.name) formData.append("name", values.name);
            // if (mode === "create") {
            //   await createNewCategory(formData);
            // } else {
            //   if (!categoryId) throw new Error("Category ID is missing");
            //   controller = new AbortController();
            //   await updateCategory(categoryId, formData, controller.signal);
            // }
            // setIsFetchSuccess(true);
            resetForm();
          } catch (error) {
            setError(error as Error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className={styles.formContainer}>
            <Field
              type="text"
              required
              name="name"
              className={styles.inputField}
              placeholder="Name category"
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.errorField}
            />

            <input
              type="file"
              onChange={(e) => {
                const files = e.currentTarget.files;
                image.onChange(files);
                if (files?.[0]) {
                  setFieldValue("image", files[0]);
                }
              }}
              accept="image/*"
              className={styles.inputField}
              placeholder="Image category"
            />
            <ErrorMessage
              name="image"
              component="div"
              className={styles.errorField}
            />
            <button type="submit" disabled={isSubmitting}>
              {mode === "create" ? "Create product" : "Update product"}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default EditOrCreateProductForm;
