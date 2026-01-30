import { Link } from "react-router";
import { PAGES } from "../../config/pages.config";
import styles from "./styles.module.scss";
import type { Product } from "../../types";
import { useCategory } from "../../store/category.store";
import { memo } from "react";

type ProductCardProps = {
  item: Product;
  handleSelectProduct: (product: Product) => void;
};

const ProductCard = memo(({ item, handleSelectProduct }: ProductCardProps) => {
  //   const { name: categoryName } = useCategory();
  console.log(item);
  return (
    <div className={styles.container}>
      <button
        className={styles.btnEdit}
        onClick={() => {
          handleSelectProduct({ ...item });
        }}
      >
        &#9998;
      </button>
      <button
        className={styles.btnDelete}
        onClick={() => {
          if (item.id !== null) return item.id;
          return;
        }}
      >
        X
      </button>
      <Link
        to={`${PAGES.CATEGORIES_PAGE}/${item.name ? item.name.toLowerCase() : ""}`}
        onClick={() => {
          handleSelectProduct({ ...item });
        }}
      >
        <img
          src={item.images && item.images.length > 0 ? item.images[0] : ""}
          className={`${styles.image} `}
          alt="Category Image"
          width={100}
          height={100}
        />
        <h2> {item.nameProduct}</h2>
      </Link>
    </div>
  );
});

export default ProductCard;
