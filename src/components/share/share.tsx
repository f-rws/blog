import { AiOutlineTwitter } from 'react-icons/ai';
import styles from './share.module.scss';

export const Share = () => {
  return (
    <ul className={styles.wrapper}>
      <li>
        {/* https:twitter.com/intent/tweet の後にシェアをするコンテンツの url を埋め込む */}
        <a
          href={'https:twitter.com/intent/tweet'}
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
