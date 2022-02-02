import React, { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next/types'
import ArticleService from '@/services/ArticleService'
import IArticle from '@/models/IArticle'
import ArticleItem from '@/components/ArticleItem'

interface IHomeProps {
  items: IArticle[]
}

const Home: NextPage<IHomeProps> = (props) => {
  const [items] = useState<IArticle[]>(props.items)

  return <></>
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({}) => {
  let props: IHomeProps = {
    items: new Array<IArticle>(),
  }

  const test = await ArticleService.getItems()
  props.items = test.results

  return { props }
}
