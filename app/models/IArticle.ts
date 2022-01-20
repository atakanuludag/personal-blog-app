import IListResponse from './IListResponse'

export default interface IArticle {
    readonly id: string;
    readonly title: string;
    readonly shortDescription: string;
    readonly content: string;
    readonly guid: string;
    readonly publishingDate: Date;
    //readonly categories: ObjectId[];
    //readonly tags: ObjectId[];
    //readonly articleType: ArticleType;
    readonly coverImage: string;
    readonly isShow: boolean;
    readonly viewCount: number;
    readonly likeCount: number;
}

export interface IArticleResponse extends IListResponse {
    results: IArticle[]; 
}