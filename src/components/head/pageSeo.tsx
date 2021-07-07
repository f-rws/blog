import Head from 'next/head';

type PageSeoProps = {
  title: string;
  description: string;
  url?: string; // 現時点ではオプショナルにしておく。
};

export const PageSeo: React.VFC<PageSeoProps> = (props) => {
  const { title, description, url } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta property={'description'} content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={'article'} />
      <meta property="og:url" content={url} />
      <link rel="icon" href="../../public/favicon.ico" />
      <link rel="canonical" href={url} />
    </Head>
  );
};
