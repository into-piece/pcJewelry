import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Spin, Select } from 'antd';
import querystring from 'querystring';

import { connect } from 'dva';
import HttpFetch, { queryQuality2 } from '../../../../utils/HttpFetch';
import { getCurrentUser } from '../../../../utils/authority';

const { Option } = Select;

// import { connect } from 'dva';
@connect(({ dict, loading }) => {
  return {
    body: dict.body,
    loading: loading.effects['dict/fetchWorkBook'],
  };
})
class QualityRequirements extends PureComponent {
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
      // console.log(" show value ",showValue)
    }
    // console.log("qre ... value ",showValue)
    return (
      <Select
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        value={showValue}
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
      <Option key={item.qualityZhName} value={item.id}>
        {item.qualityEnName}
      </Option>
    ));
  };

  loadDict = () => {
    const { dict } = this.props;

    const params = {};
    const _this = this;
    params.wordbookTypeCode = dict;
    // console.log('dict params is ',params)
    fetch(HttpFetch.queryQuality2, {
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
      })
      .catch(function(ex) {
        // message.error('加载图片失败！');
      });
  };
}

export default QualityRequirements;
