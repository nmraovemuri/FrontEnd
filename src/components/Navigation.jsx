import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Contexts for user and cart (implement as needed)
const UserContext = React.createContext();
const CartContext = React.createContext();

const Navigation = () => {
  const navigate = useNavigate();

  // User state
  const { user, setUser } = useContext(UserContext);
  // Cart state
  const { cartItems, getCartSize, getCartTotalPrice, getCartDiscountPrice, removeFromCart } = useContext(CartContext);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [catSubcat, setCatSubcat] = useState([]);
  const [locationList] = useState(['Balangar', 'Chintal', 'Jagdigirigutta', 'Pragathi Nagar', 'Jeedimetla', 'Suchitra', 'Shapur', 'Gandi Misamma', 'Kompally']);
  const [searchString, setSearchString] = useState('');
  const [showSideCart, setShowSideCart] = useState(false);

  // Fetch categories & subcategories
  useEffect(() => {
    fetchCategoriesAndSubcategories();
  }, []);

  const fetchCategoriesAndSubcategories = async () => {
    try {
      // Replace with your API endpoints
      const categoriesRes = await axios.get('/api/categories');
      const subcategoriesRes = await axios.get('/api/subcategories');

      if (categoriesRes.data.status === 'success') {
        setCategories(categoriesRes.data.data);
        // Store categories in context or state as needed
      }
      if (subcategoriesRes.data.status === 'success') {
        setSubcategories(subcategoriesRes.data.data);
        // Map categories to subcategories
        const mapped = categoriesRes.data.data.map(cat => {
          const subs = subcategoriesRes.data.data.filter(sub => sub.category_name === cat.category_name);
          return { ...cat, subCategories: subs };
        });
        setCatSubcat(mapped);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = () => {
    // Your login logic
  };

  const handleLogout = () => {
    setUser(null);
    // Remove tokens, etc.
    navigate('/home');
  };

  const loggedIn = () => {
    return user != null;
  };

  const toggleSideCart = () => {
    setShowSideCart(!showSideCart);
  };

  const handleSearch = () => {
    if (searchString.trim().length > 0) {
      navigate(`/search/${searchString}`);
    }
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-light bg-faded osahan-menu" style={{ backgroundColor: '#370617', zIndex: 59 }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="assets/img/logo.png" alt="logo" />
          </Link>

          {/* Cart Button */}
          <p className="list-inline-item cart-btn" style={{ color: '#fff', display: 'none' }}>
            <button className="btn btn-link border-none" onClick={toggleSideCart}>
              <i className="mdi mdi-cart"></i> My Cart <small className="cart-value">{getCartSize()}</small>
            </button>
          </p>

          {/* User Links */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {!loggedIn() ? (
              <>
                <Link to="/register" className="btn btn-link">
                  <i className="mdi mdi-account-circle"></i> Register
                </Link>
                <Link to="/login" className="btn btn-link" style={{ marginLeft: '10px' }}>
                  <i className="mdi mdi-account-circle"></i> Login
                </Link>
              </>
            ) : (
              <div className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
                <button
                  className="btn"
                  style={{
                    background: 'linear-gradient(to bottom, #A8DE1C 0%, #50AC02 100%)',
                    textTransform: 'capitalize',
                  }}
                  onClick={() => {}}
                >
                  Hi {user?.first_name}
                </button>
                {/* Dropdown toggle */}
                <button
                  className="btn dropdown-toggle dropdown-toggle-split"
                  style={{
                    background: 'linear-gradient(to bottom, #A8DE1C 0%, #50AC02 100%)',
                  }}
                  onClick={() => {}}
                >
                  <span className="caret"></span>
                </button>
                {/* Dropdown menu */}
                <ul
                  className="dropdown-menu"
                  style={{ position: 'absolute', right: 0, zIndex: 1000, width: '190px' }}
                >
                  <li>
                    <Link className="dropdown-item" to="/my-profile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/my-address">
                      My Address
                    </Link>
                  </li>
                  {/* Add more links as needed */}
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Secondary Navigation with Categories */}
      <nav className="navbar navbar-expand-lg navbar-light osahan-menu-2 pad-none-mobile">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  HOME
                </Link>
              </li>
              {catSubcat.map((cat) => (
                <li key={cat.category_name} className="nav-item dropdown upper" style={{ cursor: 'pointer' }}>
                  <a
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {cat.category_name}
                  </a>
                  <div className="dropdown-menu">
                    {cat.subCategories.map((sub) => (
                      <Link
                        key={sub.id}
                        className="dropdown-item"
                        to={`/shop/${cat.category_name}/${sub.sub_category_name}/${sub.id}`}
                      >
                        <i className="mdi mdi-chevron-right" aria-hidden="true"></i> {sub.sub_category_name}
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {showSideCart && (
        <div className="cart-sidebar">
          <div className="cart-sidebar-header">
            <h5>
              My Cart <span className="text-success">{getCartSize()} items</span>
              <button style={{ float: 'right' }} onClick={toggleSideCart}>
                X
              </button>
            </h5>
          </div>
          <div className="cart-sidebar-body">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-list-product">
                <button className="float-right remove-cart" onClick={() => removeFromCart(item)}>
                  <i className="mdi mdi-close" style={{ cursor: 'pointer' }}></i>
                </button>
                <img src={item.product_img_200} alt="" className="img-fluid" />
                <span className="badge badge-success">{item.discount_percentage}% OFF</span>
                <h5 style={{ cursor: 'pointer', fontSize: '12px' }}>{item.product_name}</h5>
                {/* Quantity controls */}
                <div className="qty col-md-4 float-right">
                  <div className="input-group">
                    <button
                      className="btn btn-theme-round btn-number"
                      onClick={() => cartService.decrementProductQuantityByOne(item)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      disabled
                      style={{ width: '40px', textAlign: 'center' }}
                    />
                    <button
                      className="btn btn-theme-round btn-number"
                      onClick={() => cartService.incrementProductQuantityByOne(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Additional product info */}
                <h6>
                  <strong>
                    <span className="mdi mdi-approval"></span> Available in
                  </strong>{' '}
                  - {item.unit_value}
                  {item.unit_type}
                </h6>
                <p className="offer-price mb-0">
                  Rs.{item.sale_price}
                  <i className="mdi mdi-tag-outline"></i>
                  <span className="regular-price" style={{ fontSize: '12px' }}>
                    Rs.{item.mrp}
                  </span>
                  <br />
                  <span style={{ fontSize: '12px' }}>you save Rs.{item.discount_amount}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="cart-sidebar-footer">
            <div className="cart-store-details">
              <p>
                Sub Total <strong className="float-right">Rs. {getCartTotalPrice()}</strong>
              </p>
              <h6>
                Your total savings <strong className="float-right text-danger">Rs.{getCartDiscountPrice()}</strong>
              </h6>
            </div>
            <button className="btn btn-secondary btn-lg btn-block" onClick={() => {
                setShowSideCart(false);
                navigate('/cart');
              }}>
              <span className="float-left">
                <i className="mdi mdi-cart-outline"></i> View Cart
              </span>
              <span className="float-right">
                <strong>Rs {getCartTotalPrice()}</strong>
                <i className="mdi mdi-chevron-right"></i>
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;