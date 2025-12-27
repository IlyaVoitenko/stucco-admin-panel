import styles from "./styles.module.scss";
import useFetch from "../../hook/useFetch";
import CategoryCard from "../CategoryCard";
import { Activity, useCallback, useState } from "react";
import { useCategory } from "../../store/category.store";
import EditModal from "../EditModal";
interface CategoryProps {
  id: number;
  name: string;
  image: string;
}

const CategoryListPage = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const setSelectedCategory = useCategory().setSelectedCategory;

  const handleSelectCategory = useCallback(
    (category: CategoryProps) => {
      setSelectedCategory(category);
      setIsShow(true);
    },
    [setSelectedCategory, setIsShow]
  );
  const { data, loading, error } = useFetch<CategoryProps[]>({
    url: "categories",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;
  return (
    <main className={styles.container}>
      <Activity mode={isShow ? "visible" : "hidden"}>
        <EditModal mode="edit" setIsShow={setIsShow} />
      </Activity>
      {!data?.length && <span>Category not found</span>}
      <ul className={styles.listCategories}>
        {data &&
          data.map((item: CategoryProps) => (
            <li key={item.id}>
              <CategoryCard
                item={item}
                handleSelectCategory={handleSelectCategory}
              />
            </li>
          ))}
      </ul>
    </main>
  );
};

export default CategoryListPage;
