import styles from "./styles.module.scss";
import useFetch from "../../hooks/useFetch";
import CategoryCard from "../CategoryCard";
import { Activity, useCallback, useState } from "react";
import { useCategory } from "../../store/category.store";
import EditModal from "../EditModal";
import ErrorComponent from "../ErrorComponent";
import CardsSkeleton from "../CardsSkeleton";
import type { Category } from "../../types";

const CategoryListPage = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const setSelectedCategory = useCategory().setSelectedCategory;
  const setCategoryList = useCategory().setCategoryList;

  const handleSelectCategory = useCallback(
    (category: Category) => {
      setSelectedCategory(category);
      setIsShow(true);
    },
    [setSelectedCategory, setIsShow],
  );
  const { data, loading, error } = useFetch<Category[]>({
    url: "categories",
  });

  if (data) setCategoryList(data);
  if (loading) return <CardsSkeleton />;
  if (error) return <ErrorComponent error={error} />;
  return (
    <main className={styles.container}>
      <Activity mode={isShow ? "visible" : "hidden"}>
        <EditModal mode="edit" formMode="category" setIsShow={setIsShow} />
      </Activity>
      {!data?.length && <span>Category not found</span>}
      <ul className={styles.listCategories}>
        {data &&
          data.map((item: Category) => (
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
