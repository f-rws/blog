import { Components } from 'react-markdown/src/ast-to-react';
import Image from 'next/image';
import styles from './image-element.module.scss';

export const ImageElement: Components['img'] = (props) => {
  const { src, alt } = props;

  const IMAGES_BELOW = 1;
  const imgPath = src ? src.split('public')[IMAGES_BELOW] : ''; // public/images以下のパスを取得

  return (
    <div className={styles.wrapper}>
      <Image src={imgPath} alt={alt} layout="fill" objectFit="contain" />
    </div>
  );
};
