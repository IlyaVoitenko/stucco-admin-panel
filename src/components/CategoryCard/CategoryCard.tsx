import { Link } from "react-router-dom";
import { PAGES } from "../../config/pages.config";
import styles from "./styles.module.scss";
import { additionalStyles } from "./constants";
import { deleteCategory } from "../../service/auth";
import { useCategory } from "../../store/category.store";

interface CategoryProps {
  item: {
    id: number;
    name: string;
    image: string;
  };
}
const CategoryCard = ({ item }: CategoryProps) => {
  const { name, image, id } = item;
  const hasAdditionalStyle = name in additionalStyles;
  const selectedCategory = useCategory().setSelectedCategory;

  return (
    <Link to={`${PAGES.CATEGORIES_PAGE}/${name.toLowerCase()}`}>
      <div className={styles.container}>
        <button
          className={styles.btnEdit}
          onClick={() => selectedCategory({ name, image, id })}
        >
          &#9998;
        </button>
        <button className={styles.btnDelete} onClick={() => deleteCategory(id)}>
          X
        </button>
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
      </div>
    </Link>
  );
};

export default CategoryCard;
