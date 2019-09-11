import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Spin, Select } from 'antd';
import querystring from 'querystring';

import { connect } from 'dva';
import HttpFetch from '../../../../utils/HttpFetch';
import { getCurrentUser } from '../../../../utils/authority';

const { Option } = Select;

const empty = {
  wordbookCode: '',
  wordbookContentCode: '---请选择---',
  wordbookContentZh: '---请选择---',
};

// import { connect } from 'dva';
@connect(({ dict, loading }) => {
  return {
    body: dict.body,
    loading: loading.effects['dict/fetchWorkBook'],
  };
})
class Dict extends PureComponent {
  state = {
    dicts: [],
    value: undefined,
    isFirst: true,
  };

  handleSearch = value => {
    // fetch(value, data => this.setState({ data }));
    this.loadDictsUrl(value);
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
    const { content , onChange} = this.props;
    onChange(content);
    // const { dict } = this.props;
    // console.log('dict ', dict);
  }

  render() {
    const { content, defaultValue ,style} = this.props;
    const { value, isFirst } = this.state;

    let showValue;
    if (isFirst) showValue = content;
    else {
      showValue = value;
    }

    if (!showValue) showValue = defaultValue;

    return (
      <Select
        placeholder={this.props.placeholder}
        style={{ width: '100%' }}
        defaultActiveFirstOption={false}
        showArrow={false}
        value={showValue}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {this.getDict()}
      </Select>
    );
  }

  getDict() {
    const { dicts } = this.state;

    // console.log('dict ', dicts);

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

    if (list.filter(v => {
      if (v.wordbookCode === '')
        return true;
    }).length == 0)
      list.unshift(empty);

    return list.map(item => (
      // const str = item.name+'/'+item.namePinyin+"/"+item.nameEn
      <Option key={item.wordbookContentCode} value={item.wordbookCode}>
        {item.wordbookContentZh}
      </Option>
    ));
  };

  loadDictsUrl = item => {
    const params = {};

    const { dispatch } = this.props;
    dispatch({
      type: 'dict/fetchWorkBook',
      payload: { ...params },
    });
  };

  loadDict = () => {
    const { dict } = this.props;

    const params = {};
    const _this = this;
    params.wordbookTypeCode = dict;
    // console.log('dict params is ', params);
    // fetch('/server/sys/mst-wordbook/listMstWordbook', {
    fetch(HttpFetch.queryMstWordList, {
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
        // console.log('result ', d);
      })
      .catch(function(ex) {
        // message.error('加载图片失败！');
      });
  };
}

export default Dict;
