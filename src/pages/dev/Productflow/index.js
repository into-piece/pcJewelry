import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Radio,
  Checkbox,
  DatePicker,
 notification } from 'antd';
import ModalConfirm from '@/utils/modal';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
// 详情内容
import GetRenderitem from './components/GetRenderitem';
// 中间Table
import MiddleTable from './components/MiddleTable';

// 弹窗输入配置&显示配置
import modalInput from './config/modalInput';
import showItem from './config/showItem';
import styles from './index.less';

import serviceObj from '@/services/dev';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
// 右手边按钮集合
const btnGroup = [
  { name: '新增', tag: 'plus' },
  { name: '删除', tag: 'delete' },
  { name: '编辑', tag: 'edit' },
  { name: '审批', tag: 'lock' },
  // { name: '复制', tag: 'copy' },
];

// const isLockList = false; // table是否锁定=》显示锁定标签做判断 先设定为否

const defaultModelName = 'productflow';

const firstTabFlag = 'productFlow';

const radioArr = [{ key: '生产流程', value: 'productFlow' },
  { key: '员工工序', value: 'productProcess' }];

@Form.create()
@connect(({  loading, productflow: model }) => {
  return {
    model,
    listLoading: loading.effects[`${defaultModelName}/getList`],
    listLoadingSecond: loading.effects[`${defaultModelName}/getListSecond`],
    list: model.list,
    listSecond: model.listSecond,
    pagination: model.pagination,
    paginationSecond: model.paginationSecond,
    choosenRowData: model.choosenRowData,
    choosenRowDataSecond: model.choosenRowDataSecond,
    selectedRowKeys: model.selectedRowKeys,
    selectedRowKeysSecond: model.selectedRowKeysSecond,
    searchParams: model.searchParams,
    searchParamsSecond: model.searchParamsSecond,
  };
})
class Index extends Component {
  state = {
    modalType: '',
    // 第二个table选中tab标志 没有tab则冗余
    secondTableActive: 'productProcess',
    // 右边默认选中tab标志
    rightActive: firstTabFlag,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // 类别下拉
    dispatch({
      type: `${defaultModelName}/getwordbookdropdown`,
      payload: {params: { 'wordbookTypeCode': 'H017' },listName:"listH017"}
    });
    // 成品类别下拉
    dispatch({
      type: `${defaultModelName}/getTypeByWordbookCode`,
      payload: {params: {"key":"H016009"},listName:"listH016009"}
    });
    // 部门下拉
    dispatch({
      type: `${defaultModelName}/listDeptDropDown`,
    });
    // 镶石工艺下拉
    dispatch({
      type: `${defaultModelName}/listGemSetProcessDropDown`,
      payload:{}
    });


    // 获取初始表单数据
    this.getList();
  }

  // 右边顶部tab切换
  changeRightActive = (v) => {
    const { secondTableActive } = this.state;
    this.setState({
      rightActive: v.target.value,
      secondTableActive: v.target.value === firstTabFlag ? secondTableActive : v.target.value,
    });
  };


  // table 搜索
  onSearch = (params,table) => {
    if(table===1){
      this.getList({},params);
    }
    if(table===2){
      this.getListSecond({},params);
    }
  };

  // 第一table获取list
  getList = (args, param) => {
    const { dispatch, pagination, searchParams } = this.props;
    // getDevList
    dispatch({
      type: `${defaultModelName}/getList`,
      payload: { type:firstTabFlag,params: { ...pagination, ...searchParams, ...param }, ...args },
    });

    // 清除第二table内容
    dispatch({
      type: `${defaultModelName}/clearListScond`,
    });
  };

  // 第二table获取list
  getListSecond = (args, param) => {
    const { dispatch, paginationSecond, searchParamsSecond,choosenRowDataSecond} = this.props;
    const { secondTableActive } = this.state;
    // getDevList
    dispatch({
      type: `${defaultModelName}/getListSecond`,
      payload: { type:secondTableActive,params: { ...paginationSecond, ...searchParamsSecond, ...param }, ...args },
    });

  };






