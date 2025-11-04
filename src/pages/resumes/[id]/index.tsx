import ResumeEducation from "@/@modules/resumes/ResumeEducation";
import ResumeHeader from "@/@modules/resumes/ResumeHeader";
import ResumeSkills from "@/@modules/resumes/ResumeSkills";
import ResumeSummary from "@/@modules/resumes/ResumeSummary";
import ResumeWorkExperience from "@/@modules/resumes/ResumeWorkExperience";
import Container from "@/@shared/ui/Container";
import Layout from "@/layout";

const Resume = () => {
  return (
    <Layout>
      <Container className="py-10">
        <ResumeHeader data={dummyResume} />
        <ResumeSummary summary={dummyResume.summary} />
        <ResumeWorkExperience experiences={dummyResume.workExperience} />
        <ResumeEducation education={dummyResume.education} />
        <ResumeSkills skills={dummyResume.skills} />
      </Container>
    </Layout>
  );
};

export default Resume;

const dummyResume = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  summary:
    "Full-stack developer with 5+ years of experience building scalable web applications using React, Node.js, and PostgreSQL.",
  workExperience: [
    {
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      startDate: "Jan 2022",
      endDate: "Present",
      description: [
        "Led a team of 5 developers to build a new SaaS analytics platform.",
        "Improved API response times by 30% by optimizing database queries.",
      ],
    },
    {
      company: "StartupHub",
      position: "Software Engineer",
      startDate: "Jun 2019",
      endDate: "Dec 2021",
      description: [
        "Developed internal dashboards using React and Tailwind CSS.",
        "Integrated third-party APIs to enhance product functionality.",
      ],
    },
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      graduationDate: "May 2019",
    },
  ],
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "TypeScript",
    "Tailwind CSS",
  ],
};
