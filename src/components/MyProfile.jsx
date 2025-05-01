import React, { useState, useEffect } from 'react';
import { useUpdateCustomerProfileMutation } from '../services/customerApi';
import HeaderOne from '../components/HeaderOne';
import FooterOne from '../components/FooterOne';

const MyProfile = () => {
  // State for customer info
  const [customer, setCustomer] = useState(null);
  const [model, setModel] = useState({
    first_name: '',
    last_name: '',
    mobile: '',
    email_id: ''
  });
  const [updateCustomerProfile] = useUpdateCustomerProfileMutation();

  // Load customer on mount
  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem('customer'));
    if (storedCustomer) {
      setCustomer(storedCustomer);
      setModel({
        first_name: storedCustomer.first_name,
        last_name: storedCustomer.last_name,
        mobile: storedCustomer.mobile,
        email_id: storedCustomer.email_id
      });
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem('customer');
    localStorage.removeItem('token');
    // navigate to home
    window.location.href = '/home'; // or use react-router
  };

  const handleChange = (field, value) => {
    setModel(prev => ({ ...prev, [field]: value }));
  };

  const updateUserProfile = () => {
    // Call your API to update profile
    // Assuming your API returns the updated customer data
    updateCustomerProfile({ ...model }).unwrap()
      .then((data) => {
        // Update local storage and local state
        const updatedCustomer = { ...customer, ...data.customerDetails };
        localStorage.setItem('customer', JSON.stringify(updatedCustomer));
        setCustomer(updatedCustomer);
        // Close modal if needed
        document.getElementById('closeModal')?.click();
      })
      .catch((err) => {
        console.error('Update failed', err);
      });
  };

  if (!customer) return null;

  return (
    <>
      <HeaderOne />

      <section className="account-page section-padding">
        <div className="container">
          {/* Sidebar */}
          <div className="row">
            <div className="col-lg-9 mx-auto">
              <div className="row no-gutters">
                {/* Sidebar menu */}
                <div className="col-md-4">
                  <div className="card account-left">
                    <div className="user-profile-header">
                      <img alt="logo" src="assets/img/user.jpg" />
                      <h5 className="mb-1 text-secondary" style={{ textTransform: 'capitalize' }}>
                        <strong>Hi </strong>{customer.first_name}
                      </h5>
                      <p>{customer.mobile}</p>
                    </div>
                    <div className="list-group">
                      <a href="/myprofile" className="list-group-item list-group-item-action active">
                        <i className="mdi mdi-account-outline"></i> My Profile
                      </a>
                      <a href="/myaddress" className="list-group-item list-group-item-action">
                        <i className="mdi mdi-map-marker-circle"></i> My Address
                      </a>
                      {/* <a href="/orderlist" className="list-group-item list-group-item-action">
                        <i className="mdi mdi-format-list-bulleted"></i> Order List
                      </a> */}
                      <a href="/logout" className="list-group-item list-group-item-action" onClick={onLogout}>
                        <i className="mdi mdi-lock"></i> Logout
                      </a>
                    </div>
                  </div>
                </div>
                {/* Profile info */}
                <div className="col-md-8">
                  <div className="card card-body account-right">
                    <div className="widget">
                      <div className="section-header">
                        <h5 className="heading-design-h5">My Profile</h5>
                      </div>
                      {/* Profile details */}
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="control-label">First Name</label>
                            <input
                              className="form-control border-form-control"
                              value={customer.first_name}
                              disabled
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="control-label">Last Name</label>
                            <input
                              className="form-control border-form-control"
                              value={customer.last_name}
                              disabled
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="control-label">Phone</label>
                            <input
                              className="form-control border-form-control"
                              value={customer.mobile}
                              disabled
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="control-label">Email Address</label>
                            <input
                              className="form-control border-form-control"
                              value={customer.email_id}
                              disabled
                              type="email"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 text-right" style={{ marginTop: '15px' }}>
                          {/* Trigger modal */}
                          <button
                            type="button"
                            className="btn btn-success btn-lg"
                            data-toggle="modal"
                            data-target="#myModal"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for editing profile */}
      <div
        className="modal fade"
        id="myModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" style={{ maxWidth: '979px' }}>
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">My Edit Profile</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                id="closeModal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <div className="card card-body" style={{ backgroundColor: '#eee' }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateUserProfile();
                  }}
                  noValidate
                >
                  <div className="row">
                    <div className="col-sm-8 offset-2">
                      <div className="form-group">
                        <label className="control-label">First Name</label>
                        <input
                          className="form-control border-form-control"
                          type="text"
                          value={model.first_name}
                          onChange={(e) => handleChange('first_name', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-8 offset-2">
                      <div className="form-group">
                        <label className="control-label">Last Name</label>
                        <input
                          className="form-control border-form-control"
                          type="text"
                          value={model.last_name}
                          onChange={(e) => handleChange('last_name', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-8 offset-2">
                      <div className="form-group">
                        <label className="control-label">Phone</label>
                        <input
                          className="form-control border-form-control"
                          type="number"
                          value={model.mobile}
                          onChange={(e) => handleChange('mobile', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-8 offset-2">
                      <div className="form-group">
                        <label className="control-label">Email Address</label>
                        <input
                          className="form-control border-form-control"
                          type="email"
                          value={model.email_id}
                          onChange={(e) => handleChange('email_id', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="row" style={{ marginTop: '15px' }}>
                    <div className="col-sm-12 d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-danger btn-lg"
                        data-dismiss="modal"
                        style={{ marginRight: '20px' }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success btn-lg"
                        disabled={!model.first_name || !model.last_name || !model.mobile || !model.email_id}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* End modal body */}
          </div>
        </div>
      </div>

      <FooterOne />
         </>
  );
};

export default MyProfile;