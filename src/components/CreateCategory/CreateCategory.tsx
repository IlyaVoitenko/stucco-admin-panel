import styles from "./styles.module.scss";
import EditOrCreateCategoryForm from "../EditOrCreateCategoryForm";
const Category = () => {
  return (
    <main className={styles.container}>
      <EditOrCreateCategoryForm />
    </main>
  );
};

export default Category;
