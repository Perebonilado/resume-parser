import ResumeCard from "./ResumeCard";

interface ResumeListProps {
  resumes: {
    id: number;
    fileName: string;
    uploadedAt: string;
    fileSize: number;
  }[];
}

export default function ResumeList({ resumes }: ResumeListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} {...resume} />
      ))}
    </div>
  );
}
