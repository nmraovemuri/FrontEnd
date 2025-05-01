import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateCustomerAddressMutation } from '../services/customerApi';
import HeaderOne from '../components/HeaderOne';
import FooterOne from '../components/FooterOne';

const MyAddress = () => {
  const [customerAddress, setCustomerAddress] = useState({
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
    pin_code: '',
  });

  const [tempCustomerAddress, setTempCustomerAddress] = useState({ ...customerAddress });
  const [customerId, setCustomerId] = useState(null);
  const [updateCustomerAddress] = useUpdateCustomerAddressMutation();
  const navigate = useNavigate();

  const getCustomerInfoFromStorage = () => {
    const customer_id = localStorage.getItem('customer_id');
    const first_name = localStorage.getItem('first_name');
    const last_name = localStorage.getItem('last_name');
    const mobile = localStorage.getItem('mobile');
    const email_id = localStorage.getItem('email_id');

    return {
      customer_id: customer_id || null,
      first_name: first_name || '',
      last_name: last_name || '',
      mobile: mobile || '',
      email_id: email_id || ''
    };
  };

  useEffect(() => {
    const customerInfo = getCustomerInfoFromStorage();
    const id = customerInfo.customer_id;

    if (id) {
      setCustomerId(id);
      setCustomerAddress(prev => ({
        ...prev,
        first_name: customerInfo.first_name,
        last_name: customerInfo.last_name,
        mobile: customerInfo.mobile,
        email_id: customerInfo.email_id
      }));
      setTempCustomerAddress(prev => ({
        ...prev,
        first_name: customerInfo.first_name,
        last_name: customerInfo.last_name,
        mobile: customerInfo.mobile,
        email_id: customerInfo.email_id
      }));
      getCustomerShippingAddress(id);
    } else {
      alert("No customer found in local storage. Please log in again.");
      navigate('/login');
    }
  }, []);

  const getCustomerShippingAddress = async (id) => {
    try {
      const response = await fetch(`/${id}/updateCustomerAddress`);
      const data = await response.json();
      if (data.status === 'success') {
        setCustomerAddress(prev => ({
          ...prev,
          ...data.customer_address
        }));
        setTempCustomerAddress(prev => ({
          ...prev,
          ...data.customer_address
        }));
      } else {
        setCustomerAddress(prev => ({
          ...prev,
          addr_field1: '', addr_field2: '', addr_field3: '',
          addr_field4: '', addr_field5: '', addr_field6: '', pin_code: ''
        }));
      }
    } catch (error) {
      console.error("Error fetching customer address:", error);
    }
  };

  const updateUserAddress = async () => {
    if (!customerId) {
      alert("Customer ID is missing. Please log in again.");
      return;
    }

    try {
      const payload = { customer_id: customerId, customer_address: tempCustomerAddress };
      const response = await updateCustomerAddress(payload).unwrap();
      if (response.status === 'success') {
        setCustomerAddress(tempCustomerAddress);
        alert('Address updated successfully!');
      } else {
        alert("Failed to update address. Please check your details.");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address. Please try again.");
    }
  };

  const onLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleChange = (field, value) => {
    setTempCustomerAddress(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <HeaderOne />
      <section className="py-5" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-sm p-4">
                <div className="row">
                  {/* Sidebar */}
                  <div className="col-md-4">
                    <div className="card account-left">
                      <div className="user-profile-header text-center p-3">
                        <img alt="Profile" src="assets/img/user.jpg" className="img-fluid rounded-circle mb-2" width="80" />
                        <h5 className="mb-1 text-secondary" style={{ textTransform: 'capitalize' }}>
                          <strong>Hi </strong>{customerAddress.first_name}
                        </h5>
                        <p>{customerAddress.mobile}</p>
                      </div>
                      <div className="list-group">
                        <a href="/myprofile" className="list-group-item list-group-item-action">
                          <i className="mdi mdi-account-outline"></i> My Profile
                        </a>
                        <a
                          href="/myaddress"
                          className="list-group-item list-group-item-action active"
                          style={{ backgroundColor: '#e96125', borderColor: '#e96125', color: 'white' }}
                        >
                          <i className="mdi mdi-map-marker-circle"></i> My Address
                        </a>
                        <a href="/orderlist" className="list-group-item list-group-item-action">
                          <i className="mdi mdi-format-list-bulleted"></i> Order List
                        </a>
                        <a href="/logout" className="list-group-item list-group-item-action" onClick={onLogout}>
                          <i className="mdi mdi-lock"></i> Logout
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Address form */}
                  <div className="col-md-8">
                    <div className="card card-body shadow-sm bg-white account-right">
                      <div className="widget">
                        <div className="section-header mb-4">
                          <h5 className="heading-design-h5">Contact Address</h5>
                        </div>
                        <form>
                          {[
                            { label: 'FLAT Number / Floor', field: 'addr_field1' },
                            { label: 'House Number / Block Number / Plot Number', field: 'addr_field2' },
                            { label: 'House Name / Apartment Name', field: 'addr_field3' },
                            { label: 'Street Name', field: 'addr_field4' },
                            { label: 'Landmark', field: 'addr_field5' },
                            { label: 'Area / Location', field: 'addr_field6' },
                            { label: 'Pin Code', field: 'pin_code' },
                          ].map((item, index) => (
                            <div className="form-group" key={index}>
                              <label className="control-label">
                                {item.label} <span className="required">*</span>
                              </label>
                              <input
                                className="form-control border-form-control"
                                value={tempCustomerAddress[item.field] || ''}
                                type="text"
                                onChange={(e) => handleChange(item.field, e.target.value)}
                                required
                              />
                            </div>
                          ))}
                          <div className="form-group text-right mt-4">
                            <button
                              type="button"
                              className="btn btn-lg"
                              style={{ backgroundColor: '#e96125', color: 'white' }}
                              onClick={updateUserAddress}
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

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

export default MyAddress;
