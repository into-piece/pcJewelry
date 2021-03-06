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
  Divider,
  Select,
  Radio,
  Checkbox,
  DatePicker,
  InputNumber,
  notification,
} from 'antd';
import ModalConfirm from '@/utils/modal';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
// 详情内容
import { FormattedMessage } from 'umi-plugin-react/locale';
import moment from 'moment/moment';
import GetRenderitem from './components/GetRenderitem';
// 中间Table
import MiddleTable from './components/MiddleTable';
import SelectCustomerOrder from './components/SelectCustomerOrder';

// 弹窗输入配置&显示配置
import modalInput from './config/modalInput';
import showItem from './config/showItem';

import styles from './index.less';
import BuildTitle from '@/components/BuildTitle';

import serviceObj from '@/services/business';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
// 成品采购主页按钮集合
const btnGroup = [
  { name: '新增', tag: 'plus' },
  { name: '删除', tag: 'delete', type: 'danger' },
  { name: '编辑', tag: 'edit' },
  { name: '审批', tag: 'lock' },
];

// 主页详细按钮
const btnGroupSecond = [
  { name: '新增', tag: 'plus' },
  { name: '删除', tag: 'delete', type: 'danger' },
  { name: '编辑', tag: 'edit' },
];

// const isLockList = false; // table是否锁定=》显示锁定标签做判断 先设定为否

const defaultModelName = 'fppurchase';

const firstTabFlag = 'fppurchase';

const radioArr = [{ key: '成品采购主页', value: 'fppurchase' },
  { key: '主页详细', value: 'fpdetail' }];

@Form.create()
@connect(({ loading, fppurchase: model }) => {
  return {
    model,
    listLoading: loading.effects[`${defaultModelName}/getList`],
    listLoadingSecond: loading.effects[`${defaultModelName}/getListSecond`],
    customerListLoading: loading.effects[`${defaultModelName}/getListCustomer`],
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
    addloading: false,
    modalType: '',
    // 第二个table选中tab标志 没有tab则冗余
    secondTableActive: 'fpdetail',
    // 右边默认选中tab标志
    rightActive: firstTabFlag,

    showCustomerNoModal: false,
  };

  componentDidMount() {
    this.initDrop();
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

  initDrop = () => {
    const { rightActive } = this.state;
    const { dispatch } = this.props;
    if (rightActive === firstTabFlag) {
      // 付款类别接口
      dispatch({
        type: `${defaultModelName}/getwordbookdropdown`,
        payload: { params: { 'wordbookTypeCode': 'H019' }, listName: 'listH019' },
      });
      // 币种接口
      dispatch({
        type: `${defaultModelName}/getwordbookdropdown`,
        payload: { params: { 'wordbookTypeCode': 'H006' }, listName: 'listH006' },
      });
      // 获取当天默认主材价格接口
      dispatch({
        type: `${defaultModelName}/getMainMaterialPrice`,
        payload: {},
      });
      // 供应商编号接口下拉
      dispatch({
        type: `${defaultModelName}/getCommonList`,
        payload: { params: {}, propsName: 'supplierlistDropDown', apiname: 'supplierlistDropDown' },
      });

    }

  };

  // 获取客户订单 table数据
  customerSearch = (args) => {
    const { dispatch, model } = this.props;
    dispatch({
      type: `${defaultModelName}/getListCustomer`,
      payload: { ...model.customerPagination, ...args },
    });
  };

  handleCustomerNoOk = () => {
    // 选择客户订单 反显客户编号  客户简称 备注
    const { dispatch, form, model } = this.props;
    const value = model.customerList.records.filter(item => item.id === model.choosenRowDataCustomer.id)[0];
    form.setFieldsValue({
      remarks: value.remarks,
      customerOrderId: value.id,
      customerNo: value.customerNo,
      customerShotName: value.customerShotName,
    });
    this.setState({ showCustomerNoModal: false });
  };

  handleCustomerNoCancel = () => {
    const { dispatch } = this.props;
    this.setState({ showCustomerNoModal: false });
    dispatch({
      type: `${defaultModelName}/changeProps`,
      payload: {
        typeName: 'paginationCustomer', data: {
          current: 1,
          size: 10,
        },
      },
    });
    // 清空列表
    dispatch({
      type: `${defaultModelName}/changeProps`,
      payload: {
        typeName: 'customerList', data: { records: [] },
      },
    });
  };

  changeCustomerChoosenRow = (rowData) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/changeProps`,
      payload: {data:rowData,typeName:'choosenRowDataCustomer'},
    });
  };

  onCustomerSelectChange = (selectedRowKeys) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/changeProps`,
      payload: {data:selectedRowKeys,typeName:'customerSelectedKeys'},
    });
  };


  // table 搜索
  onSearch = (params, table) => {
    if (table === 1) {
      this.getList({}, params);
    }
    if (table === 2) {
      this.getListSecond({}, params);
    }
  };

  // 第一table获取list
  getList = (args, param) => {
    const { dispatch, pagination, searchParams } = this.props;
    // getDevList
    dispatch({
      type: `${defaultModelName}/getList`,
      payload: { type: firstTabFlag, params: { ...pagination, ...searchParams, ...param }, ...args },
    });

    // 清除第二table内容
    dispatch({
      type: `${defaultModelName}/clearListScond`,
    });
  };

  // 第二table获取list
  getListSecond = (args, param) => {
    const { dispatch, paginationSecond, searchParamsSecond, choosenRowData } = this.props;
    const { secondTableActive } = this.state;
    // getDevList
    dispatch({
      type: `${defaultModelName}/getListSecond`,
      payload: {
        type: secondTableActive,
        params: {
          ...paginationSecond, ...searchParamsSecond, ...param,
          flowCode: param.flowCode || choosenRowData.flowCode,
        }, ...args,
      },
    });

  };

  //  弹窗表单 check回调
  handleCheckChange = (e, value) => {
    const { form } = this.props;
    form.setFieldsValue({
      value: e.target.checked ? 1 : 0,
    });
    // if (value === 'isWeighStones') {
    //   const isWeighStones = e.target.checked === 1;
    //   if (isWeighStones) {
    //     form.validateFields(['stonePrice', 'mainMaterialWeight'], { disabled: true });
    //   }
  };

