import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Carousel } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import styles from '../base.less';

import Zmage from 'react-zmage'

const { Description } = DescriptionList;

import { connect } from 'dva';
import querystring from 'querystring';
import jsonp from 'fetch-jsonp';


@connect(({ image, loading }) => {

  return {
    body: image.body,
    loading: loading.effects['image/fetchImageUrl'],
  };
})
class MarkListItem extends PureComponent {


  fetch2 = (item) => {

    const _this = this;
    let params = {};
    params.dataNo = item.markingNo;
    fetch('/server/business/upload-img/listUploadImg', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const body = d.body;
        if (body && body.records) {
          if (body.records.length > 0) {
            const imageObject = body.records;
            // console.log('image object ', imageObject);
            // path = imageObject.path;
            this.state.imageObject = imageObject;
            _this.setState({
              imageObject,
              loading: false,
            });
            // console.log('image  data ', imageObject);
            return;
          }
        }
        _this.setState({
          loading: false,
        });
        // console.log('result ', d);
      }).catch(function(ex) {
      console.log('parsing failed', ex);
      message.error('加载图片失败！');
      _this.setState({
        loading: false,
      });
    });
    // }
  };


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imageObject: [],
      isFirst: true,
    };
  }


  render() {


    const { item, isSelected, callbackUrl } = this.props;


    const { loading, imageObject, isFirst } = this.state;

    if (isFirst && item) {
      // if (item) {
      this.fetch2(item);
      this.state.isFirst = false;
    }
    let paths = [];




    if (isSelected && callbackUrl) {
      // const fileList = imageObject.map(v=>(
      //   {
      //     uid:v.id,
      //     name:v.fileName,
      //     status:'done',
      //     url:v.path,
      //   }
      // ))
      // console.log("load images filelist ",fileList)

        callbackUrl(imageObject);
    }

    if (imageObject.length > 0) {
      paths = imageObject.map(v => {
        return v.path;
      });
      // paths = imageObject.path;
    }

    if (!paths)
      paths = [];

    console.log('image Object ', paths);


    return (<Card
      hoverable
      loading={loading}
      className={isSelected ? styles.list_selected_content : ''}
      cover={<Carousel className={styles.carousel_content} autoplay>
        {this.getImages(paths)}

      </Carousel>}
    >
      <div>
        <DescriptionList size='small' col='2'>
          <Description size="small" term='终客编号'>{item.endNo}</Description>
          <Description size="small" term='终客简称'>{item.endShotName}</Description>
          <Description size="small" term='字印编号'>{item.markingNo}</Description>
          <Description term='字印价'>{item.endNo}</Description>
        </DescriptionList>
        <DescriptionList size='small' col='1'>
          <Description term='字印英文名'>{item.enName}</Description>
          <Description term='字印中文名'>{item.zhName}</Description>
          <Description term='字印说明'>{item.markingExplain}</Description>
        </DescriptionList>
      </div>
    </Card>);

  }


  getImages = (paths) => {
    return paths.map((v) => (// src={v}
      <div><Zmage alt="加载失败" align="middle" className={styles.carousel_image} src={v} set={paths.map(image=>({src:image}))} /></div>
    ));

  };


  loadMrarkImageUrl = (item) => {
    let params = {};
    params.dataNo = item.markingNo;
    const { dispatch } = this.props;
    dispatch({
      type: 'image/fetchImageUrl',
      payload: { ...params },
    });

  };

}

export default MarkListItem;
