import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import MainLayout from "../LayOut/MainLayout";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import TopDonors from "../Pages/TopDonors";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import ProtectedRoute from "../Components/ProtectedRoute";
import DashboardLayout from "../LayOut/DashboardLayout";

// Dashboard Pages
import DonorDashboard from "../Pages/DonorDashboard";
import RecipientDashboard from "../Pages/RecipientDashboard";

// Admin Pages
import UserList from "../Components/AdminDashboard/UserList";
import DonorList from "../Components/AdminDashboard/DonorList";
import RecipientList from "../Components/AdminDashboard/RecipentList";
import Profile from "../Components/AdminDashboard/Profile";
import PersonalProfile from "../Components/DonorDashboard/PersonalProfile";
import DonationHistory from "../Components/DonorDashboard/DonationHistory";
import UpcomingEvents from "../Components/DonorDashboard/UpcomingEvents";
import Notifications from "../Components/DonorDashboard/Notifications";
import Achievements from "../Components/DonorDashboard/Achievements";
import AccountSettings from "../Components/DonorDashboard/AccountSettings";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/topDonor", element: <TopDonors /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },

      // Donor Dashboard
      {
        path: "/dashboard/donor",
        element: (
          <ProtectedRoute requiredRole="donor">
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "history", element: <DonationHistory /> },
          { path: "events", element: <UpcomingEvents /> },
          { path: "notifications", element: <Notifications /> },
          { path: "achievements", element: <Achievements /> },
          { path: "profile", element: <Profile /> },
        ],
      },

      // Recipient Dashboard
      {
        path: "/dashboard/recipient",
        element: (
          <ProtectedRoute requiredRole="recipient">
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "", element: <RecipientDashboard /> },
          { path: "profile", element: <Profile /> },
        ],
      },

      // Admin Dashboard
      {
        path: "/dashboard/admin",
        element: (
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "users", element: <UserList /> },
          { path: "donors", element: <DonorList /> },
          { path: "recipients", element: <RecipientList /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
]);
