"use client";

// ** components
import NewEditArticle from "@/components/admin/articles/NewEditArticle";

type AdminArticleEditProps = {
  params: { id: string };
};

export default function AdminArticleEdit({ params }: AdminArticleEditProps) {
  return <NewEditArticle id={params.id as string} />;
}
