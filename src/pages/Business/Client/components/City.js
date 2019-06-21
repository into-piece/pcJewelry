import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Spin, Select } from 'antd';
import querystring from 'querystring';

const { Option } = Select;
import jsonp from 'fetch-jsonp';

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then(response => response.json())
      .then(d => {
        if (currentValue === value) {
          const result = d.result;
          const data = [];
          result.forEach(r => {
            data.push({
              value: r[0],
              text: r[0],
            });
            console.log('result ', d);
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}


import { connect } from 'dva';

// import { connect } from 'dva';
@connect(({ city, loading }) => {
  return {
    body: city.body,
    loading: loading.effects['city/fetchAllCity'],
  };
})
class City extends PureComponent {
  state = {
    data: [],
    value: undefined,
    isFirst:true
  };

  handleSearch = value => {
    // fetch(value, data => this.setState({ data }));
    this.loadImageUrl(value);
  };

  handleChange = value => {
    console.log('handleChange', value);
    const { onChange } = this.props;
    this.setState({
      value,
      isFirst:false
    });
    onChange({
      name:value
    })
  };


  render() {


    const { value,isFirst } = this.state;
    const { content } = this.props;

    console.log('value =', value);


    let showValue
    if(isFirst)
      showValue = content;
    else {
      showValue = value;
    }



    return (
      <Select
        showSearch
        value={showValue}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {this.getCity()}
      </Select>
    );
  }

  getCity() {

    let data = [];
    const { body } = this.props;
    if (body && body.data)
      data = body.data;

    console.log('citys ', data, 'isArray ', Array.isArray(data));

    return this.getOption(data);
  }


  selectCityItem = item => {
    const { onChange } = this.props;
    const { value } = this.state;
    console.log('selectCityItem value ', value, 'chang ', onChange);
    onChange({
      name: value,
    });
  };

  getOption = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.code} value={item.name}>
        {item.name}
      </Option>
    ));
  };

  loadImageUrl = (item) => {
    console.log('load image url ', item);
    let params = {};
    params.name = item;
    params.size = 10;
    const { dispatch } = this.props;
    dispatch({
      type: 'city/fetchAllCity',
      payload: { ...params },
    });

  };


}

export default City;
