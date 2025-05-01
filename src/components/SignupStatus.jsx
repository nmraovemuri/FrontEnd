import React from 'react';
import HeaderOne from './HeaderOne';
import FooterOne from './FooterOne';

const SignupStatus = () => {
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
          backgroundColor: '#f8f9f9',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '30px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
          }}
        >
          <h3
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              fontSize: '25px',
              color: '#28a745',
            }}
          >
            Signup Successful!
          </h3>

          <p style={{ textAlign: 'center', fontSize: '16px', fontWeight: 500 }}>
            Your signup has been successfully completed with ASM.
          </p>

          <p style={{ textAlign: 'center', fontSize: '16px', marginTop: '10px' }}>
            We have sent an <strong>Email-ID activation link</strong> to your registered email.
            Please check your inbox and verify your account to proceed further with ASM.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              style={{ width: '100px', margin: '20px 0' }}
              src="/assets/img/smile.png"
              alt="Success"
            />
          </div>

          <p style={{ textAlign: 'center', fontSize: '15px', color: 'gray' }}>
            Didn’t receive the mail? Please check your spam/junk folder.
          </p>

          {/* <a
            href="/account"
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              padding: '10px',
              marginTop: '10px',
              backgroundColor: '#FF6F00',
              color: 'white',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Go to Login
          </a> */}
        </div>
      </div>

      <FooterOne />
    </>
  );
};

export default SignupStatus;
