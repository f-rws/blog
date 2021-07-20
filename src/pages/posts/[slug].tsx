import { getAllPostSlugs, getPostBySlug } from '../../lib/posts';
import { PostData } from '../../types';
import { Layout } from '../../components/layout/layout';
import { PageSeo } from '../../components/head/pageSeo';

type Props = {
  postData: PostData;
};

const BlogPost: React.VFC<Props> = ({ postData }) => {
  const { title, date, content } = postData;

  return (
    <>
      <PageSeo title={title} description={'フルサワのブログです'} />
      <Layout>
        <h1>{title}</h1>
        <time>{date}</time>
        <div>{content}</div>
      </Layout>
    </>
  );
};

export default BlogPost;

export const getStaticPaths = async () => {
  const slugs = getAllPostSlugs();

  return { paths: slugs, fallback: false };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const postData: PostData = getPostBySlug(params.slug);

  return { props: { postData } };
};
