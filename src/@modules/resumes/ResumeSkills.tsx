// app/resume/components/ResumeSkills.tsx
interface Props {
  skills: string[];
}

export default function ResumeSkills({ skills }: Props) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-800">
        Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1.5 bg-gray-100 rounded-md text-gray-800 text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}