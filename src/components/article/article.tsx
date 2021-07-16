import styles from './article.module.scss';
import { format } from 'date-fns';

type ArticleProps = {
  title: string;
  date: string;
};

export const Article: React.VFC<ArticleProps> = ({ title, date }) => {
  const resultDate = format(new Date(date), 'yyyy.MM.dd');

  return (
    <li className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <time className={styles.date}>{resultDate}</time>
    </li>
  );
};
