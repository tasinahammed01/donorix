import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import MainLayout from "../LayOut/MainLayout";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import TopDonors from "../Pages/TopDonors";
import DonorDashboard from "../Pages/DonorDashboard";
import RecipientDashboard from "../Pages/RecipientDashboard";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import ProtectedRoute from "../Components/ProtectedRoute";

// Admin Components
import UserList from "../Components/AdminDashboard/UserList";
import DonorList from "../Components/AdminDashboard/DonorList";
import RecipientList from "../Components/AdminDashboard/RecipentList";
import AdminLayout from "../LayOut/AdminLayout";
import Profile from "../Components/AdminDashboard/Profile";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/topDonor", element: <TopDonors /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/about", element: <AboutUs /> },

      {
        path: "/dashboard/donor",
        element: (
          <ProtectedRoute requiredRole="donor">
            <DonorDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/recipient",
        element: (
          <ProtectedRoute requiredRole="recipient">
            <RecipientDashboard />
          </ProtectedRoute>
        ),
      },

      // Admin Dashboard with Nested Routes
      {
        path: "/dashboard/admin",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "users", element: <UserList /> },
          { path: "donors", element: <DonorList /> },
          { path: "recipients", element: <RecipientList /> },
          { path: "profile", element: <Profile></Profile> },
        ],
      },

      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
