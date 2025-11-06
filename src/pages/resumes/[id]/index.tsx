import ResumeEducation from "@/@modules/resumes/ResumeEducation";
import ResumeHeader from "@/@modules/resumes/ResumeHeader";
import ResumeSkills from "@/@modules/resumes/ResumeSkills";
import ResumeSummary from "@/@modules/resumes/ResumeSummary";
import ResumeWorkExperience from "@/@modules/resumes/ResumeWorkExperience";
import Container from "@/@shared/ui/Container";
import Layout from "@/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetResumeByIdQuery } from "@/api-services/resume.service";
import { useLoadingSuccessAndError } from "@/hooks/useLoadingSuccessAndError";

const Resume = () => {
  const [id, setId] = useState<number | null>(null);
  const router = useRouter();
  const {
    isError: error,
    data: resume,
    isLoading: loading,
  } = useGetResumeByIdQuery({ id: `${id}` }, { skip: !id });

  useLoadingSuccessAndError({
    error,
    errorMessage: "Failed to load resume information",
    loadingMessage: "Loading resume",
    loading,
  });

  useEffect(() => {
    if (router.query) {
      const { id } = router.query;
      setId(Number(id));
    }
  }, [router.query]);

  return (
    <Layout>
      <Container className="py-10">
        {!resume?.data && (
          <p className="text-center text-gray-500">Resume Data Unavailable</p>
        )}

        {resume?.data && (
          <>
            <ResumeHeader data={resume.data} />
            <ResumeSummary summary={resume.data.summary} />
            <ResumeWorkExperience experiences={resume.data.workExperience} />
            <ResumeEducation education={resume.data.education} />
            <ResumeSkills skills={resume.data.skills} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Resume;
