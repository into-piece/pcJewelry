import React, { Component } from 'react';
import { Card, Row, Col, Form, Breadcrumb, message, Drawer,Select,Input } from 'antd';
import { connect } from 'dva';

import business from '../business.less';
import product from './product.less';
import SearchForm from '@/components/SearchForm';
import ProductDetail from './ProductDetail';
import TableSortView from '../../components/TableSortView';
import Table from '@/components/Table';

const defaultPageSize = 10;
const { Option } = Select;

export const dieSet = [
  { 'key': '产品编号', 'value': 'productNo'  },
  { 'key': '成色', 'value': 'purity', 'type': 2,  },
  { 'key': '产品类别', 'value': 'productType', 'type': 2},
];

// 报价主页的筛选参数
const searchParamsArr = [
  { key: '产品编号', value: 'productNo'}, //
  { key: '货号', value: 'customerProductNo' },
  { key: '产品类别', value: 'productType', type: 2, list: 'productType',}, //
  { key: '颜色', value: 'gemColor', type: 2 , list: 'gemColor'},
  { key: '成色', value: 'productColor', type: 2 , 'list': 'productColor'}, //
  { key: '电镀颜色', value: 'platingColor', type: 2 ,list:'platingColor'},
  { key: '客户编号', value: 'customerId', type: 2,list:'customerId'},
  { key: '供应商编号', value: 'supplierId' },
];

@Form.create()
@connect(({ product, loading }) => {
  const { rtnCode, rtnMsg } = product;
  return {
    product,
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
    brand: product.brand,
    productType: product.productType, // 类别
    productColor: product.productColor,
    gemColor: product.gemColor,
    platingColor: product.platingColor,
    customerId: product.customerId,
    sourceOfProduct: product.sourceOfProduct,
    unitOfMeasurement: product.unitOfMeasurement,
    unitOfWeight: product.unitOfWeight,
    finishedWeight: product.finishedWeight,
    mouldNo: product.mouldNo,
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
        clearSelect={this.clearSelect}
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

  loadProduct = (param) => {
    const {searchParams} = this.props
    const { productPage, searchProductParams } = this.state;
    // let params = { current: productPage, size: defaultPageSize };
    const params = {status:0, ...searchProductParams,...searchParams,...param };
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
    const pagination = { ...this.state.pagination };
    pagination.current = page.current;
    this.setState(
      {
        productPage: page.current,
        pagination,
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
    const showItem = (v&&v.length>0)?v[v.length-1]:false;
      this.setState({
        selectProductData: v,
        showItem,
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

  clearSelect =()=>{
    this.setState({
      showItem:false,
      choosenRowData:{},
      selectProductData: []
    })
  }

  // 根据btn点击 返回对应弹窗内容
  // type 2 下啦选择
  returnElement = ({ value, type, list,  data, disabled, isEdit, noedit }) => {
    switch (type) {
      case 2:
        return (
          <Select
            style={{ width: 180 }}
            placeholder="请选择"
            disabled={disabled || noedit && isEdit}
          >
            {data[list] &&
              data[list].map(({ value, key }) => (
                <Option value={value} key={value}>
                  {key}
                </Option>
              ))}
          </Select>
        );
      default:
        return (
          <Input
            style={{ width: '100' }}
            placeholder="请输入"
            onChange={v => {
              this.inputChange(v.target.value, value);
            }}
          />
        );
    }
    //  type === 7 ?
  };

  onSearch = v => {
    this.loadProduct(v);
  };

  changeSearchParams = v => {
    const { dispatch } = this.props;
    dispatch({
      type: `quote/changeState`,
      payload: {key:'searchParams', value:v},
    });
  };


  render() {
    const { 
      onSelectChange, 
      state, 
      props,
      changeChoosenRow,
      onSearch,
      returnElement,
      changeSearchParams
    } = this;
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
    const { 
      product,
      queryProductLocking, 
      body = {},
      brand,
      productType, // 类别
      productColor,
      gemColor,
      platingColor,
      customerId,
      sourceOfProduct,
      unitOfMeasurement,
      unitOfWeight,
      finishedWeight,
      mouldNo
    } = props;
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
                <SearchForm
                  data={searchParamsArr}
                  source={{
                    brand,
                    productType, // 类别
                    productColor,
                    gemColor,
                    platingColor,
                    customerId,
                    sourceOfProduct,
                    unitOfMeasurement,
                    unitOfWeight,
                    finishedWeight,
                    mouldNo
                  }}
                  onSearch={onSearch}
                  returnElement={returnElement}
                  onchange={changeSearchParams}
                  needStatus
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
