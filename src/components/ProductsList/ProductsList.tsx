import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ErrorComponent from "../ErrorComponent";
import CardsSkeleton from "../CardsSkeleton";
import { productsByCategory } from "../../service/auth";
import { useParams } from "react-router-dom";

const ProductsList = () => {
  const { categoryName } = useParams();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any[] | null>(null);
  console.log("name", categoryName);
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setIsLoading(true);
        if (!categoryName) return;
        const response = await productsByCategory(
          categoryName,
          controller.signal
        );
        console.log("response", response);
        setProducts(response.data);
      } catch (error) {
        console.log("error:", error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [categoryName]);
  if (isLoading) return <CardsSkeleton />;
  if (error) return <ErrorComponent error={error} />;
  return (
    <div className={styles.container}>
      <div>
        {products ? (
          products.map((product) => <div key={product.id}>{product.name}</div>)
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
