import ResumeEducation from "@/@modules/resumes/ResumeEducation";
import ResumeHeader from "@/@modules/resumes/ResumeHeader";
import ResumeSkills from "@/@modules/resumes/ResumeSkills";
import ResumeSummary from "@/@modules/resumes/ResumeSummary";
import ResumeWorkExperience from "@/@modules/resumes/ResumeWorkExperience";
import Container from "@/@shared/ui/Container";
import Layout from "@/layout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  resetLoaderState,
  setLoading,
  setLoadingMessage,
} from "@/features/loaderSlice";
import { Resume as ResumeType } from "@/zodSchemas/ResumeSchema";
import axios from "axios";
import { useRouter } from "next/router";

const Resume = () => {
  const [resume, setResume] = useState<ResumeType | null>(null);
  const [id, setId] = useState<number | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.query) {
      const { id } = router.query;
      setId(Number(id));
    }
  }, [router.query]);

  const fetchResumeData = async () => {
    try {
      dispatch(
        setLoadingMessage({ loadingMessage: "Fetching resume details" })
      );
      dispatch(setLoading({ loading: true }));

      const resumeInfo = await axios.get<{data: ResumeType}>(
        "http://localhost:3000/api/resume/" + id
      );
      if (!resumeInfo) return;

      console.log(resumeInfo.data.data)

      setResume(resumeInfo.data.data);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong fetching resume data");
    } finally {
      dispatch(resetLoaderState());
    }
  };

  useEffect(() => {
    if (id) {
      fetchResumeData();
    }
  }, [id]);

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
