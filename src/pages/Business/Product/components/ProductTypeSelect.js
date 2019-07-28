import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Spin, Select } from 'antd';
import querystring from 'querystring';

const { Option } = Select;

import JewelrySelect from '../../../components/JewelrySelect';
import HttpFetch from '../../../../utils/HttpFetch';


class ProductTypeSelect extends JewelrySelect {

  getUrl=()=>{
    return HttpFetch.queryproductDropDown;
  }

  getOptionList =(list)=>{
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }

    return list.map(item => (
      // const str = item.name+'/'+item.namePinyin+"/"+item.nameEn
      <Option key={item.fCode} value={item.id}>
        {item.zhName}
      </Option>
    ));
  }



}

export default ProductTypeSelect;
