
// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

// const Account = () => {
    
//     return (
//         <section className="account py-80">
//             <div className="container container-lg">
//                 <form action="#">
//                     <div className="row gy-4">
//                         {/* Login Card Start */}
//                         <div className="col-xl-6 pe-xl-5">
//                             <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
//                                 <h6 className="text-xl mb-32">Login</h6>
//                                 <div className="mb-24">
//                                     <label
//                                         htmlFor="username"
//                                         className="text-neutral-900 text-lg mb-8 fw-medium"
//                                     >
//                                         Username or email address <span className="text-danger">*</span>{" "}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="common-input"
//                                         id="username"
//                                         placeholder="First Name"
//                                     />
//                                 </div>
//                                 <div className="mb-24">
//                                     <label
//                                         htmlFor="password"
//                                         className="text-neutral-900 text-lg mb-8 fw-medium"
//                                     >
//                                         Password
//                                     </label>
//                                     <div className="position-relative">
//                                         <input
//                                             type="password"
//                                             className="common-input"
//                                             id="password"
//                                             placeholder="Enter Password"
//                                             defaultValue="password"
//                                         />
//                                         <span
//                                             className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash"
//                                             id="#password"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="mb-24 mt-48">
//                                     <div className="flex-align gap-48 flex-wrap">
//                                         <button type="submit" className="btn btn-main py-18 px-40">
//                                             Log in
//                                         </button>
//                                         <div className="form-check common-check">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 defaultValue=""
//                                                 id="remember"
//                                             />
//                                             <label
//                                                 className="form-check-label flex-grow-1"
//                                                 htmlFor="remember"
//                                             >
//                                                 Remember me
//                                             </label>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mt-48">
//                                     <Link
//                                         to="#"
//                                         className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline"
//                                     >
//                                         Forgot your password?
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* Login Card End */}
//                         {/* Register Card Start */}
//                         <div className="col-xl-6">
//                             <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
//                                 <h6 className="text-xl mb-32">Register</h6>
//                                 <div className="mb-24">
//                                     <label
//                                         htmlFor="usernameTwo"
//                                         className="text-neutral-900 text-lg mb-8 fw-medium"
//                                     >
//                                         Username <span className="text-danger">*</span>{" "}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="common-input"
//                                         id="usernameTwo"
//                                         placeholder="Write a username"
//                                     />
//                                 </div>
//                                 <div className="mb-24">
//                                     <label
//                                         htmlFor="emailTwo"
//                                         className="text-neutral-900 text-lg mb-8 fw-medium"
//                                     >
//                                         Email address
//                                         <span className="text-danger">*</span>{" "}
//                                     </label>
//                                     <input
//                                         type="email"
//                                         className="common-input"
//                                         id="emailTwo"
//                                         placeholder="Enter Email Address"
//                                     />
//                                 </div>
//                                 <div className="mb-24">
//                                     <label
//                                         htmlFor="enter-password"
//                                         className="text-neutral-900 text-lg mb-8 fw-medium"
//                                     >
//                                         Password
//                                         <span className="text-danger">*</span>
//                                     </label>
//                                     <div className="position-relative">
//                                         <input
//                                             type="password"
//                                             className="common-input"
//                                             id="enter-password"
//                                             placeholder="Enter Password"
//                                             defaultValue="password"
//                                         />
//                                         <span
//                                             className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash"
//                                             id="#enter-password"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="my-48">
//                                     <p className="text-gray-500">
//                                         Your personal data will be used to process your order, support
//                                         your experience throughout this website, and for other purposes
//                                         described in our
//                                         <Link to="#" className="text-main-600 text-decoration-underline">
//                                             {" "}
//                                             privacy policy
//                                         </Link>
//                                         .
//                                     </p>
//                                 </div>
//                                 <div className="mt-48">
//                                     <button type="submit" className="btn btn-main py-18 px-40">
//                                         Register
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* Register Card End */}
//                     </div>
//                 </form>
//             </div>
//         </section>

//     )
// }

// export default Account

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useCustomerSignupMutation,
  useCustomerSignInMutation,
  useCheckEmailAlreadyExistedMutation
} from '../services/customerApi';
import { Eye, EyeOff } from 'lucide-react';

