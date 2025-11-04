// app/resume/components/ResumeWorkExperience.tsx
import { Briefcase } from 'lucide-react';

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

interface Props {
  experiences: Experience[];
}

export default function ResumeWorkExperience({ experiences }: Props) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-800">
        Work Experience
      </h2>
      <div className="space-y-5">
        {experiences.map((exp, i) => (
          <div key={i} className="relative pl-0">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {exp.position}
                </h3>
                <p className="text-gray-600 italic text-[15px] mt-0.5">
                  {exp.company}
                </p>
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap ml-4 mt-0.5">
                {exp.startDate} – {exp.endDate}
              </span>
            </div>
            <ul className="list-disc list-outside ml-5 text-gray-700 mt-2 space-y-1.5 text-[15px]">
              {exp.description.map((item, j) => (
                <li key={j} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}