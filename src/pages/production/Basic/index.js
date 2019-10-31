/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:47:00
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Row, Col, Card, Button, Modal, Form, Input, notification, Select, Radio,Divider } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import SvgUtil from '@/utils/SvgUtil';
import Table from '@/components/Table';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import DescriptionList from '@/components/DescriptionList';
import serviceObj from '@/services/production';
import { manuArr, modalContent, columnsArr } from './config';
import { statusConvert } from '@/utils/convert';
import ModalConfirm from '@/utils/modal';
import BuildTitle from '@/components/BuildTitle';

const { Description } = DescriptionList;
const { Item } = Menu;
const FormItem = Form.Item;
const { Option } = Select;
const defaultModelName = 'productionBasic';

// 左边menu遍历配置
const menuMap = manuArr.map(item => ({
  value: <FormattedMessage id={`app.production.menuMap.${item}`} defaultMessage="Basic Settings" />,
  key: item,
}));

// 右手边按钮集合
const btnGroup = [
  { name: '新增', tag: 'plus' },
  { name: '删除', tag: 'delete', type: 'danger' },
  { name: '编辑', tag: 'edit' },
  { name: '审批', tag: 'lock' },
];


manuArr.forEach(subItem => {
  columnsArr[subItem] = columnsArr[subItem].map(row => ({ ...row, sorter: true }));
});

@Form.create()
@connect(({ loading, productionBasic: model }) => {
  return {
    model,
    list: model.list,
    pagination: model.pagination,
    selectKey: model.selectKey,
    choosenRowData: model.choosenRowData,
    selectedRowKeys: model.selectedRowKeys,
  };
})
class Info extends Component {
  state = {
    mode: 'inline',
    modalType: '',
    addLoading: false,

  };

  componentDidMount() {
    // 获取初始表单数据
    this.getList();
  }

  // 获取对应menu
  getmenu = () => {
    return menuMap.map(({ key, value }) => (
      <Item key={key} style={{ textAlign: 'vertical-center' }}>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Icon style={{ width: 25, height: 25 }} component={this.getMenuIcon(key)} />
          {value}
        </span>
      </Item>
    ));
  };

  // 根据当前页面的key 返回对应的icon
  getMenuIcon = key => {
    return SvgUtil[key];
  };

  // 点击menu 更换子页面回调 请求list数据
  handleSelectKey = ({ key }) => {
    const { dispatch, pagination } = this.props;
    dispatch({
      type: `${defaultModelName}/getSelectKey`,
      payload: key,
    });
    this.getList(key);

    // 还要清空所选中项
    dispatch({
      type: `${defaultModelName}/changeSelectedRowKeys`,
      payload: [],
    });

    dispatch({
      type: `${defaultModelName}/setChoosenRowData`,
      payload: { id: '', zhName: '', enName: '', unitCode: '' },
    });

  };

  // 获取对应key=》页面进行数据请求
  getList = (key = this.props.selectKey) => {
    const { dispatch, pagination } = this.props;
    const obj = {};

    dispatch({
      type: `${defaultModelName}/getList`,
      payload: { params: pagination, type: key },
      callback: () => {
        const { model } = this.props;
        model[`${model.selectKey}List`].records.forEach((item) => {
          if (item.id === model.choosenRowData.id) {
            dispatch({
              type: `${defaultModelName}/setChoosenRowData`,
              payload: item,
            });
          }
        });
      },
    });
  };

  // 列表对应操作button回调
  btnFn = modalType => {
    const { selectKey, dispatch } = this.props;
    switch (modalType) {
      case 'plus':
      case 'edit':
      default:
        // // 镶石工艺
        // if (selectKey === 'insertStoneTechnology') {
        //   dispatch({
        //     type: `${defaultModelName}/getGemDropDown`,
        //     payload: {},
        //   });
        // }
        // // 成色设定
        // if (selectKey === 'colorPercentage') {
        //   dispatch({
        //     type: `${defaultModelName}/getListMstWordbook`,
        //     payload: {},
        //   });
        // }
        // if (selectKey === 'categorySet') {
        //   dispatch({
        //     type: `${defaultModelName}/getListMstWordbookParams`,
        //     payload: { wordbookTypeCode: 'H015' },
        //   });
        //   dispatch({
        //     type: `${defaultModelName}/getListMstWordbookParams`,
        //     payload: { wordbookTypeCode: 'H016' },
        //   });
        // }
        this.setState({ modalType });
        break;
      case 'delete':
        ModalConfirm({
          content: '确定删除吗？', onOk: () => {
            this.handleDelect();
          },
        });
        break;
      case 'lock':
        const isLock = this.returnLockType().type === 1;
        const setvicetypename = isLock ? '审批' : '取消审批';
        ModalConfirm({
          content: `确定${setvicetypename}吗？`, onOk: () => {
            this.handleLock();
          },
        });
        break;
    }
  };

