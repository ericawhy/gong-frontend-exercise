import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import HierarchyPage from "./pages/HierarchyPage";
import { useAuth } from "./auth/useAuth";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth>
                <HierarchyPage />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
