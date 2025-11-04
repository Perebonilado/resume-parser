// app/resume/components/ResumeEducation.tsx
import { GraduationCap } from 'lucide-react';

interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
}

interface Props {
  education: Education[];
}

export default function ResumeEducation({ education }: Props) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-800">
        Education
      </h2>
      <div className="space-y-4">
        {education.map((edu, i) => (
          <div key={i}>
            <h3 className="text-lg font-bold text-gray-900">
              {edu.institution}
            </h3>
            <p className="text-gray-700 text-[15px] mt-0.5">
              {edu.degree}, {edu.field}
            </p>
            <span className="text-sm text-gray-600 mt-1 block">
              {edu.graduationDate}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}