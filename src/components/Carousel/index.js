import React  from 'react';
import {Carousel} from 'antd';
import Zmage from 'react-zmage';
import styles from './index.less'
import DescriptionList from '@/components/DescriptionList';
import { defaultImages } from '@/utils/utils';

const { Description } = DescriptionList;

const getImages = pictures => {
  const images = pictures && pictures.flatMap(e => e.picPath || e);
  if (!images) return;
  return images.map(v => (
    <div className={styles.carousel_image_ground}>
      <Zmage
        alt="图片"
        align="center"
        className={styles.carousel_image}
        src={v}
        edge={20}
        set={images.map(image => ({ src: image, style: { minWidth: 800, minHeight: 800 } }))}
      />
    </div>
  ));
};

const carouselsettings = {
  speed: 150,
  initialSlide: 0, // 修改组件初始化时的initialSlide 为你想要的值
};

export default (({pictures})=>(
  <Carousel {...carouselsettings} key={`as${Math.random(2)}`}>
    {getImages(pictures && (pictures.length === 0 ? defaultImages : pictures))}
  </Carousel>
))