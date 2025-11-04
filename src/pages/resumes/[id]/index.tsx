import ResumeEducation from "@/@modules/resumes/ResumeEducation";
import ResumeHeader from "@/@modules/resumes/ResumeHeader";
import ResumeSkills from "@/@modules/resumes/ResumeSkills";
import ResumeSummary from "@/@modules/resumes/ResumeSummary";
import ResumeWorkExperience from "@/@modules/resumes/ResumeWorkExperience";
import Container from "@/@shared/ui/Container";
import Layout from "@/layout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ResumeRepository,
  ResumeRepositoryImpl,
} from "@/repository/ResumeRepository";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  resetLoaderState,
  setLoading,
  setLoadingMessage,
} from "@/features/loaderSlice";
import { Resume as ResumeType } from "@/zodSchemas/ResumeSchema";

const Resume = () => {
  const [resume, setResume] = useState<ResumeType | null>(null);
  const params = useParams();
  const dispatch = useDispatch();

  const fetchResumeData = async () => {
    try {
      dispatch(
        setLoadingMessage({ loadingMessage: "Fetching resume details" })
      );
      dispatch(setLoading({ loading: true }));
      const { id } = params;
      if (!id) return;

      const resumeRepository: ResumeRepository = new ResumeRepositoryImpl();
      const data = await resumeRepository.findById(Number(id));
      if (!data) return;
      const resumeData = data.resumeData!;
      const resumeInfo = JSON.parse(resumeData as string) as ResumeType;

      setResume(resumeInfo);
    } catch (error) {
      toast.error("something went wrong fetching resume data");
    } finally {
      dispatch(resetLoaderState());
    }
  };

  // useEffect(() => {
  //   fetchResumeData();
  // }, []);

  return (
    <Layout>
      <Container className="py-10">
        {!resume && (
          <p className="text-center text-gray-500">Resume Data Unavailable</p>
        )}

        {resume && (
          <>
            <ResumeHeader data={resume} />
            <ResumeSummary summary={resume.summary} />
            <ResumeWorkExperience experiences={resume.workExperience} />
            <ResumeEducation education={resume.education} />
            <ResumeSkills skills={resume.skills} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Resume;

