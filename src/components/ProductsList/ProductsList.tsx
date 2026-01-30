import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ErrorComponent from "../ErrorComponent";
import CardsSkeleton from "../CardsSkeleton";
import { productsByCategory } from "../../service/auth";
import { redirect, useParams } from "react-router-dom";
import type { Product } from "../../types";
import { useCategory } from "../../store/category.store";
import { PAGES } from "../../config/pages.config";
import EditModal from "../EditModal";
import { useProduct } from "../../store/product.store";
import ProductCard from "../ProductCard/ProductCard";

const ProductsList = () => {
  const { categoryName } = useParams();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShow, setIsShow] = useState<boolean>(false);
  const { hasWidth, hasHeight, hasDepth, hasDiameter, id } = useCategory();
  const { listProducts } = useProduct();
  const setListProducts = useProduct().setListProducts;
  const setSelectedProduct = useProduct().setSelectedProduct;

  if (!hasWidth && !hasHeight && !hasDepth && !hasDiameter)
    redirect(PAGES.CATEGORIES_PAGE);
  const handleSelectProduct = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      setIsShow(true);
    },
    [setSelectedProduct, setIsShow],
  );
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setIsLoading(true);
        if (!id) return;
        const response = await productsByCategory(id, controller.signal);
        setListProducts(response.data);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "error status : CanceledError: canceled"
        )
          return;
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [categoryName, id]);

  if (isLoading) return <CardsSkeleton />;
  if (error) return <ErrorComponent error={error} />;
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
      {isShow && (
        <EditModal mode="create" formMode="product" setIsShow={setIsShow} />
      )}
      <div>
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
      </div>
    </div>
  );
};

export default ProductsList;
