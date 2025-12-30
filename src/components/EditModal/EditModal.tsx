import EditOrCreateCategoryForm from "../EditOrCreateCategoryForm";
import EditOrCreateProductForm from "../EditOrCreateProductForm";
import type { entityTypes, modeFormsType } from "../../types";
import styles from "./styles.module.scss";
interface EditModalProps {
  mode: modeFormsType;
  formMode?: entityTypes;
  setIsShow?: (value: boolean) => void;
}

const EditModal = ({ mode, setIsShow, formMode }: EditModalProps) => {
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
      {formMode === "category" && <EditOrCreateCategoryForm mode={mode} />}
      {formMode === "product" && <EditOrCreateProductForm mode={mode} />}
    </main>
  );
};

export default EditModal;
