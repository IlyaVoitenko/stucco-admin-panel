import { useState } from "react";

type Image = {
  multiple?: boolean;
  maxSizeMB?: number;
  allowedTypes?: string[];
};

const useImages = ({
  multiple = false,
  maxSizeMB = 5,
  allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/avif",
    "image/svg+xml",
  ],
}: Image = {}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      return "Invalid file type";
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return "File too large";
    }
    return null;
  };

  const onChange = (fileList?: FileList | null) => {
    if (!fileList) return;
    const incoming = multiple ? Array.from(fileList) : [fileList[0]];
    const valid: File[] = [];
    for (const file of incoming) {
      const err = validateFile(file);

      if (err) return setError(err);

      valid.push(file);
    }

    setError(null);
    setFiles(valid);
    setPreviews(valid.map((f) => URL.createObjectURL(f)));
  };

  const reset = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setFiles([]);
    setPreviews([]);
    setError(null);
  };

  return {
    files,
    previews,
    error,
    onChange,
    reset,
  };
};
export default useImages;
