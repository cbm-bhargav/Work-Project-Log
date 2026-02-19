import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import About from "./pages/Guest/About";
import Home from "./pages/Guest/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Auth/Profile";
import Login from "./pages/Auth/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import User from "./pages/User/User";
import Task from "./pages/Task/Task";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/app" element={<ProtectedLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user" element={<User />} />
            <Route path="task" element={<Task />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;