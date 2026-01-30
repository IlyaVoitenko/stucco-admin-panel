import { Link } from "react-router-dom";
import { PAGES } from "../../config/pages.config";
import styles from "./styles.module.scss";
import { additionalStyles } from "./constants";
import { deleteCategory } from "../../service/auth";
import { memo } from "react";
import type { Category } from "../../types";

interface CategoryProps {
  item: Category;
  handleSelectCategory: (category: CategoryProps["item"]) => void;
}
const CategoryCard = memo(({ item, handleSelectCategory }: CategoryProps) => {
  if (!item.name) return null;
  const hasAdditionalStyle =
    item.name in additionalStyles
      ? additionalStyles[item.name as keyof typeof additionalStyles]
      : false;

  return (
    <div className={styles.container}>
      <button
        className={styles.btnEdit}
        onClick={() => {
          handleSelectCategory({ ...item });
        }}
      >
        &#9998;
      </button>
      <button
        className={styles.btnDelete}
        onClick={() => {
          if (item.id !== null) return deleteCategory(item.id);
          return;
        }}
      >
        X
      </button>
      <Link
        to={`${PAGES.CATEGORIES_PAGE}/${
          item.name ? item.name.toLowerCase() : ""
        }`}
        onClick={() => {
          handleSelectCategory({ ...item });
        }}
      >
        <img
          src={item.image ? item.image : ""}
          className={`${styles.image} ${
            hasAdditionalStyle ? styles.fullSize : ""
          }`}
          alt="Category Image"
          width={100}
          height={100}
        />
        <h2> {item.name}</h2>
      </Link>
    </div>
  );
});

export default CategoryCard;
