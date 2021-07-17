import styles from './post.module.scss';
import { format } from 'date-fns';

type ArticleProps = {
  title: string;
  date: string;
  slug?: string; // src/page/posts/[slug].tsx を作成するまでオプショナルとしておく
};

export const Post: React.VFC<ArticleProps> = ({ title, date }) => {
  const resultDate = format(new Date(date), 'yyyy.MM.dd');

  return (
    <li className={styles.wrapper}>
      <a className={styles.title}>{title}</a>
      <time className={styles.date}>{resultDate}</time>
    </li>
  );
};
