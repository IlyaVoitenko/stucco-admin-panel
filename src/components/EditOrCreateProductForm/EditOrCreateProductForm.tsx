import { useState } from "react";
import useImages from "../../hooks/useImages";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import styles from "./styles.module.scss";
import {
  createNewProductByCategory,
  updateProductByCategory,
} from "../../service/auth";
import type { modeFormsType, PieceSize } from "../../types";
import { useProduct } from "../../store/product.store";
import { useCategory } from "../../store/category.store";
import { getSchema, normalizedSizes, productInitialValues } from "./constants";
interface EditOrCreateProductFormProps {
  mode?: modeFormsType;
}

const EditOrCreateProductForm = ({
  mode = "create",
}: EditOrCreateProductFormProps) => {
  const image = useImages({ multiple: true });
  const [isFetchSuccess, setIsFetchSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const {
    id: productId,
    name,
    description,
    images,
    material,
    price,
    sku,
    type,
    categoryId,
    sizes,
  } = useProduct();
  const { hasWidth, hasHeight, hasDepth, hasDiameter, id } = useCategory();
  let controller: AbortController | null = null;
  console.log("error state", error);
  console.log(isFetchSuccess);
  return (
    <main className={styles.container}>
      {isFetchSuccess && (
        <p className={styles.successMessage}>Product added successfully!</p>
      )}
      {error && (
        <p className={styles.errorField}>Error adding or updating product</p>
      )}
      {mode === "create" &&
        images.length !== 0 &&
        images.map((image, index) => (
          <img
            key={index}
            src={image}
            className={styles.imagePreview}
            alt="preview"
          />
        ))}
      {mode === "edit" &&
        name &&
        image.previews.length === 0 &&
        images.map((image) => (
          <img src={image} className={styles.imagePreview} alt="preview" />
        ))}
      <Formik
        enableReinitialize
        initialValues={
          mode === "create"
            ? { ...productInitialValues, productId }
            : {
                name: name ?? "",
                image: images ?? undefined,
                description,
                material,
                price,
                sku,
                type,
                categoryId,
                sizes: sizes ?? [],
              }
        }
        validationSchema={getSchema(mode)}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const formData = new FormData();
            console.log("values", values);
            if (image.files) formData.append("image", image.files[0]);
            if (values.name) formData.append("name", values.name);
            if (values.description)
              formData.append("description", values.description);
            if (values.material) formData.append("material", values.material);
            if (values.type) formData.append("type", values.type);
            if (values.sku) formData.append("sku", values.sku);
            if (id !== null && id !== undefined)
              formData.append("categoryId", String(id));
            if (values.price !== null && values.price !== undefined)
              formData.append("price", String(values.price));
            formData.append(
              "sizes",
              JSON.stringify(normalizedSizes(values.sizes)),
            );
            if (mode === "create") {
              await createNewProductByCategory(formData);
            } else {
              if (!productId) throw new Error("Category ID is missing");
              controller = new AbortController();
              await updateProductByCategory(
                productId,
                controller.signal,
                formData,
              );
            }
            setIsFetchSuccess(true);
            resetForm();
          } catch (error) {
            setError(error as Error);
          } finally {
            setSubmitting(false);
            setError(null);
            setIsFetchSuccess(false);
          }
        }}
      >
        {({ setFieldValue, isSubmitting, errors }) => {
          console.log("errors", errors);
          return (
            <Form className={styles.formContainer}>
              <Field
                type="text"
                required
                name="name"
                className={styles.inputField}
                placeholder="Name product"
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.errorField}
              />

              <input
                type="file"
                onChange={(e) => {
                  const files = e.currentTarget.files;
                  image.onChange(files);
                  if (files?.[0]) {
                    setFieldValue("image", files[0]);
                  }
                }}
                accept="image/*"
                className={styles.inputField}
                placeholder="Image category"
              />
              <ErrorMessage
                name="image"
                component="div"
                className={styles.errorField}
              />
              <Field
                type="text"
                required
                name="description"
                className={styles.inputField}
                placeholder="description product"
              />
              <ErrorMessage
                name="description"
                component="div"
                className={styles.errorField}
              />
              <Field
                type="text"
                required
                name="price"
                className={styles.inputField}
                placeholder="price product"
              />
              <ErrorMessage
                name="price"
                component="div"
                className={styles.errorField}
              />
              <Field as="select" name="type">
                <option value="" disabled>
                  Select type
                </option>
                <option value="piece">piece</option>
                <option value="meter">meter</option>
              </Field>
              <ErrorMessage
                name="type"
                component="div"
                className={styles.errorField}
              />
              <Field as="select" name="material">
                <option value="" disabled>
                  Select material
                </option>
                <option value="gips">Gips</option>
              </Field>
              <ErrorMessage
                name="material"
                component="div"
                className={styles.errorField}
              />
              <FieldArray name="sizes">
                {({ push, remove, form }) => (
                  <>
                    {form.values.sizes.map((_: PieceSize, index: number) => (
                      <div key={index}>
                        {hasWidth && (
                          <Field
                            name={`sizes.${index}.width`}
                            placeholder="Width"
                            type="number"
                          />
                        )}

                        {hasHeight && (
                          <Field
                            name={`sizes.${index}.height`}
                            placeholder="Height"
                            type="number"
                          />
                        )}

                        {hasDepth && (
                          <Field
                            name={`sizes.${index}.depth`}
                            placeholder="Depth"
                            type="number"
                          />
                        )}

                        {hasDiameter && (
                          <Field
                            name={`sizes.${index}.diameter`}
                            placeholder="Diameter"
                            type="number"
                          />
                        )}

                        <Field
                          name={`sizes.${index}.itemPrice`}
                          placeholder="Price"
                          type="number"
                        />
                        {form.values.sizes.length > 0 && (
                          <button
                            type="button"
                            className={styles.deleteButton}
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        push({
                          width: null,
                          height: null,
                          depth: null,
                          diameter: null,
                          itemPrice: null,
                        })
                      }
                    >
                      Add size
                    </button>
                  </>
                )}
              </FieldArray>
              <button type="submit" disabled={isSubmitting}>
                {mode === "create" ? "Create product" : "Update product"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </main>
  );
};

export default EditOrCreateProductForm;
