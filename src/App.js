import React from "react";
import { Outlet } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import PhosphorIconInit from "./helper/PhosphorIconInit";

function App() {
  return (
    
    <>
      <RouteScrollToTop />
      <PhosphorIconInit />
        <Outlet/>
   </>
  );
}

export default App;
