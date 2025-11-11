import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/lib";
import { User } from "../../prisma-dist";

interface UserResponse {
  data: User;
}

export const UserService = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/user`,
    timeout: secondsToMilliSeconds(3000),
  }),
  endpoints: (build) => ({
    getUserData: build.query<UserResponse, "">({
      query: () => ({
        url: ``,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDataQuery } = UserService;