  // 根据btn点击 返回对应弹窗内容
  getModalContent = () => {
    const {
      selectKey,
      choosenRowData,
      form: { getFieldDecorator },
    } = this.props;
    const { modalType } = this.state;
    const content = '';
    const dataArr = modalContent[selectKey];
    const isEdit = modalType === 'edit';
    const { model } = this.props;
    return (
      <Form size="small">
        {
          dataArr && dataArr.map(({ key, value, noNeed, type, list }) => {
            // console.log(list)
            return (
              <div className="adddevModal" key={key}>
                <FormItem label={key} key={key}>
                  {
                    getFieldDecorator(value, {
                      rules: [{
                        required: !noNeed,
                        message: `请${type && (type === 2 || type === 3) ? '选择' : '输入'}${key}`,
                      }],
                      initialValue: isEdit ? choosenRowData[value] : undefined,
                    })(type && type === 2 ?
                      <Select placeholder="请选择" style={{ width: 180 }}>
                        {model[list] && model[list].map(({ value, key }) =>
                          <Option value={value}>{key}</Option>,
                        )}
                      </Select> :
                      type && type === 3 ?
                        <Radio.Group value={value}>
                          <Radio value={1}>是</Radio>
                          <Radio value={2}>否</Radio>
                        </Radio.Group>
                        :
                        <Input placeholder="请输入" />,
                    )
                  }
                </FormItem>
              </div>
            );
          })
        }
        {content}
      </Form>
    );
  };

  // 获取Modal的标题
  returnTitle = () => {
    const { selectKey } = this.props;
    //
    // const { modalType } = this.state;
    // let text = '';
    // switch (modalType) {
    //   case 'plus':
    //     text = '添加';
    //     break;
    //   case 'edit':
    //     text = '编辑';
    //     break;
    //   default:
    //     break;
    // }

    const menuText = <FormattedMessage id={`app.dev.menuMap.${selectKey}`} defaultMessage="Basic Settings" />;
    return menuText;
  };

