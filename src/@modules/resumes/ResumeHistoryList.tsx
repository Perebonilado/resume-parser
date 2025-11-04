import ResumeHistoryCard from "./ResumeHistoryCard";

interface ResumeHistoryListProps {
  history: {
    id: number;
    resumeId: number;
    fileName: string;
    uploadedAt: string;
    userName: string;
  }[];
}

export default function ResumeHistoryList({ history }: ResumeHistoryListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {history.map((item) => (
        <ResumeHistoryCard key={item.id} {...item} />
      ))}
    </div>
  );
}