// 弹窗表单 下拉回调
  handleSelectChange = (value, type) => {
    const { model, form, dispatch } = this.props;
    // 成品采购主页  供货商编号 反显供货商简称 联系人 手机
    if (type === 'supplierId') {
      const mm = model.supplierlistDropDown.filter(item => item.id === value)[0];
      if (mm) {
        form.setFieldsValue({
          supplierId: mm.id,
          supplierShotName: mm.shotName,
          contactName: mm.contactName,
          mobilePhone: mm.mobilePhone,
        });
      }

    }

  };

  handleDatePicker = (date, dateString, v) => {
    const { form } = this.props;
    const customerShotName = form.getFieldValue('customerShotName') || '';
    const quoteDate = moment(dateString);
    // form.setFieldsValue({
    //   quoteDate,
    //   quoteNumber: `${moment(quoteDate).format('YYYYMMDD')}_Quote_${customerShotName}`,
    // });
  };

  returnElement = ({ key, value, disabled, type, list, arr, data, clickFn, form, number, step, min, max, precision }) => {
    switch (type) {
      case 1:
        return <RangePicker
          disabled={disabled}
          onChange={(date, dateString) => {
            this.handleDatePicker(date, dateString, value);
          }}
        />;
      case 2:
        return (
          <Select
            disabled={disabled}

            placeholder="请选择"
            onChange={(v) => {
              this.handleSelectChange(v, value);
            }}
          >
            {data[list] && data[list].map((i) => <Option value={i.value} key={i.value}>{i.key}</Option>,
            )}
          </Select>
        );
      case 3:
        return <DatePicker
          disabled={disabled}

          style={{ width: '100%' }}
          allowClear={false}
          onChange={(date, dateString) => {
            this.handleDatePicker(date, dateString, value);
          }}
        />;
      case 4:
        return (
          <p style={{ margin: 0 }}>
            {/* {form.getFieldValue(value) || ''} */}
            <span
              style={{ color: '#40a9ff', cursor: 'pointer', marginLeft: 10 }}
              onClick={() => {
                clickFn && clickFn();
              }}
            >
              选择
            </span>
          </p>
        );
      case 5:
        return <Checkbox
          disabled={disabled}

          checked={form.getFieldValue(value)}
          onChange={e => {
            this.handleCheckChange(e, value);
          }}
        >{text}
        </Checkbox>;
      case 6:
        return <Radio.Group disabled>
          {
            arr.map(({ key, value }) => {
              return <Radio value={value} key={value}>{key}</Radio>;
            })
          }
        </Radio.Group>;
      case 7:
        return (<Select
          disabled={disabled}
          onChange={(v) => {
            this.handleSelectChange(v, value);
          }}
          placeholder="请选择"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {data && data[list] && data[list].map(({ value, key }) =>
            <Option value={value} key={value}>{key}</Option>,
          )}
        </Select>);
      case 8:
        return <TextArea
          disabled={disabled}
          rows={2}
          placeholder="请输入"
        />;
      default:
        return number ?
          <InputNumber
            disabled={disabled}

            placeholder="请输入"
            style={{ width: '100%' }}
            precision={precision}
            step={step}
            min={min}
            max={max}
          /> :
          <Input
            disabled={disabled}
            placeholder="请输入"
          />;
    }
    //  type === 7 ?
  };


