import { Components } from 'react-markdown/src/ast-to-react';

export const ImageElement: Components['img'] = (props) => {
  const IMAGES_BELOW = 1;
  const imgPath = props.src ? props.src.split('public')[IMAGES_BELOW] : ''; // public/images以下のパスを取得
  const alt = props.alt ?? '';

  return <img src={imgPath} alt={alt} />;
};
