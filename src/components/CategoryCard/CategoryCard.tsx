import { Link } from "react-router-dom";
import { PAGES } from "../../config/pages.config";
import styles from "./styles.module.scss";
import { additionalStyles } from "./constants";
import { deleteCategory } from "../../service/auth";
import { memo } from "react";

interface CategoryProps {
  item: {
    id: number;
    name: string;
    image: string;
  };
  handleSelectCategory: (category: CategoryProps["item"]) => void;
}
const CategoryCard = memo(({ item, handleSelectCategory }: CategoryProps) => {
  const { name, image, id } = item;
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
      <button className={styles.btnDelete} onClick={() => deleteCategory(id)}>
        X
      </button>
      <Link to={`${PAGES.CATEGORIES_PAGE}/${name.toLowerCase()}`}>
        <img
          src={image}
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
