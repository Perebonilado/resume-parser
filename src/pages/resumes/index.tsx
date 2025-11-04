import ResumeList from "@/@modules/resumes/ResumeList";
import Container from "@/@shared/ui/Container";
import Layout from "@/layout";
import React, { useEffect, useState } from "react";
import { Resume } from "../../../prisma-dist";
import { useDispatch } from "react-redux";
import {
  resetLoaderState,
  setLoading,
  setLoadingMessage,
} from "@/features/loaderSlice";
import { toast } from "react-toastify";
import axios from "axios";

const Resumes = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const dispatch = useDispatch();

  const fetchResumes = async () => {
    try {
      dispatch(
        setLoadingMessage({ loadingMessage: "Fetching resums" })
      );
      dispatch(setLoading({ loading: true }));

      const resumesData = await axios.get<{ data: Resume[] }>(
        "http://localhost:3000/api/resume"
      );

      if (!resumesData.data.data) return;

      setResumes(resumesData.data.data);
    } catch (error) {
      toast.error("something went wrong fetching resume data");
    } finally {
      dispatch(resetLoaderState());
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <Layout>
      <Container className="py-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Your Uploaded Resumes
        </h1>
        <ResumeList
          resumes={resumes.map((r) => {
            return {
              fileName: r.fileName,
              fileSize: r.fileSize,
              id: r.id,
              uploadedAt: r.uploadedAt.toString(),
            };
          })}
        />
      </Container>
    </Layout>
  );
};

export default Resumes;

const dummyResumes = [
  {
    id: 1,
    fileName: "Software Engineer Resume.pdf",
    uploadedAt: "2025-10-31T10:00:00Z",
    fileSize: 320000,
  },
  {
    id: 2,
    fileName: "Data Analyst Resume.pdf",
    uploadedAt: "2025-09-12T08:30:00Z",
    fileSize: 280000,
  },
  {
    id: 3,
    fileName: "Product Manager Resume.pdf",
    uploadedAt: "2025-08-01T15:45:00Z",
    fileSize: 450000,
  },
];
