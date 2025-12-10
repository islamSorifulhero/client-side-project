import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Login/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import AdminRoute from "./AdminRoute";
import RiderRoute from "./RiderRoute";
import AllProducts from "../pages/Products/AllProducts";
import ProductDetails from "../pages/Products/ProductDetails";
import BookingForm from "../pages/Booking/BookingForm";
import MyOrders from "../pages/Dashboard/MyOrders";
import TrackOrder from "../pages/Dashboard/TrackOrder";
import Profile from "../pages/Dashboard/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "all-products", Component: AllProducts },
      { path: "product/:productId", Component: ProductDetails },
      { path: "booking/:id", Component: BookingForm },
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { path: "/dashboard/my-orders", Component: MyOrders },
      { path: "payment/:parcelId", Component: Payment },
      { path: "/dashboard/track-order", Component: TrackOrder },
      { path: "/dashboard/profile", Component: Profile },
      { path: "payment-history", Component: PaymentHistory },
      { path: "payment-success", Component: PaymentSuccess },
      { path: "payment-cancelled", Component: PaymentCancelled },

      {
        path: "booking/:id",
        element: <PrivateRoute><BookingForm></BookingForm></PrivateRoute>
      },
    ]
  }
]);