  // type 2 下啦选择
  // type 3 点击事件
  // type 4 文字
  // type 5 check
  // type 6 radio
  // type 7 被顺带出的文字
  // type 8 inputext
  returnElement = ({ key, value, noNeed, type, list, clickFn, text, arr, data, form ,number}) => {
    switch (type) {
      case 2:
        return (
          <Select
            style={{ width: 180 }}
            placeholder="请选择"
            onChange={(v) => {
              this.handleSelectChange&&this.handleSelectChange(v, value);
            }}
          >
            {data[list] && data[list].map(({ value, key }) => <Option value={value} key={value}>{key}</Option>,
            )}
          </Select>
        );
      case 3:
        return (
          <p style={{ maxWidth: 180 }}> {form.getFieldValue(value) || ''} <span
            style={{ color: '#40a9ff', cursor: 'pointer' }}
            onClick={() => {
              this[clickFn](1);
            }}
          > {text}
          </span>
          </p>
        );
      case 4:
        return (
          <span>{value || ''}</span>
        );
      case 5:
        return <Checkbox
          checked={form.getFieldValue(value)}
          onChange={e => {
            this.handleCheckChange(e, value);
          }}
        >{text}
        </Checkbox>;
      case 6:
        return <Radio.Group>
          {
            arr.map(({ key, value }) => {
              return <Radio value={value} key={value}>{key}</Radio>;
            })
          }
        </Radio.Group>;
      case 7:
        return <span>{form.getFieldValue(value) || ''}</span>;
      case 8:
        return <TextArea rows={2} placeholder="请输入" />;
      case 9:
        return <RangePicker
          style={{ marginRight: 10 }}
          onChange={(date, dateString) => {
            this.handleDatePicker(date, dateString, value);
          }}
        />;
      default:
        return <Input style={{ width: '100' }} type={number?'number':'text'} placeholder="请输入" />;
    }
    //  type === 7 ?
  };


  // 获取Modal的标题
  returnTitle = () => {
    const { modalType } = this.state;
    let text = '';
    switch (modalType) {
      case 'plus':
        text = '新增';
        break;
      case 'edit':
        text = '编辑';
        break;
      default:
        break;
    }
    return `${text}`;
  };

  // 弹窗确定提交回调
  handleModalOk = () => {
    const { modalType } = this.state;
    switch (modalType) {
      case 'plus':
      case 'edit':
        this.handleAdd();
        break;
      default:
        break;
    }

  };

