import styles from "./styles.module.scss";
import useFetch from "../../hook/useFetch";
import CategoryCard from "../CategoryCard";
interface CategoryProps {
  id: number;
  name: string;
  image: string;
}
const CategoryListPage = () => {
  const { data, loading, error } = useFetch<CategoryProps[]>({
    url: "categories",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;
  return (
    <main className={styles.container}>
      {!data?.length && <span>Category not found</span>}
      <ul className={styles.listCategories}>
        {data &&
          data.map((item: CategoryProps) => (
            <li key={item.id}>
              <CategoryCard item={item} />
            </li>
          ))}
      </ul>
    </main>
  );
};

export default CategoryListPage;
