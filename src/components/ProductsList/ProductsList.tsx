import { Activity, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ErrorComponent from "../ErrorComponent";
import CardsSkeleton from "../CardsSkeleton";
import { productsByCategory } from "../../service/auth";
import { Navigate, useParams } from "react-router-dom";
import type { Product } from "../../types";
import { useCategory } from "../../store/category.store";
import { PAGES } from "../../config/pages.config";
import EditModal from "../EditModal";
import { useProduct } from "../../store/product.store";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";

const ProductsList = () => {
  const { categoryName } = useParams();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShow, setIsShow] = useState<boolean>(false);
  const { hasWidth, hasHeight, hasDepth, hasDiameter, id } = useCategory();
  const { listProducts } = useProduct();
  const setListProducts = useProduct().setListProducts;
  const setSelectedProduct = useProduct().setSelectedProduct;

  const handleSelectProduct = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      setIsShow(true);
    },
    [setSelectedProduct, setIsShow],
  );
  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    (async () => {
      try {
        setIsLoading(true);
        const response = await productsByCategory(id, controller.signal);
        setListProducts(response.data);
      } catch (e) {
        if (axios.isCancel(e) || e.code === "ERR_CANCELED") return;
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [id, setListProducts]);

  if (isLoading) return <CardsSkeleton />;
  if (error) return <ErrorComponent error={error} />;
  if (!hasWidth && !hasHeight && !hasDepth && !hasDiameter) {
    return <Navigate to={PAGES.CATEGORIES_PAGE} replace />;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Products in {categoryName}</h2>
      <button
        onClick={() => {
          setIsShow(true);
        }}
      >
        Create a new product
      </button>
      <Activity mode={isShow ? "visible" : "hidden"}>
        <EditModal mode="edit" formMode="product" setIsShow={setIsShow} />
      </Activity>
      <ul className={styles.listProducts}>
        {listProducts.length ? (
          listProducts.map((product: Product) => (
            <li key={product.id}>
              <ProductCard
                item={product}
                handleSelectProduct={handleSelectProduct}
              />
            </li>
          ))
        ) : (
          <div>No products found</div>
        )}
      </ul>
    </div>
  );
};

export default ProductsList;
