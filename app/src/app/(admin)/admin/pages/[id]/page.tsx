"use client";

// ** components
import NewEditPage from "@/components/admin/pages/NewEditPage";

type AdminPageEditProps = {
  params: { id: string };
};

export default function AdminPageEdit({ params }: AdminPageEditProps) {
  return <NewEditPage id={params.id as string} />;
}
