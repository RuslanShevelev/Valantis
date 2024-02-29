import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTimeStamp } from "../utils/helpers";

// eslint-disable-next-line no-undef
const md5 = require("md5");
const timeStamp = getTimeStamp(Date.now());

const baseQuery = fetchBaseQuery({
  baseUrl: "http://api.valantis.store:40000",
  prepareHeaders: (headers) => {
    if (timeStamp) {
      headers.set("X-Auth", md5(`Valantis_${timeStamp}`));
    }
    return headers;
  },
});

const baseQueryWithRefetching = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    console.error(
      `Произошла ошибка: ${result?.error?.originalStatus} Идентификатор ошибки ${result?.error?.data}`
    );
    const refetchResult = await baseQuery(args, api, extraOptions);
    if (refetchResult.data) {
      result = refetchResult;
    } else {
      console.error(
        "Сервер не отвечает, обновите страницу или попробуйте позже"
      );
      return;
    }
  }
  return result;
};

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  baseQuery: baseQueryWithRefetching,
  tagTypes: ["ids", "items"],
  endpoints: (build) => ({
    getCurrentIds: build.query({
      query: (body) => ({
        method: "POST",
        body: body,
      }),
      providesTags: ['ids'],
    }),
    getFieldsValue: build.query({
      query: (body) => ({
        method: "POST",
        body: body,
      }),
    }),
    getAllItems: build.mutation({
      query: (ids) => ({
        method: "POST",
        body: {
          action: "get_items",
          params: { ids: ids },
        },
      }),
      providesTags: ['items'],

    }),
    getFilteredIds: build.query({
      query: (params) => ({
        method: "POST",
        body: {
          action: "filter",
          params: params,
        },
      }),
      providesTags: ['ids'],
    }),
  }),
});

export const {
  useGetFieldsValueQuery,
  useGetCurrentIdsQuery,
  useGetFilteredIdsQuery,
  useGetAllItemsMutation,
} = goodsApi;