// 获取Modal的标题
  returnTitle = () => {
    const { rightActive } = this.state;

    const menuText = <FormattedMessage id={`menu.erp.business.${rightActive}`} defaultMessage="Settings" />;
    return menuText;
  };

// 弹窗确定提交回调
  handleModalOk = (close) => {
    const { modalType } = this.state;
    switch (modalType) {
      case 'plus':
      case 'edit':
        this.handleAdd(close);
        break;
      default:
        break;
    }

  };

// 删除按钮回调
  handleDelect = () => {
    const { selectedRowKeys, selectedRowKeysSecond, dispatch } = this.props;
    const { rightActive, secondTableActive } = this.state;
    const data = rightActive === firstTabFlag ? selectedRowKeys : selectedRowKeysSecond;
    serviceObj[`delete${rightActive}`](data).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        if (rightActive === firstTabFlag) {
          this.getList({ type: rightActive });
          dispatch({
            type: `${defaultModelName}/choosenRowData`,
            payload: { id: '' },
          });
          // 清除第二table内容
          dispatch({
            type: `${defaultModelName}/clearListScond`,
          });
        } else {
          this.getListSecond({ type: secondTableActive });
          // 清除第二table 选中
          dispatch({
            type: `${defaultModelName}/choosenRowDataSecond`,
            payload: { id: '' },
          });
        }
      }
    });
  };

// 审批/撤销 按钮回调
  handleLock = () => {
    const { selectedRowKeys, selectedRowKeysSecond } = this.props;
    const { rightActive, secondTableActive } = this.state;
    const data = rightActive === firstTabFlag ? selectedRowKeys : selectedRowKeysSecond;
    const isLock = this.returnLockType().type === 1;  // 根据this.returnLockType()判断返回当前是撤回还是审批
    const serviceType = isLock ? 'approval' : 'revoke';

    serviceObj[`${serviceType}${rightActive}`](data).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        if (rightActive === firstTabFlag) {
          this.getList({ type: rightActive });
        } else {
          this.getListSecond({ type: secondTableActive });
        }
      }
    });
  };

