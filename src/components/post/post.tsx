import styles from './post.module.scss';
import { format } from 'date-fns';
import Link from 'next/link';

type Props = {
  slug: string;
  title: string;
  date: string;
};

export const Post: React.VFC<Props> = ({ slug, title, date }) => {
  const resultDate = format(new Date(date), 'yyyy.MM.dd');

  return (
    <li>
      <Link href={`/posts/${slug}/`}>
        <a className={styles.link}>
          <h3 className={styles.title}>{title}</h3>
          <time className={styles.date}>{resultDate}</time>
        </a>
      </Link>
    </li>
  );
};
