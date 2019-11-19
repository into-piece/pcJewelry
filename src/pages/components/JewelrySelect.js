import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { getCurrentUser } from '../../utils/authority';

class JewelrySelect extends PureComponent {
  state = {
    dicts: [],
    value: undefined,
    isFirst: true,
    firstSelected: true,
  };

  componentDidMount() {
    this.loadSelect();
  }

  getData() {
    const { dicts } = this.state;
    return this.getOption(dicts);
  }

  getOption = list => {
    this.props.getOptionList && this.props.getOptionList(list)
    return this.getOptionList(list);
  };

  loadSelect = () => {
    const { content, onSelect } = this.props;
    const { firstSelected } = this.state;
    const params = this.getParams ? this.getParams() : {};
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
            this.setState({
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
        }).catch(function (ex) {
          // message.error('加载图片失败！');
        });
    }
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

  render() {
    const { content, style, showSearch, placeholder, mode, disabled } = this.props;
    const { value, isFirst } = this.state;

    let showValue;
    if (isFirst) {
      showValue = content;

    } else {
      showValue = value;
    }
    return (
      <Select
        disabled={disabled}
        showSearch={showSearch}
        optionFilterProp="children"
        placeholder={placeholder}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        defaultActiveFirstOption={false}
        style={{ width: '100%', height: '100%', ...style }}
        showArrow={false}
        value={showValue}
        mode={mode}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {this.getData()}
      </Select>
    );
  }


}

export default JewelrySelect;
