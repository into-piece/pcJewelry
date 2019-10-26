/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:47:00
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import {Carousel, Menu, Icon, Row, Col, Card, Button, Modal, Form, Input, notification, Select, Radio, Divider } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Zmage from 'react-zmage';
import styles from './index.less';
import SvgUtil from '@/utils/SvgUtil';
import Table from '@/components/Table';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import DescriptionList from '@/components/DescriptionList';
import serviceObj from '@/services/dev';
import LockTag from '@/components/LockTag';
import { manuArr, modalContent } from './config.json';
import { statusConvert } from '@/utils/convert';
import ModalConfirm from '@/utils/modal';
import BuildTitle from '@/components/BuildTitle';
import UploadImg from '@/components/UploadImg';

const { Description } = DescriptionList;
const { Item } = Menu;
const FormItem = Form.Item;
const { Option } = Select;


// 左边menu遍历配置
const menuMap = manuArr.map(item => ({
  value: <FormattedMessage id={`app.dev.menuMap.${item}`} defaultMessage="Basic Settings" />,
  key: item,
}));

// 弹窗form表单样式
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: {
    span: 13,
  },
};

// 面包屑数据
// const breadData = [
//   {
//     name: '主页', link: '/'
//   },
//   {
//     name: '开发', link: '/dev/basic'
//   },
//   {
//     name: '基础数据', link: ''
//   }
// ]

// 右手边按钮集合
const btnGroup = [
  { name: '新增', tag: 'plus' },
  { name: '删除', tag: 'delete', type: 'danger' },
  { name: '编辑', tag: 'edit' },
  { name: '审批', tag: 'lock' },
];

const isLockList = false; // table是否锁定=》显示锁定标签做判断 先设定为否


