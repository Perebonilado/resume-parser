import Layout from "@/layout";
import UploadContainer from "@/@modules/upload/UploadContainer";
import { useState } from "react";
import Button from "@/@shared/ui/Button";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import { nanoid } from "nanoid";
import { getFileNameWithoutExtension } from "@/lib";
import { bucketName } from "@/constants";
import { useDispatch } from "react-redux";
import {
  resetLoaderState,
  setLoading,
  setLoadingMessage,
} from "@/features/loaderSlice";
import { useRouter } from "next/router";
import { ResumeUploadModel } from "@/business/ResumeUploadHandler";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const dispatch = useDispatch();

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
            try {
              dispatch(
                setLoadingMessage({
                  loadingMessage: "Extracting Resume Data",
                })
              );
              dispatch(setLoading({ loading: true }));
              const resume = await axios.post<ResumeUploadModel>(
                `${process.env.NEXT_PUBLIC_BASE_URI}/api/upload`,
                {
                  fileName: getFileNameWithoutExtension(selectedFile.name),
                  fileSize: selectedFile.size,
                  fileUrl: fileUrl,
                }
              );
              dispatch(resetLoaderState());
              toast.success("Resume Data Extracted Successfully");
              router.push(`/resumes/${resume.data.resumeId}`);
            } catch (error) {
              toast.error("Something went wrong while extracting file data");
              dispatch(resetLoaderState());
            }
          }}
        />
      </div>
    </Layout>
  );
}
