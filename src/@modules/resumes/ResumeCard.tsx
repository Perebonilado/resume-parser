"use client";

import Link from "next/link";
import { FileText, Calendar, HardDrive, ArrowRight } from 'lucide-react';

interface ResumeCardProps {
  id: number;
  fileName: string;
  uploadedAt: string;
  fileSize: number;
}

export default function ResumeCard({
  id,
  fileName,
  uploadedAt,
  fileSize,
}: ResumeCardProps) {
  const formattedDate = new Date(uploadedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };
  
  const formattedSize = formatFileSize(fileSize);

  return (
    <Link
      href={`/resumes/${id}`}
      className="group relative block bg-gradient-to-br from-white via-white to-blue-50/30 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          <FileText className="w-7 h-7 text-white" />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors leading-tight">
              {fileName}
            </h3>
            <ArrowRight className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{formattedDate}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-gray-600">
              <HardDrive className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{formattedSize}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Link>
  );
}