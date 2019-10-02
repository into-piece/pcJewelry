/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:47:00
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Menu,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Input,
  notification,
  Select,
  Radio,
} from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import SvgUtil from '@/utils/SvgUtil';
import Table from '@/components/Table';
import UploadImg from '@/components/UploadImg';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import DescriptionList from '@/components/DescriptionList';
import serviceObj from '@/services/dev';
import LockTag from '@/components/LockTag';
import { manuArr, modalContent } from './config/index';
import { statusConvert } from '@/utils/convert';
import ModalConfirm from '@/utils/modal';
import SearchFrom from './components/SearchFrom';
import SearchFromTab0 from './components/SearchFromTab0';
import Deliver from '../../Business/Deliver/Deliver';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const { Option } = Select;

// 弹窗form表单样式
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: {
    span: 13,
  },
};


// 右手边按钮集合
const btnGroup = [
  { name: '新增', tag: 'plus' },
  { name: '删除', tag: 'delete', type: 'danger' },
  { name: '编辑', tag: 'edit' },
  { name: '审批', tag: 'lock' },
];

const isLockList = false; // table是否锁定=》显示锁定标签做判断 先设定为否
let typeTable = [
  {
    title: '类别编码',
    dataIndex: 'unitCode',
    key: 'unitCode',
    render: data => isLockList ? (
      <LockTag>
        {data}
      </LockTag>
      )
      : (data),
  },
  {
    title: '中文名',
    dataIndex: 'zhName',
    key: 'zhName',
  },
  {
    title: '英文名',
    dataIndex: 'enName',
    key: 'enName',
  },
  {
    title: '大类',
    dataIndex: 'bTypeName',
    key: 'bType',
  },
  {
    title: '小类',
    dataIndex: 'sTypeName',
    key: 'sType',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: data => statusConvert[data],
  },
];
typeTable = typeTable.map(item => ({ ...item, sorter: true }));

