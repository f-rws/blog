import styles from './article.module.scss';

type ArticleProps = {
  title: string;
  date: string;
};

export const Article: React.VFC<ArticleProps> = ({ title, date }) => {
  return (
    <li className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <time className={styles.date}>{date}</time>
    </li>
  );
};