  // 新增按钮事件回调
  handleAdd = (close) => {
    const { selectKey, form } = this.props;
    this.setState({
      addLoading:true
    })
    form.validateFields((err, values) => {
      if (!err) {
        serviceObj[`add${selectKey}`](values).then(res => {
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList();
            if(close) this.btnFn('');
          }
          this.setState({
            addLoading:false
          })
        });
      }
    });
  };

  // 编辑按钮回调
  handleEdit = (close) => {
    const { selectKey, form } = this.props;

    // 还要清空所选中项
    this.props.dispatch({
      type: `${defaultModelName}/changeSelectedRowKeys`,
      payload: [],
    });
    this.setState({
      addLoading:true
    })
    form.validateFields((err, values) => {
      if (!err) {
        const { choosenRowData } = this.props;
        const params = {
          ...values,
          id: choosenRowData.id,
        };
        serviceObj[`add${selectKey}`](params).then(res => {
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList();
            if(close) this.btnFn('');

          }
          this.setState({
            addLoading:false
          })
        });
      }
    });
  };

  // 删除按钮回调
  handleDelect = () => {
    const { selectKey, selectedRowKeys } = this.props;
    serviceObj[`delete${selectKey}`](selectedRowKeys).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.getList();
      }
    });
  };

  // 审批/撤销 按钮回调
  handleLock = () => {
    const { selectKey, selectedRowKeys } = this.props;
    const isLock = this.returnLockType().type === 1;  // 根据this.returnLockType()判断返回当前是撤回还是审批
    const serviceType = isLock ? 'approve' : 'revoke';
    serviceObj[serviceType + selectKey](selectedRowKeys).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.getList();
      }
    });
  };

  /**
   * 根据已经选中的列id 遍历获取对应status数组 判断返回是否显示撤销或审批 按钮是否可用
   * return obj
   * params: name 名称
   * params: disabled 是否可点击
   * params: type 1为审批 2为撤销
   */
  returnLockType = () => {
    const { selectedRowKeys, model, selectKey } = this.props;
    if (model[`${selectKey}List`] && model[`${selectKey}List`].records.length === 0) return {
      name: '审批',
      disabled: true,
      type: 1,
    };
    const isLock1 = selectedRowKeys.reduce((res, cur) => {
      const singleObjcect = model[`${selectKey}List`].records.find(subItem => subItem.id === cur);
      if (singleObjcect) res.push(singleObjcect.status);
      return res;
    }, []);
    const isShenPi = isLock1.every((item) => Number(item) === 0); // 是否全是0
    const isChexiao = isLock1.every((item) => Number(item) === 2); // 是否全是2
    if (isShenPi) return { name: '审批', disabled: false, type: 1, isShenPi, isChexiao };
    if (isChexiao) return { name: '取消审批', disabled: false, type: 2, isShenPi, isChexiao };
    return { name: '审批', disabled: true, type: 1, isShenPi, isChexiao }; // 当两种状态都有 禁止点击
  };

  // 弹窗确定提交回调
  handleModalOk = (close) => {
    const { modalType } = this.state;
    switch (modalType) {
      case 'plus':
        this.handleAdd(close);
        break;
      case 'edit':
        this.handleEdit(close);
        break;
      default:
        break;
    }

  };

  // 判断按钮是否禁止 返回boolean
  returnSisabled = (tag) => {

    const { selectedRowKeys, choosenRowData } = this.props;
    if (tag === 'plus') return false;
    if (tag === 'lock') {
      return selectedRowKeys.length === 0 || this.returnLockType().disabled;
    }

    if (tag === 'delete') {
      return selectedRowKeys.length === 0 || this.returnLockType().type === 2;
    }
    if (tag === 'edit') {
      return selectedRowKeys.length === 0 || Number(choosenRowData.status) === 2;
    }

    return selectedRowKeys.length === 0;
  };

  render() {
    const { state, props, btnFn, getModalContent, returnTitle, handleModalOk, returnLockType, returnSisabled } = this;
    const { mode, modalType,addLoading } = state;
    const { list, selectKey, choosenRowData } = props;
    const modalFooter = modalType==='plus'?[
      <Button
        key="back"
        onClick={() => {
          btnFn('');
        }}
      >
        取消
      </Button>,
      <Button key="submit" type="primary" loading={addLoading} onClick={()=>{handleModalOk(true)}}>
        保存
      </Button>,
      <Button key="continue" type="primary" loading={addLoading} onClick={()=>{handleModalOk(false)}}>
        继续添加
      </Button>,
    ]:[
      <Button
        key="back"
        onClick={() => {
          btnFn('');
        }}
      >
        取消
      </Button>,
      <Button key="submit" type="primary" loading={addLoading} onClick={()=>{handleModalOk(false)}}>
        保存
      </Button>
    ];

    return (
      <div className={styles.page}>
        {/* <Bread data={breadData} /> */}
        <div className={styles.center_content}>
          {/* lg={17} md={24} */}
          <div className={styles.main}>
            <div
              className={styles.leftmenu}
              ref={ref => {
                this.main = ref;
              }}
            >
              <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.handleSelectKey}>
                {this.getmenu()}
              </Menu>
            </div>
            <div className={styles.right}>
              <RightContent
                type={selectKey}
                sourceList={list}
                choosenRowData={choosenRowData}
                btnFn={btnFn}
                returnLockType={returnLockType}
                returnSisabled={returnSisabled}
              />
            </div>
          </div>
        </div>
        <Modal
          maskClosable={false}
          title={<BuildTitle title={returnTitle()} />}
          width={640}
          className={styles.standardListForm}
          bodyStyle={{ padding: '28px 0 0' }}
          destroyOnClose
          visible={modalType !== ''}

          footer={modalFooter}
          onCancel={() => {
            btnFn('');
          }}
        >
          {getModalContent()}
        </Modal>
      </div>
    );
  }
}

