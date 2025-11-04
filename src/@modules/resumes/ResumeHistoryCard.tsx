"use client";

import Button from "@/@shared/ui/Button";
import { FileText, User, Calendar, Hash, FileIcon } from "lucide-react";

interface ResumeHistoryCardProps {
  id: number;
  resumeId: number;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export default function ResumeHistoryCard({
  id,
  resumeId,
  fileName,
  uploadedAt,
  fileUrl,
}: ResumeHistoryCardProps) {
  const formattedDate = new Date(uploadedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
      {/* Accent line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
          <FileText className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {fileName}
            </h3>
            <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a
                target="_blank"
                href={`https://iwlypsprizfrbbmekpyg.supabase.co/storage/v1/object/public/${fileUrl}`}
              >
                <Button
                  title="View File"
                  variant="text"
                  endicon={<FileIcon />}
                  size="small"
                  className="!text-indigo-600"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
