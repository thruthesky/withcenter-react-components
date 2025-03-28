import { FileUploadData } from "@/lib/firebase/firebase.functions";
import Image from "next/image";

export default function UploadedChatFiles({
  files,
  onDelete,
}: {
  files: FileUploadData[] | undefined;
  onDelete: (file: FileUploadData) => void;
}) {
  if (!files || files.length == 0) return null;
  return (
    <section className="flex flex-wrap justify-end gap-3 px-5">
      {files.map((file, index) => (
        <data
          key={"imageUrls" + index}
          className="relative flex min-w-24 min-h-24"
          title={file.name}
        >
          <button
            onClick={() => onDelete(file)}
            className="absolute top-1 right-1 !p-2 cursor-pointer !rounded-full !bg-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 stroke-white-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
          {file.mimeType.startsWith("image/") && (
            <Image
              src={file.fileUri}
              width={154}
              height={154}
              alt="Upload"
              className="w-auto h-full rounded-md border"
            />
          )}
          {file.mimeType.endsWith("/pdf") && (
            <section className="flex flex-col items-center justify-center w-24 h-24 bg-gray-200 rounded-md border gap-1 p-1 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                />
              </svg>
              <span className="text-xs">
                {file.name.length <= 12
                  ? file.name
                  : file.name.substring(0, 12) + "..."}
              </span>
            </section>
          )}
        </data>
      ))}
    </section>
  );
}
