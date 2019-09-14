import React, { Component } from 'react';
import {
  Card,
  Form,
  Button,
  Divider,  Tree, Modal, message, Spin,
} from 'antd';

import business from '@/pages/dev/business.less';
import baseStyles from '@/pages/Business/Client/base.less';
import styles from './Index.less';
import 'cropperjs/dist/cropper.css';
import HttpFetch from '@/utils/HttpFetch';
import { connect } from 'dva';
import { getCurrentUser } from '@/utils/authority';


const { TreeNode } = Tree;

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    selectable:false,
    disableCheckbox: true,
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];



@connect(({ product, loading }) => {
  const { rtnCode, rtnMsg } = product;
  return {
    body: product.body,
    rtnCode,
    rtnMsg,
  };
})
@Form.create()
class IndexDetail extends Component {


  centerFormLayout = {
    labelCol: { span: 12 },
    wrapperCol: {
      span: 24,
    },
  };


  carouselsettings = {
    speed: 150,
    initialSlide: 0, // 修改组件初始化时的initialSlide 为你想要的值
  };

  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],


      drawVisible: false,
      visible: false,
      isEdit: true,
      imageObject: [],
      cNoBrandNo: '',
      cNofCode: '',
      cNofCodezhName: '',
      cNoUnitCode: '',
      cNoColorCode: '',
      productNo: '',
      cNoCustomerCombine: '',
      customerShotName: '',
      cNoenNameUniCode: '',
      cNozhNameUniCode: '',
      cNomainMold: '',
      cNoPercentageEnName: '',
      cNoPercentageZhName: '',
      isLoad: false,
      isLoadImage: true,
      productParams: {},
      isEditItem: false,
    };
  }


  componentDidMount() {
    // const { item } = this.props;
    // if (item)
    //   this.fetchImages(item);
  }

  render() {

    const {
      productListloading,
      productUpdateloading,
      productSaveloading,
      productFreezeloading,
      productUnFreezeloading,
      productDeleteloading,
      queryProductLocking,
      body = {},
      isloading,
      refarshList,
      isLoad,
      item,
    } = this.props;

    const { update, productParams } = this.state;

    // (item)


    const isUpdate =
      productUpdateloading || productSaveloading || productFreezeloading || productDeleteloading || productUnFreezeloading;

    if (isUpdate) {
      this.state.update = true;
      if (productUpdateloading || productSaveloading) {
        this.state.isUpdateFrom = true;
      }
    } else if (update) {
        if (body.rtnCode === '000000') {
          this.state.requestState = 'success';
          message.success(body.rtnMsg);
        } else {
          message.error(body.rtnMsg);
          this.state.requestState = 'error';
        }

        this.productRefresh();
        // this.handleUpdateImage(productParams)
        this.state.update = false;
        if (this.state.isUpdateFrom) {
          this.state.isUpdateFrom = false;
        }

        if (refarshList)
          refarshList();


      }


    const updat = isUpdate || productListloading;
    if (updat !== this.state.isLoad) {
      if (isloading)
        isloading(updat);
      this.state.isLoad = updat;
    }

    // if(this.state.isLoadImage&&item) {
    //   this.fetchImages(item);
    //   this.state.isLoadImage = false;
    // }

    return this.getDetailInfo();
  }

  resetParse = () => {
    this.setState({
      cNoBrandNo: '',
      cNofCode: '',
      cNofCodezhName: '',
      cNoUnitCode: '',
      cNoColorCode: '',
      productNo: '',
      cNoCustomerCombine: '',
      customerShotName: '',
      cNoenNameUniCode: '',
      cNozhNameUniCode: '',
      cNomainMold: '',
      cNoPercentageEnName: '',
      cNoPercentageZhName: '',
    });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    // const { item } =this.props;
    // const {visible} = this.state;

    const { item } = nextProps;
    const { showItem } = this.state;


    // console.log("componentWillReceiveProps :",item)


    if (item && (!showItem || item.id !== showItem.id)) {
      this.state.showItem = item;
      this.productRefresh();
    }

    if (!item) {
      this.state.showItem = false;
      this.setState({
        showItem: false,
      });
    }

    // console.log(" component Props ",item)
  }


  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }


