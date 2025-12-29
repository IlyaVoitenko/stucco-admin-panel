import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PAGES } from "./config/pages.config";
import Loading from "./components/Loading";

import AuthGuard from "./context/AuthGuard";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const CreateCategoryPage = lazy(() => import("./pages/CreateCategoryPage"));
const CategoryListPage = lazy(() => import("./pages/CategoryListPage"));
const ProductsListPage = lazy(() => import("./pages/ProductsListPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={PAGES.AUTH_PAGE} element={<AuthPage />} />
        <Route element={<AuthGuard />}>
          <Route
            path={PAGES.CREATE_CATEGORY_PAGE}
            element={<CreateCategoryPage />}
          />
          <Route path={PAGES.PRODUCTS_PAGE} element={<ProductsListPage />} />
          <Route path={PAGES.CATEGORIES_PAGE} element={<CategoryListPage />} />
          <Route
            path={`${PAGES.CATEGORIES_PAGE}/:categoryName`}
            element={<ProductsListPage />}
          />
          <Route
            path={`${PAGES.CATEGORIES_PAGE}/:categoryName/:product`}
            element={<ProductPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
