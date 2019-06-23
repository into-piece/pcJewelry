import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Spin, Select } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import styles from '../base.less';

const { Option } = Select;
const { Description } = DescriptionList;

import { connect } from 'dva';


@connect(({ city, loading }) => {

  return {
    body: city.body,
    loading: loading.effects['image/fetchImageUrl'],
  };
})
class AllCity extends PureComponent {


  constructor(props) {
    super(props);

  }


  render() {


    const { body = {}, loading = false, value } = this.props;


    const onSelectChange = item => {
      console.log('selectProvinceItem ', item);
      const { dispatch, onChange } = this.props;
      const name = {};
      name.name = item;
      name.size = 10;

      dispatch({
        type: 'city/fetchAllCity',
        payload: {
          ...name,
        },
      });
      onChange({
        // province: item,
      });
    };

    console.log('city  data ', body);

    // const { province, city } = this.conversionObject();
    return (
      <Spin spinning={loading}>
        <Select
          className={styles.item}
          value={value}
          labelInValue
          showSearch
          onSearch={onSelectChange}
          // onSelect={this.selectProvinceItem}
        >
          {this.getProvinceOption()}
        </Select>
      </Spin>);

  }

  getProvinceOption() {
    const { body = {} } = this.props;
    return this.getOption(body.data);
  }


  getOption = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };




  selectProvinceItem = item => {
    const { dispatch } = this.props;
    if (item !== '') {

      const name = {};
      name.name = item.key;
      console.log('selectProvinceItem ', item);
      dispatch({
        type: 'city/fetchAllCity',
        payload: {
          ...name,
        },
      });
    }

  };

}

export default AllCity;
