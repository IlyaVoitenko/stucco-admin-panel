import { useState } from "react";
import useImages from "../../hooks/useImages";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { createNewCategory, updateCategory } from "../../service/auth";
import type { modeFormsType } from "../../types";
import { useCategory } from "../../store/category.store";

interface EditOrCreateCategoryFormProps {
  mode?: modeFormsType;
}

const getSchema = (mode: modeFormsType) =>
  Yup.object({
    name: Yup.string().min(3).required(),
    hasWidth: Yup.boolean().optional(),
    hasHeight: Yup.boolean().optional(),
    hasDepth: Yup.boolean().optional(),
    hasDiameter: Yup.boolean().optional(),
    image:
      mode === "create"
        ? Yup.mixed().required("image is required")
        : Yup.mixed().nullable(),
  });

const EditOrCreateCategoryForm = ({
  mode = "create",
}: EditOrCreateCategoryFormProps) => {
  const image = useImages({ multiple: false });
  const [isFetchSuccess, setIsFetchSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  let controller: AbortController | null = null;

  const {
    id: categoryId,
    name: categoryName,
    image: categoryImage,
    hasWidth,
    hasHeight,
    hasDepth,
    hasDiameter,
  } = useCategory();

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
            ? {
                name: "",
                image: undefined,
                hasWidth: false,
                hasHeight: false,
                hasDepth: false,
                hasDiameter: false,
              }
            : {
                name: categoryName ?? "",
                image: categoryImage ?? undefined,
                hasWidth,
                hasHeight,
                hasDepth,
                hasDiameter,
              }
        }
        validationSchema={getSchema(mode)}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const formData = new FormData();
            if (image.files) formData.append("image", image.files[0]);
            if (values.name) formData.append("name", values.name);
            formData.append("hasWidth", values.hasWidth ? "true" : "false");
            formData.append("hasHeight", values.hasHeight ? "true" : "false");
            formData.append("hasDepth", values.hasDepth ? "true" : "false");
            formData.append(
              "hasDiameter",
              values.hasDiameter ? "true" : "false"
            );
            if (mode === "create") {
              await createNewCategory(formData);
            } else {
              if (!categoryId) throw new Error("Category ID is missing");
              controller = new AbortController();
              await updateCategory(categoryId, formData, controller.signal);
            }
            setIsFetchSuccess(true);
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
            <label>
              <Field type="checkbox" name="hasWidth" />
              Width
            </label>

            <label>
              <Field type="checkbox" name="hasHeight" />
              Height
            </label>

            <label>
              <Field type="checkbox" name="hasDepth" />
              Depth
            </label>

            <label>
              <Field type="checkbox" name="hasDiameter" />
              Diameter
            </label>

            <button type="submit" disabled={isSubmitting}>
              {mode === "create" ? "Create category" : "Update category"}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default EditOrCreateCategoryForm;
