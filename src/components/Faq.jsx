import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderOne from './HeaderOne';
import FooterOne from './FooterOne';

const Faq = () => {
  const [openPanel, setOpenPanel] = useState(null);

  const handleToggle = (panel) => {
    if (openPanel === panel) {
      setOpenPanel(null); // Close the panel if it was already open
    } else {
      setOpenPanel(panel); // Open the new panel
    }
  };

  return (
    <>
      <HeaderOne />

      {/* FAQ Header Section */}
      <section style={{ padding: '20px 0', backgroundColor: '#fff1e6', marginBottom: '30px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 text-center">
              <img
                className="img-fluid"
                src="assets/img/slider/1.1.jpg"
                alt="Header"
                style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-page section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h1 className="mt-0 mb-3" style={{ fontSize: '2.5rem', color: '#0d102d', fontWeight: 500, fontFamily: "'Maven Pro', sans-serif" }}>
                  Frequently Asked Questions
                </h1>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="accordion" id="faqAccordion">

                {/* ORDER PLACEMENT */}
                <div className="accordion-item">
                  <h5 style={{ color: '#370617', fontSize: '1.25rem', fontWeight: 'bold', fontFamily: "'Maven Pro', sans-serif" }}>ORDER PLACEMENT</h5>
                  <hr />
                  <div className="accordion-header" id="headingOne">
                    <h4 className="accordion-button" type="button" onClick={() => handleToggle('collapseOne')}>
                      {openPanel === 'collapseOne' ? '-' : '+'} How can I track my order?
                    </h4>
                  </div>
                  {openPanel === 'collapseOne' && (
                    <div className="accordion-body">
                      At every step of the way, you will be receiving information on the progress of your order.
                    </div>
                  )}
                </div>

                <div className="accordion-item">
                  <div className="accordion-header" id="headingTwo">
                    <h4 className="accordion-button" onClick={() => handleToggle('collapseTwo')}>
                      {openPanel === 'collapseTwo' ? '-' : '+'} How do I place orders with Aswikamart?
                    </h4>
                  </div>
                  {openPanel === 'collapseTwo' && (
                    <div className="accordion-body">
                      In 4 simple steps, you can place your orders with us:<br />
                      • Browse through our categories.<br />
                      • Add products to the shopping bag.<br />
                      • Register with your email, address, and contact details.<br />
                      • Confirm and Pay for the orders.
                    </div>
                  )}
                </div>

                {/* Other FAQ Sections */}
                <div className="accordion-item">
                  <div className="accordion-header" id="headingThree">
                    <h4 className="accordion-button" onClick={() => handleToggle('collapseThree')}>
                      {openPanel === 'collapseThree' ? '-' : '+'} Why is the registration necessary?
                    </h4>
                  </div>
                  {openPanel === 'collapseThree' && (
                    <div className="accordion-body">
                      We recommend you register with us to keep track of all your activities and to receive information on new offers and deals.
                    </div>
                  )}
                </div>
                <div className="accordion-item">
                  <h5 style={{ color: '#370617', fontSize: '1.25rem', fontWeight: 'bold', fontFamily: "'Maven Pro', sans-serif" }}>PAYMENTS</h5>
                  <hr />
                  <div className="accordion-header" id="headingOne">
                    <h4 className="accordion-button" type="button" onClick={() => handleToggle('collapseOne')}>
                      {openPanel === 'collapseOne' ? '-' : '+'}  How do I pay for my orders? 
                    </h4>
                  </div>
                  {openPanel === 'collapseOne' && (
                    <div className="accordion-body">
                      We have different gateways for your convenience where from you can pay through any online payment options.
                    </div>
                  )}
                </div>
                <div className="accordion-item">
                  <h5 style={{ color: '#370617', fontSize: '1.25rem', fontWeight: 'bold', fontFamily: "'Maven Pro', sans-serif" }}>REFUND</h5>
                  <hr />
                  <div className="accordion-header" id="headingOne">
                    <h4 className="accordion-button" type="button" onClick={() => handleToggle('collapseOne')}>
                      {openPanel === 'collapseOne' ? '-' : '+'}  How do I receive a refund?  
                    </h4>
                  </div>
                  {openPanel === 'collapseOne' && (
                    <div className="accordion-body">
                    If there is a product which is Out of Stock or not available at the moment due to unavoidable circumstances the amount for the product will be refunded to your Aswikamart Wallet.
                    </div>
                  )}
                </div>
               
                <div className="accordion-item">
                  <h5 style={{ color: '#370617', fontSize: '1.25rem', fontWeight: 'bold', fontFamily: "'Maven Pro', sans-serif" }}>SHIPPING CHARGES</h5>
                  <hr />
                  <div className="accordion-header" id="headingOne">
                    <h4 className="accordion-button" type="button" onClick={() => handleToggle('collapseOne')}>
                      {openPanel === 'collapseOne' ? '-' : '+'}   Shipping / Delivery Charges 
                    </h4>
                  </div>
                  {openPanel === 'collapseOne' && (
                    <div className="accordion-body">
                   For the benefit of our valued customers here are the revised Shipping Charges:<br/>
• Orders from Rs. 500/- to below Rs. 999/- -- Rs. 49/-<br/>
• Orders of Rs. 1000/- and above - FREE.
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </section>
      

      <FooterOne />
    </>
  );
};

export default Faq;
