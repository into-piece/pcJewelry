import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Spin, Select } from 'antd';
import querystring from 'querystring';

import JewelrySelect from '../../../components/JewelrySelect';
import HttpFetch from '../../../../utils/HttpFetch';

const { Option } = Select;


class ProductTypeSelect extends JewelrySelect {
  getParams=()=>{
    return {bType:"H015002"}
  }

  getUrl=()=>{
    return HttpFetch.queryproductDropDown2;
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
      <Option key={item.id} value={item.id}>
        {item.zhName}
      </Option>
    ));
  }



}

export default ProductTypeSelect;
