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
  const [addedCategory, setAddedCategory] = useState(null);
  const [error, setError] = useState<boolean | null>(null);
  return (
    <main className={styles.container}>
      {addedCategory && <p>Category added successfully!</p>}
      {error && <p>Error adding category</p>}
      {image.previews && (
        <img
          src={image.previews[0]}
          className={styles.imagePreview}
          alt="preview"
        />
      )}
      <Formik
        initialValues={{ name: "", image: null }}
        validationSchema={addCategorySchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const formData = new FormData();
            formData.append("name", values.name);
            if (image.files) formData.append("image", image.files[0]);
            console.log("values", values);
            const response = await createNewCategory(formData);
            console.log("response", response);
            setAddedCategory(response.data);
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
