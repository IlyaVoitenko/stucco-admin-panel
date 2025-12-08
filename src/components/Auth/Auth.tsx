import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import api from "../../service/auth";

const loginSchema = Yup.object({
  login: Yup.string()
    .min(3, "minimum 3 characters")
    .required("login is required"),
  password: Yup.string()
    .min(8, "minimum 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/,
      "Password must contain uppercase, lowercase, number and special character and be at least 8 characters long"
    )
    .required("password is required"),
});
const Auth = () => {
  const navigate = useNavigate();
  return (
    <main className={styles.container}>
      <Formik
        initialValues={{ login: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await api.post(`${import.meta.env.VITE_APP_API_URL}auth/login`, {
              username: values.login,
              password: values.password,
            });
            navigate("/category");
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
              name="login"
              className={styles.inputField}
              placeholder="Login"
            />
            <ErrorMessage
              name="login"
              component="div"
              className={styles.errorMessage}
            />
            <Field
              type="password"
              required
              name="password"
              className={styles.inputField}
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorMessage}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default Auth;
