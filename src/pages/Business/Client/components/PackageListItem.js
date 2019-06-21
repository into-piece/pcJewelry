import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import styles from '../base.less';

;
const { Description } = DescriptionList;

import { connect } from 'dva';


@connect(({ image, loading }) => {

  return {
    body: image.body,
    loading: loading.effects['image/fetchImageUrl'],
  };
})
class MarkListItem extends PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      image: false,
      imageObject:''
    };
  }


  render() {


    const { item ,isSelected,callbackUrl,body} = this.props;

    const { loading = false, image } = this.state;

    if (!image && item) {
      this.loadMrarkImageUrl(item);
      this.state.image = true;
    }



    let path='';

    if(body&&body.data)
    {
      if(body.data.length>0)
      {
        const imageObject = body.data[0];
        console.log("image object ",imageObject)
        path = imageObject.path;
        this.state.imageObject = imageObject;
      }
    }
    console.log("image  data ",body)

    if(isSelected&&callbackUrl)
    {
      callbackUrl(this.state.imageObject)
    }


    return (<Card
      hoverable
      className={isSelected? styles.list_selected_content : ''}
      cover={<img alt="图片"
                  src={path!==''?path:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559223238&di=bd3da77adf53b2475750e850b6106117&imgtype=jpg&er=1&src=http%3A%2F%2Fres.cngoldres.com%2Fupload%2F2014%2F1029%2F3c1910541d8059177e7d3f598611c859.jpg%3F_%3D1414568255062"}/>}
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
