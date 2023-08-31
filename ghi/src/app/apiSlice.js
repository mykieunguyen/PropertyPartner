import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fetchImages = async (propertyId) => {
  let images = [];
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/${propertyId}/image`
    );
    const data = await response.json();
    images = data;
  } catch (e) {
    console.log(e);
  }
  return images;
};

export const propertyPartnerApi = createApi({
  reducerPath: "propertyPartnerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  endpoints: (builder) => ({
    getToken: builder.query({
      query: () => ({
        url: `/token`,
        credentials: "include",
      }),
      transformResponse: (response) => response?.account || null,
      providesTags: ["Account"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/token`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Account"],
    }),
    login: builder.mutation({
      query: (info) => {
        let formData = new FormData();
        formData.append("username", info.username);
        formData.append("password", info.password);
        return {
          url: `/token`,
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Account"],
    }),
    getProperties: builder.query({
      query: () => ({
        url: `/api/properties`,
      }),
      transformResponse: async (response) => {
        const data = [];
        for (let property of response) {
          const images = await fetchImages(property.id);
          data.push({
            ...property,
            images,
          });
        }
        return data;
      },
    }),
    getProperty: builder.query({
      query: (property_id) => ({
        url: `/api/properties/${property_id}`,
      }),
    }),
    createProperty: builder.mutation({
      query: (data) => ({
        url: "/api/properties",
        body: data,
        method: "post",
        credentials: "include",
      }),
    }),
    createImages: builder.mutation({
      query: (args) => ({
        url: `/api/${args.property_id}/image`,
        body: args.data,
        method: "post",
        credentials: "include",
      }),
     invalidatesTags: ['images']
    }),
    getImages: builder.query({
      query: (property_id) => ({
        url: `/api/${property_id}/image`,
      }),
      providesTags: ['images']
    }),
    deleteImage: builder.mutation({
      query: (args) => ({
        url: `api/${args.property_id}/image/${args.image_id}`,
        method: 'delete',
        credentials: 'include',
      }),
      invalidatesTags: ['images']
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: "/api/accounts",
        body,
        method: "post",
        credentials: "include",
      }),
      invalidatesTags: ["Account"]
    }),
    getPropertiesForAccount: builder.query({
      query: () => ({
        url: `/api/properties/mine`,
        credentials: 'include',
      }),
      transformResponse: async (response) => {
        const data = [];
        for (let property of response) {
          const images = await fetchImages(property.id);
          data.push({
            ...property,
            images,
          });
        }
        return data;
      },
    providesTags: ["properties"]
    }),
    deleteProperty: builder.mutation({
      query: (property_id) => ({
        url: `/api/properties/${property_id}`,
        method: 'delete',
        credentials: 'include',
      }),
    invalidatesTags: ["properties"]
    }),
    updateProperty: builder.mutation({
      query: (args) => ({
        url: `/api/properties/${args.property_id}`,
        method: 'put',
        body: args.data,
        credentials: 'include'
      }),
    invalidatesTags: ["properties"]
    }),
    }),
  });


export const {
  useGetTokenQuery,
  useLogoutMutation,
  useLoginMutation,
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useGetImagesQuery,
  useCreatePropertyMutation,
  useCreateImagesMutation,
  useSignUpMutation,
  useGetPropertiesForAccountQuery,
  useDeletePropertyMutation,
  useUpdatePropertyMutation,
  useDeleteImageMutation,
} = propertyPartnerApi;
