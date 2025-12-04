import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  return (
    <main>
      <Formik
        initialValues={{ login: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            console.log("Logging in", values);
          } catch (err: Error | any) {
            setErrors({
              login: "data is incorrect",
              password: "data is incorrect",
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form>
            <Field type="text" required name="login" />
            <ErrorMessage name="login" component="div" />
            <Field type="password" required name="password" />
            <ErrorMessage name="password" component="div" />
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
