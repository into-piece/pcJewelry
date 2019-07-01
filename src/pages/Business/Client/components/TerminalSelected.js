import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Spin, Select } from 'antd';
import querystring from 'querystring';

const { Option } = Select;


// import { connect } from 'dva';

class TerminalSelected extends PureComponent {
  state = {
    value: undefined,
    isFirst: true,
    records: [],

  };

  handleSearch = value => {
    // fetch(value, data => this.setState({ data }));
    this.fetch(value);
  };

  handleChange = value => {
    console.log('handleChange', value);
    const { onChange, onSelectEndName } = this.props;
    const { records } = this.state;
    this.setState({
      value,
      isFirst: false,
    });
    onChange(value);
    if (onSelectEndName) {
      let endName = '';
      const r = records.filter((v, index) => {
        if (v.endNo === value) {
          return true;
        }
      });
      if (r.length > 0)
        endName = r[0];

      onSelectEndName(endName.endShotName);
    }
  };


  render() {

    const { value, isFirst, loading ,records} = this.state;
    const { content } = this.props;


    // console.log("endNo is ",records)

    let showValue;
    if (isFirst) {
      showValue = content;
      // this.fetch('');
    } else {
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
        {this.getEndNo(records)}
      </Select>
    );
  }

  getEndNo(records) {



    return this.getOption(records);
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
      <Option key={item.id} value={item.endNo}>
        {item.endNo}
      </Option>
    ));
  };


  fetch = (item) => {


    let params = {};
    params.endNo = item;
    params.size = 10;
    const _this = this;
    fetch('/server/business/end-customer/listEndCustomer', {
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
          // if (body.records.length > 0) {
            let  records = body.records;
            // console.log("terminal records ",records)
          if(!records) records=[];
          console.log("list update ",records)
            this.state.records = records;
            _this.setState({
              records,
              loading: false,
            });
            // console.log('image  data ', imageObject);
            return;
          }

        // }
        this.state.records = [];
        _this.setState({
          loading: false,
          records:[],
        });

      }).catch(function(ex) {
      console.log('parsing failed', ex);
      // message.error('加载图片失败！');
      _this.setState({
        loading: false,
        records:[],
      });
    });
    // }
  };

}

export default TerminalSelected;
