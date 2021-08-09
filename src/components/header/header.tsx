import Link from 'next/link';
import styles from './header.module.scss';
import Image from 'next/image';
import Logo from '../../../public/neenote.svg';

export const Header: React.VFC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.innerWrapper}>
        <h1 className={styles.logo}>
          <Link href={'/'}>
            <a className={styles.link}>
              <Image src={Logo} width={150} height={30} className={styles.logo} alt={'Neenote'} />
            </a>
          </Link>
        </h1>
      </div>
    </header>
  );
};
