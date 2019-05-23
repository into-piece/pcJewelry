import React, { PureComponent } from 'react';

import {
  Card,
  Row,
  Col,
  Table,
  Icon,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Tabs,
  Radio,
  Button,
  Input,
  Divider,
  List,
} from 'antd';
import styles from './ClientInfo.less';

import DescriptionList from '@/components/DescriptionList';

const { Description } = DescriptionList;
const listdata = [{

  code: '8009',
  clientName:'App',
  country:'Thailand'

} ,
  {

    code: '8009',
    clientName:'App',
    country:'Thailand'

  },
  {

    code: '8009',
    clientName:'App',
    country:'Thailand'

  } ];

class TerminalClient extends PureComponent {


  componentWillMount() {

    console.log(Object.keys(this.props.location.query));

  }

  render() {
    return (<div className={styles.content}>

      <List
        loading={false}
        dataSource={listdata}
        renderItem={this.getContantItem}
        size="small"
        bordered={false}
        split={true}

      />

    </div>);
  }


  getContantItem = (item) => {
    return (
      <div>
        <DescriptionList size='small' col='2'>
          <Description size="small" term='客户编号'>8009</Description>
          <Description size="small" term='客户简称'>App</Description>
          <Description size="small" term='国别'>Thailand</Description>
          <Description term='城市'>Bangkok</Description>
          <Description term='英文名'>Jewelry Prncess</Description>
          <Description term='中文名'>陈先生</Description>
          <Description term='客户渠道'>展览会</Description>
        </DescriptionList>
        <DescriptionList size='small' col='1'>
          <Description term='英文地址'>53/11-12 Narathiwat Ratchanakharin Rd Thun Mahamek ,Sathorn 10120</Description>
        </DescriptionList>
        <DescriptionList size='small' col='2'>
          <Description term='电话'></Description>
          <Description term='公司网站'></Description>
          <Description term='结算币种'>USD</Description>
          <Description term='品质质量'></Description>
          <Description term='客户报价系数'>10%</Description>
          <Description term='送货方式'></Description>
          <Description term='预付款比例'>30%</Description>
          <Description term='备注'></Description>
        </DescriptionList>
        <Divider className={styles.divder}/>
      </div>
    );
  };

}

export default TerminalClient;
