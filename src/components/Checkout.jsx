



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUpdateCustomerAddressMutation } from '../services/customerApi';

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("payment1");
  const [customer_id, setCustomerId] = useState("");

  const [address, setAddress] = useState({
    first_name: '',
    last_name: '',
    email_id: '',
    mobile: '',
    addr_field1: '',
    addr_field2: '',
    addr_field3: '',
    addr_field4: '',
    addr_field5: '',
    addr_field6: '',
    pin_code: ''
  });

  const [updateCustomerAddress] = useUpdateCustomerAddressMutation();

  useEffect(() => {
    const storedCustomerId = localStorage.getItem('customer_id');
    if (storedCustomerId) {
      setCustomerId(storedCustomerId);
    }
  }, []);

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "customer_id") {
      setCustomerId(value);
    } else {
      setAddress((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!customer_id) {
      alert("Customer ID is required");
      return;
    }

    try {
      const response = await updateCustomerAddress({
        customer_id,
        customer_address: address
      });

      if (response?.data?.status === "succes") {
        alert("Address saved successfully");
      } else {
        alert(response?.error?.data?.message || "Error saving address");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <section className="checkout py-80">
      <div className="container container-lg">
        <div className="border border-gray-100 rounded-8 px-30 py-20 mb-40">
          <span>
            Have a coupon?{" "}
            <Link to="/cart" className="fw-semibold text-gray-900 hover-text-decoration-underline hover-text-main-600">
              Click here to enter your code
            </Link>
          </span>
        </div>

        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <form className="pe-xl-5" onSubmit={handleSaveAddress}>
              <div className="row gy-3">
                {/* Address Form Fields */}
                {[
                  { name: "first_name", placeholder: "First Name" },
                  { name: "last_name", placeholder: "Last Name" },
                  { name: "email_id", placeholder: "Email Address", type: "email" },
                  { name: "mobile", placeholder: "Mobile Number" },
                  { name: "addr_field1", placeholder: "Address Line 1" },
                  { name: "addr_field2", placeholder: "Address Line 2" },
                  { name: "addr_field3", placeholder: "City" },
                  { name: "addr_field4", placeholder: "District" },
                  { name: "addr_field5", placeholder: "State" },
                  { name: "addr_field6", placeholder: "Country" },
                  { name: "pin_code", placeholder: "Pin Code" }
                ].map(({ name, placeholder, type = "text" }) => (
                  <div className="col-12" key={name}>
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      className="common-input border-gray-100"
                      value={address[name]}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ))}

                <div className="col-12">
                  <button type="submit" className="btn btn-primary w-100">
                    Save Address
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="col-xl-3 col-lg-4">
            <div className="checkout-sidebar">
              <div className="bg-color-three rounded-8 p-24 text-center">
                <span className="text-gray-900 text-xl fw-semibold">Your Orders</span>
              </div>

              <div className="border border-gray-100 rounded-8 px-24 py-40 mt-24">
                <div className="mb-32 pb-32 border-bottom border-gray-100 flex-between gap-8">
                  <span className="text-gray-900 fw-medium text-xl font-heading-two">Product</span>
                  <span className="text-gray-900 fw-medium text-xl font-heading-two">Subtotal</span>
                </div>

                {[1, 2, 3, 4].map((_, index) => (
                  <div className="flex-between gap-24 mb-32" key={index}>
                    <div className="flex-align gap-12">
                      <span className="text-gray-900 fw-normal text-md font-heading-two w-144">
                        HP Chromebook With Intel Celeron
                      </span>
                      <span className="text-gray-900 fw-normal text-md font-heading-two">
                        <i className="ph-bold ph-x" />
                      </span>
                      <span className="text-gray-900 fw-semibold text-md font-heading-two">1</span>
                    </div>
                    <span className="text-gray-900 fw-bold text-md font-heading-two">$250.00</span>
                  </div>
                ))}

                <div className="border-top border-gray-100 pt-30 mt-30">
                  <div className="mb-32 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two text-xl fw-semibold">Subtotal</span>
                    <span className="text-gray-900 font-heading-two text-md fw-bold">$859.00</span>
                  </div>
                  <div className="mb-0 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two text-xl fw-semibold">Total</span>
                    <span className="text-gray-900 font-heading-two text-md fw-bold">$859.00</span>
                  </div>
                </div>
              </div>

              <div className="mt-32">
                {["payment1", "payment2", "payment3"].map((id) => {
                  const labels = {
                    payment1: "Direct Bank transfer",
                    payment2: "Check payments",
                    payment3: "Cash on delivery",
                  };
                  return (
                    <div className="payment-item" key={id}>
                      <div className="form-check common-check common-radio py-16 mb-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment"
                          id={id}
                          checked={selectedPayment === id}
                          onChange={handlePaymentChange}
                        />
                        <label className="form-check-label fw-semibold text-neutral-600" htmlFor={id}>
                          {labels[id]}
                        </label>
                      </div>
                      {selectedPayment === id && (
                        <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block">
                          <p className="text-gray-800">
                            Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-32 pt-32 border-top border-gray-100">
                <p className="text-gray-500">
                  Your personal data will be used to process your order, support your experience
                  throughout this website, and for other purposes described in our{" "}
                  <Link to="/privacy-policy" className="text-main-500 underline">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

              <div className="mt-32">
                <button className="btn btn-primary w-full" type="button">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;