  // 删除按钮回调
  handleDelect = () => {
    const {  selectedRowKeys, selectedRowKeysSecond,dispatch } = this.props
    const { rightActive ,secondTableActive} = this.state
    const data = rightActive === firstTabFlag?selectedRowKeys:selectedRowKeysSecond;
    serviceObj[`delete${rightActive}`](data).then(res => {
      const { rtnCode, rtnMsg } = res.head
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        if (rightActive === firstTabFlag) {
          this.getList({ type: rightActive });
          dispatch({
            type: `${defaultModelName}/choosenRowData`,
            payload:{id:""}
          });
          // 清除第二table内容
          dispatch({
            type: `${defaultModelName}/clearListScond`,
          });
        }else{
          this.getListSecond({ type: secondTableActive });
          // 清除第二table 选中
          dispatch({
            type: `${defaultModelName}/choosenRowDataSecond`,
            payload:{id:""}
          });
        }
      }
    })
  }

  // 审批/撤销 按钮回调
  handleLock = () => {
    const {  selectedRowKeys, selectedRowKeysSecond } = this.props
    const { rightActive ,secondTableActive} = this.state
    const data = rightActive === firstTabFlag?selectedRowKeys:selectedRowKeysSecond;
    const isLock = this.returnLockType().type === 1  // 根据this.returnLockType()判断返回当前是撤回还是审批
    const serviceType = isLock ? 'approve' : 'revoke';

    serviceObj[`${serviceType}${rightActive}`](data).then(res => {
      const { rtnCode, rtnMsg } = res.head
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        if (rightActive === firstTabFlag) {
          this.getList({ type: rightActive });
        }else{
          this.getListSecond({ type: secondTableActive });
        }
      }
    })
  }

  // 新增||编辑 按钮事件回调
  handleAdd = () => {
    const {  form, choosenRowData,choosenRowDataSecond } = this.props
    const { secondTableActive,rightActive,modalType } = this.state
    let params = {}
    if (rightActive !== firstTabFlag) {
      params = { flowCode: choosenRowData.flowCode }
    }
    if(modalType ==="edit"){
      params ={...params,id:(rightActive !== firstTabFlag?choosenRowDataSecond.id:choosenRowData.id)}
    }

    form.validateFields((err, values) => {
      if (!err) {
        params = {
          ...params,
          ...values,
        }

        serviceObj[`add${rightActive}`](params).then(res => {
          if (!res.head) {
            return;
          }
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            if (rightActive === firstTabFlag) {
              this.getList({ type: rightActive });
            }else{
              this.getListSecond({ type: secondTableActive });
            }

            this.btnFn('');
          }
        });
      }
    });

  }

  // 获取新增/编辑弹窗内容
  getModalContent = () => {
    const {
      choosenRowData,
      choosenRowDataSecond,
      form,
    } = this.props;
    const {
      modalType,
      rightActive,
    } = this.state;
    const { getFieldDecorator } = form;

    const content = '';
    const isEdit = modalType === 'edit';
    const { model } = this.props;
    const addArr = modalInput[rightActive];
    return (
      <Form size="small" key="1">
        {
          addArr && addArr.map(({ key, value, noNeed, type, list, clickFn, text, arr, initValue, number }) => {
            return (
              <div className="addModal" key={key}>
                <FormItem
                  label={key}
                >
                  {
                    getFieldDecorator(value, {
                      rules: [{ required: !noNeed, message: `请${type && type === 2 ? '选择' : '输入'}${key}` }],
                      initialValue: isEdit ? (rightActive === firstTabFlag ? choosenRowData[value] : choosenRowDataSecond[value]) : initValue || (number ? 0 : undefined),
                    })(this.returnElement({
                      key,
                      value,
                      noNeed,
                      number,
                      type,
                      list,
                      clickFn,
                      text,
                      arr,
                      initValue,
                      data: model,
                      form,
                    }))
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

  // 列表对应操作button回调
  btnFn = async (modalType) => {
    switch (modalType) {
      case 'plus':
      case 'edit':
      default:
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
        ModalConfirm({
          content: '确定审批吗？', onOk: () => {
            this.handleLock();
          },
        });
        break;
    }
  };

  /**
   * 根据已经选中的列id 遍历获取对应status数组 判断返回是否显示撤销或审批 按钮是否可用
   * return obj
   * params: name 名称
   * params: disabled 是否可点击
   * params: type 1为审批 2为撤销
   */
  returnLockType = () => {
    const { selectedRowKeys, selectedRowKeysSecond, model, list, listSecond } = this.props;
    const { rightActive } = this.state;
    const listr = rightActive === firstTabFlag  ? list : listSecond;
    const selectedKeys =  rightActive === firstTabFlag ? selectedRowKeys : selectedRowKeysSecond;
    if (listr && listr.records.length === 0) return { name: '审批', disabled: true, type: 1 };
    const isLock1 = selectedKeys.reduce((res, cur) => {
      const singleObjcect = listr.records.find(subItem => subItem.id === cur);
      if (singleObjcect) res.push(singleObjcect.status);
      return res;
    }, []);
    const isShenPi = isLock1.every((item) => Number(item) === 0); // 是否全是0
    const isChexiao = isLock1.every((item) => Number(item) === 2); // 是否全是2
    if (isShenPi) return { name: '审批', disabled: false, type: 1 ,isShenPi,isChexiao};
    if (isChexiao) return { name: '撤销', disabled: false, type: 2 ,isShenPi,isChexiao};
    return { name: '审批', disabled: true, type: 1 ,isShenPi,isChexiao}; // 当两种状态都有 禁止点击
  };

  // 判断按钮是否禁止 返回boolean
  returnSisabled = (tag) => {
    const { selectedRowKeys, selectedRowKeysSecond,choosenRowData,choosenRowDataSecond } = this.props;
    const { rightActive } = this.state;

    if (tag === 'plus') return  (firstTabFlag===rightActive?false:!choosenRowData.id);
    if (tag === 'lock') return  (firstTabFlag===rightActive&& selectedRowKeys.length === 0) ||  (firstTabFlag!==rightActive&&selectedRowKeysSecond.length === 0) || this.returnLockType().disabled;

    if (tag ==='delete'){
      return (firstTabFlag===rightActive&& selectedRowKeys.length === 0) ||  (firstTabFlag!==rightActive&&selectedRowKeysSecond.length === 0) || !this.returnLockType().isShenPi;
    }
    if (tag ==='edit'){
      const d =firstTabFlag===rightActive? choosenRowData:choosenRowDataSecond;
      return   (firstTabFlag===rightActive&&selectedRowKeys.length === 0 )||(firstTabFlag!==rightActive&&   selectedRowKeysSecond.length === 0)||Number(d.status)===2;
    }

    return   (firstTabFlag===rightActive&&selectedRowKeys.length === 0 )||(firstTabFlag!==rightActive&&   selectedRowKeysSecond.length === 0);
  };

  // 取消弹窗回调
  onCancel = () => {
    this.btnFn('');
  }


  render() {
    const {
      state,
      props,
      btnFn,
      returnSisabled,
      returnLockType,
      returnListName,
      changeRightActive,
      getModalContent,
      handleModalOk,
      onCancel,
      returnElement,
      onSearch,
      returnTitle,
    } = this;
    const { modalType, rightActive, secondTableActive } = state;
    const { choosenRowData, choosenRowDataSecond } = props;


    return (
      <div className={styles.page}>
        {/* <Bread data={breadData} /> */}
        <div className={styles.center_content}>
          {/* lg={17} md={24} */}
          <div className={styles.main}>
            <div className={styles.right} style={{ width: '100%' }}>
              <GridContent>
                <Row gutter={24} className={styles.row_content}>
                  {/* 中间table组件 */}
                  <Col lg={16} md={24}>
                    <MiddleTable
                      firstType={firstTabFlag}
                      secondType={secondTableActive}
                      returnElement={returnElement}
                      onSearch={onSearch}
                    />
                  </Col>
                  {/* 右边显示详细信息和按钮操作 */}
                  <Col lg={8} md={24}>
                    <div className={styles.view_right_content}>
                      <Card bordered={false}>
                        <Radio.Group
                          size="small"
                          className={styles.right_content_tabgroud}
                          onChange={changeRightActive}
                          buttonStyle="solid"
                          value={rightActive}
                          style={{ textAlign: 'center' }}
                        >
                          {
                            radioArr.map((item, index) =>
                              <Radio.Button
                                key={item.value}
                                style={{
                                  height: 40,
                                  width: 130,
                                  textalign: 'center',
                                  lineHeight: '40px',
                                }}
                                value={item.value}
                              >{item.key}
                              </Radio.Button>)
                          }
                        </Radio.Group>
                        <GetRenderitem
                          key={firstTabFlag === rightActive ? choosenRowData.id : choosenRowDataSecond.id}
                          data={firstTabFlag === rightActive ? choosenRowData : choosenRowDataSecond}
                          type={rightActive}
                          items={showItem}
                        />
                      </Card>

                      {/*  */}
                      <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {btnGroup.map(({ name, tag }) => (
                            <Button
                              key={tag}
                              className={styles.buttomControl}
                              type={tag==='delete'?'danger':"primary"}
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
            </div>
          </div>
        </div>
        {handleModalOk &&
        <Modal
          maskClosable={false}
          title={returnTitle()}
          width={1000}
          className={styles.standardListForm}
          bodyStyle={{ padding: '28px 0 0' }}
          destroyOnClose
          onOk={handleModalOk}
          visible={modalType !== ''}
          onCancel={onCancel}
        >
          {getModalContent()}
        </Modal>
        }
      </div>
    );
  }


}

export default Index;