// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/client/' }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => {
        return {
          url: "/getAllCategories/",
          method: "GET"
        }
      }
    }),
    getAllSubCategories: builder.query({
      query: () => {
        return {
          url: "/getAllSubCategories",
          method: "GET"
        }
      }
    }),
    getAllProductBrands: builder.query({
      query: () => {
        return {
          url: "/getproductBrands",
          method: "GET"
        }
      }
    }),

    getAllTopDealsProductByPercentage: builder.query({
      query: (id) => {
        return {
          url: `/getTopDealsOfDayByPercentage/${id}`,
          method: "GET"
        }
      }
    }),
    getAllProductsNewArrivals: builder.query({
      query: () => {
        return {
          url: "/getAllProductsForNewArrivals",
          method: "GET"
        }
      }
    }),
    getAllSubCategoriesByCategories: builder.query({
      query: () => {
        return {
          url: "/getAllSubCategoriesByCategories",
          method: "GET"
        }
      }
    }),
    getAllProductsBySubcatId: builder.query({
      query: (id) => {
        return {
          url: `/getAllProductsBySubcatId/${id}`,
          method: "GET"
        }
      }
    }),
    getProductDetailsByIds: builder.query({
      query: ({ id, unit_id }) => {
        return {
          url: `/getProductDetailsById/product/${id}/unit/${unit_id}`,
          method: "GET"
        }
      }
    }),
    searchStrings: builder.mutation({
      query: (data) => {
        return {
          url: "/getProductsBySearchString",
          method: "POST",
          body: data
        }
      }
    }),
    getProductsListBySearchString: builder.query({
      query: (searchstring) => {
        return {
          url: `getProductsListBySearchString/${searchstring}`,
          method: "GET"
        }
      }
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
  useGetAllProductBrandsQuery,
  useGetAllTopDealsProductByPercentageQuery,
  useGetAllProductsNewArrivalsQuery,
  useGetAllSubCategoriesByCategoriesQuery,
  useGetAllProductsBySubcatIdQuery,
  useGetProductDetailsByIdsQuery,
  useSearchStringsMutation,
  useGetProductsListBySearchStringQuery
} = productsApi;
