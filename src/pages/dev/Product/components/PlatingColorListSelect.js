import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Spin, Select } from 'antd';
import querystring from 'querystring';

const { Option } = Select;

import HttpFetch from '../../../../utils/HttpFetch';
import JewelrySelect from '../../../components/JewelrySelect';

class PlatingColorListSelect extends JewelrySelect {
  getUrl = () => {
    return HttpFetch.queryPlatingColor;
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
      <Option key={item.zhName} value={item.id}>
        {item.zhName}
      </Option>
    ));
  };
}

export default PlatingColorListSelect;
