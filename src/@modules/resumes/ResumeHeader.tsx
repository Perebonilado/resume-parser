// app/resume/components/ResumeHeader.tsx
import { Mail, Phone, MapPin } from 'lucide-react';

interface Props {
  data: {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
  };
}

export default function ResumeHeader({ data }: Props) {
  return (
    <header className="text-center pb-6 border-b-2 border-gray-200">
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
        {data.fullName}
      </h1>
      <div className="flex items-center justify-center flex-wrap gap-4 text-gray-600">
        <div className="flex items-center gap-1.5">
          <Mail className="w-4 h-4 text-gray-500" />
          <span>{data.email}</span>
        </div>
        {data.phone && (
          <>
            <span className="text-gray-300">·</span>
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{data.phone}</span>
            </div>
          </>
        )}
        {data.location && (
          <>
            <span className="text-gray-300">·</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{data.location}</span>
            </div>
          </>
        )}
      </div>
    </header>
  );
}