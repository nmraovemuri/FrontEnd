import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCustomerResetPasswordMutation } from '../services/customerApi';
import HeaderOne from './HeaderOne';
import FooterOne from './FooterOne';

const ResetPassword = () => {
  const { customer_id } = useParams(); // Getting customer_id from the URL params
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [customerResetPassword, { isLoading }] = useCustomerResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
  
    if (newPassword.length < 6 || newPassword.length > 8) {
      setError('Password must be 6 to 8 characters');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    console.log("Customer ID:", customer_id);
    console.log("Payload:", { customer_id, new_password: newPassword, confirmpassword: confirmPassword });
  
    try {
      await customerResetPassword({
        customer_id,
        new_password: newPassword,
        confirmpassword: confirmPassword,
      }).unwrap();
      alert('Password reset successfully!');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    } catch (err) {
      console.error('Error response:', err);
      setError(err.data?.message || 'Something went wrong');
    }
  }; 
  
  return (
    <>
      <HeaderOne />
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '30px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
          }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '25px' }}>
            Reset Password
          </h3>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />

            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '10px',
                 backgroundColor: 'rgb(41, 158, 96)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      <FooterOne />
    </>
  );
};

export default ResetPassword;
