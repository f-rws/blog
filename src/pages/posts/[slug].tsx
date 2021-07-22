import { getAllPostSlugs, getPostBySlug } from '../../lib/posts';
import { PostData } from '../../types';
import { Layout } from '../../components/layout/layout';
import { PageSeo } from '../../components/head/pageSeo';
import { NextPage } from 'next';
import { PostContent } from '../../components/post-content/post-content';

type Props = {
  postData: PostData;
};

const BlogPost: NextPage<Props> = ({ postData }) => {
  const { title } = postData;

  return (
    <>
      <PageSeo title={title} description={'フルサワのブログです'} />
      <Layout>
        <PostContent postData={postData} />
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
