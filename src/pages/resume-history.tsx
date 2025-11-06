import ResumeHistoryList from "@/@modules/resumes/ResumeHistoryList";
import Container from "@/@shared/ui/Container";
import Layout from "@/layout";
import { NextPage } from "next";
import { useGetResumeHistoryQuery } from "@/api-services/resume-history.service";
import { useLoadingSuccessAndError } from "@/hooks/useLoadingSuccessAndError";

const ResumeHistory: NextPage = () => {
  const {
    data: resumeHistory,
    isError: error,
    isLoading: loading,
  } = useGetResumeHistoryQuery("");

  useLoadingSuccessAndError({
    error,
    errorMessage: "Failed to load resume history",
    loadingMessage: "Loading resume upload history",
    loading,
  });

  return (
    <Layout>
      <Container className="py-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Resume Upload History
        </h1>
        {resumeHistory?.data && (
          <ResumeHistoryList
            history={resumeHistory.data.map((rh) => {
              return {
                fileName: rh.resume.fileName,
                id: rh.id,
                resumeId: rh.resume.id,
                uploadedAt: rh.resume.uploadedAt.toString(),
                fileUrl: rh.resume.fileUrl,
              };
            })}
          />
        )}
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
