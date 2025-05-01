import React, { useState } from 'react';
import { useCustomerSignupMutation, useCheckEmailAlreadyExistedMutation } from '../services/customerApi';
import { Eye, EyeOff } from 'lucide-react';
import HeaderOne from './HeaderOne';
import FooterOne from './FooterOne';

const Register = () => {
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

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);
  const [emailExists, setEmailExists] = useState(false);

  const [signup] = useCustomerSignupMutation();
  const [checkEmailAlreadyExisted] = useCheckEmailAlreadyExistedMutation();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
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

  return (
    <>
      <HeaderOne />
      <div style={{
        minHeight: '80vh',
        background: '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '600px',
          fontSize: '13px'
        }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>Register</h3>

          {message && (
            <div style={{
              textAlign: 'center',
              marginBottom: '15px',
              color: success ? 'green' : 'red'
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handleRegister}>
            {['username', 'first_name', 'last_name', 'email_id', 'mobile'].map((field, idx) => (
              <div style={{ marginBottom: '15px' }} key={idx}>
                <label htmlFor={field} style={{ fontWeight: '500', marginBottom: '5px', display: 'block' }}>
                  {field.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())} <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  onBlur={field === 'email_id' ? handleEmailBlur : undefined}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password" style={{ fontWeight: '500', display: 'block' }}>Password <span style={{ color: 'red' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    paddingRight: '40px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                />
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                  }}
                >
                  {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="confirmPassword" style={{ fontWeight: '500', display: 'block' }}>Confirm Password <span style={{ color: 'red' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    paddingRight: '40px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                />
                <span
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                  }}
                >
                  {confirmPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="location" style={{ fontWeight: '500', display: 'block' }}>Location <span style={{ color: 'red' }}>*</span></label>
              <select
                id="location"
                value={formData.location}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc'
                }}
              >
                <option value="">Select Location</option>
                {[
                  "Balangar", "Chintal", "Jagdigirigutta", "Pragathi Nagar", "Jeedimetla",
                  "Suchitra", "Shapur", "Gandi Misamma", "Kompally"
                ].map((loc, idx) => (
                  <option key={idx} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <button type="submit" style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#299E60',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Register
            </button>
          </form>
        </div>
      </div>
      <FooterOne />
    </>
  );
};

export default Register;
