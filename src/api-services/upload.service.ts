import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/lib";
import { UploadDto } from "@/dto/UploadDto";
import { ResumeUploadModel } from "@/business/ResumeUploadHandler";

export const UploadService = createApi({
  reducerPath: "upload-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/upload`,
    timeout: secondsToMilliSeconds(3000),
  }),
  endpoints: (build) => ({
    upload: build.mutation<ResumeUploadModel, UploadDto>({
      query: (body) => ({
        url: ``,
        body,
        method: "POST",
      }),
    }),
  }),
});

export const { useUploadMutation } = UploadService;
