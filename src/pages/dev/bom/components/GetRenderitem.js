/*
*
* 右边详情内容部分
* */

import {
  Carousel,
  Card,
  Divider,
} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import moment from 'moment';
import Zmage from 'react-zmage';
import styles from './GetRenderitem.less';
import {defaultImages} from '@/utils/utils';

const { Description } = DescriptionList;

// 右手边显示的详情信息
/*
* data 选中数据
* type 显示详情内容模板标志
*
* items 配置数据
* */
const GetRenderitem = ({ data, type, items }) => {
  const selectRowItem = () => {
    // console.log('select the item');
  };
  const getImages = (paths) => {
    if (!paths) return;
    return paths.map(v => (
      <div className={styles.carousel_image_ground} key={`as${Math.random(1)}`}>
        <Zmage
          alt="图片"
          align="center"
          className={styles.carousel_image}
          src={v}
          edge={20}
          set={paths.map(image => ({ src: image, style: { minWidth: 800, minHeight: 800 } }))}
        />
      </div>
    ));
  };
  const arr = items[type];
  const images = data.pictures && (data.pictures.length===0?defaultImages:data.pictures.flatMap(e => e.picPath));
  // import {defaultImages} from '@/utils/utils';

  return (
    <Card bordered={false} style={{ overflow: 'auto' }} className={styles.carddiv} onClick={selectRowItem}>
      {
        <Carousel speed={150} key={data.id} initialSlide={0} className={styles.carousel_content} autoplay>
          {getImages(images)}
        </Carousel>}
      {images && images.length > 0 && <Divider />}
      {data.id && <DescriptionList className={styles.headerList} size="small" col="1">
        {
          arr.map(({ key, value, cName, convert, date, fixed }) =>
            <Description key={key} term={key}>
              {
                (date && data[value]) ? moment(data[value]).format(date)
                  : (convert ? (convert instanceof Function ? convert(data[value], fixed) : convert[data[value]]) : (cName ? data[`${value}Name`] : (`${data[value]}`)))
              }
            </Description>,
          )
        }
      </DescriptionList>}
    </Card>
  );
};

export default GetRenderitem;
