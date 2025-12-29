import styles from "./styles.module.scss";

const CardsSkeleton = () => {
  const arr = Array.from({ length: 6 }).fill(null);
  return (
    <div className={styles.container}>
      {arr.map((_, index) => {
        return (
          <div key={index} className={styles.containerCard}>
            <div className={styles.image}></div>
            <div className={styles.name}></div>
          </div>
        );
      })}
    </div>
  );
};

export default CardsSkeleton;
