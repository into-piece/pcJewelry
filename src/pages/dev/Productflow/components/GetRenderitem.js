/*
*
* 右边详情内容部分
* */

import {
  Carousel,
  Card,
  Divider,List, Icon
} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import Zmage from 'react-zmage';
import styles from './GetRenderitem.less';

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
  const images = data.pictures && data.pictures.flatMap(e => e.picPath);
  const {videos} = data;

  return (
    <Card bordered={false} style={{overflow:"auto"}} onClick={selectRowItem}>
      {<Carousel speed={150} key={data.id} initialSlide={0} className={styles.carousel_content} autoplay>
        {getImages(images)}
       </Carousel>}
      {images && images.length > 0 && <Divider />}
      {data.id&&<DescriptionList className={styles.headerList} size="small" col="1">
        {
          arr.map(({ key, value, cName, convert }) =>
            <Description key={key} term={key}>
              {
                convert ? convert[data[value]] : (cName ? data[`${value}Name`] : data[value])
              }
            </Description>,
          )
        }
      </DescriptionList>}
      {videos&&videos.length>0&& <List
        header={<div className={styles.videotitle}>视频附件:</div>}
        itemLayout="horizontal"
        dataSource={videos}
        renderItem={item => (
          <List.Item>
            {/* <List.Item.Meta */}
            {/* avatar={<Avatar icon="video-camera" style={{ backgroundColor: '#1890ff' }} />} */}
            {/* title={<a href={item.videoPath} target="_blank"></a>} */}
            {/* /> */}
            <Icon type="video-camera" style={{ color: '#1890ff',fontSize:'24px' ,marginRight:'20px',verticalAlign:'middle'}} />
            {item.fileName ||item.videoPath.substring(item.videoPath.lastIndexOf('\\')+1,item.videoPath.length)}
          </List.Item>
        )}
      />}
    </Card>
  );
};

export default GetRenderitem;
