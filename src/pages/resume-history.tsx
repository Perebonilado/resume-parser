import ResumeHistoryList from "@/@modules/resumes/ResumeHistoryList";
import Container from "@/@shared/ui/Container";
import Layout from "@/layout";
import { NextPage } from "next";
import { useGetResumeHistoryQuery } from "@/api-services/resume-history.service";
import { useLoadingSuccessAndError } from "@/hooks/useLoadingSuccessAndError";
import Button from "@/@shared/ui/Button";

const ResumeHistory: NextPage = () => {
  const {
    data: resumeHistory,
    isError: error,
    isLoading: loading,
    refetch,
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

        {resumeHistory && !resumeHistory.data.length ? (
          <p className="text-center text-gray-400">No Resume History</p>
        ) : null}

        {error && !resumeHistory && (
          <Button title="Reload" className="mx-auto" onClick={refetch} />
        )}
      </Container>
    </Layout>
  );
};

export default ResumeHistory;
