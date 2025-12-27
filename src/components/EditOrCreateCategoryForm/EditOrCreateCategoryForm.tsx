import { useState } from "react";
import useImages from "../hooks/useImages";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { createNewCategory } from "../../service/auth";
import type { modeFormsType } from "../../types";
import { useCategory } from "../../store/category.store";

interface EditOrCreateCategoryFormProps {
  mode?: modeFormsType;
}

const getSchema = (mode: modeFormsType) =>
  Yup.object({
    name: Yup.string().min(3).required(),
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
  const { name: categoryName, image: categoryImage } = useCategory.getState();
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
      <Formik
        initialValues={
          mode === "create"
            ? { name: "", image: null }
            : { name: categoryName, image: categoryImage }
        }
        validationSchema={getSchema(mode)}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const formData = new FormData();
            if (image.files) formData.append("image", image.files[0]);
            if (values.name) formData.append("name", values.name);
            if (mode === "create") {
              await createNewCategory(formData);
            } else {
              return;
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
                console.log("files", files);
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
              Create category
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default EditOrCreateCategoryForm;
