import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

import AuthGuard from "./context/AuthGuard";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route element={<AuthGuard />}>
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/product" element={<ProductPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
