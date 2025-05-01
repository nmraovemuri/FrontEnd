import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCustomerSignInMutation } from '../services/customerApi';
import { Eye, EyeOff } from 'lucide-react';
import HeaderOne from './HeaderOne';
import FooterOne from './FooterOne';

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);

  const [signin] = useCustomerSignInMutation();

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.usernameOrEmail || !loginData.password) {
      setMessage('Please fill in both login fields.');
      setSuccess(false);
      return;
    }

    try {
      const res = await signin({
        email_id: loginData.usernameOrEmail,
        password: loginData.password,
      }).unwrap();

      const customer = res.customer;
      if (customer.is_active?.data?.[0] === 1) {
        localStorage.setItem('customer_id', customer.customer_id);
        
    localStorage.setItem("first_name", customer.first_name);
    localStorage.setItem("last_name", customer.last_name);
    localStorage.setItem("email_id", customer.email_id);
    localStorage.setItem("mobile", customer.mobile);
    
        setMessage('Login successful! Redirecting...');
        setSuccess(true);
        setLoginData({ usernameOrEmail: '', password: '' });        
        localStorage.setItem('signedup', "true");     
      
        navigate('/');
      } else {
        setMessage('Please verify your email before login.');
        setSuccess(false);
      }
    } catch (err) {
      setMessage('Login failed. Please check your credentials.');
      setSuccess(false);
    }
  };

  return (
    <>
      <HeaderOne />
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '30px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '25px' }}>Login</h3>
          {message && (
            <p style={{ textAlign: 'center', color: success ? 'green' : 'red' }}>
              {message}
            </p>
          )}
          <form onSubmit={handleLogin}>
            <label htmlFor="usernameOrEmail">Username or Email:</label>
            <input
              id="usernameOrEmail"
              type="text"
              value={loginData.usernameOrEmail}
              onChange={handleLoginChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            <label htmlFor="password">Password:</label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={loginPasswordVisible ? 'text' : 'password'}
                value={loginData.password}
                onChange={handleLoginChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '15px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
              <span
                onClick={() => setLoginPasswordVisible(!loginPasswordVisible)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer'
                }}
              >
                {loginPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            <button type="submit" style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#299E60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
             Enter to your account
            </button>
          </form>
          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <Link to="/forgotpassword" style={{ color: '#dc3545', textDecoration: 'none' }}>
              Forgot your password?
            </Link>
          </div>
        </div>
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <Link to="/register" style={{ color: '#dc3545', textDecoration: 'none' }}>
            If your are not Registered yet, Please take Register now.
            </Link>
          </div>
      </div>
      
      <FooterOne />
    </>
  );
};

export default Login;
