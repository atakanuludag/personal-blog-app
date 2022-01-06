import React, { useState } from 'react'
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import ArticleService from '@/services/ArticleService'
import IArticle from '@/models/IArticle'
import ArticleItem from '@/components/ArticleItem'

import useArticleQuery from '@/hooks/queries/useArticleQuery'
import { dehydrate, QueryClient } from 'react-query'

interface IHomeProps {}

const service = new ArticleService()

const Home: NextPage<IHomeProps> = () => {
  //const [items] = useState<IArticle[]>([])

  const { articleQuery } = useArticleQuery()
  const article = articleQuery()

  if (article.isSuccess)
    return (
      <>
        <section>
          <div className="container">
            {article.data.results.map((item) => (
              <ArticleItem key={item.id} item={item} />
            ))}
          </div>
        </section>
      </>
    )

  return <></>
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
  await articlePreFetchQuery(queryClient)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
