import Layout from "@/layout";
import UploadContainer from "@/@modules/upload/UploadContainer";
import { useState } from "react";
import Button from "@/@shared/ui/Button";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabase";
import { nanoid } from "nanoid";
import { getFileNameWithoutExtension } from "@/lib";
import { bucketName } from "@/constants";
import { useRouter } from "next/router";
import { useUploadMutation } from "@/api-services/upload.service";
import { useLoadingSuccessAndError } from "@/hooks/useLoadingSuccessAndError";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [upload, { isLoading: isUploadingLoading, isError: error, isSuccess, data: resumeUploadData }] =
    useUploadMutation();
  useLoadingSuccessAndError({
    error: error,
    errorMessage: "Something went wrong while extracting file data",
    loading: isUploadingLoading,
    loadingMessage: "Extracting information",
    isSuccess,
    onSuccess() {
      router.push(`/resumes/${resumeUploadData!.resumeId}`);
    },
    successMessage: "Resume Data Extracted Successfully"
  });

  const handleUploadFileToBucket = async (file: File) => {
    try {
      setIsUploading(true);
      const filename = nanoid();

      const uploadedFile = await supabase.storage
        .from(bucketName)
        .upload(`${filename}.${file.name.split(".").pop()}`, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });
      if (!uploadedFile.data && uploadedFile.error) {
        toast.error(uploadedFile.error.message);
        throw new Error(uploadedFile.error.message);
      }

      return uploadedFile.data.fullPath;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while uploading your file");
    } finally {
      setIsUploading(false);
    }
  };

  const router = useRouter();

  return (
    <Layout>
      <div className="flex flex-col gap-[28px] mx-auto w-full max-w-[500px] pt-2 pb-10">
        <UploadContainer
          attachedFile={selectedFile}
          handleSelectFile={async (file) => {
            const fileUrl = await handleUploadFileToBucket(file);
            if (!fileUrl) return;
            setSelectedFile(file);
            setFileUrl(fileUrl);
          }}
          handleDeleteFile={() => {
            setSelectedFile(null);
            setFileUrl(null);
          }}
          uploadLoading={isUploading}
        />

        <Button
          title="Extract Data"
          size="large"
          disabled={!selectedFile}
          onClick={async () => {
            if (!fileUrl || !selectedFile) return;
            upload({
              fileName: getFileNameWithoutExtension(selectedFile.name),
              fileSize: selectedFile.size,
              fileUrl: fileUrl,
            });
          }}
        />
      </div>
    </Layout>
  );
}
