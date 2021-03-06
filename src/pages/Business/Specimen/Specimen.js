import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Divider,
  Breadcrumb,
  message,
  Drawer,
} from 'antd';
import { connect } from 'dva';

import business from '../business.less';
import specimen from './specimen.less';
import 'cropperjs/dist/cropper.css';
import HttpFetch from '../../../utils/HttpFetch';
import SpecimenDetaill from './SpecimenDetaill';
import TableSortView from '../../components/TableSortView';
import { getCurrentUser } from '../../../utils/authority';
import ProductSearchFrom from '../Product/components/ProductSearchFrom';
import JewelryTable from '../../components/JewelryTable';

const defaultPageSize = 10;

@Form.create()
@connect(({ specimen, loading }) => {
  return {
    body: specimen.body,
    productListloading: loading.effects['product/fetchListProduct'],
    productSaveloading: loading.effects['product/addProduct'],
    productUpdateloading: loading.effects['product/updateProduct'],
    productDeleteloading: loading.effects['product/deleteProduct'],
    productFreezeloading: loading.effects['product/freezeProduct'],
    queryProductLocking: loading.effects['product/queryProductLock'],
    updateProductUnLocking: loading.effects['product/updateProductUnLock'],
  };
})


class Specimen extends Component {


  productColumns = [

    {
      // title: <div className={product.row_normal2}>客户编号</div>,
      title: () => {
        return (
          <TableSortView
            column="流水号"
            field="product_no"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'productNo',
      key: 'productNo',
      width: 200,
    },
    {
      // title: <div className={product.row_normal2}>颜色</div>,
      title: () => {
        return (
          <TableSortView
            column="品牌"
            field="brand_no"
            className={specimen.row_normal2}
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'brandNo',
      key: 'brandNo',
      width: 100,
    },
    {
      // title: <div className={product.row_normal2}>颜色</div>,
      title: () => {
        return (
          <TableSortView
            column="类别"
            field="product_type_name"
            className={specimen.row_normal2}
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'productTypeName',
      key: 'productTypeName',
      width: 100,
    },
    {
      // title: <div className={product.row_normal2}>颜色</div>,
      title: () => {
        return (
          <TableSortView
            column="宝石颜色"
            field="gem_color_name"
            className={specimen.row_normal2}
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'gemColorName',
      key: 'gemColorName',
      width: 100,
    },
    {
      // title: <div className={product.row_normal2}>电镀颜色</div>,
      title: () => {
        return (
          <TableSortView
            column="电镀颜色"
            field="plating_color_name"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'platingColorName',
      key: 'platingColorName',
      width: 150,
    },
    {
      // title: <div className={product.row_normal2}>电镀颜色</div>,
      title: () => {
        return (
          <TableSortView
            column="中文名称"
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
      // title: <div className={product.row_normal2}>电镀颜色</div>,
      title: () => {
        return (
          <TableSortView
            column="英文名称"
            field="en_name"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'enName',
      key: 'enName',
      width: 100,
    },
    {
      // title: <div className={product.row_normal2}>电镀颜色</div>,
      title: () => {
        return (
          <TableSortView
            column="产品来源"
            field="source_of_product_name"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'sourceOfProductName',
      key: 'sourceOfProductName',
      width: 100,
    },
    {
      // title: <div className={product.row_normal2}>成色</div>,
      title: () => {
        return (
          <TableSortView
            column="成色"
            field="product_color_name"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'productColorName',
      key: 'productColorName',
      width: 100,
    },
    {
      // title: <div className={product.row_normal2}>成色</div>,
      title: () => {
        return (
          <TableSortView
            column="规格"
            field="specification"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'specification',
      key: 'specification',
      width: 100,
    },
    {
      // title: <div className={product.row_normal2}>颜色</div>,
      title: () => {
        return (
          <TableSortView
            column="计量单位"
            field="unit_of_measurement"
            className={specimen.row_normal2}
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'unitOfMeasurement',
      key: 'unitOfMeasurement',
      width: 100,
    },
    {
      // title: <div className={product.row_normal2}>颜色</div>,
      title: () => {
        return (
          <TableSortView
            column="重量单位"
            field="unit_of_weight"
            className={specimen.row_normal2}
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'unitOfWeight',
      key: 'unitOfWeight',
      width: 100,
    },
    {
      // title: <div className={product.row_normal2}>颜色</div>,
      title: () => {
        return (
          <TableSortView
            column="成品重量"
            field="finished_weight"
            className={specimen.row_normal2}
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'finishedWeight',
      key: 'finishedWeight',
      width: 100,
    },

    {
      // title: <div className={product.row_normal2}>客户编号</div>,
      title: () => {
        return (
          <TableSortView
            column="客户编号"
            field="customer_no"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'customerNo',
      key: 'customerNo',
      width: 100,
    },
    {
      // title: <div className={product.row_normal2}>客户编号</div>,
      title: () => {
        return (
          <TableSortView
            column="客户简称"
            field="customer_shotName"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'customerShotName',
      key: 'customerShotName',
      width: 100,
    },
    {
      // title: <div className={product.row_normal2}>客户编号</div>,
      title: () => {
        return (
          <TableSortView
            column="客户货号"
            field="customer_product_no"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'customerProductNo',
      key: 'customerProductNo',
      width: 100,
    },

    {
      // title: <div className={product.row_normal2}>供应商编号</div>,
      title: () => {
        return (
          <TableSortView
            column="供应商编号"
            field="supplier_id"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'supplierId',
      key: 'supplierId',
      width: 100,
    },

    {
      // title: <div className={product.row_normal2}>供应商名称</div>,
      title: () => {
        return (
          <TableSortView
            column="供应商名称"
            field="supplier_product_no"
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'supplierProductNo',
      key: 'supplierProductNo',
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
    // window.onbeforeunload = () => {
    //   console.log('onbeforeunload ');
    //   const { showItem } = this.state;
    //   if (showItem) {
    //     // console.log('执行解锁3');

    //     this.updateProductLock(showItem);
    //   }
    // };
  };

  // router.replace('/business/client/emptyView');

  componentWillUnmount() {
    const { showItem } = this.state;
    if (showItem) {
      this.updateProductLock(showItem);
      // console.log('执行解锁2');
    }
  }



  getDetailInfow = () => {
    const { showItem, isProductUpdate, selectProductData } = this.state;

    // console.log(" detail product ",showItem)

    return <SpecimenDetaill
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
    />
      ;
  };


  onSelectRowClass = (record, index) => {

    let color;

    if (index % 2 === 0) {
      if (record.bomStatus === '2' && record.turnProductStatus === '0')
        color = specimen.row_normal_red;
      else
        color = specimen.row_normal;
    } else {
      if (record.bomStatus === '2' && record.turnProductStatus === '0')
        color = specimen.row_normal2_red;
      else
        color = specimen.row_normal2;
    }
    return color;
  };

  sortFilter = (field, sort) => {
    const { productSorts } = this.state;

    console.log('contactsSortFilter ', field, sort, productSorts);
    let newContacts = [...productSorts];
    const findColumn = newContacts.find(item => item.field === field);

    console.log('sort find ', findColumn);

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

    const params = { status:0,...searchProductParams };
    params.current = productPage;
    params.size = defaultPageSize;

    if (this.state.productSorts.length > 0) {
      let orderByAsc;
      let orderByDesc;
      this.state.productSorts.forEach(v => {
        if (v.sort === 'ascend') {
          if (orderByAsc) {
            orderByAsc += `,${v.field}`;
          } else {
            orderByAsc = v.field;
          }
        } else if (v.sort === 'descend') {
          if (orderByDesc)
            orderByDesc += `,${v.field}`;
          else
            orderByDesc = v.field;
        }
      })
      if (orderByAsc)
        params.orderByAsc = orderByAsc;

      if (orderByDesc)
        params.orderByDesc = orderByDesc;
    }



    const { dispatch } = this.props;
    dispatch({
      type: 'specimen/fetchListSpecimen',
      payload: { ...params },
    });
  };


  handleSpecimenSearch = (productParams) => {

    // data.typeId = showItem.id;
    this.state.searchProductParams = { ...productParams };

    this.state.current = 1;

    this.loadProduct()



  }

  handleSpecimenFormReset = () => {
    this.state.searchProductParams = {};
    this.setState({
      searchProductParams: {}
    })

  }

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
    fetch(HttpFetch.querySpecimenList, {
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
        const { head } = d;

        const isProductUpdate = head.rtnCode === '000000';

        if (!isProductUpdate) {
          message.error(head.rtnMsg);
        }

        _this.setState({
          isProductUpdate,
        });
      })
      .catch(function (ex) {
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
        type: 'specimen/updateSpecimenUnLock',
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
            <Col lg={rightlg} md={24}>
              <Card bordered={false} className={business.left_content} loading={false}>
                <div style={{ marginBottom: 16 }} />
                <ProductSearchFrom
                  onSearch={this.handleSpecimenSearch}
                  onCustomerReset={this.handleSpecimenFormReset}
                />
                <JewelryTable
                  scroll={{ x: 1200 }}
                  onSelectItem={(item, rows) => {
                    const { showItem } = this.state;
                    if (showItem && showItem.id !== item.id) {
                      // console.log("两个选中的对象 :",item.id,showItem.id)
                      // this.updateProductLock(showItem);
                      // console.log('执行解锁 ： ',showItem.id);
                    }

                    if (item) {
                      if (!showItem || showItem.id !== item.id){}
                        // this.fetchImages(item);
                        // this.loadProductLock(item);
                    }
                    this.state.showItem = item ? { ...item } : false
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

}

export default Specimen;
