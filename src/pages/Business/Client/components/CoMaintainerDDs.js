import React, { PureComponent } from 'react';
import {  Select } from 'antd';

import HttpFetch from '@/utils/HttpFetch';
import { getCurrentUser } from '../../../../utils/authority';

const { Option } = Select;

class CoMaintainerDDs extends PureComponent {
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
        style={this.props.style}
        value={showValue}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {this.getDict()}
      </Select>
    );
  }

  getDict() {
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
      <Option key={item.id} value={item.userName}>
        {item.zhName}
      </Option>
    ));
  };

  loadDict = () => {
    const { dict } = this.props;

    const params = {};
    const _this = this;
    params.wordbookTypeCode = dict;
    // console.log('dict params is ', params);
    fetch(HttpFetch.coMaintainerDD, {
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

        if (body.records)
          _this.setState({
            loading: false,
            dicts: body.records,
          });
        console.log('result q', d);
      })
      .catch(function(ex) {
        // message.error('加载图片失败！');
      });
  };
}

export default CoMaintainerDDs;
