import ResumeHistoryList from "@/@modules/resumes/ResumeHistoryList";
import Container from "@/@shared/ui/Container";
import Layout from "@/layout";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  resetLoaderState,
  setLoading,
  setLoadingMessage,
} from "@/features/loaderSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { ResumeHistoryModel } from "@/repository/ResumeHistoryRepository";

const ResumeHistory: NextPage = () => {
  const [resumeHistory, setResumeHistory] = useState<ResumeHistoryModel[]>([]);
  const dispatch = useDispatch();

  const fetchResumeHistory = async () => {
    try {
      dispatch(
        setLoadingMessage({ loadingMessage: "Fetching resume history" })
      );
      dispatch(setLoading({ loading: true }));

      const resumesData = await axios.get<{ data: ResumeHistoryModel[] }>(
        "http://localhost:3000/api/resume-history"
      );

      if (!resumesData.data.data) return;

      setResumeHistory(resumesData.data.data);
    } catch (error) {
      toast.error("something went wrong fetching resume history");
    } finally {
      dispatch(resetLoaderState());
    }
  };

  useEffect(() => {
    fetchResumeHistory();
  }, []);

  return (
    <Layout>
      <Container className="py-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Resume Upload History
        </h1>
        <ResumeHistoryList
          history={resumeHistory.map((rh) => {
            return {
              fileName: rh.resume.fileName,
              id: rh.id,
              resumeId: rh.resume.id,
              uploadedAt: rh.resume.uploadedAt.toString(),
              fileUrl: rh.resume.fileUrl,
            };
          })}
        />
      </Container>
    </Layout>
  );
};

export default ResumeHistory;

const dummyHistory = [
  {
    id: 1,
    resumeId: 101,
    fileName: "Frontend Developer Resume.pdf",
    uploadedAt: "2025-10-31T10:00:00Z",
    userName: "Jane Doe",
  },
  {
    id: 2,
    resumeId: 102,
    fileName: "Backend Engineer Resume.pdf",
    uploadedAt: "2025-09-15T14:30:00Z",
    userName: "John Smith",
  },
  {
    id: 3,
    resumeId: 103,
    fileName: "Product Designer Resume.pdf",
    uploadedAt: "2025-08-20T09:45:00Z",
    userName: "Alex Johnson",
  },
];
