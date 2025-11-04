// app/resume/components/ResumeSummary.tsx
interface Props {
  summary?: string;
}

export default function ResumeSummary({ summary }: Props) {
  if (!summary) return null;
  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-800">
        Summary
      </h2>
      <p className="text-gray-700 leading-relaxed text-[15px]">{summary}</p>
    </section>
  );
}