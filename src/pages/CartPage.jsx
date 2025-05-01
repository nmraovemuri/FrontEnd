import React from "react";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import CartSection from "../components/CartSection";
import ShippingOne from "../components/ShippingOne";
import ScrollToTop from "react-scroll-to-top";
import HeaderOne from "../components/HeaderOne";

const CartPage = () => {
  return (
    <>
      <ColorInit color={true} />
      <ScrollToTop smooth color="#FA6400" />
      <Preloader />

      <HeaderOne />

      <Breadcrumb title={"Cart"} />
      <CartSection />
      <ShippingOne />

      <FooterOne />
      <BottomFooter />
    </>
  );
};

export default CartPage;
