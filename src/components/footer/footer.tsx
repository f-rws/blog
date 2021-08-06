import styles from './footer.module.scss';
import { AiFillGithub } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';

export const Footer: React.VFC = () => {
  return (
    <footer className={styles.wrapper}>
      <ul className={styles.iconsWrapper}>
        <li className={styles.iconItem}>
          <a
            href={'https://twitter.com/6_pogbba'}
            target={'_blank'}
            rel={'noreferrer nofollow'}
            className={styles.link}
          >
            <AiOutlineTwitter size={'1.75em'} className={styles.icon} />
          </a>
        </li>
        <li className={styles.iconItem}>
          <a href={'https://github.com/neetzama'} target={'_blank'} rel={'noreferrer nofollow'} className={styles.link}>
            <AiFillGithub size={'1.75em'} className={styles.icon} />
          </a>
        </li>
      </ul>
      <p className={styles.copyright}>&copy; {new Date().getFullYear()} neet in zama</p>
    </footer>
  );
};
