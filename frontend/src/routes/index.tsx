import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import LoginComp from "../components/utils/login";
import User from "../pages/User";
import Pimpinan from "../pages/pimpinan";
import Ruangan from "../pages/ruangan";
import Jenis from "../pages/jenis";
import Hari from "../pages/hari";
import KelolaRapat from "../pages/KelolaRapat";
import GenerateRapat from "../pages/GenerateRapat";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = sessionStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComp />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaders"
          element={
            <PrivateRoute>
              <Pimpinan />
            </PrivateRoute>
          }
        />
        <Route
          path="/buildings"
          element={
            <PrivateRoute>
              <Ruangan />
            </PrivateRoute>
          }
        />
        <Route
          path="/meets"
          element={
            <PrivateRoute>
              <Jenis />
            </PrivateRoute>
          }
        />
        <Route
          path="/days"
          element={
            <PrivateRoute>
              <Hari />
            </PrivateRoute>
          }
        />
        <Route
          path="/ManageMeets"
          element={
            <PrivateRoute>
              <KelolaRapat />
            </PrivateRoute>
          }
        />
        <Route
          path="/CreateMeets"
          element={
            <PrivateRoute>
              <GenerateRapat />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