// 新增||编辑 按钮事件回调
  handleAdd = (close) => {
    const { form, choosenRowData, choosenRowDataSecond } = this.props;
    const { secondTableActive, rightActive, modalType } = this.state;
    let params = {};
    if (rightActive !== firstTabFlag) {
      params = { flowCode: choosenRowData.flowCode };
    }


    if (modalType === 'edit') {
      params = { ...params, id: (rightActive !== firstTabFlag ? choosenRowDataSecond.id : choosenRowData.id) };
    }
    this.setState({ addloading: true });

    const dataArr = modalInput[rightActive];
    const fieldslist = dataArr.map(e => e.value);
    form.validateFields(fieldslist, (err, values) => {
      if (!err) {
        params = {
          ...params,
          ...values,
        };
        // 日期转换 成时间戳提交
        if(rightActive===firstTabFlag){
          params={...params,purchaseDate:moment(params.purchaseDate).valueOf(),supplierDate:moment(params.supplierDate).valueOf()}
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
            } else {
              this.getListSecond({ type: secondTableActive });
            }
            if (close) this.btnFn('');
          }
        });
      }
      this.setState({ addloading: false });

    });

  };

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
        <Row gutter={16}>
          {
            addArr && addArr.map(({ key, value, noNeed, disabled, type, list, clickFn, arr, number, dfv, step, min, max, precision, wrapperColSpan, labelColSpan, auto, colSpan }) => {
              if (rightActive === firstTabFlag && value === 'principalPrice') {
                // 主材价默认值
                dfv = model.materialPriceToday || 0;
              }
              if (auto && rightActive === firstTabFlag && value === 'purchaseNo' && !isEdit) {
                // 新增成品采购主页时 不显示自动生成的采购单号  由后端生成
                return null;
              }
              if (['supplierDate', 'purchaseDate'].indexOf(value) > -1) {
                dfv = moment();
                if (rightActive === firstTabFlag) {
                  choosenRowData[value] = moment(choosenRowData[value]);
                } else {
                  choosenRowDataSecond[value] = moment(choosenRowDataSecond[value]);
                }
              }

              if (value === 'customerOrderId' && rightActive === firstTabFlag) {
                clickFn = () => {
                  // 弹出 客户订单选择
                  // 成品采购主页  客户订单 反显客户编号  客户简称
                  this.setState({ showCustomerNoModal: true });
                  this.customerSearch({ size: 6, current: 1 });
                };
              }


              return (
                <Col span={colSpan || 6} style={{ paddingRight: '5px"' }} key={key}>
                  <FormItem
                    labelCol={{ span: labelColSpan || 3 }}
                    wrapperCol={{
                      span: wrapperColSpan || 20,
                    }
                    }
                    label={key}
                  >
                    {
                      getFieldDecorator(value, {
                        rules: [{ required: !noNeed, message: `请${type && type === 2 ? '选择' : '输入'}${key}` }],
                        initialValue: isEdit ? (rightActive === firstTabFlag ? choosenRowData[value] : choosenRowDataSecond[value]) : (number ? 0 : dfv || undefined),
                      })(this.returnElement({
                        key,
                        value,
                        disabled,
                        number,
                        type,
                        list,
                        clickFn,
                        arr,
                        data: model,
                        form,
                        step, min, max, precision,
                      }))
                    }
                  </FormItem>
                </Col>
              );
            })
          }
          {content}
        </Row>
      </Form>
    );
  };

