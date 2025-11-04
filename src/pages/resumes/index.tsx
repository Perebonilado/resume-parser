import ResumeList from "@/@modules/resumes/ResumeList";
import Container from "@/@shared/ui/Container";
import Layout from "@/layout";
import React from "react";

const Resumes = () => {
  return (
    <Layout>
      <Container className="py-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Your Uploaded Resumes
        </h1>
        <ResumeList resumes={dummyResumes} />
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
