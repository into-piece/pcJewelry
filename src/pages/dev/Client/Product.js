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
  Breadcrumb,
  Modal,
  Divider,
  List,
  Upload,
  message,
} from 'antd';
import { connect } from 'dva';
import business from '../business.less';
import listStyles from './TableList.less';

import styles from './base.less';
import DescriptionList from '@/components/DescriptionList';
import clientStyle from './Client.less';

const FormItem = Form.Item;
const { TextArea } = Input;

const { Description } = DescriptionList;

const productColumn = [
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

const listdata = [
  {
    code: '8009',
    clientName: 'App',
    country: 'Thailand',
  },
  {
    code: '8009',
    clientName: 'App',
    country: 'Thailand',
  },
];

// @connect(({ loading, product }) => {
//   return {
//     body: product.body,
//     productListloading: loading.effects['product/fetchListProduct'],
//     productSaveloading: loading.effects['product/addProduct'],
//     productUpdateloading: loading.effects['product/updateProduct'],
//     productDeleteloading: loading.effects['product/deleteProduct'],
//     productFreezeloading: loading.effects['product/freezeProduct'],
//     productSeriesListloading: loading.effects['product/fetchListProductSeries'],
//     productSeriesSaveloading: loading.effects['product/addProductSeries'],
//     productSeriesUpdateloading: loading.effects['product/updateProductSeries'],
//     productSeriesDeleteloading: loading.effects['product/deleteProductSeries'],
//     productSeriesFreezeloading: loading.effects['product/freezeProductSeries'],
//   };
// })
@Form.create()
class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isEdit: true,
      isAddEdit: true,
      isAdd: true,
      update: false,
      customerId: '',
      selectedItem: '',
    };
  }

  componentWillMount() {}

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.right_info}>
          {/* <DescriptionList size="small" col="2"> */}
          {/* <Description size="small" term="产品序列编号" /> */}
          {/* <Description size="small" term="产品系列名称"> */}
          {/* A系列 */}
          {/* </Description> */}
          {/* <Description size="small" term="产品报价系数"> */}
          {/* 98% */}
          {/* </Description> */}
          {/* </DescriptionList> */}
          {/* <List */}
          {/* loading={false} */}
          {/* dataSource={listdata} */}
          {/* className={styles.product_list} */}
          {/* renderItem={this.getListItem} */}
          {/* size="small" */}
          {/* bordered={false} */}
          {/* split={true} */}
          {/* /> */}
        </div>
        <Card
          bodyStyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}
          className={styles.cardconrtll}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button className={clientStyle.buttomControl} type="primary" icon="plus" size="small">
                新增
              </Button>
              <Button
                className={clientStyle.buttomControl}
                type="danger"
                icon="delete"
                size="small"
              >
                删除
              </Button>
              <Button className={clientStyle.buttomControl} type="primary" size="small" icon="edit">
                编辑
              </Button>
              <Button className={clientStyle.buttomControl} size="small" type="primary" icon="lock">
                审批
              </Button>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 10,
              }}
            >
              <Button className={clientStyle.buttomControl} type="primary" size="small" icon="copy">
                复制
              </Button>
              <Button
                className={clientStyle.buttomControl}
                size="small"
                type="primary"
                icon="rollback"
              >
                撤销
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  getContantItem = item => {
    /**
     "brand": "98",
     "createTime": 1559488525000,
     "createUser": "zengwl",
     "custoerProductNo": "345r3454",
     "customerId": "310a8afcf3bfcd91c610a6080c97f969",
     "delFlag": "0",
     "enName": "334554t",
     "finishedWeight": "32",
     "gemColor": "234243",
     "id": "10650295ea9be19c8a285bdac62663d9",
     "marks": "3434",
     "modifier": "",
     "mouldNo": "34r34r43",
     "mtime": 1559490948000,
     "platingColor": "3r34r43",
     "productColor": "2323",
     "productDesc": 32000,
     "productLineId": "43884fce29199bfad9085019e1ddc2f1",
     "productNo": "B33344",
     "productType": "34r4r",
     "sourceOfProduct": "322err2e2",
     "specification": "345435",
     "status": "0",
     "supplierId": "23434",
     "supplierProductNo": "3243",
     "unitOfMeasurement": "3453",
     "unitOfWeight": "11",
     "zhName": "345435"
     */

    return (
      <div>
        <DescriptionList size="small" col="2">
          <Description size="small" term="产品序列编号">
            {item.productNo}
          </Description>
          <Description size="small" term="产品系列名称">
            {item.productNo}
          </Description>
          <Description size="small" term="产品报价系数">
            {item.productNo}%
          </Description>
        </DescriptionList>
        <List
          loading={false}
          dataSource={listdata}
          className={styles.product_list}
          renderItem={this.getListItem}
          size="small"
          bordered={false}
          split
        />
      </div>
    );
  };

  getListItem = item => {
    const products = [];
    let product = [];
    const productData = [
      {
        code: 'gsb-0003AG92',
        name: '925 银 白色 套装',
        client: 'YY4380',
      },
      {
        code: 'gsb-0003AG92',
        name: '925 银 白色 套装',
        client: 'YY4380',
      },
      {
        code: 'gsb-0003AG92',
        name: '925 银 白色 套装',
        client: 'YY4380',
      },
    ];

    // if (products.length) {
    //   let num = 0;
    //   let amount = 0;
    //   productData.forEach(item => {
    //     num += Number(item.num);
    //     amount += Number(item.amount);
    //   });
    const client = 3;
    product = productData.concat({
      code: '总计',
      client,
    });
    // }

    return (
      <Table
        style={{ marginBottom: 5 }}
        pagination={false}
        loading={false}
        dataSource={product}
        columns={productColumn}
        rowKey="id"
      />
    );
  };
}

export default Product;
