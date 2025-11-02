import AttachedFileInfo from "@/@shared/components/AttachedFileInfo";
import FileUploadSpinner from "@/@shared/components/FileUploadSpinner";
import TransitionUp from "@/@shared/components/TransitionUp";
import PDFIconAlt from "@/icons/PDFIconAlt";
import { convertMegaBytesToBytes } from "@/lib";
import React, { ElementRef, FC, useRef } from "react";
import { toast } from "react-toastify";

interface Props {
  handleSelectFile: (file: File) => void;
  handleDeleteFile: () => void;
  attachedFile: File | null;
  uploadLoading: boolean;
}

const UploadContainer: FC<Props> = ({
  handleSelectFile,
  attachedFile,
  handleDeleteFile,
  uploadLoading
}) => {
  const maxFileSizeMB = 10;
  const allowedTypes = ["pdf"];
  const filesRef = useRef<ElementRef<"input">>(null);
  const validateFileSize = (fileSize: number) => {
    const maxSizeInBytes = convertMegaBytesToBytes(maxFileSizeMB);
    if (fileSize > maxSizeInBytes) {
      return false;
    } else {
      return true;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return;
      const file = e.target.files[0];

      if (!file || !validateFileSize(file.size)) return;

      handleSelectFile(file);
    } catch (e) {
      toast.error("Somethign went wrong while selecting file");
    }
  };

  return (
    <div>
      <input
        ref={filesRef}
        type="file"
        onChange={async (e) => {
          await handleFileChange(e);
        }}
        className="hidden"
        accept={allowedTypes.map((t) => `.${t}`).join(", ")}
      />
      <div>
        <div className="w-full p-6 h-[250px] max-sm:h-[230px] shadow-md bg-white border border-[#9E69E3] border-dashed rounded-3xl">
          {!attachedFile && !uploadLoading && (
            <div className="flex flex-col items-center justify-between gap-4 h-full">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <PDFIconAlt />
                </div>
                <p className="text-xl font-semibold">
                  Upload your material here
                </p>
                <p className="text-[#00000080] text-xs mt-1">
                  Max size: {maxFileSizeMB}mb pdf files only
                </p>
              </div>

              <div className="relative">
                <button
                  onClick={() => {
                    if (uploadLoading) {
                      toast.error("Please wait until your test is ready");
                      return;
                    }
                    filesRef.current?.click();
                  }}
                  type="button"
                  className="border border-[#9333EA] px-6 py-2 text-[#2F004F] rounded-full font-medium text-sm"
                >
                  Browse files
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center justify-center gap-4 h-full">
            {!attachedFile && uploadLoading && <FileUploadSpinner />}

            {attachedFile && !uploadLoading && (
              <TransitionUp>
                <AttachedFileInfo
                  handleDelete={() => {
                    handleDeleteFile();
                    if (filesRef.current && filesRef.current.value) {
                      filesRef.current.value = "";
                    }
                  }}
                  fileName={attachedFile.name}
                />
              </TransitionUp>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadContainer;
