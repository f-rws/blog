import styles from '../styles/home.module.scss';
import { PageSeo } from '../components/head/pageSeo';
import { Layout } from '../components/layout/layout';
import { Article } from '../components/article/article';
import { GetStaticProps } from 'next';
import { Post } from '../types';
import { getAllPosts } from '../lib/posts';

type HomeProps = {
  posts: Post[];
};

export const Home = (props: HomeProps) => {
  const { posts } = props;

  return (
    <>
      <PageSeo title={'blog'} description={'フルサワのブログです'} />
      <Layout>
        {posts && (
          <ul className={styles.articles}>
            {posts.map((post) => {
              const { title, date } = post;
              return <Article title={title} date={date} key={title} />;
            })}
          </ul>
        )}
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts: Post[] = getAllPosts();

  return { props: { posts } };
};
