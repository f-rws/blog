import styles from './container.module.scss';

type ContainerProps = {
  children: React.ReactNode;
};

export const Container: React.VFC<ContainerProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
