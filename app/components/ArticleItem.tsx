import React from 'react';
import IArticle from '@/models/IArticle';

interface IArticleItemProps {
    item: IArticle
}

const ArticleItem = ({ item }: IArticleItemProps) => {
    return (
        <div className="item mb-5">
            <div className="media">
                <img className="mr-3 img-fluid post-thumb d-none d-md-flex" src="assets/images/blog/blog-post-thumb-3.jpg" alt="image" />
                <div className="media-body">
                    <h3 className="title mb-1"><a href="blog-post.html">{item.title}</a></h3>
                    <div className="meta mb-1"><span className="date">Published 1 month ago</span><span className="time">8 min read</span><span className="comment"><a href="#">12 comments</a></span></div>
                    <div className="intro">{item.shortDescription}</div>
                    <a className="more-link" href="blog-post.html">Devamını oku &rarr;</a>
                </div>
            </div>
        </div>
    )
}

export default ArticleItem;