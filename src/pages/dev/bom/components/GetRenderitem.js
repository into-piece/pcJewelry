/*
 *
 * 右边详情内容部分
 * */
import React from 'react'
import { Carousel, Card, Divider ,List,Icon} from 'antd';
import moment from 'moment';
import Zmage from 'react-zmage';
import DescriptionList from '@/components/DescriptionList';
import styles from './GetRenderitem.less';
import { defaultImages } from '@/utils/utils';

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
  const getImages = paths => {
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
  console.log(data,items, type);
  const images =
    data.pictures &&
    (data.pictures.length === 0 ? defaultImages : data.pictures.flatMap(e => e.picPath));
  // import {defaultImages} from '@/utils/utils';

  const {videos} = data;
  return (
    <Card
      bordered={false}
      style={{ overflow: 'auto' }}
      className={styles.carddiv}
      onClick={selectRowItem}
    >
      {
        images&&
        <Carousel
          speed={150}
          key={data.id}
          initialSlide={0}
          className={styles.carousel_content}
          autoplay
        >
          {getImages(images)}
        </Carousel>
    }
      <DescriptionList className={styles.headerList} size="small" col="1">
        {arr.map(({ key, value, cName, convert, date, fixed }) => {
            const showdata = date && data[key]
            ? moment(data[key]).format(date)
            : convert
            ? convert instanceof Function
              ? convert(data[value], fixed)
              : convert[data[value]]
            : cName
            ? data[`${value}Name`]
            : `${data[value]}`
            if(showdata!=='undefined'&&showdata!=='null'&&showdata){
            return(
              <Description key={key} term={key}>
                {showdata||''}
              </Description>
          )}return false
        })
        }
      </DescriptionList>
    
      {images && images.length > 0 && <Divider />}
 
      {data.videos &&data.videos.length>0&& (
      <List
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
            <a href={item.videoPath} target="_blank" rel="noopener">{item.fileName ||item.videoPath.substring(item.videoPath.lastIndexOf('\\')+1,item.videoPath.length)}</a>
          </List.Item>
            )}
      />
      )}

      {data.files &&data.files.length>0&& (
      <List
        header={<div className={styles.videotitle}>文件附件:</div>}
        itemLayout="horizontal"
        dataSource={data.files}
        renderItem={item => (
          <List.Item>
            {/* <List.Item.Meta */}
            {/* avatar={<Avatar icon="video-camera" style={{ backgroundColor: '#1890ff' }} />} */}
            {/* title={<a href={item.videoPath} target="_blank"></a>} */}
            {/* /> */}
            <Icon type="file" style={{ color: '#1890ff',fontSize:'24px' ,marginRight:'20px',verticalAlign:'middle'}} />
            <a href={item.filePath} target="_blank" rel="noopener">{item.fileName ||item.filePath.substring(item.filePath.lastIndexOf('\\')+1,item.filePath.length)}</a>
          </List.Item>
            )}
      />
      )}
    </Card>
  );
};

export default GetRenderitem;


