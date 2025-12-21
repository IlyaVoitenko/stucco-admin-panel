import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { createNewCategory } from "../../service/auth";
import useImages from "../hooks/useImages";
import { useState } from "react";

const addCategorySchema = Yup.object({
  name: Yup.string()
    .min(3, "minimum 3 characters")
    .required("name category is required"),
  image: Yup.mixed().required("image is required"),
});

const Category = () => {
  const image = useImages({ multiple: false });
  const [isAddedCategory, setIsAddedCategory] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);
  return (
    <main className={styles.container}>
      {isAddedCategory && (
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
        initialValues={{ name: "", image: null }}
        validationSchema={addCategorySchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const formData = new FormData();
            if (image.files) formData.append("image", image.files[0]);
            if (values.name) formData.append("name", values.name);
            await createNewCategory(formData);
            setIsAddedCategory(true);
            resetForm();
          } catch {
            setError(true);
            throw new Error("An error occurred during logins");
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

export default Category;
