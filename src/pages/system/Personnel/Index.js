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


import business from '../../dev/business.less';
import product from './Index.less';
import JewelryTable from '../../components/JewelryTable';
import ProductSearchFrom from './components/ProductSearchFrom';
import 'cropperjs/dist/cropper.css';
import HttpFetch from '../../../utils/HttpFetch';
import IndexDetail from './IndexDetail';
import TableSortView from '../../components/TableSortView';
import { getCurrentUser } from '../../../utils/authority';


const defaultPageSize = 10;

@Form.create()
@connect(({ product, loading }) => {
  const { rtnCode, rtnMsg } = product;
  return {
    body: product.body,
    rtnCode,
    rtnMsg,
  };
})


class Index extends Component {


  productColumns = [

    {
      title: () => {
        return (
          <TableSortView
            column="姓名"
            field="name"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'name',
      key: 'name',
      width: 80,
    },

    {
      title: () => {
        return (
          <TableSortView
            column="性别"
            field="sex"
            className={product.row_normal2}
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'sex',
      key: 'sex',
      width: 100,
    },
    {
      title: () => {
        return (
          <TableSortView
            column="部门"
            field="short_name"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'shortName',
      key: 'shortName',
      width: 100,
    },
    {
      title: () => {
        return (
          <TableSortView
            column="部门编号"
            field="zh_name"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'zhName',
      key: 'zhName',
      width: 100,
    },


    {
      title: () => {
        return (
          <TableSortView
            column="出生日期"
            field="en_name"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'en_name',
      key: 'en_name',
      width: 100,
    },

    {
      title: () => {
        return (
          <TableSortView
            column="家庭地址"
            field="remarks"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'remarks',
      key: 'remarks',
      width: 100,
    },
    {
      title: () => {
        return (
          <TableSortView
            column="身份证"
            field="status"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },   {
      title: () => {
        return (
          <TableSortView
            column="入职日期"
            field="status"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },   {
      title: () => {
        return (
          <TableSortView
            column="过期日期"
            field="status"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'status',
      key: 'status',
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
    window.onbeforeunload = () => {
      console.log('onbeforeunload ');
      const { showItem } = this.state;
      if (showItem) {
        // console.log('执行解锁3');

        this.updateProductLock(showItem);
      }
    };
  }
  ;

  // router.replace('/business/client/emptyView');

  componentWillUnmount() {
    const { showItem } = this.state;
    if (showItem) {
      this.updateProductLock(showItem);
      // console.log('执行解锁2');
    }
  }

  render() {
    const { leftlg, rightlg, drawVisible, visible, update, isLoad } = this.state;
    const modalFooter = { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const {
      queryProductLocking,
      body = {},
    } = this.props;


    if (isLoad) {
      this.state.isLoadList = true;
    } else if (this.state.isLoadList) {

        this.refs.productTable.updateSelectDatas(body);
        this.state.isLoadList = false;
      }


    // console.log("bod ",body.data)

    return (
      <div className={business.page}>
        <div className={business.nav}>
          <Breadcrumb style={{ display: 'none' }}>
            <Breadcrumb.Item>主页</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">业务</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="#/business/product">产品信息</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={business.center_content}>
          <Row gutter={24}>
            <Col lg={rightlg} md={24} style={{overflow:'auto'}}>
              <Card bordered={false} loading={false}>
                <div style={{ marginBottom: 16 }} />
                <ProductSearchFrom
                  onSearch={this.handleProductSearch}
                  onCustomerReset={this.handleProductFormReset}
                />
                <JewelryTable
                  scroll={{x:1200}}
                  onSelectItem={(item, rows) => {
                    const { showItem } = this.state;
                    if (showItem && showItem.id !== item.id) {
                      // console.log("两个选中的对象 :",item.id,showItem.id)
                      this.updateProductLock(showItem);
                      // console.log('执行解锁 ： ',showItem.id);
                    }

                    if (item) {
                      if (!showItem || showItem.id !== item.id)
                      // this.fetchImages(item);
                        this.loadProductLock(item);
                    }
                    this.state.showItem = item ? { ...item } : false;
                    this.setState({
                      showItem: this.state.showItem,
                      selectProductData: [...rows],
                    });
                  }}
                  ref="productTable"
                  loading={isLoad}// productListloading || isUpdate
                  columns={this.productColumns}
                  className={business.small_table}
                  rowClassName={this.onSelectRowClass}
                  // scroll={{ y: 300 }}
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
      key="556"
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
      type: 'product/fetchListProduct',
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


  /**
   * 获取锁定状态
   * @param item
   */
  loadProductLock = (item) => {
    // console.log(' 查询锁定对象为 :', item.id);
    const _this = this;
    const params = {};
    params.id = item.id;
    params.dataNo = item.markingNo;
    fetch(HttpFetch.queryProductLock, {
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
        const {head} = d;

        const isProductUpdate = head.rtnCode === '000000';

        if (!isProductUpdate) {
          message.error(head.rtnMsg);
        }

        _this.setState({
          isProductUpdate,
        });
      })
      .catch(function(ex) {
        // message.error('加载图片失败！');
        _this.setState({
          loading: false,
        });
      });

  };


  /** *
   * 解锁
   * @param item
   */
  updateProductLock = (item) => {
    const { dispatch } = this.props;
    const { isProductUpdate } = this.state;
    if (isProductUpdate)
      dispatch({
        type: 'product/updateProductUnLock',
        payload: { id: item.id },
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
