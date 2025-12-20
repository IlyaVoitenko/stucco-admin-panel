import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { api } from "../../service/auth";
import useImages from "../hooks/useImages";

const addCategorySchema = Yup.object({
  name: Yup.string()
    .min(3, "minimum 3 characters")
    .required("name category is required"),
  image: Yup.object().shape({}).required("image is required"),
});

const Category = () => {
  const image = useImages({ multiple: false });
  return (
    <main className={styles.container}>
      <Formik
        initialValues={{ name: "", password: "" }}
        validationSchema={addCategorySchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await api.post(`${import.meta.env.VITE_APP_API_URL}auth/login`, {
              name: values.name,
              password: values.password,
            });
          } catch {
            throw new Error("An error occurred during logins");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
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
              className={styles.errorMessage}
            />
            <Field
              type="file"
              required
              name="image"
              className={styles.inputField}
              placeholder="image category"
            />
            <ErrorMessage
              name="image"
              component="div"
              className={styles.errorMessage}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
            >
              Create category
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default Category;
