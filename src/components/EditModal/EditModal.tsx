import EditOrCreateCategoryForm from "../EditOrCreateCategoryForm";
interface EditModalProps {
  isCreateForm: boolean;
}

const EditModal = ({ isCreateForm }: EditModalProps) => {
  <main>
    <EditOrCreateCategoryForm isCreateForm={isCreateForm} />
  </main>;
};

export default EditModal;
