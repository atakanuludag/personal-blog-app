// ** next
import { MetadataRoute } from "next";

// ** services
import ArticleService from "@/services/ArticleService";
import PageService from "@/services/PageService";

// ** models
import ArticleModel from "@/models/ArticleModel";
import PageModel from "@/models/PageModel";

// ** config
import { APP_URL } from "@/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articlesData = await ArticleService.getItems();
  const pagesData = await PageService.getItems();

  const articles = articlesData?.data as ArticleModel[];
  const pages = pagesData?.data as PageModel[];

  const articleSitemap: MetadataRoute.Sitemap = articles.map((item) => ({
    url: `${`${APP_URL}/${item.guid}`}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "daily",
    //priority: 1,
  }));

  const pageSitemap: MetadataRoute.Sitemap = pages.map((item) => ({
    url: `${`${APP_URL}/${item.guid}`}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "daily",
    priority: 1,
  }));

  return [...articleSitemap, ...pageSitemap];
}
