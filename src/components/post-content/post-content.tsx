import ReactMarkdown from 'react-markdown';
import { PostData } from '../../types';
import styles from './post-content.module.scss';
import { format } from 'date-fns';

type Props = {
  postData: PostData;
};

export const PostContent: React.VFC<Props> = ({ postData }) => {
  const { title, date, content } = postData;
  const resultDate = format(new Date(date), 'yyyy.MM.dd');

  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title} itemProp={'headline'}>
          {title}
        </h1>
        <p className={styles.date}>
          <time dateTime={date} itemProp={'publishedDate'}>
            {resultDate}
          </time>
        </p>
      </header>
      <ReactMarkdown className={styles.markdown}>{content}</ReactMarkdown>
    </article>
  );
};
