import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";
import { RoutePath } from "./routes/routes";
import { RootLayout } from "./components/RootLayout";

const TablePage = lazy(() => import("@/pages/TablePage"));
const ChartPage = lazy(() => import("@/pages/ChartPage"));

export function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Navigate to={RoutePath.table} replace />} />
          <Route path={RoutePath.table} element={<TablePage />} />
          <Route path={RoutePath.chart} element={<ChartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