// table 当前页对应的表头配置
const columnsArr = {
  // 计量单位表头
  measureUnit: [
    {
      title: '单位代码',
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
      title: '中文名称',
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      title: '英文名称',
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],

  // 成色设定表头
  colorPercentage: [
    {
      title: '产品材料',
      dataIndex: 'productMaterial',
      key: 'productMaterial',
    },
    {
      title: '中文名称',
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      title: '成色系列',
      dataIndex: 'assayingTheCoefficient',
      key: 'assayingTheCoefficient',
    },
    {
      title: '返主材类别',
      dataIndex: 'rtnMainMaterial',
      key: 'rtnMainMaterial',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],

  // 颜色设定表头
  colorSetting: [
    {
      title: '颜色代码',
      dataIndex: 'unitCode',
      key: 'unitCode',
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],

  // 电镀表头
  electroplateSetting: [
    {
      title: '电镀颜色代码',
      dataIndex: 'colorCode',
      key: 'colorCode',
    },
    {
      title: '简称',
      dataIndex: 'shotName',
      key: 'shotName',
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
      title: '含镍',
      dataIndex: 'isNickel',
      key: 'isNickel',
      render: (data) => (Number(data) === 1 ? '是' : '否'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],

  // 形状设定表头
  shapeSetting: [
    {
      title: '形状代码',
      dataIndex: 'shapeCode',
      key: 'shapeCode',
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],

  // 规格设定表头
  specificationSetting: [
    {
      title: '规格代码',
      dataIndex: 'specificationCode',
      key: 'specificationCode',
    },
    {
      title: '中文名称',
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],

  // 原料等级设定表头
  materialsGrade: [
    {
      title: '等级代码',
      dataIndex: 'gradeCode',
      key: 'gradeCode',
    },
    {
      title: '中文名称',
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],

  // 石头切工设定列表
  stoneCutter: [
    {
      title: '切工代码',
      dataIndex: 'cuttingCode',
      key: 'cuttingCode',
    },
    {
      title: '中文名称',
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],

  // 镶石工艺
  insertStoneTechnology: [
    {
      title: '成色',
      dataIndex: 'basicColourSet',
      key: 'basicColourSet',
      render: (data) => (
        <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data.zhName}</div>
      ),
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
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
      title: '工费',
      dataIndex: 'costs',
      key: 'costs',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],

  // 胶膜设定
  rubberMouldSetting: [
    {
      title: '中文名称',
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      title: '胶膜尺寸',
      dataIndex: 'filmSize',
      key: 'filmSize',
    },
    {
      title: '胶膜片数',
      dataIndex: 'filmNumber',
      key: 'filmNumber',
    },
    {
      title: '工费',
      dataIndex: 'costs',
      key: 'costs',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],

  // 模具仓位设定
  mouldPosition: [
    {
      title: '仓位编号',
      dataIndex: 'positionCode',
      key: 'positionCode',
    },
    {
      title: '房间号',
      dataIndex: 'roomNum',
      key: 'roomNum',
    },
    {
      title: '橱柜号',
      dataIndex: 'cabinetNum',
      key: 'cabinetNum',
    },
    {
      title: '抽屉号',
      dataIndex: 'drawerNum',
      key: 'drawerNum',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ],

  // 类别设定
  categorySet: [
    {
      title: '类别代码',
      dataIndex: 'unitCode',
      key: 'unitCode',
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
      title: '类别',
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
  ],
};

manuArr.forEach(subItem => {
  columnsArr[subItem] = columnsArr[subItem].map(row => ({ ...row, sorter: true }));
});

@Form.create()
@connect(({ dev }) => {
  return {
    dev,
    list: dev.list,
    pagination: dev.pagination,
    selectKey: dev.selectKey,
    choosenRowData: dev.choosenRowData,
    colorSetList: dev.colorSetList,
    selectedRowKeys: dev.selectedRowKeys,
    gemSetProcessDropDown: dev.gemSetProcessDropDown,
    listMstWordbookDrop: dev.listMstWordbookDrop,
  };
})
class Info extends Component {
  state = {
    mode: 'inline',
    modalType: '',
    addLoading:false,
    filelist:[],
    addData: {
      measureUnit: {
        unitCode: '',
        zhName: '',
        enName: '',
      },
      colorPercentage: {},
    },
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
    // console.log(SvgUtil);
    return SvgUtil[key];
  };

  // 点击menu 更换子页面回调 请求list数据
  handleSelectKey = ({ key }) => {
    const { dispatch, pagination } = this.props;
    dispatch({
      type: 'dev/getSelectKey',
      payload: key,
    });
    this.getList(key);

    // 还要清空所选中项
    dispatch({
      type: 'dev/changeSelectedRowKeys',
      payload: [],
    });

    dispatch({
      type: 'dev/getChoosenRowData',
      payload: { id: '', zhName: '', enName: '', unitCode: '' },
    });

  };

  // 获取对应key=》页面进行数据请求
  getList = (key = this.props.selectKey) => {
    const { dispatch, pagination } = this.props;
    const obj = {};
    manuArr.forEach(item => {
      obj[item] = `get${item}List`;
    });
    // getDevList
    dispatch({
      type: `dev/getList`,
      payload: { params: pagination, type: key },
      callback: () => {
        const { dev } = this.props;
        dev[`${dev.selectKey}List`].records.forEach((item) => {
          if (item.id === dev.choosenRowData.id) {
            dispatch({
              type: 'dev/getChoosenRowData',
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
        console.log(selectKey, '==============selectKey');
        // 镶石工艺
        if (selectKey === 'insertStoneTechnology') {
          dispatch({
            type: 'dev/getGemDropDown',
            payload: {},
          });
        }
        // 成色设定
        if (selectKey === 'colorPercentage') {
          dispatch({
            type: 'dev/getListMstWordbook',
            payload: {wordbookTypeCode:'H014'},
          });
        }
        if (selectKey === 'categorySet') {
          dispatch({
            type: 'dev/getListMstWordbookParams',
            payload: { wordbookTypeCode: 'H015' },
          });
          dispatch({
            type: 'dev/getListMstWordbookParams',
            payload: { wordbookTypeCode: 'H016' },
          });
        }
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
    const { dev } = this.props;
    return (
      <Form size="small">
        {
          dataArr && dataArr.map(({ key, value, noNeed, type, list }) => {
            // console.log(list)
            return (
              <div className="adddevModal" key={key}>
                <FormItem
                  label={key}
                  key={key}
                >
                  {
                    getFieldDecorator(value, {
                      rules: [{
                        required: !noNeed,
                        message: `请${type && (type === 2 || type === 3) ? '选择' : '输入'}${key}`,
                      }],
                      initialValue: isEdit ? choosenRowData[value] : undefined,
                    })(type && type === 2 ?
                      <Select placeholder="请选择" style={{ width: 180 }}>
                        {dev[list] && dev[list].map(({ value, key }) =>
                          <Option value={value}>{key}</Option>,
                        )}
                      </Select> :
                      type && type === 3 ?
                        <Radio.Group value={value}>
                          <Radio value={1}>是</Radio>
                          <Radio value={2}>否</Radio>
                        </Radio.Group>
                        :  <Input placeholder="请输入" />,
                    )
                  }
                </FormItem>
              </div>
            );
          })
        }
        {(selectKey !== 'measureUnit' ) && <Col span={24}>
          <FormItem
            label="上传图片"
            key="uploadPic"
            labelCol={{ span: 4 }}
            wrapperCol={{
              span: 20,
            }
            }
          >
            <UploadImg
              key="uimg"
              maxcount={10}
              defaultFileList={isEdit ? choosenRowData.pictures : []}
              fileListFun={(imglist) => {
                this.setState({ filelist: imglist });
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
    const { selectKey } = this.props;
    const menuText = <FormattedMessage id={`app.dev.menuMap.${selectKey}`} defaultMessage="Settings" />;
    return menuText;
  };

  // 新增按钮事件回调
  handleAdd = (close) => {
    const { selectKey, form } = this.props;
    const filelist = this.state.filelist.flatMap(e => e.url);

    form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          addLoading:true
        })

        let params = {
          ...values,
        };
        if (selectKey !== 'measureUnit' ) {
          params = {
            ...params, picPath: filelist,
          };
        }
        serviceObj[`addBasic${selectKey}`](params).then(res => {
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList();
            if(close){this.btnFn('')};
          }
          this.setState({
            addLoading:false
          })
        });
        this.setState({ filelist: [] });

      }
    });
  };

  // 编辑按钮回调
  handleEdit = (close) => {
    const { selectKey, form } = this.props;
    const filelist = this.state.filelist.flatMap(e => e.url);

    // 还要清空所选中项
    this.props.dispatch({
      type: 'dev/changeSelectedRowKeys',
      payload: [],
    });

    form.validateFields((err, values) => {
      if (!err) {
        const { choosenRowData } = this.props;
        let params = {
          ...values,
          id: choosenRowData.id,
        };
        if (selectKey !== 'measureUnit' ) {
          params = {
            ...params, picPath: filelist,
          };
        }
        this.setState({
          addLoading:true
        })
        serviceObj[`addBasic${selectKey}`](params).then(res => {
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            if(close){this.btnFn('')};
            this.getList();
          }

          this.setState({
            addLoading:false
          })
        });
        this.setState({ filelist: [] });

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
        this.getList();
      }
    });
  };

  // 审批/取消审批 按钮回调
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
   * 根据已经选中的列id 遍历获取对应status数组 判断返回是否显示取消审批或审批 按钮是否可用
   * return obj
   * params: name 名称
   * params: disabled 是否可点击
   * params: type 1为审批 2为取消审批
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
    if (isChexiao) return { name: '取消审批', disabled: false, type: 2 };
    return { name: '审批', disabled: true, type: 1 }; // 当两种状态都有 禁止点击
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
                  padding: '20px 20px 10px',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#35B0F4',
                }}
              >
                <FormattedMessage id={`app.dev.menuMap.${type}`} defaultMessage="" />
              </div>
              <Divider className={styles.divder} />
            </div>
            <GetRenderitem data={choosenRowData} type={type} />
          </div>

          {/* </Card> */}
          <Card bodyStyle={{ display: 'flex', paddingLeft: 5, paddingRight: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {btnGroup.map(({ name, tag }) => (
                <Button
                  key={tag}
                  className={styles.buttomControl}
                  type={(tag === 'delete' || (tag === 'lock' && returnLockType().type === 2)) ? 'danger' : 'primary'}
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
@connect(({ loading, dev }) => {
  return {
    dev,
    listLoading: loading.effects['dev/getList'],
    pagination: dev.pagination,
    choosenRowData: dev.choosenRowData,
    selectedRowKeys: dev.selectedRowKeys,
    selectKey: dev.selectKey,
  };
})
class CenterInfo extends Component {
  handleTableChange = obj => {
    const { dispatch, selectKey } = this.props;
    dispatch({
      type: 'dev/getList',
      payload: { type: selectKey, params: obj },
    });
    // dispatch({
    //   type: 'dev/getPagination',
    //   payload: ,
    // });
  };

  changeChoosenRow = rowData => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dev/getChoosenRowData',
      payload: rowData,
    });
  };


  // 更改table select数组
  onSelectChange = (selectedRowKeys) => {
    this.props.dispatch({
      type: 'dev/changeSelectedRowKeys',
      payload: selectedRowKeys,
    });
  };

  render() {
    const { onSelectChange, props, handleTableChange } = this;
    const { type, choosenRowData, pagination, dev, selectedRowKeys, listLoading } = props;
    const columns = columnsArr[type];
    const list = dev[`${type}List`];
    return (
      <div className={styles.view_left_content}>
        <div className={styles.contentTitle}>
          <Icon
            className={styles.titleIcon}
            component={SvgUtil[type]}
          />
          <FormattedMessage id={`app.dev.menuMap.${type}`} defaultMessage="" />
        </div>

        <div className={styles.tableBox}>
          <Table
            columns={columns}
            body={list}
            key={type}
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
  const getImages = (paths) => {
    if (!paths) return;
    return paths.map(v => (
      <div className={styles.carousel_image_ground} key={`as${Math.random(1)}`}>
        <Zmage
          alt="图片"
          align="center"
          className={styles.carousel_image}
          src={v}
          set={paths.map(image => ({ src: image }))}
        />
      </div>
    ));
  };
  const images = data.pictures && data.pictures.flatMap(e => e.picPath);

  return (
    <Card bordered={false} style={{maxWidth:"360px", overflow: 'auto' }} onClick={selectRowItem}>
      {(type !== 'measureUnit' ) &&
      <Carousel speed={150} initialSlide={0} className={styles.carousel_content} autoplay>
        {getImages(images)}
      </Carousel>}
      {images && images.length > 0 && <Divider />}

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
