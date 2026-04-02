import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ProtectedRoute from "./features/auth/components/protectedRoute";
import HomeUI from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import { AppLayout } from "./components/AppLayout";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/dashboard";
import ReportsPage from "./features/interview/pages/Reports";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/interview/:interviewID",
    element: (
      <ProtectedRoute>
        <Interview />
      </ProtectedRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/generate-report",
        element: <HomeUI />,
      },
      // {
      //   path: "/interview/:interviewID",
      //   element: <Interview />,
      // },
      {
        path: "/reports",
        element: <ReportsPage />,
      },
    ],
  },
]);
