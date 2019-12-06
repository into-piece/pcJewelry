import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Carousel } from 'antd';
import DescriptionList from '@/components/DescriptionList';

import Zmage from 'react-zmage';

import { connect } from 'dva';
import querystring from 'querystring';
import jsonp from 'fetch-jsonp';
import styles from '../base.less';
import HttpFetch, { querylistEndCustomerDropDown } from '../../../../utils/HttpFetch';
import clientStyle from '../Client.less';
import { getCurrentUser } from '../../../../utils/authority';
import {defaultImages} from '@/utils/utils';

const { Description } = DescriptionList;


class MarkListItem extends PureComponent {


  carouselsettings = {
    speed: 150,
    initialSlide: 1, // 修改组件初始化时的initialSlide 为你想要的值
  }

//   fetch2 = item => {
//     // console.log("test load image")
//     const _this = this;
//     const params = {};
//     params.dataNo = item.markingNo;
//     fetch(HttpFetch.queryMarkImage, {
//       method: 'POST',
//       credentials: 'include',
// headers: {
//         'Content-Type': 'application/json',
//         'token': getCurrentUser()?getCurrentUser().token:'',
//       },
//       body: JSON.stringify(params),
//     })
//       .then(response => response.json())
//       .then(d => {
//         const {body} = d;
//         if (body && body.records) {
//           if (body.records.length > 0) {
//             const imageObject = body.records;
//             this.state.imageObject = imageObject;
//             _this.setState({
//               imageObject,
//               loading: false,
//             });
//             // console.log("test load finish")
//             // console.log('image  data ', imageObject);
//             return;
//           }
//         }
//         _this.setState({
//           loading: false,
//         });
//         // console.log('result ', d);
//       })
//       .catch(function(ex) {
//         console.log('parsing failed', ex);
//         // message.error('加载图片失败！');
//         _this.setState({
//           loading: false,
//         });
//       });
//     // }
//   };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageObject: [],
      isFirst: true,
      isFristLoadValue: true,
    };
  }

  componentDidMount() {
    // const { item } = this.props;
    // if (item) {
    //   this.fetch2(item);
    //   // this.feathMarkToId(item.endNo);
    // }
  }

  render() {
    const { item, isSelected, callbackUrl } = this.props;

    const { loading, imageObject, isFirst, isFristLoadValue } = this.state;

    const images = item.pictures && (item.pictures.length===0?defaultImages:item.pictures.flatMap(e => e.picPath));


    return (
      <Card
        hoverable
        loading={loading}
        className={isSelected ? styles.list_selected_content : ''}
        cover={
          <Carousel {...this.carouselsettings} key={item.id} className={styles.carousel_content} autoplay>
            {this.getImages(images)}
          </Carousel>
        }
      >
        <div>
          <DescriptionList size="small" col="1">
            <Description size="small" term="终客编号" className={clientStyle.small_description}>
              {item.endNo}
            </Description>
            <Description size="small" term="终客简称" className={clientStyle.small_description}>
              {item.endShotName}
            </Description>
            <Description size="small" term="字印编号" className={clientStyle.small_description}>
              {item.markingNo}
            </Description>
            <Description term="字印价" className={clientStyle.small_description}>{item.markingPrice}</Description>
          </DescriptionList>
          <DescriptionList size="small" col="1">
            <Description term="字印英文名" className={clientStyle.small_description}>{item.enName}</Description>
            <Description term="字印中文名" className={clientStyle.small_description}>{item.zhName}</Description>
            <Description term="字印说明" className={clientStyle.small_description}>{item.markingExplain}</Description>
          </DescriptionList>
        </div>
      </Card>
    );
  }

  getImages = paths => {
    return paths.map((
      v, // src={v}
    ) => (
      <div className={styles.carousel_image_ground}>
        <Zmage
          alt="图片"
          align="center"
          className={styles.carousel_image}
          src={v}

          edge={20}
          set={paths.map(image => ({ src: image ,style: { minWidth: 800,minHeight: 800 },}))}
        />
      </div>
    ));
  };

}

export default MarkListItem;
