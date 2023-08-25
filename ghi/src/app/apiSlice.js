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
    getImages: builder.query({
      query: (property_id) => ({
        url: `/api/${property_id}/image`,
      }),
    }),
  }),
});

export const {
  useGetTokenQuery,
  useLogoutMutation,
  useLoginMutation,
  useGetPropertiesQuery,
  useGetImagesQuery,
} = propertyPartnerApi;