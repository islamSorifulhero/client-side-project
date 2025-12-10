import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
// import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Login/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "../pages/Dashboard/AssignDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
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
      // {
      //   path: "/coverage",
      //   Component: Coverage,
      //   loader: () => fetch('/public/serviceCenters.json').then(res => res.json())
      // },
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
      // { path: "payment/:parcelId", Component: Payment },
      { path: "/dashboard/track-order", Component: TrackOrder },
      { path: "/dashboard/profile", Component: Profile },
      { path: "payment-history", Component: PaymentHistory },
      { path: "payment-success", Component: PaymentSuccess },
      { path: "payment-cancelled", Component: PaymentCancelled },

      // rider-only
      { path: "assigned-deliveries", element: <RiderRoute><AssignedDeliveries /></RiderRoute> },
      { path: "completed-deliveries", element: <RiderRoute><CompletedDeliveries /></RiderRoute> },

      // admin
      { path: "approve-riders", element: <AdminRoute><ApproveRiders /></AdminRoute> },
      { path: "assign-riders", element: <AdminRoute><AssignRiders /></AdminRoute> },
      { path: "users-management", element: <AdminRoute><UsersManagement /></AdminRoute> },
    ]
  }
]);
