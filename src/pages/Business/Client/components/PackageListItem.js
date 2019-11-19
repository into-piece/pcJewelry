import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Carousel } from 'antd';
import DescriptionList from '@/components/DescriptionList';

import jsonp from 'fetch-jsonp';
import Zmage from 'react-zmage';
import styles from '../base.less';
import HttpFetch from '../../../../utils/HttpFetch';
import { getCurrentUser } from '../../../../utils/authority';

const { Description } = DescriptionList;

class PackageListItem extends PureComponent {


  carouselsettings = {
    speed: 150,
    initialSlide: 1, // 修改组件初始化时的initialSlide 为你想要的值
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
    const { item } = this.props;
    // this.fetch(item);
    this.feathPackageToId(item.endNo);
  }


  render() {
    const { item, isSelected, callbackUrl } = this.props;

    const { loading, imageObject, endNo, endShotName, isFristLoadValue } = this.state;
    const paths = item.pictures && item.pictures.flatMap(e => e.picPath);

    return (
      <Card
        hoverable
        loading={loading}
        className={isSelected ? styles.list_selected_content : ''}
        cover={
          <Carousel {...this.carouselsettings} key={item.id} className={styles.carousel_content} autoplay>
            {this.getImages(paths)}
          </Carousel>
        }
      >


        <div>
          <DescriptionList size="small" col="2">
            <Description size="small" term="终客编号">
              {endNo}
            </Description>
            <Description size="small" term="终客简称">
              {endShotName}
            </Description>
            <Description size="small" term="包装说明编码">
              {item.packNo}
            </Description>
          </DescriptionList>

          <DescriptionList size="small" col="1">
            <Description term="包装说明">{item.packExplain}</Description>
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
          set={paths.map(image => ({ src: image }))}
        />
      </div>
    ));
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }

  feathPackageToId = (id) => {


    this.setState({
      loading: true,
    });
    const params = {};
    params.id = id;

    const mythis = this;
    fetch(HttpFetch.queryTerminalList, {
      method: 'POST',
      credentials: 'include',
headers: {
        'Content-Type': 'application/json',
        'token': getCurrentUser()?getCurrentUser().token:'',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const {body} = d;
        if (body && body.records) {
          const {records} = body;


          // console.log("terminal records ",records)
          if (records && records.length > 0) {
            const item = records[0];
            const {endNo} = item;
            const {endShotName} = item;
            // console.log(" end item ",item)

            // console.log('list update ', records);
            mythis.setState({
              endNo,
              endShotName,
              loading: false,
              isFristLoadValue: false,
            });
            // console.log('image  data ', imageObject);
            // return;
          } else {
            // }
            mythis.setState({
              loading: false,
              records: [],
              isFristLoadValue: false,
            });
          }
        }
      })
      .catch(function(ex) {
        // console.log('parsing failed', ex);
        // message.error('加载图片失败！');
        mythis.setState({
          loading: false,
          records: [],
          isFristLoadValue: false,
        });
      });
  };
}

export default PackageListItem;
