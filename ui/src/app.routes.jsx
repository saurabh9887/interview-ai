import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ProtectedRoute from "./features/auth/components/protectedRoute";
import HomeUI from "./features/interview/pages/Home";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <h1>Home page</h1>
      </ProtectedRoute>
    ),
  },
  {
    path: "/interview-home",
    element: (
      <ProtectedRoute>
        <HomeUI />
      </ProtectedRoute>
    ),
  },
]);
