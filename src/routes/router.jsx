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


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "all-products", Component: AllProducts },
      { path: "about", Component: AboutUs },
      { path: "contact", Component: Contact },

      {
        path: "product/:productId",
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
      },
      {
        path: "booking/:id",
        element: <PrivateRoute><BookingForm></BookingForm></PrivateRoute>
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
      { path: "profile", Component: Profile },
      { path: "my-orders", Component: MyOrders },

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


      { path: "payment/:parcelId", Component: Payment },
      { path: "payment-success", element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute> },
      { path: "payment-cancelled", element: <PrivateRoute><PaymentCancelled></PaymentCancelled></PrivateRoute> },
      { path: "payment-history", element: <BuyerRoute><PaymentHistory></PaymentHistory></BuyerRoute> },


      { path: "track-order", Component: TrackOrder },
    ]
  }
]);
