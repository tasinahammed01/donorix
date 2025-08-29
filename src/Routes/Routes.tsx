import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import MainLayout from "../LayOut/MainLayout";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import TopDonors from "../Pages/TopDonors";
import BloodRequest from "../Pages/BloodRequest";
import DonorDashboard from "../Pages/DonorDashboard";
import RecipientDashboard from "../Pages/RecipientDashboard";
import AdminDashboard from "../Pages/AdminDashboard";
import Register from "../Pages/Register";
import Login from "../Pages/Login";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/topDonor",
        element: <TopDonors />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/requests",
        element: <BloodRequest />,
      },
      {
        path: "/dashboard/donor",
        element: <DonorDashboard />,
      },
      {
        path: "/dashboard/recipient",
        element: <RecipientDashboard />,
      },
      {
        path: "/dashboard/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