const Account = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email_id: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    location: '',
  });

  const [loginData, setLoginData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);
  const [emailExists, setEmailExists] = useState(false);

  const [signup] = useCustomerSignupMutation();
  const [checkEmailAlreadyExisted] = useCheckEmailAlreadyExistedMutation();
  const [signin] = useCustomerSignInMutation();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const handleEmailBlur = async () => {
    if (!formData.email_id) return;

    try {
      const res = await checkEmailAlreadyExisted({ email_id: formData.email_id }).unwrap();
      if (res.exists) {
        setEmailExists(true);
        setMessage('Email already exists. Please use a different one.');
        setSuccess(false);
      } else {
        setEmailExists(false);
        setMessage('');
      }
    } catch (err) {
      setMessage('Something went wrong while checking email.');
      setSuccess(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (emailExists) {
      setMessage('Email already registered.');
      setSuccess(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      setSuccess(false);
      return;
    }

    try {
      await signup(formData).unwrap();
      setMessage('Registration successful! Please check your email to verify.');
      setSuccess(true);
      setFormData({
        username: '',
        first_name: '',
        last_name: '',
        email_id: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        location: '',
      });
    } catch (err) {
      setMessage('Registration failed. Please try again.');
      setSuccess(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.usernameOrEmail || !loginData.password) {
      setMessage('Please fill in both login fields.');
      setSuccess(false);
      return;
    }
    console.log("loginData", loginData)
    try {
      const res = await signin({
        email_id: loginData.usernameOrEmail,
        password: loginData.password,
      }).unwrap();

      const customer = res.customer;
      console.log("customer", customer)
      if (customer.is_active?.data?.[0] === 1) {
        window.localStorage.setItem("token",res.token)
        localStorage.setItem('customer_id', customer.customer_id);
        setMessage('Login successful! Redirecting...');
        setSuccess(true);
        setLoginData({ usernameOrEmail: '', password: '' });
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
    <section className="account py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          {/* Login Form */}
          <div className="col-xl-6 pe-xl-5">
            <form onSubmit={handleLogin}>
              <div className="border border-gray-100 rounded-16 px-24 py-40 h-100">
                <h6 className="text-xl mb-32">Login</h6>

                <div className="mb-24">
                  <label htmlFor="usernameOrEmail" className="text-lg mb-8 fw-medium">
                    Username or Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="usernameOrEmail"
                    placeholder="Enter Username or Email"
                    value={loginData.usernameOrEmail}
                    onChange={handleLoginChange}
                  />
                </div>

                <div className="mb-24">
                  <label htmlFor="password" className="text-lg mb-8 fw-medium">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type={loginPasswordVisible ? 'text' : 'password'}
                      className="common-input"
                      id="password"
                      placeholder="Enter Password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-16 cursor-pointer"
                      onClick={() => setLoginPasswordVisible(!loginPasswordVisible)}
                    >
                      {loginPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                </div>

                <div className="mb-24 mt-48 d-flex justify-content-between align-items-center">
                  <button type="submit" className="btn btn-main py-18 px-40">Log in</button>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember" />
                    <label className="form-check-label" htmlFor="remember">Remember me</label>
                  </div>
                </div>

                <div className="mt-48">
                  <Link to="/forgotpassword" className="text-danger-600 fw-semibold">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </form>
          </div>

          {/* Register Form */}
          <div className="col-xl-6">
            <form onSubmit={handleRegister}>
              <div className="border border-gray-100 rounded-16 px-24 py-40">
                <h6 className="text-xl mb-32">Register</h6>

                {['username', 'first_name', 'last_name', 'email_id', 'mobile'].map((field, idx) => (
                  <div className="mb-24" key={idx}>
                    <label htmlFor={field} className="text-lg mb-8 fw-medium">
                      {field.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="common-input"
                      id={field}
                      placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                      value={formData[field]}
                      onChange={handleChange}
                      onBlur={field === 'email_id' ? handleEmailBlur : undefined}
                    />
                  </div>
                ))}

                <div className="mb-24">
                  <label htmlFor="password" className="text-lg mb-8 fw-medium">Password <span className="text-danger">*</span></label>
                  <div className="position-relative">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      className="common-input"
                      id="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-16 cursor-pointer"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                </div>

                <div className="mb-24">
                  <label htmlFor="confirmPassword" className="text-lg mb-8 fw-medium">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type={confirmPasswordVisible ? 'text' : 'password'}
                      className="common-input"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-16 cursor-pointer"
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                      {confirmPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                </div>

                <div className="mb-24">
                  <label className="text-lg mb-8 fw-medium">Location <span className="text-danger">*</span></label>
                  <select
                    id="location"
                    className="form-select common-input"
                    value={formData.location}
                    onChange={handleChange}
                  >
                    <option value="">Select Location</option>
                    <option value="Balangar">Balangar</option>
                    <option value="Chintal">Chintal</option>
                    <option value="Jagdigirigutta">Jagdigirigutta</option>
                    <option value="Pragathi Nagar">Pragathi Nagar</option>
                    <option value="Jeedimetla">Jeedimetla</option>
                    <option value="Suchitra">Suchitra</option>
                    <option value="Shapur">Shapur</option>
                    <option value="Gandi Misamma">Gandi Misamma</option>
                    <option value="Kompally">Kompally</option>
                  </select>
                </div>

                <div className="mt-24">
                  <button type="submit" className="btn btn-main w-100 py-18">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {message && (
          <div className={`alert mt-4 ${success ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Account;
