import React, { useState } from 'react';
import IArticle from '@/models/IArticle';
import moment from 'moment';

interface IArticleItemProps {
    item: IArticle
}

const ArticleItem = ({ item }: IArticleItemProps) => {

    const [ imageError, setImageError ] = useState(false);

    const handleImageOnError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        //console.log("test");
        //e.currentTarget.src = "/404.png";
        setImageError(true);
    }

    return (
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
    )
}

export default ArticleItem;