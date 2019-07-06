import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Carousel } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import styles from '../base.less';

const { Description } = DescriptionList;

import jsonp from 'fetch-jsonp';
import Zmage from 'react-zmage';
import HttpFetch from '../../../../utils/HttpFetch';

class PackageListItem extends PureComponent {
  fetch = item => {
    const _this = this;
    let params = {};
    params.dataNo = item.packNo;
    fetch(HttpFetch.queryMarkImage, {
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
            this.state.imageObject = imageObject;
            _this.setState({
              imageObject,
              loading: false,
            });
            return;
          }
        }
        _this.setState({
          loading: false,
        });
        // console.log('result ', d);
      })
      .catch(function(ex) {
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
      this.fetch(item);
      this.state.isFirst = false;
    }
    let paths = [];

    if (isSelected && callbackUrl) {
      callbackUrl(imageObject);
    }

    if (imageObject.length > 0) {
      paths = imageObject.map(v => {
        return v.path;
      });
    }

    if (!paths) paths = [];

    return (
      <Card
        hoverable
        loading={loading}
        className={isSelected ? styles.list_selected_content : ''}
        cover={
          <Carousel className={styles.carousel_content} autoplay>
            {this.getImages(paths)}
          </Carousel>
        }
      >
        <div>
          <DescriptionList size="small" col="2">
            <Description size="small" term="终客编号">
              {item.endNo}
            </Description>
            <Description size="small" term="终客简称">
              {item.endShotName}
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
      v // src={v}
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
}

export default PackageListItem;
