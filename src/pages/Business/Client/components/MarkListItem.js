import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import styles from '../base.less';

;
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(response =>response.json())
      .then(d =>{
        const body = d.body;
        if (body && body.records) {
          if (body.records.length > 0) {
            const imageObject = body.records[0];
            console.log('image object ', imageObject);
            // path = imageObject.path;
            this.state.imageObject = imageObject;
            _this.setState({
              imageObject,
              loading:false
            })
            console.log('image  data ', imageObject);
          return;
          }
        }
        _this.setState({
          loading:false
        })
        // console.log('result ', d);
      }).catch(function(ex) {
      console.log('parsing failed', ex)
      message.error("加载图片失败！")
      _this.setState({
        loading:false
      })
    });
    // }
  };


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imageObject: '',
      isFirst:true,
    };
  }


  render() {


    const { item, isSelected, callbackUrl } = this.props;


    const { loading,imageObject,isFirst } = this.state;

    if (isFirst && item) {
    // if (item) {
      this.fetch2(item);
      this.state.isFirst = false;
    }
    let path = '';


    if (isSelected && callbackUrl) {
      callbackUrl(imageObject);
    }

    if(imageObject)
    {
      path = imageObject.path
    }

    console.log("path ",path,)


    return (<Card
      hoverable
      loading={loading}
      className={isSelected ? styles.list_selected_content : ''}
      cover={<img alt="图片"
                  src={path !== '' ? path : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559223238&di=bd3da77adf53b2475750e850b6106117&imgtype=jpg&er=1&src=http%3A%2F%2Fres.cngoldres.com%2Fupload%2F2014%2F1029%2F3c1910541d8059177e7d3f598611c859.jpg%3F_%3D1414568255062'}/>}
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
