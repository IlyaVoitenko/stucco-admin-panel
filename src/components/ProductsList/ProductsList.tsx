import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ErrorComponent from "../ErrorComponent";
import CardsSkeleton from "../CardsSkeleton";
import { productsByCategory } from "../../service/auth";
import { useParams } from "react-router-dom";
import EditModal from "../EditModal";

const ProductsList = () => {
  const { categoryName } = useParams();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);

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
        setProducts(response.data);
      } catch (error) {
        if (error.message === "error status : CanceledError: canceled") return;
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
      <h2 className={styles.title}>Products in {categoryName}</h2>
      {isShow && (
        <EditModal mode="create" formMode="product" setIsShow={setIsShow} />
      )}
      <div>
        {products.length ? (
          products.map((product) => <div key={product.id}>{product.name}</div>)
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
