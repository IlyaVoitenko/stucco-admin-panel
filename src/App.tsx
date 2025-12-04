import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
