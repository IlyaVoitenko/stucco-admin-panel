import styles from "./styles.module.scss";

interface ErrorComponentProps {
  error: Error | null;
}
const ErrorComponent = ({ error }: ErrorComponentProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.errorMessage}>Error: {error?.message}</h2>{" "}
    </div>
  );
};

export default ErrorComponent;
