import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "sonner";
import { useAuth } from "./features/auth/useAuth";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route
          index
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Welcome />}
        />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* other protected paths */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