// 列表对应操作button回调
  btnFn = async (modalType) => {
    switch (modalType) {
      case 'plus':
      case 'edit':
        this.initDrop();
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
      default:
        const { dispatch } = this.props;
        const { rightActive } = this.state;

        if (rightActive === firstTabFlag) {
          dispatch({
            type: `${defaultModelName}/changeProps`,
            payload: {
              typeName: 'customerChoosenRowData', data: { id: '' },
            },
          });
        }


        this.setState({ modalType });
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
    const listr = rightActive === firstTabFlag ? list : listSecond;
    const selectedKeys = rightActive === firstTabFlag ? selectedRowKeys : selectedRowKeysSecond;
    if (listr && listr.records.length === 0) return { name: '审批', disabled: true, type: 1 };
    const isLock1 = selectedKeys.reduce((res, cur) => {
      const singleObjcect = listr.records.find(subItem => subItem.id === cur);
      if (singleObjcect) res.push(singleObjcect.status);
      return res;
    }, []);
    const isShenPi = isLock1.every((item) => Number(item) === 0); // 是否全是0
    const isChexiao = isLock1.every((item) => Number(item) === 2); // 是否全是2
    if (isShenPi) return { name: '审批', disabled: false, type: 1, isShenPi, isChexiao };
    if (isChexiao) return { name: '取消审批', disabled: false, type: 2, isShenPi, isChexiao };
    return { name: '审批', disabled: true, type: 1, isShenPi, isChexiao }; // 当两种状态都有 禁止点击
  };

// 判断按钮是否禁止 返回boolean
  returnSisabled = (tag) => {
    const { selectedRowKeys, selectedRowKeysSecond, choosenRowData, choosenRowDataSecond } = this.props;
    const { rightActive } = this.state;
    if (rightActive === 'fpdetail' && choosenRowData.status === '2') {
      // 主页选中数据为已审批，详细不可新增 编辑 删除
      return true;
    }
    if (tag === 'plus') return (firstTabFlag === rightActive ? false : !choosenRowData.id);
    if (tag === 'lock') return (firstTabFlag === rightActive && selectedRowKeys.length === 0) || (firstTabFlag !== rightActive && selectedRowKeysSecond.length === 0) || this.returnLockType().disabled;

    if (tag === 'delete') {
      return (firstTabFlag === rightActive && selectedRowKeys.length === 0) || (firstTabFlag !== rightActive && selectedRowKeysSecond.length === 0) || !this.returnLockType().isShenPi;
    }
    if (tag === 'edit') {
      const d = firstTabFlag === rightActive ? choosenRowData : choosenRowDataSecond;
      return (firstTabFlag === rightActive && selectedRowKeys.length === 0) || (firstTabFlag !== rightActive && selectedRowKeysSecond.length === 0) || Number(d.status) === 2;
    }


    return (firstTabFlag === rightActive && selectedRowKeys.length === 0) || (firstTabFlag !== rightActive && selectedRowKeysSecond.length === 0);
  };

// 取消弹窗回调
  onCancel = () => {
    this.btnFn('');
  };


  render() {
    const {
      state
      ,
      props
      ,
      btnFn
      ,
      returnSisabled
      ,
      returnLockType
      ,
      changeRightActive
      ,
      getModalContent
      ,
      handleModalOk
      ,
      onCancel
      ,
      returnElement
      ,
      onSearch
      ,
      returnTitle
      ,
    }

      = this;
    const { modalType, rightActive, secondTableActive, addloading } = state;
    const { choosenRowData, choosenRowDataSecond, model } = props;

    const btnrealGroup = rightActive === firstTabFlag ? btnGroup : btnGroupSecond;


    const modalFooter = modalType === 'plus' ? [
      <Button
        key="back"
        onClick={() => {
          btnFn('');
        }}
      >
        取消
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={addloading}
        onClick={() => {
          handleModalOk(true);
        }}
      >
        保存
      </Button>,
      <Button
        key="continue"
        type="primary"
        loading={addloading}
        onClick={() => {
          handleModalOk(false);
        }}
      >
        继续添加
      </Button>,
    ] : [
      <Button
        key="back"
        onClick={() => {
          btnFn('');
        }}
      >
        取消
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={addloading}
        onClick={() => {
          handleModalOk(false);
        }}
      >
        保存
      </Button>,
    ];

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
                      changedetailtab={(type) => {
                        this.setState({ rightActive: (type === 1 ? firstTabFlag : 'fpdetail') });
                      }}
                      firstType={firstTabFlag}
                      secondType={secondTableActive}
                      returnElement={returnElement}
                      onSearch={onSearch}
                    />
                  </Col>
                  {/* 右边显示详细信息和按钮操作 */}
                  <Col lg={8} md={24}>
                    <div className={styles.view_right_content}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        overflow: 'hidden',
                      }}
                      >

                        <div>
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
                          <Divider className={styles.divder} />
                        </div>
                        <GetRenderitem
                          key={firstTabFlag === rightActive ? choosenRowData.id : choosenRowDataSecond.id}
                          data={firstTabFlag === rightActive ? choosenRowData : choosenRowDataSecond}
                          type={rightActive}
                          items={showItem}
                        />
                      </div>
                      {/*  */}
                      <Card bodyStyle={{ display: 'flex', paddingLeft: 5, paddingRight: 5 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {btnrealGroup.map(({ name, tag }) => (
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
            </div>
          </div>
        </div>
        {handleModalOk &&
        <Modal
          maskClosable={false}
          title={<BuildTitle title={returnTitle()} />}
          zIndex={1001}
          width={1000}
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
        }

        <Modal
          title={<BuildTitle title="选择客户订单" />}
          maskClosable={false}
          width={1000}
          className={styles.standardListForm}
          bodyStyle={{ padding: '28px 0 0' }}
          destroyOnClose
          onOk={this.handleCustomerNoOk}
          visible={this.state.showCustomerNoModal}
          onCancel={this.handleCustomerNoCancel}
          zIndex={1002}
        >
          <SelectCustomerOrder
            list={model.customerList}
            pagination={model.customerPagination}
            // returnElement={returnElement}
            // source={model}
            // onSearch={this.customerSearch}
            // changeCustomerSearch={model.changeCustomerSearch}
            selectedRowKeys={model.customerSelectedKeys}
            changeChoosenRow={this.changeCustomerChoosenRow}
            choosenRowData={model.choosenRowDataCustomer}
            onSelectChange={this.onCustomerSelectChange}
            listLoading={this.props.customerListLoading}
            handleTableChange={args => {
              // 翻页 search 看看搜索完要不要做点处理
              this.customerSearch({ ...args });
            }}
          />
        </Modal>
      </div>
    );
  }


}
;

export default Index;