// table 当前页对应的表头配置
const columnsArr = {
  // 主材表头
  material: [
    {
      title: '成色',
      dataIndex: 'assayingName',
      key: 'assaying',
      render: data => isLockList ? (
        <LockTag>
          {data}
        </LockTag>
        )
        : (data),
    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      title: '重量单位',
      dataIndex: 'weightUnitName',
      key: 'weightUnit',
    },
    {
      title: '计价类别',
      dataIndex: 'valuationClassName',
      key: 'valuationClass',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],
  // 配件表头
  accessories: [
    {
      title: '原料编号',
      dataIndex: 'accessorieCode',
      key: 'accessorieCode',
      render: data => isLockList ? (
        <LockTag>
          {data}
        </LockTag>
        )
        : (data),
    },
    {
      title: '成色',
      dataIndex: 'assayingName',
      key: 'assaying',
    },
    {
      title: '形状',
      dataIndex: 'shapeName',
      key: 'shape',
    },
    {
      title: '规格',
      dataIndex: 'specificationName',
      key: 'specification',
    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      title: '计量单位',
      dataIndex: 'measureUnitName',
      key: 'measureUnit',
    },
    {
      title: '重量单位',
      dataIndex: 'weightUnitName',
      key: 'weightUnit',
    },
    {
      title: '计价类别',
      dataIndex: 'valuationClassName',
      key: 'valuationClass',
    },
    {
      title: '单重',
      dataIndex: 'inventoryWeight',
      key: 'inventoryWeight',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],
  // 其他材料
  otherMaterial: [
    {
      title: '成色',
      dataIndex: 'assayingName',
      key: 'assaying',
      render: data => isLockList ? (
        <LockTag>
          {data}
        </LockTag>
        )
        : (data),
    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      title: '重量单位',
      dataIndex: 'assayingName',
      key: 'weightUnit',
    },
    {
      title: '计价类别',
      dataIndex: 'valuationClassName',
      key: 'valuationClass',
    },
    {
      title: '最低采购量',
      dataIndex: 'minimumPurchaseQuantity',
      key: 'minimumPurchaseQuantity',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],
  wrapper: [
    {
      title: '原料编号',
      dataIndex: 'fCode',
      key: 'fCode',
      render: data => isLockList ? (
        <LockTag>
          {data}
        </LockTag>
        )
        : (data),
    },
    {
      title: '颜色',
      dataIndex: 'colourName',
      key: 'colour',
    },
    {
      title: '形状',
      dataIndex: 'shapeName',
      key: 'shape',
    },
    {
      title: '规格',
      dataIndex: 'specificationName',
      key: 'specification',
    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      title: '计量单位',
      dataIndex: 'measureUnitName',
      key: 'measureUnit',
    },
    {
      title: '重量单位',
      dataIndex: 'assayingName',
      key: 'weightUnit',
    },
    {
      title: '计价类别',
      dataIndex: 'valuationClassName',
      key: 'valuationClass',
    },
    {
      title: '单重',
      dataIndex: 'inventoryWeight',
      key: 'inventoryWeight',
    },
    {
      title: '基本材料"',
      dataIndex: 'basicMaterials',
      key: 'basicMaterials',
    },
    {
      title: '条码',
      dataIndex: 'barCode',
      key: 'barCode',
    },
    {
      title: '售价',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '成本价',
      dataIndex: 'costPirce',
      key: 'costPirce',
    },
    {
      title: '币种',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],
  auxiliaryMaterial: [
    {
      title: '原料编号',
      dataIndex: 'fCode',
      key: 'fCode',
      render: data => isLockList ? (
        <LockTag>
          {data}
        </LockTag>
        )
        : (data),
    },
    {
      title: '颜色',
      dataIndex: 'colourName',
      key: 'colour',
    },
    {
      title: '形状',
      dataIndex: 'shapeName',
      key: 'shape',
    },
    {
      title: '规格',
      dataIndex: 'specificationName',
      key: 'specification',
    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      title: '计量单位',
      dataIndex: 'measureUnitName',
      key: 'measureUnit',
    },
    {
      title: '重量单位',
      dataIndex: 'assayingName',
      key: 'weightUnit',
    },
    {
      title: '计价类别',
      dataIndex: 'valuationClassName',
      key: 'valuationClass',
    },
    {
      title: '单重',
      dataIndex: 'inventoryWeight',
      key: 'inventoryWeight',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],
  stone: [
    {
      title: '原料编号',
      dataIndex: 'fCode',
      key: 'fCode',
      render: data => isLockList ? (
        <LockTag>
          {data}
        </LockTag>
        )
        : (data),
    },
    {
      title: '成色',
      dataIndex: 'assayingName',
      key: 'assaying',
    },
    {
      title: '形状',
      dataIndex: 'shapeName',
      key: 'shape',
    },
    {
      title: '规格',
      dataIndex: 'specificationName',
      key: 'specification',
    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      title: '计量单位',
      dataIndex: 'measureUnitName',
      key: 'measureUnit',
    },
    {
      title: '重量单位',
      dataIndex: 'assayingName',
      key: 'weightUnit',
    },
    {
      title: '计价类别',
      dataIndex: 'valuationClassName',
      key: 'valuationClass',
    },
    {
      title: '单重',
      dataIndex: 'inventoryWeight',
      key: 'inventoryWeight',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],

};
columnsArr.material = columnsArr.material.map(item => ({ ...item, sorter: true }));
columnsArr.accessories = columnsArr.accessories.map(item => ({ ...item, sorter: true }));
columnsArr.otherMaterial = columnsArr.otherMaterial.map(item => ({ ...item, sorter: true }));
columnsArr.wrapper = columnsArr.wrapper.map(item => ({ ...item, sorter: true }));
columnsArr.auxiliaryMaterial = columnsArr.auxiliaryMaterial.map(item => ({ ...item, sorter: true }));
columnsArr.stone = columnsArr.stone.map(item => ({ ...item, sorter: true }));


@Form.create()
@connect(({ devRaw }) => {
  return {
    dev: devRaw,
    list: devRaw.list,
    paginationTypes: devRaw.paginationTypes,
    pagination: devRaw.pagination,
    searchParams: devRaw.searchParams,
    selectKey: devRaw.selectKey,
    choosenRowData: devRaw.choosenRowData,
    choosenTypesRowData: devRaw.choosenTypesRowData,
    colorSetList: devRaw.colorSetList,
    selectedRowKeys: devRaw.selectedRowKeys,
    gemSetProcessDropDown: devRaw.gemSetProcessDropDown,
    listMstWordbookDrop: devRaw.listMstWordbookDrop,
  };
})
class Info extends Component {
  state = {
    mode: 'inline',
    modalType: '',
    addData: {
      measureUnit: {
        unitCode: '',
        zhName: '',
        enName: '',
      },
      colorPercentage: {},
    },
    filelist: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'devRaw/getListMstWordbookParams',
      payload: { wordbookTypeCode: 'H015' },
    });
    dispatch({
      type: 'devRaw/getListMstWordbookParams',
      payload: { wordbookTypeCode: 'H016' },
    });
    this.getTypeList();

  }

  getTypeList = (params) => {
    const { dispatch, paginationTypes } = this.props;
    // getDevList
    dispatch({
      type: `devRaw/getList`,
      payload: { params: { ...paginationTypes, ...params }, type: 'types' },
    });
  };

  // 获取对应key=》页面进行数据请求
  getList = ({ key, params }) => {
    const { dispatch, pagination, selectKey, choosenTypesRowData } = this.props;

    // 没有选择类型就没有查询下面
    if (!choosenTypesRowData || choosenTypesRowData.id === '') {
      return;
    }
    // getDevList
    dispatch({
      type: `devRaw/getList`,
      payload: { params: { ...pagination, ...params, cId: choosenTypesRowData.id }, type: key || selectKey },
      callback: () => {
        const { dev } = this.props;
        dev[`${dev.selectKey}List`].records.map((item) => {
          if (item.id === dev.choosenRowData.id) {
            dispatch({
              type: 'devRaw/getChoosenRowData',
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
        // console.log(selectKey, '==============selectKey');


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
        const setvicetypename = isLock ? '审核' : '撤销';
        ModalConfirm({
          content: `确定${setvicetypename}吗？`, onOk: () => {
            this.handleLock();
          },
        });
        break;
    }
  };


  returnElement = ({ type, dev, list, disable }) => {
    switch (type) {
      case 2:
        return (<Select placeholder="请选择" disabled={disable || false}>
          {dev[list] && dev[list].map(({ value, key }) =>
            <Option value={value} key={value}>{key}</Option>,
          )}
        </Select>);
      case 3 :
        return (<Radio.Group disabled={disable || false}>
          <Radio value="0">计重</Radio>
          <Radio value="1">计件</Radio>
        </Radio.Group>);
      default:
        return <Input placeholder="请输入" disabled={disable || false} />;
    }
  };


  // 根据btn点击 返回对应弹窗内容
  getModalContent = () => {
    const {
      selectKey,
      choosenRowData,
      form: { getFieldDecorator, getFieldsValue },
    } = this.props;
    const { modalType } = this.state;
    const content = '';
    const dataArr = modalContent[selectKey];
    const isEdit = modalType === 'edit';
    const { dev } = this.props;

    return (
      <Form size="small">
        {
          dataArr && dataArr.map(({ key, value, noNeed, type, list, dfv, span, disable }) => {

            return (
              <Col span={span || 12} key={value}>
                <FormItem label={key} {...formLayout} key={key}>
                  {
                    getFieldDecorator(value, {
                      rules: [{
                        required: !noNeed,
                        message: `请${type && (type === 2 || type === 3) ? '选择' : '输入'}${key}`,
                      }],
                      initialValue: isEdit ? choosenRowData[value] : (dfv || ''),
                    })(this.returnElement({ type, dev, list, disable }))
                  }
                </FormItem>
              </Col>
            );
          })
        }
        {(selectKey === 'accessories') && <Col span={18}>
          <FormItem
            label="上传图片"
            key="uploadPic"
            labelCol={{ span: 3 }}
            wrapperCol={{
              span: 20,
            }
            }
          >
            <UploadImg
              key="uimg"
              maxcount={10}
              fileListFun={(list) => {
                this.setState({ filelist: list });
              }}
            />
          </FormItem>
        </Col>}
        {content}

      </Form>
    );
  };

  // 获取Modal的标题
  returnTitle = () => {
    const { modalType } = this.state;
    let text = '';
    switch (modalType) {
      case 'plus':
        text = '添加';
        break;
      case 'edit':
        text = '编辑';
        break;
      default:
        break;
    }
    return `任务${text}`;
  };

  // 新增按钮事件回调
  handleAdd = () => {
    const { selectKey, form } = this.props;
    const { addData } = this.state;

    form.validateFields((err, values) => {
      if (!err) {
        // this.setState({
        //   [selectKey]
        // })
        // serviceObj[`addBasic${selectKey}`](addData[selectKey]).then()
        serviceObj[`addBasic${selectKey}`](values).then(res => {
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList({ key: selectKey });
            this.btnFn('');
          }
        });
      }
    });
  };

  // 编辑按钮回调
  handleEdit = () => {
    const { selectKey, form } = this.props;
    const { addData } = this.state;

    // 还要清空所选中项
    this.props.dispatch({
      type: 'devRaw/changeSelectedRowKeys',
      payload: [],
    });

    form.validateFields((err, values) => {
      if (!err) {
        const { choosenRowData } = this.props;
        // serviceObj[`addBasic${selectKey}`](addData[selectKey]).then()
        const params = {
          ...values,
          id: choosenRowData.id,
        };
        serviceObj[`addBasic${selectKey}`](params).then(res => {
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList({ key: selectKey });
            this.btnFn('');
          }
        });
      }
    });
  };

  // 删除按钮回调
  handleDelect = () => {
    const { selectKey, selectedRowKeys } = this.props;
    serviceObj[`deleteBasic${selectKey}`](selectedRowKeys).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.getList({ key: selectKey });
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
        this.getList({ key: selectKey });
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
    const { selectedRowKeys, dev, selectKey } = this.props;
    // console.log(dev[`${selectKey}List`], dev[`${selectKey}List`].records, '============');
    if (dev[`${selectKey}List`] && dev[`${selectKey}List`].records.length === 0) return {
      name: '审批',
      disabled: true,
      type: 1,
    };
    const isLock1 = selectedRowKeys.reduce((res, cur) => {
      const singleObjcect = dev[`${selectKey}List`].records.find(subItem => subItem.id === cur);
      if (singleObjcect) res.push(singleObjcect.status);
      return res;
    }, []);
    const isShenPi = isLock1.every((item) => Number(item) === 0); // 是否全是0
    const isChexiao = isLock1.every((item) => Number(item) === 2); // 是否全是2
    if (isShenPi) return { name: '审批', disabled: false, type: 1 };
    if (isChexiao) return { name: '撤销', disabled: false, type: 2 };
    return { name: '审批', disabled: true, type: 1 }; // 当两种状态都有 禁止点击
  };

  // 弹窗确定提交回调
  handleModalOk = () => {
    const { modalType } = this.state;
    switch (modalType) {
      case 'plus':
        this.handleAdd();
        break;
      case 'edit':
        this.handleEdit();
        break;
      default:
        break;
    }

  };

  // 判断按钮是否禁止 返回boolean
  returnSisabled = (tag) => {
    const { selectedRowKeys,choosenTypesRowData } = this.props;
    if (tag === 'plus') return (!choosenTypesRowData||choosenTypesRowData.id==='');
    if (tag === 'lock') {
      return selectedRowKeys.length === 0 || this.returnLockType().disabled;
    }
    return selectedRowKeys.length === 0;
  };


  // 第一部分table  排序 页面切换 触发
  onSearchType = (v) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'devRaw/getTypesPagination',
      payload: v,
    });
    this.getTypeList(v);
  };

  // 第二部分table  排序 页面切换 触发
  onSearch = (v) => {
    const { dispatch, selectKey } = this.props;
    dispatch({
      type: 'devRaw/getPagination',
      payload: v,
    });
    this.getList({ key: selectKey, params: v });
  };

  render() {
    const { state, props, btnFn, getModalContent, returnTitle, handleModalOk, returnLockType, returnSisabled, onSearch, onSearchType } = this;
    const { mode, modalType } = state;
    const { list, selectKey, choosenRowData } = props;
    return (
      <div className={styles.page}>
        {/* <Bread data={breadData} /> */}
        <div className={styles.center_content}>
          {/* lg={17} md={24} */}
          <div className={styles.main}>

            <div className={styles.right}>
              <RightContent
                returnElement={this.returnElement}
                onSearch={onSearch}
                onSearchType={onSearchType}
                getList={(p) => {
                  this.getList(p);
                }}
                getTypeList={(p) => {
                  this.getTypeList(p);
                }}

                type={selectKey}
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
          title={returnTitle()}
          width={selectKey === 'accessories' ? 960 : 640}
          className={styles.standardListForm}
          bodyStyle={{ padding: '28px 0 0' }}
          destroyOnClose
          onOk={handleModalOk}
          visible={modalType !== ''}
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
const RightContent = ({ onSearchType, getTypeList, getList, type, choosenRowData, btnFn, returnLockType, returnSisabled, onSearch, returnElement }) => (
  <GridContent>
    <Row gutter={24} className={styles.row_content}>
      {/* 中间table组件 */}
      <Col lg={16} md={16}>
        <CenterInfo
          returnElement={returnElement}
          getList={getList}
          getTypeList={getTypeList}
          type={type}
          onSearch={onSearch}
          onSearchType={onSearchType}
        />
      </Col>
      {/* 右边显示详细信息和按钮操作 */}
      <Col lg={8} md={16}>
        <div className={styles.view_right_content}>
          <Card bordered={false}>
            <div>
              <span
                style={{
                  marginBottom: 32,
                  paddingLeft: 10,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#35B0F4',
                }}
              >
                <FormattedMessage id={`app.dev.menuMap.${type}`} defaultMessage="" />
              </span>
              <GetRenderitem data={choosenRowData} type={type} />
            </div>
          </Card>

          {/* </Card> */}
          <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {btnGroup.map(({ name, tag, type }) => (
                <Button
                  key={tag}
                  className={styles.buttomControl}
                  type={type || 'primary'}
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
@connect(({ loading, devRaw }) => {
  return {
    dev: devRaw,
    listLoading: loading.effects['devRaw/getList'],
    pagination: devRaw.pagination,
    paginationTypes: devRaw.paginationTypes,
    choosenRowData: devRaw.choosenRowData,
    choosenTypesRowData: devRaw.choosenTypesRowData,
    selectedRowKeys: devRaw.selectedRowKeys,
  };
})
class CenterInfo extends Component {

  componentDidMount() {
    const { type } = this.props;
    this.initDropList(type);
  }


  initDropList(type) {
    const { dispatch } = this.props;
    // 主材
    if (type === 'material' || type === 'accessories') {
      // 成色列表
      dispatch({
        type: 'devRaw/getGemDropDown',
        payload: {},
      });
      // 重量单位列表
      dispatch({
        type: 'devRaw/getBUMDropDown',
        payload: {},
      });
    }
    // 配件
    if (type === 'accessories') {
      // 形状下拉
      dispatch({
        type: 'devRaw/getShapeDropDown',
        payload: {},
      });
      // 规格下拉
      dispatch({
        type: 'devRaw/getSpecificationDropDown',
        payload: {},
      });
    }
  }

  changeChoosenTypeRow = rowData => {
    const { dispatch } = this.props;
    dispatch({
      type: 'devRaw/getChoosenTypeRowData',
      payload: rowData,
    });
  };

  changeChoosenRow = rowData => {
    const { dispatch } = this.props;
    dispatch({
      type: 'devRaw/getChoosenRowData',
      payload: rowData,
    });
  };


  // 更改table select数组
  onSelectChange = (selectedRowKeys) => {
    this.props.dispatch({
      type: 'devRaw/changeSelectedRowKeys',
      payload: selectedRowKeys,
    });
  };

  turnTab(e) {
    const key = e.target.value;
    const { dispatch, getList } = this.props;
    this.initDropList(key);

    dispatch({
      type: 'devRaw/getSelectKey',
      payload: key,
      callback: () => {
        dispatch({
          type: 'devRaw/getPagination',
          payload: { current: 1 },
          callback: () => {
            getList({ key });
          },
        });
      },
    });

    // 还要清空所选中项
    dispatch({
      type: 'devRaw/changeSelectedRowKeys',
      payload: [],
    });

    dispatch({
      type: 'devRaw/getChoosenRowData',
      payload: { id: '', zhName: '', enName: '', unitCode: '' },
    });
    dispatch({
      type: 'devRaw/setSearchParams',
      payload: {},
    });

    this.SearchFromTab0.handleReset();
  }


  // 第二个表格搜索
  search(params) {
    const { dispatch, getList, pagination } = this.props;
    getList({ params: { ...pagination, ...params, current: 1 } });

    dispatch({
      type: 'devRaw/getPagination',
      payload: { current: 1 },
    });


  }

  // 类型搜索
  searchType(params) {
    const { dispatch, getTypeList, paginationTypes } = this.props;
    getTypeList(  { ...paginationTypes, ...params, current: 1 } );

    dispatch({
      type: 'devRaw/getTypesPagination',
      payload: { current: 1 },
    });

  }

  render() {
    const { onSelectChange, props } = this;
    const { type, onSearchType, choosenRowData, paginationTypes,choosenTypesRowData, pagination, dev, selectedRowKeys, listLoading, onSearch, returnElement } = props;
    const columns = columnsArr[type];
    const list = dev[`${type}List`];
    const typeslist = dev.typesList;
    return (
      <div className={styles.view_left_content}>
        <div className={styles.contentTitle}>
          <SearchFrom
            devRaw={dev}
            onSearch={(p) => {
              this.searchType(p);
            }}
          />
        </div>
        <div className={styles.tableBox}>
          <Table
            columns={typeTable}
            body={typeslist}
            changeChoosenRow={this.changeChoosenTypeRow}
            selectKey={choosenTypesRowData.id}
            pagination={paginationTypes}
            selectedRowKeys={[choosenTypesRowData.id]}
            listLoading={listLoading}
            handleTableChange={onSearchType}
          />
        </div>
        <div className={styles.contentTitle}>
          <Radio.Group defaultValue="material" value={type} buttonStyle="solid">
            <Radio.Button
              value="material"
              onChange={(e) => {
                this.turnTab(e);
              }}
            >
              主材
            </Radio.Button>
            <Radio.Button
              value="stone"
              onChange={(e) => {
                this.turnTab(e);
              }}
            >
              石材
            </Radio.Button>
            <Radio.Button
              value="accessories"
              onChange={(e) => {
                this.turnTab(e);
              }}
            >
              配件
            </Radio.Button>
            <Radio.Button
              value="wrapper"
              onChange={(e) => {
                this.turnTab(e);
              }}
            >
              包装
            </Radio.Button>
            <Radio.Button
              value="auxiliaryMaterial"
              onChange={(e) => {
                this.turnTab(e);
              }}
            >
              辅材
            </Radio.Button>
            <Radio.Button
              value="otherMaterial"
              onChange={(e) => {
                this.turnTab(e);
              }}
            >
              其他
            </Radio.Button>
          </Radio.Group>
        </div>

        <div className={styles.tableBox}>
          <SearchFromTab0
            dev={dev}
            modalContent={modalContent}
            returnElement={returnElement}
            selectType={type}
            onSearch={(p) => {
              this.search(p);
            }}
            onReset={() => {
            }}
            wrappedComponentRef={(e) => this.SearchFromTab0 = e}
          />

          <Table
            columns={columns}
            body={list}
            changeChoosenRow={this.changeChoosenRow}
            selectKey={choosenRowData.id}
            pagination={pagination}
            // changePagination={this.changePagination}
            selectedRowKeys={selectedRowKeys}
            onSelectChange={onSelectChange}
            listLoading={listLoading}
            handleTableChange={onSearch}
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

  let arr = [];

  if (modalContent[type]) {
    arr = [
      ...modalContent[type],
      { 'key': '状态', 'value': 'status' },
    ];
  }


  return (
    <div style={{ marginLeft: 10, marginTop: 10 }} onClick={selectRowItem}>
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
    </div>
  );
};

export default Info;
