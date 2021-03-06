import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Spin, Select } from 'antd';
import querystring from 'querystring';

const { Option } = Select;

import HttpFetch from '../../../../utils/HttpFetch';
import { getCurrentUser } from '../../../../utils/authority';


class BrandListSelect extends PureComponent {
  state = {
    dicts: [],
    value: undefined,
    isFirst: true,
  };

  handleChange = value => {
    const { onChange } = this.props;
    this.setState({
      value,
      isFirst: false,
    });
    onChange(value);
  };

  componentDidMount() {
    this.loadDict();
  }

  render() {
    const { content } = this.props;
    const { value, isFirst } = this.state;

    let showValue;
    if (isFirst) showValue = content;
    else {
      showValue = value;
    }
    return (
      <Select
        placeholder={this.props.placeholder}
        defaultActiveFirstOption={false}
        style={{width:'100%',height:'100%'}}
        showArrow={false}
        value={showValue}
        filterOption={false}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {this.getBrands()}
      </Select>
    );
  }

  getBrands() {
    const { dicts } = this.state;

    return this.getOption(dicts);
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
      // const str = item.name+'/'+item.namePinyin+"/"+item.nameEn
      <Option key={item.zhName} value={item.id}>
        {item.zhName}
      </Option>
    ));
  };

  loadDict = () => {
    const { dict } = this.props;

    let params = {};
    const _this = this;
    params.wordbookTypeCode = dict;
    // console.log('dict params is ',params)
    fetch(HttpFetch.queryBrands, {
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
        const body = d.body;

        if (body.records)
          _this.setState({
            loading: false,
            dicts: body.records,
          });
      })
      .catch(function(ex) {
        // message.error('加载图片失败！');
      });
  };
}

export default BrandListSelect;
