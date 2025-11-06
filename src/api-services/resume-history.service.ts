import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/lib";
import { ResumeHistoryModel } from "@/repository/ResumeHistoryRepository";

interface ResumeHistoryResponse {
  data: ResumeHistoryModel[];
}

export const ResumeHistoryService = createApi({
  reducerPath: "resume-history",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/resume-history`,
    timeout: secondsToMilliSeconds(3000),
  }),
  tagTypes: ["resume-history"],
  endpoints: (build) => ({
    getResumeHistory: build.query<ResumeHistoryResponse, "">({
      query: () => ({
        url: ``,
        method: "GET",
      }),
      providesTags: ["resume-history"],
    }),
  }),
});

export const { useGetResumeHistoryQuery } = ResumeHistoryService;
