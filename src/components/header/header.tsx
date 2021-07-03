import Link from 'next/link';
import styles from './header.module.scss';

export const Header: React.VFC = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h1>
          <Link href={'/'}>
            <a className={styles.link}>Blog</a>
          </Link>
        </h1>
      </div>
    </header>
  );
};
