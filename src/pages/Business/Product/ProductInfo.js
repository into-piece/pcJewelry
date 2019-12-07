import React, { Component } from 'react';
import { Card, Row, Col, Form, Breadcrumb, message, Drawer } from 'antd';
import { connect } from 'dva';

import business from '../business.less';
import product from './product.less';
import JewelryTable from '../../components/JewelryTable';
import ProductSearchFrom from './components/ProductSearchFrom';
import 'cropperjs/dist/cropper.css';
import HttpFetch from '../../../utils/HttpFetch';
import ProductDetail from './ProductDetail';
import TableSortView from '../../components/TableSortView';
import { getCurrentUser } from '../../../utils/authority';
import Table from '@/components/Table';

const defaultPageSize = 10;

@Form.create()
@connect(({ product, loading }) => {
  const { rtnCode, rtnMsg } = product;
  return {
    body: product.body,
    rtnCode,
    rtnMsg,
    productListloading: loading.effects['product/fetchListProduct'],
    productSaveloading: loading.effects['product/addProduct'],
    productUpdateloading: loading.effects['product/updateProduct'],
    productDeleteloading: loading.effects['product/deleteProduct'],
    productFreezeloading: loading.effects['product/freezeProduct'],
    queryProductLocking: loading.effects['product/queryProductLock'],
    updateProductUnLocking: loading.effects['product/updateProductUnLock'],
  };
})
class ProductInfo extends Component {
  state = {
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
    searchProductParams: {
      status: 0,
    },
    pagination: {
      current: 1,
      size: 10,
    },
    choosenRowData: {},
  };

  productColumns = [
    {
      // title: <div className={product.row_normal2}>客户编号</div>,
      title: () => {
        return <TableSortView column="产品编号" field="product_no" sortChange={this.sortFilter} />;
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
            column="颜色"
            field="gem_color_name"
            className={product.row_normal2}
            sortChange={this.sortFilter}
          />
        );
      },
      dataIndex: 'gemColorName',
      key: 'gemColorName',
      width: 100,
    },
    {
      // title: <div className={product.row_normal2}>成色</div>,
      title: () => {
        return (
          <TableSortView column="成色" field="product_color_name" sortChange={this.sortFilter} />
        );
      },
      dataIndex: 'productColorName',
      key: 'productColorName',
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
      // title: <div className={product.row_normal2}>客户编号</div>,
      title: () => {
        return <TableSortView column="客户编号" field="customer_no" sortChange={this.sortFilter} />;
      },
      dataIndex: 'customerNo',
      key: 'customerNo',
      width: 100,
    },

    {
      // title: <div className={product.row_normal2}>供应商编号</div>,
      title: () => {
        return (
          <TableSortView column="供应商编号" field="supplier_id" sortChange={this.sortFilter} />
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
    //   }
    // };
  }

  getDetailInfow = () => {
    const { showItem, isProductUpdate, selectProductData } = this.state;
    return (
      <ProductDetail
        item={showItem}
        isProductUpdate={isProductUpdate}
        selectProductData={selectProductData}
        key="556"
        isloading={isLoad => {
          this.setState({
            isLoad,
          });
        }}
        refarshList={() => {
          this.loadProduct();
        }}
      />
    );
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
        newContacts.splice(
          newContacts.findIndex(v => v.field === field),
          1
        );
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
            orderByAsc += `,${v.field}`;
          } else {
            orderByAsc = v.field;
          }
        } else if (v.sort === 'descend') {
          if (orderByDesc) orderByDesc += `,${v.field}`;
          else orderByDesc = v.field;
        }
      });
      if (orderByAsc) params.orderByAsc = orderByAsc;

      if (orderByDesc) params.orderByDesc = orderByDesc;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'product/fetchListProduct',
      payload: { ...params },
    });
  };

  handleProductSearch = productParams => {
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
    this.setState(
      {
        productPage: page,
      },
      () => {
        this.loadProduct();
      }
    );
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

  onSelectChange = v => {
    console.log(v);
    this.setState({
      selectProductData: v,
    });
  };

  // 选中某行表头
  changeChoosenRow = rowData => {
    // this.loadProductLock(rowData);
    this.setState({
      choosenRowData: rowData,
      showItem: rowData,
    });
  };

  render() {
    const { onSelectChange, state, props, changeChoosenRow } = this;
    const {
      leftlg,
      rightlg,
      drawVisible,
      visible,
      update,
      isLoad,
      pagination,
      selectProductData,
      choosenRowData,
    } = state;

    const modalFooter = { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };
    const { queryProductLocking, body = {} } = props;
    if (isLoad) {
      this.state.isLoadList = true;
    } else if (this.state.isLoadList) {
      // this.refs.productTable.updateSelectDatas(body);
      this.state.isLoadList = false;
    }

    return (
      <div className={business.page}>
        <div className={business.center_content}>
          <Row gutter={24}>
            <Col lg={rightlg} md={24}>
              <Card bordered={false} className={business.left_content} loading={false}>
                <ProductSearchFrom
                  onSearch={this.handleProductSearch}
                  onCustomerReset={this.handleProductFormReset}
                />

                <Table
                  columns={this.productColumns}
                  body={body}
                  changeChoosenRow={changeChoosenRow}
                  selectKey={choosenRowData.id}
                  pagination={pagination}
                  handleTableChange={this.pageProductChange}
                  selectedRowKeys={selectProductData}
                  onSelectChange={onSelectChange}
                  listLoading={isLoad}
                />

                {/* <JewelryTable
                  scroll={{ x: 1200 }}
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
                  loading={isLoad} // productListloading || isUpdate
                  columns={this.productColumns}
                  className={business.small_table}
                  rowClassName={this.onSelectRowClass}
                  // scroll={{ y: 300 }}
                  body={body}
                  pageChange={this.pageProductChange}
                /> */}
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

export default ProductInfo;
