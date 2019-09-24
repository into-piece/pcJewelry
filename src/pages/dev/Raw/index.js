/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:47:00
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Row, Col, Card, Button, Modal, Form, Input, notification, Select, Radio } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import SvgUtil from '@/utils/SvgUtil';
import Table from '@/components/Table';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import DescriptionList from '@/components/DescriptionList';
import serviceObj from '@/services/dev';
import LockTag from '@/components/LockTag';
import jsonData from './index.json';
import { statusConvert } from '@/utils/convert';

const { Description } = DescriptionList;
const { Item } = Menu;
const FormItem = Form.Item;
const { Option } = Select;

// manuArr是 =》menu配置提供遍历
// modalContent => 每个menu不同的增加弹窗填写信息
const { manuArr, modalContent } = jsonData;
// 左边menu遍历配置
const menuMap = manuArr.map(item => ({
  value: <FormattedMessage id={`app.dev.menuMap.${item}`} defaultMessage="Main material" />,
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
  { name: '删除', tag: 'delete' },
  { name: '编辑', tag: 'edit' },
  { name: '审批', tag: 'lock' },
];

const isLockList = false; // table是否锁定=》显示锁定标签做判断 先设定为否

// table 当前页对应的表头配置
const columnsArr = {
  // 计量单位表头
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
};


@Form.create()
@connect(({ devRaw }) => {
  return {
    dev: devRaw,
    list: devRaw.list,
    pagination: devRaw.pagination,
    selectKey: devRaw.selectKey,
    choosenRowData: devRaw.choosenRowData,
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
      type: 'devRaw/getSelectKey',
      payload: key,
    });
    this.getList(key);

    // 还要清空所选中项
    dispatch({
      type: 'devRaw/changeSelectedRowKeys',
      payload: [],
    });

    dispatch({
      type: 'devRaw/getChoosenRowData',
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
      type: `devRaw/getList`,
      payload: { params: pagination, type: key },
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
        // 主材
        if (selectKey === 'material') {
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
        // 成色设定
        if (selectKey === 'colorPercentage') {
          dispatch({
            type: 'devRaw/getListMstWordbook',
            payload: {},
          });
        }
        this.setState({ modalType });
        break;
      case 'delete':
        this.handleDelect();
        break;
      case 'lock':
        this.handleLock();
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
            // console.log(list);
            return (
              <FormItem label={key} {...formLayout} key={key}>
                {
                  getFieldDecorator(value, {
                    rules: [{
                      required: !noNeed,
                      message: `请${type && (type === 2 || type === 3) ? '选择' : '输入'}${key}`,
                    }],
                    initialValue: isEdit ? choosenRowData[value] : '',
                  })(type && type === 2 ?
                    <Select placeholder="请选择">
                      {dev[list] && dev[list].map(({ value, key }) =>
                        <Option value={value}>{key}</Option>,
                      )}
                    </Select> :
                    type && type === 3 ?
                      <Radio.Group>
                        <Radio value="0">计重</Radio>
                        <Radio value="1">计件</Radio>
                      </Radio.Group>
                      :
                      <Input placeholder="请输入" />,
                  )
                }
              </FormItem>
            );
          })
        }
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
            this.getList();
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
            this.getList();
            this.btnFn('');
          }
        });
      }
    });
  };

  // 删除按钮回调
  handleDelect = () => {
    const { selectKey, selectedRowKeys } = this.props;
    serviceObj[`deleteBasic${selectKey}`]({list:selectedRowKeys}).then(res => {
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
    serviceObj[serviceType + selectKey]({list:selectedRowKeys}).then(res => {
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
    const { selectedRowKeys } = this.props;
    if (tag === 'plus') return false;
    if (tag === 'lock') {
      return selectedRowKeys.length === 0 || this.returnLockType().disabled;
    }
    return selectedRowKeys.length === 0;
  };

  render() {
    const { state, props, btnFn, getModalContent, returnTitle, handleModalOk, returnLockType, returnSisabled } = this;
    const { mode, modalType } = state;
    const { list, selectKey, choosenRowData } = props;
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
          title={returnTitle()}
          width={640}
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
              {btnGroup.map(({ name, tag }) => (
                <Button
                  key={tag}
                  className={styles.buttomControl}
                  type="primary"
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
    choosenRowData: devRaw.choosenRowData,
    selectedRowKeys: devRaw.selectedRowKeys,
  };
})
class CenterInfo extends Component {
  changePagination = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'devRaw/getDevList',
      payload: obj,
    });
    dispatch({
      type: 'devRaw/getPagination',
      payload: obj,
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

  render() {
    const { onSelectChange, props } = this;
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
            changeChoosenRow={this.changeChoosenRow}
            selectKey={choosenRowData.id}
            pagination={pagination}
            changePagination={this.changePagination}
            selectedRowKeys={selectedRowKeys}
            onSelectChange={onSelectChange}
            listLoading={listLoading}
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
                : <Description key={key} term={key}>{value === 'status' ? statusConvert[data[value]] : data[value]}</Description>
            );
          })
        }
      </DescriptionList>
    </div>
  );
};

export default Info;
