import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Spin, Select } from 'antd';
import querystring from 'querystring';

import HttpFetch from '../../../../utils/HttpFetch';
import JewelrySelect from '../../../components/JewelrySelect';

const { Option } = Select;


class BrandListSelect extends JewelrySelect {


 getUrl=()=>{
   return HttpFetch.queryBrands;
 }

  getOptionList = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value="">
          没有找到选项
        </Option>
      );
    }

    return list.map(item => (
      // const str = item.name+'/'+item.namePinyin+"/"+item.nameEn
      <Option key={item.brandNo} value={item.id}>
        {item.brandZhName}
      </Option>
    ));
  };

}

export default BrandListSelect;