// 右手边正文内容
const RightContent = ({ type, choosenRowData, btnFn, returnLockType, returnSisabled }) => (
  <GridContent>
    <Row gutter={24} className={styles.row_content}>
      {/* 中间table组件 */}
      <Col lg={16} md={24}>
        <CenterInfo type={type} />
      </Col>
      {/* 右边显示详细信息和按钮操作 */}
      <Col lg={8} md={24}>
        <div className={styles.view_right_content}>
          <div
            style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', overflow: 'hidden' }}
          >
            <div>
              <div
                style={{
                  padding: "20px 20px 10px",
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#35B0F4',
                }}
              >
                <FormattedMessage id={`app.production.menuMap.${type}`} defaultMessage="" />
              </div>
              <Divider className={styles.divder} />

            </div>

            <GetRenderitem data={choosenRowData} type={type} />
          </div>

          {/* </Card> */}
          <Card bodyStyle={{ display: 'flex',paddingLeft: 5, paddingRight: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {btnGroup.map(({ name, tag, type }) => (
                <Button
                  key={tag}
                  type={(tag === 'delete' || (tag === 'lock' && returnLockType().type === 2)) ? 'danger' : 'primary'}
                  className={styles.buttomControl}
                  icon={tag}
                  size="small"
                  disabled={returnSisabled(tag)}
                  onClick={() => {
                    btnFn(tag);
                  }}
                >
                  {tag === 'lock' ? returnLockType().name : name}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  </GridContent>
);

// Table 中间列表内容
@connect(({ loading, productionBasic: model }) => {
  return {
    model,
    listLoading: loading.effects[`${defaultModelName}/getList`],
    pagination: model.pagination,
    choosenRowData: model.choosenRowData,
    selectedRowKeys: model.selectedRowKeys,
    selectKey: model.selectKey,
  };
})
class CenterInfo extends Component {
  handleTableChange = obj => {
    const { dispatch, selectKey } = this.props;
    dispatch({
      type: `${defaultModelName}/getList`,
      payload: { type: selectKey, params: obj },
    });

  };

  changeChoosenRow = rowData => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/setChoosenRowData`,
      payload: rowData,
    });
  };


  // 更改table select数组
  onSelectChange = (selectedRowKeys) => {
    this.props.dispatch({
      type: `${defaultModelName}/changeSelectedRowKeys`,
      payload: selectedRowKeys,
    });
  };

  render() {
    const { onSelectChange, props, handleTableChange } = this;
    const { type, choosenRowData, pagination, model, selectedRowKeys, listLoading } = props;
    const columns = columnsArr[type];
    const list = model[`${type}List`];
    return (
      <div className={styles.view_left_content}>
        <div className={styles.contentTitle}>
          <Icon
            className={styles.titleIcon}
            component={SvgUtil[type]}
          />
          <FormattedMessage id={`app.production.menuMap.${type}`} defaultMessage="" />
        </div>

        <div className={styles.tableBox}>
          <Table
            key={type}
            columns={columns}
            body={list}
            changeChoosenRow={this.changeChoosenRow}
            selectKey={choosenRowData.id}
            pagination={pagination}
            selectedRowKeys={selectedRowKeys}
            onSelectChange={onSelectChange}
            listLoading={listLoading}
            handleTableChange={handleTableChange}
          />
        </div>
      </div>
    );
  }
}


// 右手边显示的详情信息
const GetRenderitem = ({ data, type }) => {
  const selectRowItem = () => {
    // console.log('select the item');
  };
  const arr = [
    ...modalContent[type],
    { 'key': '状态', 'value': 'status' },
  ];

  return (
    <Card bordered={false} style={{ overflow: 'auto' }} onClick={selectRowItem}>
      <DescriptionList className={styles.headerList} size="small" col="1">
        {
          arr.map(({ key, value, name }) => {
            return (name ? <Description key={key} term={key}>{data[`${value}Name`]}</Description>
                : <Description
                  key={key}
                  term={key}
                >{value === 'status' ? statusConvert[data[value]] : data[value]}
                </Description>
            );
          })
        }
      </DescriptionList>
    </Card>
  );
};

export default Info;
