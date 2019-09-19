import React, { Component } from 'react';
import {
  Card,
  Form,
  Button,
  Divider, Tree, message, Spin,
} from 'antd';

import business from '@/pages/dev/business.less';
import baseStyles from '@/pages/Business/Client/base.less';
import 'cropperjs/dist/cropper.css';
import HttpFetch from '@/utils/HttpFetch';
import { connect } from 'dva';
import { getCurrentUser } from '@/utils/authority';

import ModalConfirm from '@/utils/modal';

const { TreeNode } = Tree;


@connect(({ permission, loading }) => {
  const { rtnCode, rtnMsg } = permission;
  return {
    body: permission.body,
    treeData: permission.treeData,
    permissionData: permission.permissionData,
    fetchListPermissionUserLoading: loading.effects['permission/fetchListPermissionUser'],
    fetchUserPermissionLoading: loading.effects['permission/fetchUserPermission'],
    updatePermissionLoading: loading.effects['permission/updatePermission'],
    fetchPermissionTreeLoading: loading.effects['permission/fetchPermissionTree'],
    disableThePermissionLoading: loading.effects['permission/disableThePermission'],
    enableThePermissionLoading: loading.effects['permission/enableThePermission'],
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

  constructor(props) {
    super(props);
    this.state = {
      imageObject: [],
      isLoad: false,
      isEditItem: false,
    };
  }


  componentDidMount() {
    // const { item } = this.props;
    // if (item)
    //   this.fetchImages(item);
  }


  componentWillReceiveProps(nextProps, nextContext) {
    // const { item } =this.props;
    // const {visible} = this.state;

    const { item } = nextProps;
    const { showItem } = this.state;


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
  }


  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }


// 树节点选择出发

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/userpermission',
      payload: { permissionData: checkedKeys },
    });
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
    const { imageObject, showItem, isLoad } = this.state;
    const { isProductUpdate, treeData, permissionData, selectProductData } = this.props;


    let paths = [];

    if (imageObject.length > 0) {
      paths = imageObject.map(v => {
        return v.path;
      });
    }


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
                <Spin spinning={isLoad}>
                  {/* 权限树操作 */}
                  <Tree
                    checkable
                    defaultExpandAll
                    onCheck={this.onCheck}
                    checkedKeys={permissionData}
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
                  type="primary"
                  size="small"
                  className={business.buttomControl}
                  icon="edit"
                  disabled={!showItem || showItem === '' || !isProductUpdate || !selectProductData || selectProductData.length === 0}
                  onClick={this.handleSubmit}
                >
                  保存
                </Button>
                {(showItem && showItem.status == 0) ?
                  <Button
                    type="primary"
                    icon="check-circle"
                    className={business.buttomControl}
                    size="small"
                    disabled={!showItem || showItem === '' || !isProductUpdate || !selectProductData || selectProductData.length === 0}
                    onClick={() => {
                      ModalConfirm({
                        content: '确定启用吗？', onOk: () => {
                          this.handleUnFreezeProduct();
                        },
                      });
                    }}
                  >
                    启用
                  </Button> :
                  <Button
                    type="danger"
                    icon="stop"
                    className={business.buttomControl}
                    size="small"
                    disabled={!showItem || showItem === '' || !isProductUpdate || !selectProductData || selectProductData.length === 0}
                    onClick={() => {
                      ModalConfirm({
                        content: '确定禁用吗？', onOk: () => {
                          this.handleFreezeProduct();
                        },
                      });
                    }}
                  >
                    禁用
                  </Button>}


              </div>

            </div>

          </Card>
        </div>

      </div>
    </div>);


  };

  // 保存
  handleSubmit = () => {

    const { dispatch, selectProductData = [], permissionData } = this.props;
    const ids = selectProductData.map(v => {
      return v.id;
    });
    const params = {};
    params.permissions = permissionData;
    params.userIds = ids;


    dispatch({
      type: 'permission/updatePermission',
      payload: {
        ...params,
      },
    });

    this.setState({
      isEdit: true,
      update: true,
      visible: false,
    });


  };


  productRefresh = () => {

    const item = this.state.showItem;
    if (!item.id) return;

    const params = {};
    params.id = item.id;

    const { dispatch } = this.props;
    dispatch({
      type: 'permission/fetchUserPermission',
      payload: { ...params },
    });

  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };


// 启用
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
      type: 'permission/enableThePermission',
      payload: { list: ids },
      callback: () => {
        this.productStatusRefresh();
      },

    });
  };

// 禁用
  handleFreezeProduct = () => {

    const { selectProductData = [] } = this.props;
    const ids = selectProductData.map(v => {
      return v.id;
    });

    // console.log(" freeze ",ids)

    const { dispatch } = this.props;
    // data.push(selectedRowKeys);

    dispatch({
      type: 'permission/disableThePermission',
      payload: { list: ids },
      callback: () => {
        this.productStatusRefresh();
      },
    });

  };

  productStatusRefresh = () => {
    const item = this.state.showItem;
    console.log("123213",item.id)

    if (!item.id) return;
    const _this = this;
    _this.setState({
      isLoading: true,
    });


    const params = {};
    params.id = item.id;
    params.current = 1;
    params.size = 10;
    fetch(HttpFetch.queryPermissionUserList, {
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
        const { body } = d;
        let showItem = false;
        if (body.records.length > 0) {
          showItem = body.records[0];
          this.setState({
            showItem,
          });
        }
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

  render() {

    const {
      fetchListPermissionUserLoading,
      fetchUserPermissionLoading,
      updatePermissionLoading,
      fetchPermissionTreeLoading,
      disableThePermissionLoading,
      enableThePermissionLoading,
      body = {},
      isloading,
      refarshList,
    } = this.props;

    const { update } = this.state;

    // (item)


    const isUpdate = updatePermissionLoading || disableThePermissionLoading || enableThePermissionLoading || fetchPermissionTreeLoading || fetchUserPermissionLoading;
    const isUpdate2 = updatePermissionLoading || disableThePermissionLoading || enableThePermissionLoading || fetchPermissionTreeLoading;

    if (isUpdate) {
      this.state.update = true;
      if (updatePermissionLoading) {
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

      this.state.update = false;
      if (this.state.isUpdateFrom) {
        this.state.isUpdateFrom = false;
      }
      if (refarshList)
        refarshList();
    }


    const updat = isUpdate || fetchListPermissionUserLoading;
    const updat2 = isUpdate2 || fetchListPermissionUserLoading;
    if (updat !== this.state.isLoad) {
      if (isloading)
        isloading(updat2);// 表格loading
      this.state.isLoad = updat;
    }

    return this.getDetailInfo();
  }


}

export default IndexDetail;
