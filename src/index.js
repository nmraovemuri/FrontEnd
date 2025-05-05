import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'select2/dist/js/select2.min.js';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { store } from "./app/store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

import HomePageOne from "./pages/HomePageOne";
import HomePageTwo from "./pages/HomePageTwo";
import HomePageThree from "./pages/HomePageThree";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPageTwo from "./pages/ProductDetailsPageTwo";
import ProductDetailsPageOne from "./pages/ProductDetailsPageOne";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import BecomeSellerPage from "./pages/BecomeSellerPage";
import WishlistPage from "./pages/WishlistPage";
import AccountPage from "./pages/AccountPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ContactPage from "./pages/ContactPage";
import VendorPage from "./pages/VendorPage";
import VendorDetailsPage from "./pages/VendorDetailsPage";
import VendorTwoPage from "./pages/VendorTwoPage";
import VendorTwoDetailsPage from "./pages/VendorTwoDetailsPage";
import FeatureOne from "./components/FeatureOne";
import TestingData from "./components/TestingData";
import SearchPage from "./pages/SearchPage";
import CartProvider from "./components/CartContext";
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import RefundPolicy from "./components/RefundPolicy";
import Faq from "./components/Faq"
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import SignupActivation from "./components/SignupActivation"
import MyAddress from "./components/MyAddress";
import Logout from "./components/Logout"
import MyProfile from "./components/MyProfile"
import ChangePassword from "./components/ChangePassword";
import ResetPassword from "./components/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path: "/",
        element: <HomePageOne></HomePageOne>,
      },
      {
        path: "/index-two",
        element: <HomePageTwo/>,
      },
      {
        path: "/index-three",
        element: <HomePageThree/>,
      },
      {
        path: "/shop/:id",
        element: <ShopPage></ShopPage>,
      },
      {
        path: "/search/:serachstring",
        element: <SearchPage/>,
      },
      {
        path: "/product-details/:id/:unit_id",
        element: <ProductDetailsPageOne></ProductDetailsPageOne>,
      },
      {
        path: "/product-details-two",
        element: <ProductDetailsPageTwo></ProductDetailsPageTwo>,
      },
      {
        path: "/cart",
        element: <CartPage/>,
      },
      {
        path: "/checkout",
        element: <CheckoutPage/>,
      },
      {
        path: "/become-seller",
        element: <BecomeSellerPage/>,
      },
      {
        path: "/wishlist",
        element: <WishlistPage/>,
      },
      {
        path: "/account",
        element: <AccountPage/>,
      },
      {
        path: "/blog",
        element: <BlogPage/>,
      },
      {
        path: "/blog-details",
        element: <BlogDetailsPage/>,
      },
      {
        path: "/contact",
        element: <ContactPage/>,
      },
      {
        path: "/vendor",
        element: <VendorPage/>,
      },
      {
        path: "/vendor-details",
        element: <VendorDetailsPage/>,
      },
      {
        path: "/vendor-two",
        element: <VendorTwoPage/>,
      },
      {
        path: "/vendor-two-details",
        element: <VendorTwoDetailsPage/>,
      },
      {
        path: "/categories",
        element: <TestingData/>,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy/>,
      },
      {
        path: "/terms-conditions",
        element: <TermsConditions/>,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy/>,
      },
      {
        path: "/signup-activation-status",
        element: <SignupActivation/>,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path : '/customer_reset_password/:customer_id',
        element: <ResetPassword/>,
      },
      {
        path: "/faq",
        element: <Faq/>,
      },
      {
        path: "/myaddress",
        element: <MyAddress/>,
      },
      {
        path: "/my-profile",
        element: <MyProfile/>,
      },
      {
        path: "/logout",
        element: <Logout/>,
      },
     
      {
        path: "/changepassword",
        element: <ChangePassword/>,
      },
     
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CartProvider>
       <RouterProvider router={router} />
    </CartProvider>
    </Provider>,
);

reportWebVitals();
