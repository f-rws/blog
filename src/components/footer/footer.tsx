import styles from './footer.module.scss';

export const Footer: React.VFC = () => {
  return (
    <footer className={styles.wrapper}>
      <p className={styles.copyright}>&copy; {new Date().getFullYear()} neet in zama</p>
    </footer>
  );
};
