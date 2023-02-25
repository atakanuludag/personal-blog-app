// ** next
import { GetServerSideProps } from 'next/types'

// ** third party
import moment from 'moment'

// ** services
import ArticleService from '@/services/ArticleService'
import PageService from '@/services/PageService'

// ** models
import ArticleModel from '@/models/ArticleModel'
import PageModel from '@/models/PageModel'

// ** config
import { APP_URL } from '@/config'

function generateArticleAndPageSiteMap(items: ArticleModel[] | PageModel[]) {
  return `${items
    .map((data) => {
      return `
       <url>
           <loc>${`${APP_URL}/${data.guid}`}</loc>
           <lastmod>${moment(new Date(data.updatedAt)).format()}</lastmod>
       </url>
     `
    })
    .join('')}
 `
}

function SiteMap() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const articles = (await ArticleService.getItems()) as ArticleModel[]
  const pages = (await PageService.getItems()) as PageModel[]

  const articleSitemap = generateArticleAndPageSiteMap(articles)
  const pagesSitemap = generateArticleAndPageSiteMap(pages)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${articleSitemap}${pagesSitemap}</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
