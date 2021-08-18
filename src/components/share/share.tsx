import { AiOutlineTwitter } from 'react-icons/ai';
import styles from './share.module.scss';

type Props = {
  title: string;
  slug: string;
};

export const Share: React.VFC<Props> = (props) => {
  const { slug, title } = props;

  const url = `${process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL}/posts/${slug}`;
  const encodedTitle = encodeURIComponent(title);

  return (
    <ul className={styles.wrapper}>
      <li>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}%0a&url=${url}`}
          target={'_blank'}
          rel={'noreferrer nofollow'}
          className={styles.link}
        >
          <AiOutlineTwitter size={'3em'} className={styles.twitterIcon} />
        </a>
      </li>
    </ul>
  );
};
