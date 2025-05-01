import React from "react";
import Preloader from "../helper/Preloader";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import ShopSection from "../components/ShopSection";
import ShippingTwo from "../components/ShippingTwo";
import FooterTwo from "../components/FooterTwo";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";

import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";


const ShopPage = () => {

  return (
    <>
      {/* ColorInit */}

      <ColorInit color={false} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#299E60" />

      {/* Preloader */}
      <Preloader />
 
      {/* HeaderOne */} 
      <HeaderOne/>
      {/* <HeaderTwo category={true} /> */}

      {/* Breadcrumb */}
      {/* <Breadcrumb title={"Shop"} /> */}

      {/* <ColorInit color={true} /> */}

      {/* ScrollToTop */}
      {/* <ScrollToTop smooth color="#FA6400" /> */}

      {/* Preloader */}
      {/* <Preloader /> */}

      {/* HeaderOne */}
      {/* <HeaderTwo category={true} /> */}

      {/* Breadcrumb */}
      {/* <Breadcrumb title={"Shop"} /> */}


      {/* ShopSection */}
      <ShopSection />

      {/* ShippingTwo */}
      <ShippingTwo />

      {/* FooterTwo */}

      {/* <FooterTwo /> */}
      <FooterOne/>

      {/* <FooterTwo /> */}



    </>
  );
};

export default ShopPage;
