import styles from '../styles/home.module.scss';
import { PageSeo } from '../components/head/pageSeo';
import { Layout } from '../components/layout/layout';
import { Post } from '../components/post/post';
import { GetStaticProps } from 'next';
import { PostData } from '../types';
import { getAllPosts } from '../lib/posts';

type HomeProps = {
  posts: PostData[];
};

export const Home = (props: HomeProps) => {
  const { posts } = props;

  return (
    <>
      <PageSeo title={'blog'} description={'フルサワのブログです'} />
      <Layout>
        {posts && (
          <ul className={styles.articles}>
            {posts.map((post: PostData) => {
              const { title, date } = post;
              return <Post title={title} date={date} key={title} />;
            })}
          </ul>
        )}
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts: PostData[] = getAllPosts();

  return { props: { posts } };
};
