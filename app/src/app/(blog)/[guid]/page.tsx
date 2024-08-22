// ** react
import { Fragment } from "react";

// ** next
import { Metadata } from "next";
import { notFound } from "next/navigation";

// ** services
import ArticleService from "@/services/ArticleService";
import PageService from "@/services/PageService";

// ** components
import Breadcrumb, {
  BreadcrumbDataProps,
} from "@/components/article/Breadcrumb";
import ArticleDetail from "@/components/article/Detail";
import PageDetail from "@/components/page/Detail";

// ** models
import ArticleModel from "@/models/ArticleModel";
import PageModel from "@/models/PageModel";

// ** config
import { SITE_TITLE } from "@/config";

type BlogGuidProps = {
  params: { guid: string };
};

type DataProps = {
  type: "article" | "page" | null;
  item: ArticleModel | PageModel | null;
};

const getData = async (guid: string) => {
  let data: DataProps = {
    type: null,
    item: null,
  };
  const article = await ArticleService.getItemByGuid(guid);
  if (!article || !article?.data?.guid) {
    const page = await PageService.getItemByGuid(guid);
    if (page && page?.data?.guid) {
      data = {
        type: "page",
        item: page.data,
      };
    }
  } else {
    data = {
      type: "article",
      item: article.data,
    };
  }

  return data;
};

export default async function BlogGuid({ params }: BlogGuidProps) {
  const guid = params.guid;

  const data = await getData(guid);

  if (!data.item) return notFound();

  const { item, type } = data;

  const breadcrumb: BreadcrumbDataProps[] = [
    {
      title: item.title,
      link: null,
    },
  ];

  const GuidRenderComponent = () => {
    switch (type) {
      case "article":
        return <ArticleDetail data={item as ArticleModel} />;

      case "page":
        return <PageDetail data={item as PageModel} />;

      default:
        return <div></div>;
    }
  };

  return (
    <Fragment>
      <Breadcrumb data={breadcrumb} />
      <GuidRenderComponent />
    </Fragment>
  );
}

export async function generateStaticParams() {
  const articles = await ArticleService.getItems();
  const pages = await PageService.getItems();

  const articlePaths = (articles?.data as ArticleModel[]).map((article) => ({
    guid: article.guid,
  }));
  const pagePaths = (pages?.data as PageModel[]).map((page) => ({
    guid: page.guid,
  }));
  const paths = [...articlePaths, ...pagePaths];
  return paths;
}

export async function generateMetadata({
  params,
}: BlogGuidProps): Promise<Metadata> {
  const guid = params.guid;

  const data = await getData(guid);
  const { item } = data;

  return {
    title: item?.title,
    description: item?.shortDescription,
    openGraph: {
      type: "article",
      authors: SITE_TITLE,
      title: item?.title,
      description: item?.shortDescription,
    },
  };
}
