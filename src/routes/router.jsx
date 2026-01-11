import { createBrowserRouter } from "react-router";

import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AllProducts from "../pages/Products/AllProducts";
import ProductDetails from "../pages/Products/ProductDetails";
import AboutUs from "../pages/AboutUs/AboutUs";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Login/Register/Register";

//         Dashboard Layout and pages
import DashboardLayout from "../layouts/DashboardLayout";
import MyOrders from "../pages/Dashboard/MyOrders";
import Profile from "../pages/Dashboard/Profile";

//         private role protected route
import PrivateRoute from "./PrivateRoute";
import AuthLayout from "../layouts/AuthLayout";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import BookingForm from "../pages/Booking/BookingForm";
import TrackOrder from "../pages/Dashboard/TrackOrder";
import BuyerRoute from "./BuyerRoute";
import AddProduct from "../pages/Dashboard/AddProduct";
import ManageProducts from "../pages/Dashboard/Manager/ManageProducts";
import PendingOrders from "../pages/Dashboard/Manager/PendingOrders";
import ApprovedOrders from "../pages/Dashboard/Manager/ApprovedOrders";
import AdminRoute from "./AdminRoute";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AllOrders from "../pages/Dashboard/Admin/AllOrders";
import GetAllProducts from "../pages/Dashboard/Admin/GetAllProducts";
import EditProduct from "../pages/Dashboard/EditProduct";
import OrderDetails from "../pages/Dashboard/Admin/OrderDetails";
import TrackingOrder from "../pages/Dashboard/TrackingOrder";
import UpdateProduct from "../pages/Dashboard/Manager/UpdateProduct";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Blog from "../pages/Blog/Blog";
import Support from "../pages/Support/Support";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "all-products", Component: AllProducts },
      { path: "about", Component: AboutUs },
      { path: "contact", Component: Contact },
      { path: "blog", Component: Blog },
      { path: "support", Component: Support },

      {
        path: "product/:productId",
        // element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
        element: <ProductDetails></ProductDetails>
      },
      {
        path: "booking/:id",
        // element: <PrivateRoute><BookingForm></BookingForm></PrivateRoute>
        element: <BookingForm></BookingForm>
      },
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
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { index: true, Component: DashboardHome },
      { path: "profile", Component: Profile },
      { path: "my-orders", Component: MyOrders },
      { path: "track-order/:id", Component: TrackingOrder },
      { path: "track-order", Component: TrackOrder },

      {
        path: "add-product",
        Component: AddProduct,
      },
      {
        path: "manage-products",
        Component: ManageProducts,
      },
      {
        path: "pending-orders",
        Component: PendingOrders,
      },
      {
        path: "approved-orders",
        Component: ApprovedOrders,
      },
      {
        path: "/dashboard/update-product/:id",
        Component: UpdateProduct,
      },

      // admin-users
      {
        path: "manage-users",
        element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
      },
      {
        path: "get-all-products",
        element: <AdminRoute><GetAllProducts></GetAllProducts></AdminRoute>
      },
      {
        path: "edit-product/:id",
        element: <AdminRoute><EditProduct></EditProduct></AdminRoute>
      },
      {
        path: "all-orders",
        element: <AdminRoute><AllOrders></AllOrders></AdminRoute>
      },
      {
        path: "order-details/:id",
        element: <AdminRoute><OrderDetails></OrderDetails></AdminRoute>
      },

      { path: "payment/:parcelId", Component: Payment },
      { path: "payment-success", element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute> },
      { path: "payment-cancelled", element: <PrivateRoute><PaymentCancelled></PaymentCancelled></PrivateRoute> },
      { path: "payment-history", element: <BuyerRoute><PaymentHistory></PaymentHistory></BuyerRoute> },
    ]
  }
]);
