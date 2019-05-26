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
  List,
  Divider,
} from 'antd';
import styles from './ClientInfo.less';
import DescriptionList from '@/components/DescriptionList';
const { Description } = DescriptionList;
const productColumn =[
  {
    title: '产品编号',
    dataIndex: 'code',
    key: 'code',
    render: (text, row, index) => {
        return text;
    },

  },
  {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '客户代号',
    dataIndex: 'client',
    key: 'client',
  },

];

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
   ];

class Product extends PureComponent {


  constructor(props) {
    super(props);

  }


  componentWillMount() {



  }

  render() {
    return (<div className={styles.content}>

      <DescriptionList size='small' col='2'>
        <Description size="small" term='产品序列编号'>SER8009A</Description>
        <Description size="small" term='产品系列名称'>A系列</Description>
        <Description size="small" term='产品报价系数'>98%</Description>
      </DescriptionList>
      <List
        loading={false}
        dataSource={listdata}
        className={styles.product_list}
        renderItem={this.getListItem}
        size="small"
        bordered={false}
        split={true}

      />

    </div>);
  }


  getListItem=(item)=>{

   const products =[];
   let product =[];
   const productData =[{
    code:'gsb-0003AG92',
    name:'925 银 白色 套装',
    client:'YY4380',
   },{
     code:'gsb-0003AG92',
     name:'925 银 白色 套装',
     client:'YY4380',
   },{
     code:'gsb-0003AG92',
     name:'925 银 白色 套装',
     client:'YY4380',
   }];


    // if (products.length) {
    //   let num = 0;
    //   let amount = 0;
    //   productData.forEach(item => {
    //     num += Number(item.num);
    //     amount += Number(item.amount);
    //   });
    const client = 3;
      product = productData.concat({
        code:'总计',
        client
      });
    // }




    return ( <Table
      style={{ marginBottom: 5 }}
      pagination={false}
      loading={false}
      dataSource={product}
      columns={productColumn}
      rowKey="id"
    />);

  }


}

export default Product;