// 树节点选择出发

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  // 渲染树节点
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={item.title}
            key={item.key}
            disableCheckbox={item.disableCheckbox}
            selectable={item.selectable}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode
        key={item.key}
        {...item}
      />;
    });

  getDetailInfo = () => {
    const { imageObject, drawVisible, visible, showItem, isLoading } = this.state;
    const { isProductUpdate } = this.props;
    const modalFooter = { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };


    let paths = [];

    if (imageObject.length > 0) {
      paths = imageObject.map(v => {
        return v.path;
      });
    }

    // console.log(" fetch isload ",showItem)
    // console.log(" data status ",showItem?showItem.status:'nudefine')

    if (!paths) paths = [];

    return (<div className={business.right_info}>
      <div className={business.list_info}>

        <span className={business.title_info} onClick={this.clickToggleDrawer}>
            权限信息
        </span>
        <Divider className={business.divder} />

        <div className={baseStyles.content}>
          <div className={baseStyles.right_info}>
            {(showItem && showItem !== '') ? (
              <div>
                <Spin spinning={isLoading}>
                  {/* 权限树操作 */}
                  <Tree
                    checkable
                    defaultExpandAll
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                  >
                    {this.renderTreeNodes(treeData)}
                  </Tree>
                </Spin>
              </div>
            ) : (
              <div />
            )}
          </div>

          <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <Button
                  type="danger"
                  icon="delete"
                  className={business.buttomControl}
                  size="small"
                  onClick={this.handleDeleteProduct}
                  disabled={!showItem || showItem === '' || !isProductUpdate || showItem.status === '2'}
                >
                  禁用/启用
                </Button>
                <Button
                  type="primary"
                  size="small"
                  className={business.buttomControl}
                  icon="edit"
                  disabled={!showItem || showItem === '' || !isProductUpdate || showItem.status === '2'}
                  onClick={this.handleEditProduct}
                >
                  保存
                </Button>

              </div>

            </div>

          </Card>
        </div>

      </div>

    </div>);


  };

  handleSubmit = () => {

    const { dispatch, form } = this.props;
    const { isAdd, fileList, showItem } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      const params = {};
      params.product = { ...fieldsValue };

      const urls = fileList.map(v => v.url);
      const names = fileList.map(v => v.name);
      params.imgStr = urls;
      // params.imgStr = this.state.urls;
      params.fileName = names;
      // params.productId = item.productNo;
      // params.product = item;
      if (isAdd) {
        dispatch({
          type: 'product/addProduct',
          payload: {
            ...params,
          },
        });
        // todo

        this.setState({
          isEdit: true,
          update: true,
        });
      } else {
        params.product.id = showItem.id;
        params.product.version = showItem.version;
        dispatch({
          type: 'product/updateProduct',
          payload: {
            ...params,
          },
        });
      }

      this.setState({
        visible: false,
        productParams: params,
      });
    });


  };


  productRefresh = () => {

    const item = this.state.showItem;

    const {isEditItem} = this.state;

    if (!item.id) return;

    const _this = this;
    _this.setState({
      isLoading: true,
    });


    const params = {};
    params.id = item.id;


    fetch(HttpFetch.queryProductList, {
      method: 'POST',
      credentials: 'include',
headers: {
        'Content-Type': 'application/json',
        'token': getCurrentUser()?getCurrentUser().token:'',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const {head} = d;
        const {body} = d;
        let showItem = false;
        if (body.records.length > 0) {
          showItem = body.records[0];


          const current = isEditItem ? { ...showItem } : this.state.current;

          // console.log(" cur is ",current,isEditItem)

          this.setState({
            showItem,
            current,
          });
          // console.log(" update data ",showItem)
        }
        this.fetchImages(showItem);

        _this.setState({
          isLoading: false,
        });


      })
      .catch(function(ex) {
        _this.setState({
          isLoading: false,
        });
      });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };




  handleUnFreezeProduct = () => {

    const { selectProductData = [] } = this.props;
    const ids = selectProductData.map(v => {
      return v.id;
    });

    // console.log(" freeze ",ids)

    const { dispatch } = this.props;
    const data = [];
    // data.push(selectedRowKeys);

    dispatch({
      type: 'product/unfreezeProduct',
      payload: { list: ids },
    });
  };

  handleFreezeProduct = () => {

    const { selectProductData = [] } = this.props;
    const ids = selectProductData.map(v => {
      return v.id;
    });

    // console.log(" freeze ",ids)

    const { dispatch } = this.props;
    // data.push(selectedRowKeys);

    dispatch({
      type: 'product/freezeProduct',
      payload: { list: ids },
    });
  };

  fetchImages = item => {
    const _this = this;
    const params = {};
    params.productId = item.id;
    fetch(HttpFetch.queryProductImage, {
      method: 'POST',
      credentials: 'include',
headers: {
        'Content-Type': 'application/json',
        'token': getCurrentUser()?getCurrentUser().token:'',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const {body} = d;
        if (body && body.records) {
          if (body.records.length > 0) {
            const imageObject = body.records;
            this.state.imageObject = imageObject;
            _this.setState({
              imageObject,
              loading: false,
            });
            return;
          }
        }
        _this.setState({
          loading: false,
          imageObject: [],
        });
      })
      .catch(function(ex) {
        console.log('parsing failed', ex);
        _this.setState({
          loading: false,
        });
      });
    // }
  };



}

export default IndexDetail;
