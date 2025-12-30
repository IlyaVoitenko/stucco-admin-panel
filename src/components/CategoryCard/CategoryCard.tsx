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
  const { name, image, id } = item;
  if (!name) return null;
  const hasAdditionalStyle =
    name in additionalStyles
      ? additionalStyles[name as keyof typeof additionalStyles]
      : false;

  return (
    <div className={styles.container}>
      <button
        className={styles.btnEdit}
        onClick={() => {
          handleSelectCategory({ name, image, id });
        }}
      >
        &#9998;
      </button>
      <button
        className={styles.btnDelete}
        onClick={() => {
          if (id !== null) return deleteCategory(id);
          return;
        }}
      >
        X
      </button>
      <Link
        to={`${PAGES.CATEGORIES_PAGE}/${name ? name.toLowerCase() : ""}`}
        onClick={() => {
          handleSelectCategory({ name, image, id });
        }}
      >
        <img
          src={image ? image : ""}
          className={`${styles.image} ${
            hasAdditionalStyle ? styles.fullSize : ""
          }`}
          alt="Category Image"
          width={100}
          height={100}
        />
        <h2> {name}</h2>
      </Link>
    </div>
  );
});

export default CategoryCard;
