import EditOrCreateCategoryForm from "../EditOrCreateCategoryForm";
import type { modeFormsType } from "../../types";
interface EditModalProps {
  mode: modeFormsType;
}

const EditModal = ({ mode }: EditModalProps) => {
  return (
    <main>
      <EditOrCreateCategoryForm mode={mode} />
    </main>
  );
};

export default EditModal;
