import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/lib";
import { Resume } from "../../prisma-dist";
import { Resume as ResumeType } from "@/zodSchemas/ResumeSchema";

interface ResumeResponse {
  data: Resume[];
}

interface ResumeByIdResponse {
  data: ResumeType;
}

export interface GetResumeByIdQuery {
  id: string;
}

export const ResumeService = createApi({
  reducerPath: "resume-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/resume`,
    timeout: secondsToMilliSeconds(3000),
  }),
  tagTypes: ["resume", "resume-by-id"],
  endpoints: (build) => ({
    getResumes: build.query<ResumeResponse, "">({
      query: () => ({
        url: ``,
        method: "GET",
      }),
      providesTags: ["resume"],
    }),
    getResumeById: build.query<ResumeByIdResponse, GetResumeByIdQuery>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["resume-by-id"],
    }),
  }),
});

export const { useGetResumesQuery, useGetResumeByIdQuery } = ResumeService;
