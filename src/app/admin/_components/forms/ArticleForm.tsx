// "use client";
// import { FC, useRef, useState } from "react";

// import { Card, CardHeader, CardContent } from "@/components/ui/shadcn-ui/card";
// import { Label } from "@/components/ui/shadcn-ui/label";
// import { Input } from "@/components/ui/shadcn-ui/input";
// import { Button } from "@/components/ui/shadcn-ui/button";
// import { useFormState, useFormStatus } from "react-dom";
// import { createCategory } from "@/app/actions/categories";

// import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
// import dynamic from "next/dynamic";

// const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

// const ArticleForm: FC = () => {
//   // const [formState, action] = useFormState<ReturnType<typeof createCategory>>(
//   //   createCategory,
//   //   {}
//   // );

//   // const [imagesForm, imagesFormAction] = useFormState<null>()
//   const [content, setContent] = useState<string | undefined>("");
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const addImage = async () => {
//     if (fileInputRef.current?.files?.length) {
//       const formData = new FormData();
//       formData.append("file", fileInputRef.current.files[0]);
//       console.log(fileInputRef.current.files[0]);
//       await fetch("/api/files", {
//         method: "POST",
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         body: formData,
//       });
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <h1 className=" text-2xl font-semibold">Создание новой статьи</h1>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <Label className="block mb-4">
//             <div className="mb-2 text-lg">Название</div>
//             <Input placeholder="Двойные памятники" name="title" />
//           </Label>
//           <Label className="block mb-4">
//             <div className="mb-2 text-lg">Изображение</div>
//             <Input
//               placeholder="Выберите изображение"
//               name="image"
//               type="file"
//               accept="image/jpeg"
//             />
//           </Label>

//           <MDEditor
//             className="flex flex-col"
//             value={content}
//             onChange={setContent}
//           />

//           <ul>
//             {/* {images.map((image) => (
//               <li className=" relative" key={image}>
//                 <Button>Удалить</Button>
//                 <img src={image} width={100} height={100} />
//                 <Button>Копировать: {image}</Button>
//               </li>
//             ))} */}
//           </ul>
//           <div>
//             <Input ref={fileInputRef} type="file" />
//             <Button onClick={addImage} type="button">
//               Загрузить
//             </Button>
//           </div>

//           <SubmitButton />
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// const SubmitButton: FC = () => {
//   const status = useFormStatus();
//   return (
//     <Button className="w-auto" type="submit" disabled={status.pending}>
//       {status.pending ? "Загрузка.." : "Создать"}
//     </Button>
//   );
// };

// export default ArticleForm;

"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function ArticleForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Network response was not ok");
      }

      const result = await response.json();
      console.log(
        result.success ? "File uploaded successfully" : "File upload failed"
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
