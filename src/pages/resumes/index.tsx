import ResumeList from "@/@modules/resumes/ResumeList";
import Button from "@/@shared/ui/Button";
import Container from "@/@shared/ui/Container";
import { useGetResumesQuery } from "@/api-services/resume.service";
import { useLoadingSuccessAndError } from "@/hooks/useLoadingSuccessAndError";
import Layout from "@/layout";

const Resumes = () => {
  const {
    data: resumes,
    isLoading: loading,
    isError: error,
    refetch,
  } = useGetResumesQuery("");

  useLoadingSuccessAndError({
    error,
    errorMessage: "Failed to load resumes",
    loadingMessage: "Loading resumes",
    loading,
  });

  return (
    <Layout>
      <Container className="py-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Your Uploaded Resumes
        </h1>
        {resumes?.data && (
          <ResumeList
            resumes={resumes.data.map((r) => {
              return {
                fileName: r.fileName,
                fileSize: r.fileSize,
                id: r.id,
                uploadedAt: r.uploadedAt.toString(),
              };
            })}
          />
        )}

        {resumes && !resumes.data.length ? (
          <p className="text-center text-gray-400">No Resumes Data</p>
        ) : null}

        {error && !resumes && (
          <Button title="Reload" className="mx-auto" onClick={refetch} />
        )}
      </Container>
    </Layout>
  );
};

export default Resumes;
