// services/customerAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    prepareHeaders: (headers) => {
      headers.set('source_app', 'W');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // POST - Customer Signup
    customerSignup: builder.mutation({
      query: (body) => ({
        url: 'Customer_Signup',
        method: 'POST',
        body,
      }),
    }),

    // POST - Check Email Existence
    checkEmailAlreadyExisted: builder.mutation({
      query: ({ email_id }) => ({
        url: '/checkEmailAlreadyExisted',
        method: 'POST',
        body: { email_id }, 
      }),
    }),

    // GET - Activate Signup
    customerSignupActivate: builder.query({
      query: ({ customer_id, tog }) => `/customer_signup_activate/${customer_id}/${tog}`,
    }),

    // GET - Resend Activation
    resendCustomerSignupActivate: builder.query({
      query: (customer_id) => `/resend_customer_signup_activate/${customer_id}`,
    }),

    // POST - Sign In (with credentials)
    customerSignIn: builder.mutation({
      query: ({ email_id, password }) => ({
        url: '/customer_signin',
        method: 'POST',
        body: { email_id, password }, // Passing email and password for signin
      }),
    }),
  // Post ForgotPassword
    customerForgotPassword: builder.mutation({
      query: (email_id) => ({
        url: '/customer_forgot_password',
        method: 'POST',
        body: { email_id: email_id }, 
      }),
    }),

    // POST - Reset Password
    customerResetPassword: builder.mutation({
      query: ({ customer_id, new_password }) => ({
        url: '/customer_reset_password',
        method: 'POST',
        body: { customer_id, new_password },
      }),
    }),
         
    // // POST - Change Password
    // customerChangePassword: builder.mutation({
    //   query: ({ oldPassword, newPassword }) => ({
    //     url: '/customer_change_password',
    //     method: 'POST',
    //     body: { oldPassword, newPassword }, // Pass old and new password for change
    //   }),
    // }),

    // // POST - Update Profile
    // updateCustomerProfile: builder.mutation({
    //   query: (profileData) => ({
    //     url: '/updateCustomerProfile',
    //     method: 'POST',
    //     body: profileData, // Passing the profile update data
    //   }),
    // }),
    // POST - Update Customer Address
    updateCustomerAddress: builder.mutation({
      query: (addressData) => ({
        url: '/updateCustomerAddress',
        method: 'POST',
        body: addressData,
      }),
    }),

    // GET - Get Customer Shipping Address
    getCustomerShippingAddress: builder.query({
      query: (customer_id) => `/get_customer_shipping_address/${customer_id}`,
    }),
   
  }),
});

// Export hooks
export const {
  useCustomerSignupMutation,
  useCheckEmailAlreadyExistedMutation,
  useCustomerSignupActivateQuery,
  useResendCustomerSignupActivateQuery,
  useCustomerSignInMutation,
  useCustomerForgotPasswordMutation,
  useCustomerResetPasswordMutation,
  // useCustomerChangePasswordMutation,
  // useUpdateCustomerProfileMutation,
  
  useUpdateCustomerAddressMutation, 
  useGetCustomerShippingAddressQuery,
} = customerApi;

export default customerApi;
