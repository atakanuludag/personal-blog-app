import React, { useState } from 'react'
import moment from 'moment'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IArticle from '@/models/IArticle'

interface IArticleItemProps {
  item: IArticle
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const ArticleItem = ({ item }: IArticleItemProps) => {
  return (
    <Item>
      <img
        className="mr-3 img-fluid post-thumb d-none d-md-flex"
        src={`${item.coverImage}`}
        alt={item.title}
      />
      <Typography variant="h1" component="h2">
        {item.title}
      </Typography>
    </Item>
  )

  /*return (
        <div className="item mb-5">
            image error:
            { imageError ? "true" : "false" }
            <div className="media">
                <img className="mr-3 img-fluid post-thumb d-none d-md-flex" src={`${item.featuredImage}`} alt="image" onError={handleImageOnError} />
                <div className="media-body">
                    <h3 className="title mb-1"><a href="blog-post.html">{item.title}</a></h3>
                    <div className="meta mb-1">
                        <span className="date">{moment(item.publishingDate).fromNow()}</span>
                        <span className="time">8 min read</span>
                        <span className="comment"><a href="#">12 comments</a></span>
                    </div>
                    <div className="intro">{item.shortDescription}</div>
                    <a className="more-link" href="blog-post.html">Devamını oku &rarr;</a>
                </div>
            </div>
        </div>
    )*/
}

export default ArticleItem
