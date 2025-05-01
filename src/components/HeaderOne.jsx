import React, { useEffect, useState } from "react";
import query from "jquery";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetAllSubCategoriesByCategoriesQuery, useSearchStringsMutation } from "../services/poductsApi";
import { useFormik } from "formik";
import './HeaderOne.css';

const HeaderOne = () => {
  var navigate=useNavigate()
  const [scroll, setScroll] = useState(false);
  var {isLoading,data}=useGetAllSubCategoriesByCategoriesQuery()
  var [findSearchStringsfn]=useSearchStringsMutation()
  var searchform=useFormik({
    initialValues: {
      searchtext: ''
    },
    onSubmit: values => {
        navigate(`/search/${values.searchtext}`)
    },
  });
  // Set scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.pageYOffset > 150);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Initialize Select2
  useEffect(() => {
    const selectElement = query(".js-example-basic-single");
    selectElement.select2();
    
    return () => {
      if (selectElement.data("select2")) {
        selectElement.select2("destroy");
      }
    };
  }, []);

  // Default language and currency
  const [selectedLanguage, setSelectedLanguage] = useState("Eng");
  const handleLanguageChange = (language) => setSelectedLanguage(language);

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const handleCurrencyChange = (currency) => setSelectedCurrency(currency);

  // Menu State
  const [menuActive, setMenuActive] = useState(false);
  const toggleMenu = () => setMenuActive((prev) => !prev);
  
  // Search Control
  const [activeSearch, setActiveSearch] = useState(false);
  const toggleSearch = () => setActiveSearch((prev) => !prev);
  
  // Category Control
  const [activeCategory, setActiveCategory] = useState(false);
  const toggleCategory = () => setActiveCategory((prev) => !prev);
  
  const [activeIndexCat, setActiveIndexCat] = useState(null);
  const handleCatClick = (index) => setActiveIndexCat((prev) => (prev === index ? null : index));
  
  // Mobile Menu Active Index
  const [activeIndex, setActiveIndex] = useState(null);
  const handleMenuClick = (index) => setActiveIndex((prev) => (prev === index ? null : index));
//   // Navigation Items
// const navItems = [
//   { name: "Home", to: "/", hasSubMenu: false },
//   { name: "Grocery", to: "/shop", hasSubMenu: true },
//   { name: "Snacks & Branded Foods", to: "/snacks", hasSubMenu: true },
//   { name: "Dairy & Bakery", to: "/dairy", hasSubMenu: true },
//   { name: "Home Care", to: "/homecare", hasSubMenu: true },
//   { name: "Personal Care", to: "/personalcare", hasSubMenu: true },
//   { name: "Beverages", to: "/beverages", hasSubMenu: true },
//   { name: "Baby Care", to: "/babycare", hasSubMenu: true },
//   { name: "Fruits & Vegetables", to: "/fruitsandvegetables", hasSubMenu: true },
// ];
  return (
    <>
      <div className='overlay' />
      <div className={`side-overlay ${(menuActive || activeCategory) && "show"}`} />
      
      {/* Search Box */}
      <form action='#' className={`search-box ${activeSearch ? "active" : ""}`}>
        <button onClick={toggleSearch} type='button' className='search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1'>
          <i className='ph ph-x' />
        </button>
        <div className='container'>
          <div className='position-relative'>
            <input type='text' className='form-control py-16 px-24 text-xl rounded-pill pe-64' placeholder='Search for a product or brand' />
            <button type='submit' className='w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8'>
              <i className='ph ph-magnifying-glass' />
            </button>
          </div>
        </div>
      </form>
   
      {/* Mobile Menu */}
      <div className={`mobile-menu scroll-sm d-lg-none d-block ${menuActive ? "active" : ""}`}>
        <button onClick={toggleMenu} type='button' className='close-button'>
          <i className='ph ph-x' />
        </button>
        <div className='mobile-menu__inner'>
          <Link to='/' className='mobile-menu__logo'>
  {/* </div> */}

            <img src='assets/images/logo/logo.png' alt='Logo' />
          </Link>
          {/* <div className='mobile-menu__menu'>
            <ul className='nav-menu flex-align nav-menu--mobile'>
              {/* Home Menu */}
              {/* <li onClick={() => handleMenuClick(0)} className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 0 ? "d-block" : ""}`}>
                <Link to='#' className='nav-menu__link'>Home</Link>
              </li>
            </ul>
          </div> */} 
        </div>
      </div>

      {/* Header Top */}
      <div className='header-top bg-main-600 flex-between'>
        <div className='container container-lg'>
          <div className='flex-between flex-wrap gap-8'>
            <ul className='flex-align flex-wrap d-none d-md-flex'>
              {/* <li className='border-right-item'><Link to='#' className='text-white text-sm hover-text-decoration-underline'>Become A Seller</Link></li> */}
              <li className='border-right-item'><Link to='#' className='text-white text-sm hover-text-decoration-underline'>About Us</Link></li>
              <li className='border-right-item'><Link to='#' className='text-white text-sm hover-text-decoration-underline'>Free Delivery</Link></li>
              <li className='border-right-item'><Link to='#' className='text-white text-sm hover-text-decoration-underline'>Returns Policy</Link></li>
            </ul>
             <ul className='header-top__right flex-align flex-wrap'>
              <li className='on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white'>
                {/* <Link to='#' className='text-white text-sm py-8'>Help Center</Link> */}
                <ul className='on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8'>
                  {/* <li className='nav-submenu__item'>
                    <Link to='#' className='nav-submenu__link hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0'>
                      <span className='text-sm d-flex'><i className='ph ph-headset' /></span>
                      Call Center
                    </Link>
                  </li> */}
                  {/* <li className='nav-submenu__item'>
                    <Link to='#' className='nav-submenu__link hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0'>
                      <span className='text-sm d-flex'><i className='ph ph-chat-circle-dots' /></span>
                      Live Chat
                    </Link>
                  </li> */}
                </ul>
              </li>

              {/* Language Selector */}
              {/* <li className='on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white'>
                <Link to='#' className='selected-text text-white text-sm py-8'>{selectedLanguage}</Link>
                <ul className='selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8'>
                  {["English", "Japan", "French", "Germany", "Bangladesh", "South Korea"].map(lang => (
                    <li key={lang}>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0' onClick={() => handleLanguageChange(lang)}>
                        <img src={`assets/images/thumbs/flag${lang}.png`} alt={lang} className='w-16 h-12 rounded-4 border border-gray-100' />
                        {lang}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li> */}

              {/* Currency Selector */}
              {/* <li className='on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white'>
                <Link to='#' className='selected-text text-white text-sm py-8'>{selectedCurrency}</Link>
                <ul className='selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8'>
                  {["USD", "Yen", "Franc", "EURO", "BDT", "WON"].map(curr => (
                    <li key={curr}>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0' onClick={() => handleCurrencyChange(curr)}>
                        <img src={`assets/images/thumbs/flag${curr}.png`} alt={curr} className='w-16 h-12 rounded-4 border border-gray-100' />
                        {curr}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li> */}

              {/* Account Link */}
              {/* <li className='border-right-item'>
                <Link to='/account' className='text-white text-sm py-8 flex-align gap-6'>
                  <span className='icon text-md d-flex'><i className='ph ph-user-circle' /></span>
                  <span className='hover-text-decoration-underline'>My Account</span>
                </Link>
              </li> */}
            </ul> 
          </div>
        </div>
      </div>

      {/* Header Middle */}
      <header className={`header-middle bg-color-one border-bottom border-gray-100`}>
        <div className='container container-lg'>
          <nav className='header-inner flex-between'>
            <div className='logo'>
              <Link to='/' className='link'>

                <img src='assets/images/logo/logo.png' alt='Logo' />

              </Link>
            </div>

            {/* Search Form Location */}

            <form onSubmit={searchform.handleSubmit} className='flex-align flex-wrap form-location-wrapper'>
              <div className='search-category d-flex h-48 select-border-end-0 radius-end-0 search-form d-sm-flex d-none'>
             
                  
                    <select defaultValue={0} className='js-example-basic-single border border-gray-200 border-end-0' {...searchform.getFieldProps("location")}>
                    <option value={0}>Choose Location</option>

            
                      <option value={1}>Balangar</option>
                      <option value={2}>Chintal</option>
                      <option value={3}>Jagdigirigutta</option>
                      <option value={4}>Pragathi Nagar</option>
                      <option value={5}>Jeedimetla</option>
                      <option value={6}>Suchitra</option>
                      <option value={7}>Shapur</option>
                      <option value={8}>Gandi Misamma</option>
                      <option value={9}>Kompally</option>
                    </select>
                <div className='search-form__wrapper position-relative'>
                  <input type='text' className='search-form__input common-input py-13 ps-16 pe-18 rounded-end-pill pe-44' {...searchform.getFieldProps("searchtext")} placeholder='Search the product in your city' />
                  <button type='submit' className='w-32 h-32 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8'>
                    <i className='ph ph-magnifying-glass' />
                  </button>
                </div>
              </div>
            </form>

            {/* Header Middle Right */}
            <div className='header-right flex-align d-lg-block d-none'>
              <div className='flex-align flex-wrap gap-12'>
                <button type='button' className='search-icon flex-align d-lg-none d-flex gap-4 item-hover'>
                  <span className='text-2xl text-gray-700 d-flex position-relative item-hover__text'>
                    <i className='ph ph-magnifying-glass' />
                  </span>
                </button>
                <Link to='/login' className='flex-align gap-4 item-hover'>
                <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                  <i className='mdi mdi-account-circle' /></span>
                <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>
                  Login</span>
              </Link>
                <Link to='/register' className='flex-align gap-4 item-hover'>
                <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                  <i className='mdi mdi-account-circle' /></span>
                <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>
                  Register</span>
              </Link>
                <Link to='/cart' className='flex-align gap-4 item-hover'>
                  <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                    <i className='mdi mdi-cart' />
                    <span className='w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4'>2</span>
                  </span>
                  <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'> My Cart </span>
                </Link>

               
              <Link to='/myaddress' className='flex-align gap-4 item-hover'>
                <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                  <i className='ph ph-user' /></span>
                <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>
                  My Address</span>
              </Link>

              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Header Fixed */}
      
      <header className={`header bg-white border-bottom border-gray-100 ${scroll ? "fixed-header" : ""}`}>
        <div className='container container-lg'>
          <nav className='header-inner d-flex justify-content-between gap-8'>
            <div className='flex-align menu-category-wrapper'>
              {/* /* Category Dropdown */}
               <div className='category on-hover-item'>
              
                <div className={`responsive-dropdown cat on-hover-dropdown common-dropdown nav-submenu p-0 submenus-submenu-wrapper ${activeCategory ? "active" : ""}`}>
                  {/* Close Button */}
                   <button onClick={() => { toggleCategory(); setActiveIndexCat(null); }} type='button' className='close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex'>
                    <i className='ph ph-x' />
                  </button>
                  <div className='logo px-16 d-lg-none d-block'>
                    <Link to='/' className='link'>
                      <img src='assets/images/logo/logo.png' alt='Logo' />
                    </Link>
                  </div>
                  
                </div>
              </div> 
              {/* Menu Start */}
             

              
              <div className='header-menu d-lg-block d-none'>
                <ul className="nav-menu flex-align">

                  <li className="on-hover-item nav-menu__item ">
                    <Link to="#" className="nav-menu__link">Home</Link>
                  </li>
                  {!isLoading && data?.data?.map((cat) => (
                      <li key={cat.category_id} className='on-hover-item nav-menu__item has-submenu'>
                        <Link to='#' className='nav-menu__link'>{cat.category_name}</Link>
                        <ul className='on-hover-dropdown common-dropdown nav-submenu scroll-sm'>
                          {cat.subcategories?.map((subcat) => (
                            <li key={subcat.subcategory_id} className='common-dropdown__item nav-submenu__item'>
                              <NavLink
                                to={`/shop/${subcat.subcategory_id}`} // or your route structure
                                className={({ isActive }) =>
                                  isActive
                                    ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                                    : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                                }
                              >
                                {subcat.sub_category_name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}

                                    
                                         </ul>
                                       

                  

                    </div>
                  
              {/* Menu End */}
            </div>

            {/* Header Right */}
            <div className='header-right flex-align'>
             
              <div className='me-16 d-lg-none d-block'>
                <div className='flex-align flex-wrap gap-12'>
                  <button onClick={toggleSearch} type='button' className='search-icon flex-align d-lg-none d-flex gap-4 item-hover'>
                    <span className='text-2xl text-gray-700 d-flex position-relative item-hover__text'>
                      <i className='ph ph-magnifying-glass' />
                    </span>
                  </button>
                  
                  <Link to='/wishlist' className='flex-align gap-4 item-hover'>
                    <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                      <i className='ph ph-heart' />
                      <span className='w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4'>2</span>
                    </span>
                    <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>Wishlist</span>
                  </Link>
                  
                  <Link to='/cart' className='flex-align gap-4 item-hover'>
                    <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                      <i className='ph ph-shopping-cart-simple' />
                      <span className='w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4'>2</span>
                    </span>
                    <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>Cart</span>
                  </Link>
                </div>
              </div>
              <button onClick={toggleMenu} type='button' className='toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex'>
                <i className='ph ph-list' />
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default HeaderOne;