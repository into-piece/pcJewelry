import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Spin, Select } from 'antd';
import querystring from 'querystring';

const { Option } = Select;


class JewelrySelect extends PureComponent {
  state = {
    dicts: [],
    value: undefined,
    isFirst: true,
    firstSelected:true,
  };

  handleChange = value => {
    const { onChange, onSelect } = this.props;
    const { dicts } = this.state;
    this.setState({
      value,
      isFirst: false,
    });
    onChange(value);

    if (onSelect) {
      const selectItem = dicts.filter((v) => {
        if (v.id === value)
          return v;
      });
      if (selectItem.length > 0)
        onSelect(selectItem[0]);

    }
  };

  componentDidMount() {
    this.loadSelect();
  }

  render() {
    const { content } = this.props;
    const { value, isFirst } = this.state;

    let showValue;
    if (isFirst) {
      showValue = content;

    } else {
      showValue = value;
    }
    return (
      <Select
        placeholder={this.props.placeholder}
        defaultActiveFirstOption={false}
        style={{ width: '100%', height: '100%' }}
        showArrow={false}
        value={showValue}
        filterOption={false}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {this.getData()}
      </Select>
    );
  }

  getData() {
    const { dicts } = this.state;
    return this.getOption(dicts);
  }

  getOption = list => {
    return this.getOptionList(list);

  };

  loadSelect = () => {
    const { content ,onSelect } = this.props;
    const { firstSelected } = this.state;
    let params = {};
    const _this = this;
    const url = this.getUrl();
    if(url){
    fetch(url, {
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
        if (body.records) {
          _this.setState({
            loading: false,
            dicts: body.records,
          });
          if(firstSelected&&content)
          {
            if (onSelect) {
              const selectItem = body.records.filter((v) => {
                if (v.id === content)
                  return v;
              });
              if (selectItem.length > 0)
                onSelect(selectItem[0]);

            }

          }
        }
        this.state.firstSelected = false
      }).catch(function(ex) {
        // message.error('加载图片失败！');
      });
    }
  };
}

export default JewelrySelect;
