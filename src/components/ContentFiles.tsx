import { FileData } from "firebase/vertexai";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ContentFiles({
  files,
}: {
  files: FileData[] | undefined;
}) {
  if (!files || files.length == 0) return null;
  return (
    <>
      {files.map((file, i) => (
        <React.Fragment key={i}>
          {file.mimeType.startsWith("image/") && (
            <Image
              src={file.fileUri}
              width={512}
              height={512}
              alt="Upload"
              className="w-auto h-full"
            />
          )}
          {file.mimeType.endsWith("/pdf") && (
            <Link
              href={file.fileUri}
              target="_blank"
              className="flex flex-col items-center justify-center gap-1 p-1 text-center text-gray-500 w-24 h-24 border rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                />
              </svg>
              PDF File
            </Link>
          )}
        </React.Fragment>
      ))}
    </>
  );
}
