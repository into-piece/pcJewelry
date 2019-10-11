import React, { Component } from 'react';
import { Select } from 'antd';
import { getCurrentUser } from '@/utils/authority';

import HttpFetch from '@/utils/HttpFetch';

const { Option } = Select;


class MoldListSelect  extends Component{
  state = {
    dicts: [],
    value: undefined,
    isFirst: true,
    firstSelected: true,
  };

  getOptionList = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }

    return list.map(item => (
      // const str = item.name+'/'+item.namePinyin+"/"+item.nameEn
      <Option key={item.id} value={item.mainMold}>
        {item.mainMold}
      </Option>
    ));
  };

  getUrl =()=>{
    return HttpFetch.queryMoldList
  }

  handleChange = value => {
    const { onChange, onSelect } = this.props;
    const { dicts } = this.state;
    this.setState({
      value,
      isFirst: false,
    });
    onChange(value);
    onSelect(value);
    //
    // if (onSelect) {
    //   const selectItem = dicts.filter((v) => {
    //     if (v.id === value)
    //       return v;
    //   });
    //   if (selectItem.length > 0)
    //     onSelect(selectItem[0]);
    //
    // }
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
        showSearch={this.props.showSearch}
        optionFilterProp="children"
        placeholder={this.props.placeholder}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        defaultActiveFirstOption={false}
        style={{ width: '100%', height: '100%' }}
        showArrow={false}
        value={showValue}
        mode="combobox"
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
    const { content, onSelect } = this.props;
    const { firstSelected } = this.state;
    const params = this.getParams ? this.getParams() : {};
    const _this = this;
    const url = this.getUrl();
    if (url) {
      fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'token': getCurrentUser() ? getCurrentUser().token : '',
        },
        body: JSON.stringify(params),
      })
        .then(response => response.json())
        .then(d => {
          const { body } = d;
          if (body.records) {
            _this.setState({
              loading: false,
              dicts: body.records,
            });
            if (firstSelected && content) {
              if (onSelect) {
                const selectItem = body.records.filter((v) => {
                  if (v.id === content)
                    return v;
                });
                if (selectItem.length > 0) {
                  onSelect(selectItem[0]);
                }

              }

            }
          }
          this.state.firstSelected = false;
        }).catch(function(ex) {
        // message.error('加载图片失败！');
      });
    }
  };
}

export default MoldListSelect;
