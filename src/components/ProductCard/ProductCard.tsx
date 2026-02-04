import { Link } from "react-router-dom";
import { PAGES } from "../../config/pages.config";
import styles from "./styles.module.scss";
import type { Product } from "../../types";
import { memo } from "react";
import { deleteProductByCategory } from "../../service/auth";

type ProductCardProps = {
  item: Product;
  handleSelectProduct: (product: Product) => void;
};

const ProductCard = memo(({ item, handleSelectProduct }: ProductCardProps) => {
  console.log(item);
  return (
    <div className={styles.container}>
      <button
        className={styles.btnEdit}
        onClick={() => {
          handleSelectProduct({ ...item });
          // open edit form
        }}
      >
        &#9998;
      </button>
      <button
        className={styles.btnDelete}
        onClick={() => {
          if (item.id !== null) return deleteProductByCategory(item.id);
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
        <h2> {item.name}</h2>
      </Link>
    </div>
  );
});

export default ProductCard;
