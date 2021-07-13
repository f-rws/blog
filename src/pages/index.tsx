import styles from '../styles/home.module.scss';
import { PageSeo } from '../components/head/pageSeo';
import { Layout } from '../components/layout/layout';
import { Article } from '../components/article/article';

export const Home = () => {
  return (
    <>
      <PageSeo title={'blog'} description={'フルサワのブログです'} />
      <Layout>
        <ul className={styles.articles}>
          <Article title={'テストやで'} date={'2021-07-11'} /> {/* テストデータ */}
        </ul>
      </Layout>
    </>
  );
};

export default Home;
