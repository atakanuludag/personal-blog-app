import React, { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import ArticleService from '@/services/ArticleService';
import IArticle from '@/models/IArticle';
import ArticleItem from '@/components/ArticleItem';

interface IHomeProps {
  items: IArticle[];
}

const service = new ArticleService();

const Home: NextPage<IHomeProps> = (props) => {

  const [items] = useState<IArticle[]>(props.items);

  return (
    <React.Fragment>
      <section className="cta-section theme-bg-light py-5">
        <div className="container text-center">
          <h2 className="heading">DevBlog - A Blog Template Made For Developers</h2>
          <div className="intro">Welcome to my blog. Subscribe and get my latest blog post in your inbox.</div>
          <form className="signup-form form-inline justify-content-center pt-3">
            <div className="form-group">
              <label className="sr-only" htmlFor="semail">Your email</label>
              <input type="email" id="semail" name="semail1" className="form-control mr-md-1 semail" placeholder="Enter email" />
            </div>
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>

      <section className="blog-list px-3 py-5 p-md-5">
        <div className="container">
          {items.map(item => <ArticleItem key={item.id} item={item} />)}

          <nav className="blog-nav nav nav-justified my-5">
            <a className="nav-link-next nav-item nav-link rounded" href="#">Daha Fazlası...<i className="arrow-next fas fa-long-arrow-alt-right"></i></a>
          </nav>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ }) => {

  let props: IHomeProps = {
    items: new Array<IArticle>()
  };

  const test = await service.getItems();
  props.items = test.results;

  return { props };
}