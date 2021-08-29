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
      <link rel="canonical" href={url} />
      <link rel="shortcut icon" type="image/png" sizes="32x32" href="/public/favicon-32x32.png" />
      <link rel="shortcut icon" type="image/png" sizes="16x16" href="/public/favicon-16x16.png" />
    </Head>
  );
};
