import React, { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next/types'
import ArticleService from '@/services/ArticleService'
import IArticle from '@/models/IArticle'
import ArticleItem from '@/components/ArticleItem'

interface IHomeProps {
  items: IArticle[]
}

const service = new ArticleService()

const Home: NextPage<IHomeProps> = (props) => {
  const [items] = useState<IArticle[]>(props.items)

  return (
    <>
      <section className="blog-list px-3 py-5 p-md-5">
        <div className="container">
          {items.map((item) => (
            <ArticleItem key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({}) => {
  let props: IHomeProps = {
    items: new Array<IArticle>(),
  }

  const test = await service.getItems()
  props.items = test.results

  return { props }
}
