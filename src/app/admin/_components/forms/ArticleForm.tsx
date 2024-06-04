"use client";
import { FC, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { Card, CardHeader, CardContent } from "@/components/ui/shadcn-ui/card";
import { Label } from "@/components/ui/shadcn-ui/label";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Button } from "@/components/ui/shadcn-ui/button";
import { useFormStatus, useFormState } from "react-dom";
import { createArticle } from "@/app/actions/articles";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { httpClient } from "@/utils/http";
import { TrashIcon } from "@radix-ui/react-icons";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type ContentImage = {
  id: string;
  url: string;
};

const ArticleForm: FC = () => {
  const [state, action] = useFormState<ReturnType<typeof createArticle>>(
    createArticle,
    {}
  );

  // const [imagesForm, imagesFormAction] = useFormState<null>()
  const [isArticleCreated, setArticleCreated] = useState<boolean>(false);
  const [content, setContent] = useState<string | undefined>("");
  const [images, setImages] = useState<ContentImage[]>([]);
  const [copiedImageId, setCopiedImageId] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImage = async () => {
    if (fileInputRef.current?.files?.length) {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);
      formData.append("folderName", "articles");

      httpClient
        .post<{ url: string }>("/api/files", formData)
        .then(({ url }) => setImages((prev) => [...prev, { url, id: uuid() }]));
    }
  };

  const removeImage = (image: ContentImage) => {
    httpClient.post("/api/files/delete", { url: image.url }).then(() => {
      setImages((prev) => prev.filter((img) => img.id !== image.id));
    });
  };

  const removeAllImages = () => {
    httpClient
      .post("/api/files/delete-all", {
        urls: images.map((i) => i.url),
      })
      .then(() => {
        setImages([]);
      });
  };

  const copyImageUrl = (image: ContentImage) => {
    setCopiedImageId(image.id);
    navigator.clipboard.writeText(image.url);
  };

  useEffect(() => {
    // return () => {
    // if (!isArticleCreated) removeAllImages();
    // };
  }, []);

  return (
    <Card>
      <CardHeader>
        <h1 className=" text-2xl font-semibold">Создание новой статьи</h1>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <input
            type="hidden"
            name="contentImages"
            value={JSON.stringify(images.map((i) => i.url))}
          />
          <Label className="block mb-4">
            <div className="mb-2 text-lg">Название</div>
            <Input placeholder="Двойные памятники" name="title" />

            {state?.title && (
              <div className=" text-red-600 mt-2">{state.title}</div>
            )}
          </Label>
          <Label className="block mb-4">
            <div className="mb-2 text-lg">Изображение для карточки</div>
            <Input
              placeholder="Выберите изображение"
              name="image"
              type="file"
              accept="image/jpeg"
            />
            {state?.image && (
              <div className=" text-red-600 mt-2">{state.image}</div>
            )}
          </Label>

          <MDEditor
            className="flex flex-col mb-5"
            value={content}
            style={{ height: "600px" }}
            onChange={setContent}
            textareaProps={{
              name: "content",
            }}
          />
          {images.length !== 0 && (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              {images.map((image) => (
                <li className="relative pt-[100%]" key={image.id}>
                  <Button
                    className=" absolute top-0 right-0 z-10"
                    variant="destructive"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeImage(image);
                    }}
                  >
                    <TrashIcon width={20} height={20} />
                  </Button>
                  <button
                    className="absolute w-full h-full left-0 top-0 shadow"
                    type="button"
                    onClick={() => copyImageUrl(image)}
                  >
                    <div className="absolute top-0 left-0 w-[calc(100%-56px)] bg-white bg-opacity-90 py-1.5 rounded-b-lg shadow-sm">
                      {image.id === copiedImageId
                        ? "Скопировано"
                        : "Копировать"}
                    </div>

                    <img
                      className="w-full h-full object-cover"
                      src={image.url}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mb-5">
            <div className="text-lg font-semibold mb-2">
              Добавить изображение в статью
            </div>
            <Input className="mb-2" ref={fileInputRef} type="file" />
            <Button onClick={addImage} type="button" variant="outline">
              Загрузить
            </Button>
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
};

const SubmitButton: FC = () => {
  const status = useFormStatus();
  return (
    <Button className="w-auto" type="submit" disabled={status.pending}>
      {status.pending ? "Загрузка.." : "Создать"}
    </Button>
  );
};

export default ArticleForm;

// "use client";

// import { useState, ChangeEvent, FormEvent } from "react";

// export default function ArticleForm() {
//   const [file, setFile] = useState<File | null>(null);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!file) {
//       console.log("No file selected");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("/api/files", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Network response was not ok");
//       }

//       const result = await response.json();
//       console.log(
//         result.success ? "File uploaded successfully" : "File upload failed"
//       );
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Upload File</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// }
