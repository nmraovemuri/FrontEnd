import React from "react";
import Preloader from "../helper/Preloader";
import ShippingTwo from "../components/ShippingTwo";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import SearchSection from "../components/SearchSection";

const SearchPage = () => {

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

      {/* searchsection */}
      <SearchSection/>

      {/* ShippingTwo */}
      <ShippingTwo />

      {/* FooterTwo */}
      {/* <FooterTwo /> */}
      <FooterOne/>


    </>
  );
};

export default SearchPage;
