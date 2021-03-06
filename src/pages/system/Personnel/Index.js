import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Breadcrumb,
  message,
  Drawer,
} from 'antd';
import { connect } from 'dva';

import { statusConvert, YoNConvert, genderConvert } from '@/utils/convert';

import business from '../../dev/business.less';
import product from './Index.less';
import JewelryTable from '../../components/JewelryTable';
import SearchFrom from './components/SearchFrom';
import 'cropperjs/dist/cropper.css';
import IndexDetail from './IndexDetail';
import TableSortView from '../../components/TableSortView';
import { getCurrentUser } from '../../../utils/authority';


const defaultPageSize = 10;

@Form.create()
@connect(({ person, loading }) => {
  const { rtnCode, rtnMsg } = person;
  return {
    body: person.body,
    rtnCode,
    rtnMsg,
  };
})


class Index extends Component {


  personColumns = [

    {
      title: () => {
        return (
          <TableSortView
            column="姓名"
            field="zhName"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'zhName',
      key: 'zhName',
      width: 80,
    },

    {
      title: () => {
        return (
          <TableSortView
            column="性别"
            field="gender"
            className={product.row_normal2}
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'genderVar',
      key: 'genderVar',
      width: 100,
    },
    {
      title: () => {
        return (
          <TableSortView
            column="部门"
            field="deptName"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'deptName',
      key: 'deptName',
      width: 100,
    },


    {
      title: () => {
        return (
          <TableSortView
            column="出生日期"
            field="birthdate"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'birthdate',
      key: 'birthdate',
      width: 100,
    },

    {
      title: () => {
        return (
          <TableSortView
            column="家庭地址"
            field="address"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'address',
      key: 'address',
      width: 100,
    },
    {
      title: () => {
        return (
          <TableSortView
            column="身份证"
            field="idCard"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'idCard',
      key: 'idCard',
      width: 100,
    }, {
      title: () => {
        return (
          <TableSortView
            column="入职日期"
            field="hiredate"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'hiredate',
      key: 'hiredate',
      width: 100,
    }, {
      title: () => {
        return (
          <TableSortView
            column="过期日期"
            field="indate"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'indate',
      key: 'indate',
      width: 100,
    }, {
      title: () => {
        return (
          <TableSortView
            column="状态"
            field="status"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'statusVar',
      key: 'statusVar',
      width: 100,
    },
  ];


  constructor(props) {
    super(props);
    this.state = {
      rightlg: 16,
      leftlg: 8,
      drawVisible: false,
      isEdit: true,
      visible: false,
      cropperVisible: false,
      pageCurrent: 1,
      selectProductItem: {},
      selectProductData: [],
      isProductUpdate: true,
      productPage: 1,
      isLoad: false,
      productSorts: [],
      searchProductParams: {},
    };
  }

  centerFormLayout = {
    labelCol: { span: 12 },
    wrapperCol: {
      span: 24,
    },
  };


  componentDidMount() {
    this.loadProduct();

  }
  ;

  // router.replace('/business/client/emptyView');

  componentWillUnmount() {

  }

  render() {
    const { leftlg, rightlg, drawVisible,showItem, visible, update, isLoad } = this.state;

    const {
      body = {},
    } = this.props;

    if (body.records) {
      body.records.map(v => {
        const s = v.status;
        v.statusVar = statusConvert[s];
        v.genderVar = genderConvert[v.gender];
        v.marriageVar = YoNConvert[v.marriage];
        v.isSleepOutVar = YoNConvert[v.isSleepOut];
        v.isDineInVar = YoNConvert[v.isDineIn];
        return v;
      });
    }
    if (isLoad) {
      this.state.isLoadList = true;
    } else if (this.state.isLoadList) {
      this.refs.personTable.updateSelectDatas(body);
      if(showItem){
        let  select =    body.records.filter(e=>e.id===showItem.id);
        select = select.length>0 ?select[0]:undefined;

        this.state.showItem = select;
      }

      this.state.isLoadList = false;
    }



    return (
      <div className={business.page}>
        <div className={business.nav}>
          <Breadcrumb style={{ display: 'none' }}>
            <Breadcrumb.Item>主页</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">业务</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="#/business/product">员工信息</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={business.center_content}>
          <Row gutter={24}>
            <Col lg={rightlg} md={24} style={{ overflow: 'auto' }}>
              <Card bordered={false} loading={false} className={business.left_content}>
                <div style={{ marginBottom: 16 }} />
                <SearchFrom
                  onSearch={this.handleProductSearch}
                  onCustomerReset={this.handleProductFormReset}
                />
                <JewelryTable
                  scroll={{ x: 1200 }}
                  onSelectItem={(item, rows) => {
                    console.log(item, rows);
                    const { showItem } = this.state;
                    this.state.showItem = item ? { ...item } : false;
                    this.setState({
                      showItem: this.state.showItem,
                      selectProductData: [...rows],
                    });
                  }}
                  ref="personTable"
                  loading={isLoad}// productListloading || isUpdate
                  columns={this.personColumns}
                  className={business.small_table}
                  rowClassName={this.onSelectRowClass}
                  body={body}
                  pageChange={this.pageProductChange}
                />


              </Card>
            </Col>
            <Col lg={leftlg} md={24}>
              {this.getDetailInfow()}
            </Col>
          </Row>
        </div>
        <Drawer width={720} onClose={this.onClose} visible={drawVisible}>
          {this.getDetailInfow()}
        </Drawer>


      </div>

    );
  }


  getDetailInfow = () => {
    const { showItem, isProductUpdate, selectProductData } = this.state;

    // console.log(" detail product ",showItem)

    return <IndexDetail
      item={showItem}
      isProductUpdate={isProductUpdate}
      selectProductData={selectProductData}
      isloading={(isLoad) => {
        this.setState({
          isLoad,
        });
      }}
      refarshList={() => {
        this.loadProduct();
      }}
    />;

  };


  onSelectRowClass = (record, index) => {
    let color = product.row_normal2;
    if (index % 2 == 0) {
      color = product.row_normal;
    }
    return color;
  };

  sortFilter = (field, sort) => {
    const { productSorts } = this.state;

    // console.log('contactsSortFilter ', field, sort, productSorts);
    let newContacts = [...productSorts];
    const findColumn = newContacts.find(item => item.field === field);

    // console.log('sort find ', findColumn);

    if (findColumn) {
      if (sort !== 'normal') {
        newContacts = newContacts.map(v => {
          if (v.field === field) {
            v.sort = sort;
          }
          return v;
        });

      } else {
        newContacts.splice(newContacts.findIndex(v => v.field === field), 1);
      }

    } else if (sort !== 'normal') {
      newContacts.push({
        field,
        sort,
      });
    }
    this.state.productSorts = newContacts;
    this.loadProduct();
  };

  loadProduct = () => {

    const { productPage, searchProductParams } = this.state;
    // let params = { current: productPage, size: defaultPageSize };

    const params = { ...searchProductParams };
    params.current = productPage;
    params.size = defaultPageSize;

    if (this.state.productSorts.length > 0) {
      let orderByAsc;
      let orderByDesc;
      this.state.productSorts.forEach(v => {
        if (v.sort === 'ascend') {
          if (orderByAsc) {
            orderByAsc += `,${  v.field}`;
          } else {
            orderByAsc = v.field;
          }
        } else if (v.sort === 'descend') {
          if (orderByDesc)
            orderByDesc += `,${  v.field}`;
          else
            orderByDesc = v.field;
        }
      });
      if (orderByAsc)
        params.orderByAsc = orderByAsc;

      if (orderByDesc)
        params.orderByDesc = orderByDesc;
    }


    const { dispatch } = this.props;
    dispatch({
      type: 'person/fetchListPerson',
      payload: { ...params },
    });
  };


  handleProductSearch = (productParams) => {

    // data.typeId = showItem.id;
    this.state.searchProductParams = { ...productParams };

    this.state.current = 1;

    this.loadProduct();

  };

  handleProductFormReset = () => {
    this.state.searchProductParams = {};
    this.setState({
      searchProductParams: {},
    });

  };


  pageProductChange = (page, pageSize) => {
    this.setState({
      productPage: page,
    });
    this.state.productPage = page;
    this.loadProduct();
  };

  clickToggleDrawer = () => {
    const { drawVisible } = this.state;

    if (!drawVisible) this.showDrawer();

  };

  showDrawer = () => {
    this.setState({
      drawVisible: true,
    });
  };


  onClose = () => {
    this.setState({
      drawVisible: false,
    });
  };


}

export default Index;
