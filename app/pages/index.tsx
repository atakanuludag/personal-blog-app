import React, { useState } from 'react'
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import ArticleService from '@/services/ArticleService'
import IArticle from '@/models/IArticle'
import ArticleItem from '@/components/ArticleItem'

import useArticleQuery from '@/hooks/queries/useArticleQuery'
import { dehydrate, QueryClient } from 'react-query'

interface IHomeProps {
  items: IArticle[]
}

const service = new ArticleService()

const Home: NextPage<IHomeProps> = (props) => {
  //const [items] = useState<IArticle[]>(props.items)
  const [items] = useState<IArticle[]>([])

  const { articleQuery } = useArticleQuery()
  const article = articleQuery

  if (article.isSuccess)
    return (
      <>
        <section className="blog-list px-3 py-5 p-md-5">
          <div className="container">
            {article.data.map((item) => (
              <ArticleItem key={item.id} item={item} />
            ))}
          </div>
        </section>
      </>
    )

  return <div>test</div>
}

export default Home

// export const getServerSideProps: GetServerSideProps = async ({}) => {
//   let props: IHomeProps = {
//     items: new Array<IArticle>(),
//   }

//   const test = await service.getItems()
//   props.items = test.results

//   return { props }
// }

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient()

  const { articlePreFetchQuery } = useArticleQuery()
  await articlePreFetchQuery()

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

// export async function getStaticProps = async ()  {
//   const { articlePreFetchQuery } = useArticleQuery()

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
