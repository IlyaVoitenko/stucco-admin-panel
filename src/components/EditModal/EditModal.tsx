import EditOrCreateCategoryForm from "../EditOrCreateCategoryForm";
import type { modeFormsType } from "../../types";
import styles from "./styles.module.scss";
interface EditModalProps {
  mode: modeFormsType;
  setIsShow?: (value: boolean) => void;
}

const EditModal = ({ mode, setIsShow }: EditModalProps) => {
  return (
    <main className={styles.containerModal}>
      <button
        className={styles.btnDelete}
        onClick={() => {
          if (setIsShow) setIsShow(false);
        }}
      >
        ×
      </button>
      <EditOrCreateCategoryForm mode={mode} />
    </main>
  );
};

export default EditModal;
