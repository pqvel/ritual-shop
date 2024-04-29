"use client";
import { FC, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/shadcn-ui/card";
import { Label } from "@/components/ui/shadcn-ui/label";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Button } from "@/components/ui/shadcn-ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { createCategory } from "@/app/actions/categories";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const ArticleForm: FC = () => {
  const [formState, action] = useFormState<ReturnType<typeof createCategory>>(
    createCategory,
    {}
  );

  const [content, setContent] = useState<string | undefined>("");

  return (
    <form action={action}>
      <Card>
        <CardHeader>
          <h1 className=" text-2xl font-semibold">Создание новой статьи</h1>
        </CardHeader>
        <CardContent>
          <Label className="block mb-4">
            <div className="mb-2 text-lg">Название</div>
            <Input placeholder="Двойные памятники" name="title" />
          </Label>
          <Label className="block mb-4">
            <div className="mb-2 text-lg">Изображение</div>
            <Input
              placeholder="Выберите изображение"
              name="image"
              type="file"
              accept="image/jpeg"
            />
          </Label>

          <MDEditor
            className="flex flex-col"
            value={content}
            onChange={setContent}
          />
          <SubmitButton />
        </CardContent>
      </Card>
    </form>
  );
};

const SubmitButton: FC = () => {
  const status = useFormStatus();
  return (
    <Button className="w-auto" type="submit" disabled={status.pending}>
      {status.pending ? "loading.." : "Создать"}
    </Button>
  );
};

export default ArticleForm;
