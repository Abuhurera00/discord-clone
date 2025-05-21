// "use client"

// import { X } from "lucide-react";
// import { UploadDropzone } from "@/lib/uploadthing";

// import "@uploadthing/react/styles.css"
// import Image from "next/image";

// interface FileUploadProps {
//     onChange: (url?: string) => void;
//     value: string;
//     endpoint: "messageFile" | "serverImage"
// }

// export const FileUpload = ({
//     onChange,
//     value,
//     endpoint
// }: FileUploadProps) => {
//     const fileType = value?.split(".").pop();
//     if (value && fileType !== "pdf") {
//         return(
//             <div className="relative h-20 w-20">
//                 <Image
//                  fill
//                  src={value}
//                  alt="Upload"
//                  className="rounded-full"
//                 />
//                 <button onClick={() => onChange("")}
//                     className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
//                     type="button"
//                     >
//                     <X className="h-4 w-4" />
//                 </button>
//             </div>
//         )
//     }
//     return (
//         // <div className="isolate">
//         <UploadDropzone
//         endpoint={endpoint}
//         onClientUploadComplete={(res) => {
//             onChange(res?.[0.].url);
//         }}
//         onUploadError={(error: Error) => {
//             console.log(error)
//         }}
//         />
//         // </div>
//     )
// }











// app/components/FileUpload.tsx adding this as extra
"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";

// we’ll dynamically inject/remove the CSS
const STYLESHEET_URL =
  "https://unpkg.com/@uploadthing/react/styles.css"; // you can also self‑host this in /public

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  // 1) Dynamically inject the <link> when this mounts
  // 2) Remove it when this unmounts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = STYLESHEET_URL;
    link.dataset.uploadthing = "true"; // for easy cleanup
    document.head.appendChild(link);
    return () => {
      document
        .querySelectorAll<HTMLLinkElement>(
          'link[data-uploadthing="true"]'
        )
        .forEach((el) => el.remove());
    };
  }, []);

  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="isolate">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) =>
          onChange(res?.[0]?.url)
        }
        onUploadError={(error: Error) => {
          console.error(error);
        }}
      />
    </div>
  );
};
