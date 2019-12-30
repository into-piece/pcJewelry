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
  Checkbox,
  DatePicker,
} from 'antd';
import moment from 'moment';
import Zmage from 'react-zmage';
import ModalConfirm from '@/utils/modal';
import HttpFetch from '@/utils/HttpFetch';
import { getCurrentUser } from '@/utils/authority';
import Table from '@/components/Table';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import DescriptionList from '@/components/DescriptionList';
import serviceObj from '@/services/purchase';
import jsonData from './index.json';
import SearchForm from '@/components/SearchForm';
import styles from './index.less';
import { defaultImages } from '@/utils/utils';
import BuildTitle from '@/components/BuildTitle';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Description } = DescriptionList;
const FormItem = Form.Item;
const { Option } = Select;
const {
  deleteSupplier,
  deleteContacts,
  deleteBlankAccount,
  getlistProductLine,
  geInitializeCountByProductId,
} = serviceObj;
const { headList, detailList, blankAccountList } = jsonData;

// 右手边按钮集合
const btnGroup = [
  { name: '新增', tag: 'plus' },
  { name: '编辑', tag: 'edit' },
  { name: '删除', tag: 'delete', type: 'danger' },
  { name: '打印', tag: 'copy' },
  { name: '审批', tag: 'lock' },
];

const supplierBtnGroup = [
  { name: '新增', tag: 'plus' },
  { name: '编辑', tag: 'edit' },
  { name: '删除', tag: 'delete', type: 'danger' },
  { name: '打印', tag: 'copy' },
  { name: '审批', tag: 'lock' },
];

const contactsBtnGroup = [
  { name: '新增', tag: 'plus' },
  { name: '编辑', tag: 'edit' },
  { name: '删除', tag: 'delete', type: 'danger' },
];

const isLockList = false; // table是否锁定=》显示锁定标签做判断 先设定为否

const isCheck = {
  0: '是',
  1: '否',
};
const returnNameObj = {
  status: {
    0: '输入',
    2: '已审批',
  },
};

const returnName = (key, value) => returnNameObj[key][value];

// 主页表头
let clientContentColumns = [
  {
    title: <div className={styles.row_normal2}>供应商编号</div>,
    dataIndex: 'supplierCode',
    key: 'supplierCode',
  },
  {
    title: <div className={styles.row_normal2}>简称</div>,
    dataIndex: 'shotName',
    key: 'shotName',


  },
  {
    title: <div className={styles.row_normal2}>供应商类别</div>,
    dataIndex: 'supplierCategoryName',
    key: 'supplierCategoryName',

    render: (d, i) => i.supplierCategoryName,
  },
  {
    title: <div className={styles.row_normal2}>中文名</div>, // ?
    dataIndex: 'zhName',
    key: 'zhName',


  },

  {
    title: <div className={styles.row_normal2}>英文名</div>,
    dataIndex: 'enName',
    key: 'enName',

    render: data => data,
  },

  {
    title: <div className={styles.row_normal2}>中文地址</div>,
    dataIndex: 'zhAddress',
    key: 'zhAddress',
  },

  {
    title: <div className={styles.row_normal2}>英文地址</div>,
    dataIndex: 'enAddress',
    key: 'enAddress',
  },
  {
    title: <div className={styles.row_normal2}>开户行</div>,
    dataIndex: 'openBank',
    key: 'openBank',
  },
  {
    title: <div className={styles.row_normal2}>户名</div>,
    dataIndex: 'accountName',
    key: 'accountName',
  },
  {
    title: <div className={styles.row_normal2}>银行账号</div>,
    dataIndex: 'accountNum',
    key: 'accountNum',
  },

  {
    title: <div className={styles.row_normal2}>结算币种</div>, // ?
    dataIndex: 'countCurrencyName',
    key: 'countCurrencyName',
  },
  {
    title: <div className={styles.row_normal2}>税率</div>, // ?
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: <div className={styles.row_normal2}>结算方式</div>, // ?
    dataIndex: 'countModeName',
    key: 'countModeName',
  },
  {
    title: <div className={styles.row_normal2}>备注</div>, // ?
    dataIndex: 'remarks',
    key: 'remarks',
  },
  {
    title: <div className={styles.row_normal2}>状态</div>, // ?
    dataIndex: 'status',
    key: 'status',

    render: data => data === '0' ? '输入' : data === '2' ? '已审批' : '',

  },

];

clientContentColumns = clientContentColumns.map(item => ({ ...item, sorter: true }));

// 联系人详情表头
let contactsColumns = [
  {
    title: <div className={styles.row_normal2}>联系人姓名</div>,
    dataIndex: 'contactName',
    key: 'contactName',
  },
  {
    title: <div className={styles.row_normal2}>手机</div>,
    dataIndex: 'mobilePhone',
    key: 'mobilePhone',
  },
  {
    title: <div className={styles.row_normal2}>电话</div>,
    dataIndex: 'telphone',
    key: 'telphone',
  },
  {
    title: <div className={styles.row_normal2}>email</div>,
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: <div className={styles.row_normal2}>QQ</div>,
    dataIndex: 'qq',
    key: 'qq',
  },
  {
    title: <div className={styles.row_normal2}>微信</div>,
    dataIndex: 'wechat',
    key: 'wechat',
  },
];
contactsColumns = contactsColumns.map(item => ({ ...item, sorter: true }));

// 开户行详情表头
let openBlankColumns = [
  {
    title: <div className={styles.row_normal2}>开户行</div>,
    dataIndex: 'openBank',
    key: 'openBank',
  },
  {
    title: <div className={styles.row_normal2}>户名</div>,
    dataIndex: 'accountName',
    key: 'accountName',
  },
  {
    title: <div className={styles.row_normal2}>账号</div>,
    dataIndex: 'accountNum',
    key: 'accountNum',
  },

];
openBlankColumns = openBlankColumns.map(item => ({ ...item, sorter: true }));

// 报价主页的筛选参数
const searchParamsArr = [
  { key: '供应商编号', value: 'supplierCode' },
];

// 筛选参数
const searchContactsParams = [
  { key: '联系人姓名', value: 'contactName' },
];

const searchBlackAccountParams = [
  { key: '开户行', value: 'openBank' },
];


@Form.create()
@connect(({ loading, purchase }) => {
  return {
    purchase,
    list: purchase.list,
    pagination: purchase.pagination,
    contactsPagination: purchase.contactsPagination,
    blankAccountPagination: purchase.blankAccountPagination,
    selectKey: purchase.selectKey,
    choosenRowData: purchase.choosenRowData,
    selectedRowKeys: purchase.selectedRowKeys,
    timeLine: purchase.timeLine,
    listLoading: loading.effects['purchase/getList'],
    rightMenu: purchase.rightMenu,
    choosenContactsRowData: purchase.choosenContactsRowData,
    choosenBlankAccountRowData: purchase.choosenBlankAccountRowData,
    supplierList: purchase.supplierList,
    quoteDatialList: purchase.quoteDatialList,
    contactsList: purchase.contactsList,
    blankAccountList: purchase.blankAccountList,
    selectedContactsRowKeys: purchase.selectedContactsRowKeys,
    selectedBlankAccountRowKeys: purchase.selectedBlankAccountRowKeys,
    productselectedKeys: purchase.productselectedKeys,
    searchParams: purchase.searchParams,
    searchContactsParams: purchase.searchContactsParams,
    searchBlackAccountParams: purchase.searchBlackAccountParams,
  };
})
class Info extends Component {
  state = {
    addLoading: false,
    modalType: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // this.unLockEdit("6ededc36-3322-4232-b0dd-183a4cfdf9a3")
    // 获取客户编号下拉
    // dispatch({
    //   type: 'purchase/getlistCustomerDropDown',
    // });

    dispatch({
      type: 'purchase/getwordbookdropdownType',
    });

    // 币种下拉
    dispatch({
      type: 'purchase/getwordbookdropdownCurrency',
    });

    // 方式下拉
    dispatch({
      type: 'purchase/getwordbookdropdownMode',
    });

    // 获取初始表单数据
    this.getList({ sendReq: 'currentQuote' });
  }

  // 获取对应key=》页面进行数据请求
  getList = (args, param) => {
    const { dispatch, pagination, searchParams } = this.props;
    // getDevList
    dispatch({
      type: `purchase/getList`,
      payload: { params: { ...pagination, ...searchParams, ...param }, ...args },
    });
    dispatch({
      type: `purchase/clearDetailList`,
    });
  };

  getDetailList = (type, params) => {
    const { dispatch, contactsPagination, searchContactsParams, searchBlankAccountParams, blankAccountPagination } = this.props;

    if (type === 'contacts') {
      dispatch({
        type: `purchase/clearContacts`,
      });


      dispatch({
        type: `purchase/getContactsList`,
        payload: {
          params: { ...contactsPagination, ...searchContactsParams, ...params },
        },
      });
    } else {
      dispatch({
        type: `purchase/clearBlankAccount`,
      });


      dispatch({
        type: `purchase/getBlankAccountList`,
        payload: {
          params: { ...blankAccountPagination, ...searchBlankAccountParams, ...params },
        },
      });
    }
  };


  openAddModal = () => {
    // const { rightMenu, dispatch, form, choosenRowData } = this.props;
    // const isHead = rightMenu === 1;


    // if (isHead) {
    //   // 类别下拉
    //   dispatch({
    //     type: 'purchase/getwordbookdropdownType',
    //   });
    //
    //   // 币种下拉
    //   dispatch({
    //     type: 'purchase/getwordbookdropdownCurrency',
    //   });
    //
    //   // 方式下拉
    //   dispatch({
    //     type: 'purchase/getwordbookdropdownMode',
    //   });


    // }
    // if (isHead) {
    //   dispatch({
    //     type: 'purchase/getcurrencydropdown',
    //   });
    // }

    // getMainMaterialPrice().then(res => {
    //   const { head, body } = res;
    //   if (head.rtnCode === '000000' && body.records.length > 0) {
    //     const { silver } = body.records[0];
    //     form.setFieldsValue({
    //       quotePrice: silver,
    //     });
    //   }
    // });
  };

  // 复制
  handleCopy = () => {
    // const { id } = this.props.choosenRowData;
    // serviceObj.copyQuote({ id }).then(res => {
    //   const { rtnMsg, rtnCode } = res.head;
    //   if (rtnCode === '000000') {
    //     notification.success({
    //       message: rtnMsg,
    //     });
    //     this.getList({ sendReq: 'currentQuote' });
    //   }
    // });
  };

  // 列表对应操作button回调
  btnFn = async modalType => {
    const { selectKey, dispatch, choosenRowData, form, rightMenu } = this.props;
    switch (modalType) {
      case 'plus':
        serviceObj.getTurnoverCode({}).then(res => {
          if (res && res.body && res.body.records && res.body.records[0]) {
            const supplierCode = res.body.records[0].turnoverCode;
            console.log(' getTurnoverCode res ', supplierCode);
            form.setFieldsValue({
              supplierCode,
            });
          }
        });
      case 'edit':
      default:

        this.openAddModal();
        this.setState({ modalType });
        break;
      case 'delete':
        ModalConfirm({
          content: '确定删除吗？',
          onOk: () => {
            this.handleDelect();
          },
        });
        break;
      case 'lock':
        ModalConfirm({
          content: '确定审批吗？',
          onOk: () => {
            this.handleLock();
          },
        });
        break;
      case 'copy':
        this.handleCopy();
        break;
      case 'freshList':
        this.freshList();
        break;
    }
  };


  // 弹窗表单 下拉回调
  handleSelectChange = (value, type) => {
    const { purchase, form, rightMenu, dispatch } = this.props;
    // 自动带出字印英文名
    if (type === 'supplierCategory') {

      serviceObj.getTurnoverCode({}).then(res => {
        if (res && res.body && res.body.records && res.body.records[0]) {
          const supplierCode = res.body.records[0].turnoverCode;

          const obj = purchase.wordbookdropdownType.find(item => item.value === value);
          const newSupplierCode = obj.wordbookContentCode + supplierCode;
          form.setFieldsValue({
            supplierCode: newSupplierCode,
          });

          // console.log("select type supplierCode = ",supplierCode," obj = ",obj)
        }
      });


    }


    if (type === 'endId') {
      const obj = purchase.endCustomerList.find(item => item.value === value);
      const { endShotName } = obj;
      form.setFieldsValue({
        endShotName,
      });
    }
  };

  //  弹窗表单 check回调
  handleCheckChange = (e, value) => {
    const { form } = this.props;
    form.setFieldsValue({
      value: e.target.checked ? 1 : 0,
    });
    if (value === 'isWeighStones') {
      const isWeighStones = e.target.checked === 1;
      if (isWeighStones) {
        form.validateFields(['stonePrice', 'mainMaterialWeight'], { disabled: true });
      }
    }
  };

  disabledCondition = (v, form) => {
    // const isstonePrice = v === 'stonePrice' && form.getFieldValue('isWeighStones') === 'H009001';
    // const ismainMaterialWeight =
    //   v === 'mainMaterialWeight' && form.getFieldValue('isWeighStones') === 'H009001';
    // return isstonePrice || ismainMaterialWeight;
    return false;
  };

  handleDatePicker = (date, dateString) => {
    const quoteDateFrom = moment(date[0]).valueOf();
    const quoteDateTo = moment(date[1]).valueOf();
    this.setState({
      quoteDateFrom,
      quoteDateTo,
    });
  };

  handleDatePicker1 = (date, dateString, v) => {
    const { form } = this.props;
    const customerShotName = form.getFieldValue('customerShotName') || '';
    const quoteDate = moment(dateString);
    // const quoteDate = moment(date[0]).valueOf();
    form.setFieldsValue({
      quoteDate,
      quoteNumber: `${moment(quoteDate).format('YYYYMMDD')}_Quote_${customerShotName}`,
    });
  };

  inputChange = (v, type) => {
  };

  // 根据btn点击 返回对应弹窗内容
  // type 2 下啦选择
  // type 3 点击事件
  // type 4 文字
  // type 5 check
  // type 6 radio
  // type 7 被顺带出的文字
  // type 8 inputext
  // type 9 RangePicker
  returnElement = ({ key, value, noNeed, type, list, clickFn, text, arr, data, form, inputType }) => {
    switch (type) {
      case 2:
        return (
          <Select
            style={{ width: 180 }}
            placeholder="请选择"
            onChange={v => {
              this.handleSelectChange(v, value);
            }}
          >
            {data[list] &&
            data[list].map(({ value, key }) => (
              <Option value={value} key={value}>
                {key}
              </Option>
            ))}
          </Select>
        );
      case 3:
        return (
          <p style={{ maxWidth: 180 }}>
            {form.getFieldValue(value) || ''}
            <p
              style={{ color: '#40a9ff', cursor: 'pointer' }}
              onClick={() => {
                this[clickFn](1);
              }}
            >
              {text}
            </p>
          </p>
        );
      case 4:
        return <span>{value || ''}</span>;
      case 5:
        return (
          <Checkbox
            checked={form.getFieldValue(value)}
            onChange={e => {
              this.handleCheckChange(e, value);
            }}
          >
            {text}
          </Checkbox>
        );
      case 6:
        return (
          <Radio.Group>
            {arr.map(({ key, value }) => {
              return (
                <Radio value={value} key={value}>
                  {key}
                </Radio>
              );
            })}
          </Radio.Group>
        );
      case 7:
        return <Input disabled style={{ width: '100' }} placeholder="自动带出"/>;
      case 8:
        return <TextArea rows={1} placeholder="请输入" style={{ width: 820 }}/>;
      case 9:
        return (
          <RangePicker
            allowClear={false}
            style={{ marginRight: 10 }}
            onChange={(date, dateString) => {
              this.handleDatePicker(date, dateString, value);
            }}
          />
        );
      case 10:
        return (
          <DatePicker
            allowClear={false}
            style={{ marginRight: 10 }}
            onChange={(date, dateString) => {
              this.handleDatePicker1(date, dateString, value);
            }}
          />
        );
      case 11:
        return <Input placeholder="自动生成" disabled/>;
      default:
        return (
          <Input
            disabled={this.disabledCondition(value, form)}
            style={{ width: '100' }}
            placeholder="请输入"
            type={inputType ? inputType : 'text'}
            onChange={v => {
              this.inputChange(v, value);
            }}
          />
        );
    }
    //  type === 7 ?
  };


  // 获取新增/编辑弹窗内容
  getModalContent = () => {
    const {
      rightMenu,
      choosenRowData,
      form,
      choosenContactsRowData,
      choosenBlankAccountRowData,
      purchase,
    } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const { modalType } = this.state;
    const isEdit = modalType === 'edit';
    const addArr = rightMenu === 1 ? headList : rightMenu === 2 ? detailList : blankAccountList;
    const productTypeName = getFieldValue('productTypeName');
    const { currency, quoteMethod } = choosenRowData;
    const productNo = form.getFieldValue('productNo') || '';
    const productNoStyle = productNo ? { marginLeft: 20 } : {};
    const quoteMethodobj = {
      H008002: '克',
      H008001: '件',
    };
    let suplierCode = '';


    return (
      <Form size="small">
        {addArr &&
        addArr.map(
          ({
             key,
             value,
             noNeed,
             type,
             list,
             clickFn,
             text,
             arr,
             initValue,
             number,
             priceUnit,
             inputType,
           }) => (
            <div
              className="addModal"
              key={key}
              style={value === 'supplierCode' ? { width: 800 } : {}}
            >
              <FormItem
                label={
                  priceUnit === 1 && rightMenu === 2
                    ? `${key + currency}/${quoteMethodobj[quoteMethod]}`
                    : key
                }
              >
                {getFieldDecorator(value, {
                  rules: [
                    {
                      required: !noNeed,
                      message: `请${type && type === 2 ? '选择' : '输入'}${key}`,
                    },
                  ],
                  // eslint-disable-next-line
                  // initialValue: isEdit
                  //   ? rightMenu === 1
                  //     ? value === 'quoteDate'
                  //       ? moment(choosenRowData[value])
                  //       : choosenRowData[value]
                  //     : choosenContactsRowData[value]
                  //   : value === 'quoteDate'
                  //     ? moment(moment().format('L'))
                  //     : value === 'quoteNumber' ? `${moment(moment().format('L')).format('YYYYMMDD')}_Quote_`
                  //       : initValue || (number ? '0.00' : undefined),
                  initialValue: isEdit
                    ? rightMenu === 1
                      ? choosenRowData[value]
                      : rightMenu === 2 ? choosenContactsRowData[value]
                        : choosenBlankAccountRowData[value]
                    : initValue || (number ? '0.00' : undefined),

                })(
                  this.returnElement({
                    key,
                    value,
                    noNeed,
                    type,
                    list,
                    clickFn,
                    text,
                    arr,
                    initValue,
                    data: purchase,
                    form,
                    inputType,
                  }),
                )}
              </FormItem>
            </div>
          ),
        )}

      </Form>
    );
  };

  // 获取Modal的标题
  returnTitle = () => {
    const { modalType } = this.state;
    let text = '';
    const { rightMenu } = this.props;
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
    const str = rightMenu === 1 ? '供应商' : rightMenu === 2 ? '联系人' : '账号';
    return `${text}${str}`;
  };

  // 新增按钮事件回调
  handleAdd = close => {
    console.log(' ==>handleAdd ');
    const { rightMenu, form, choosenRowData, timeLine, purchase } = this.props;
    const { productLineId } = this.state;
    const isHead = rightMenu === 1;
    const str = isHead ? 'Supplier' : rightMenu === 2 ? 'Contacts' : 'BlankAccount';
    let params = {};
    if (!isHead) {
      params = { supplierCode: choosenRowData.id };
    }
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ addLoading: true });
        params = {
          ...params,
          ...values,
          // emergency: values.emergency ? 1 : 0,
          // customerPreparation: values.customerPreparation ? 1 : 0,
          // purchasingMaterialsFromCustomers: values.purchasingMaterialsFromCustomers ? 1 : 0,
        };
        serviceObj[`add${str}`]({ ...params }).then(res => {
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            // this.getList({ sendReq: 'currentQuote' });
            if (isHead) {
              this.getList({});
              if (!close)
                serviceObj.getTurnoverCode({}).then(res => {
                  if (res && res.body && res.body.records && res.body.records[0]) {
                    const supplierCode = res.body.records[0].turnoverCode;

                    console.log(' getTurnoverCode res ', supplierCode);
                    const value = form.getFieldValue('supplierCategory');
                    const obj = purchase.wordbookdropdownType.find(item => item.value === value);
                    if (obj) {
                      const newSupplierCode = obj.wordbookContentCode + supplierCode;
                      form.setFieldsValue({
                        supplierCode: newSupplierCode,
                      });
                    }
                  }
                });
            } else {
              // this.getDetailList(rightMenu===2?'contacts':'blackAccount')
              this.getDetailList(timeLine, { supplierCode: choosenRowData.id });
            }
            if (close) this.btnFn('');
          }
          this.setState({ addLoading: false });
        });
      }
    });
  };

  // 编辑按钮回调
  handleEdit = close => {
    const { rightMenu, form, choosenRowData, dispatch, choosenContactsRowData, choosenBlankAccountRowData } = this.props;
    const isHead = rightMenu === 1;
    const str = isHead ? 'Supplier' : rightMenu === 2 ? 'Contacts' : 'BlankAccount';
    const id = isHead ? choosenRowData.id : rightMenu === 2 ? choosenContactsRowData.id : choosenBlankAccountRowData.id;

    let type;
    let params = {
      id,
    };

    if (!isHead) {
      params = { supplierCode: choosenRowData.id, id };
      type = rightMenu === 2 ? 'contacts' : 'blankAccount';
    }
    // else{
    //   dispatch({
    //     type: 'purchase/changeSelectedRowKeys',
    //     payload: [],
    //   });
    // }


    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ addLoading: true });

        params = {
          ...params,
          ...values,
        };
        serviceObj[`add${str}`](params).then(res => {
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            if (isHead)
              this.getList();
            else
              this.getDetailList(type, { supplierCode: choosenRowData.id, id });
            if (close) this.btnFn('');
          }
          this.setState({ addLoading: false });
        });
      } else {
        console.log('fieldValue error ', err);
      }
    });
  };

  // 删除按钮回调
  handleDelect = () => {
    const { rightMenu, selectedRowKeys, selectedContactsRowKeys, selectedBlankAccountRowKeys, choosenRowData } = this.props;
    const sendApi = rightMenu === 1 ? deleteSupplier : rightMenu === 2 ? deleteContacts : deleteBlankAccount;
    const data = rightMenu === 1 ? selectedRowKeys : rightMenu === 2 ? selectedContactsRowKeys : selectedBlankAccountRowKeys;
    sendApi(data).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        if (rightMenu === 1) {
          this.clearPaginationHeadList()
          this.getList({ sendReq: 'currentQuote' });
        } else {
          rightMenu === 2?this.clearContactsPaginationHeadList():this.clearBlankAccountPaginationHeadList();
          this.getDetailList(rightMenu === 2 ? 'contacts' : 'blankAccount', { supplierCode: choosenRowData.id });

        }
      }
    });
  };

  clearPaginationHeadList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `purchase/clearPagination`,
      payload: {},
    });
  };

  clearContactsPaginationHeadList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `purchase/clearContactsPagination`,
      payload: {},
    });
  };

  clearBlankAccountPaginationHeadList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `purchase/clearBlankAccountPagination`,
      payload: {},
    });
  };

  freshList = () => {
    this.getList({ sendReq: 'currentQuote' });
  };

  // 审批/撤销 按钮回调
  handleLock = () => {
    const { selectedRowKeys, dispatch } = this.props;
    const isLock = this.returnLockType().type === 1; // 根据this.returnLockType()判断返回当前是撤回还是审批
    const serviceType = isLock ? 'approval' : 'cancelApproval';
    console.log(serviceObj, serviceObj[serviceType], selectedRowKeys);
    serviceObj[serviceType](selectedRowKeys).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });

        // this.getList({ sendReq: payload });
        this.getList({});
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
    const {
      selectedRowKeys,
      supplierList,
    } = this.props;
    const list = supplierList;
    const selectedKeys = selectedRowKeys;
    if (list && list.records.length === 0) return { name: '审批', disabled: true, type: 1 };
    const isLock1 = selectedKeys.reduce((res, cur) => {
      const singleObjcect = list.records.find(subItem => subItem.id === cur);
      if (singleObjcect) res.push(singleObjcect.status);
      return res;
    }, []);
    const isShenPi = isLock1.every(item => Number(item) === 0); // 是否全是0
    const isChexiao = isLock1.every(item => Number(item) === 2); // 是否全是2
    if (isShenPi) return { name: '审批', disabled: false, type: 1, isShenPi, isChexiao };
    if (isChexiao) return { name: '取消审批', disabled: false, type: 2, isShenPi, isChexiao };
    return { name: '审批', disabled: true, type: 1, isShenPi, isChexiao }; // 当两种状态都有 禁止点击
  };

  // 弹窗确定提交回调
  handleModalOk = close => {
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
  returnSisabled = tag => {
    const { selectedRowKeys, rightMenu, selectedContactsRowKeys, selectedBlankAccountRowKeys } = this.props;

    if (tag === 'plus')
      return ((rightMenu === 2 || rightMenu === 3) && selectedRowKeys.length === 0);
    if (tag === 'lock')
      return (
        (rightMenu === 1 && selectedRowKeys.length === 0) ||
        (rightMenu === 2 && selectedContactsRowKeys.length === 0) ||
        (rightMenu === 3 && selectedBlankAccountRowKeys.length === 0) ||
        this.returnLockType().disabled
      );
    return (
      (rightMenu === 1 && selectedRowKeys.length === 0) ||
      (rightMenu === 2 && selectedContactsRowKeys.length === 0) ||
      (rightMenu === 3 && selectedBlankAccountRowKeys && selectedBlankAccountRowKeys.length === 0)
    );
  };

  // 弹窗单选框 回调
  handleRadio = e => {

    const {
      props,
    } = this;

    const {
      choosenRowData,
      dispatch,
    } = props;


    const v = e.target.value;
    this.props.dispatch({
      type: `purchase/getTimeline`,
      payload: e.target.value,
    });

    if (v === 'contacts') {
      dispatch({
        type: `purchase/clearSearchBlankAccountParams`,
        payload: {},
      });
    } else {
      dispatch({
        type: `purchase/clearSearchContactsParams`,
        payload: {},
      });
    }


    this.getDetailList(v, { supplierCode: choosenRowData.id });

    // this.getList({ sendReq: v });
  };

  // 更改dmenu主页/详情
  changeRightMenu = v => {
    const { dispatch } = this.props;
    dispatch({
      type: 'purchase/changeRightMenu',
      payload: v.target.value,
    });
  };


  // 取消弹窗回调
  onCancel = () => {
    this.btnFn('');
  };


  onSelectChange = selectedRowKeys => {
    this.props.dispatch({
      type: `purchase/changeProductselectedKeys`,
      payload: selectedRowKeys,
    });
  };

  onSearch = v => {
    const { timeLine } = this.props;

    this.getList({ sendReq: timeLine }, v);
  };

  onSearchDetail = v => {
    const { timeLine, choosenRowData } = this.props;
    if (!choosenRowData.id) return;
    const params = { supplierCode: choosenRowData.id, ...v };
    this.getDetailList(timeLine, params);
  };


  returnListName = (list, v) => {

    const { purchase } = this.props;

    if (v && list && purchase[list].length > 0) {
      const value = purchase[list].find(item => item.value === v);
      return (value && value.key) || '';
    }
  };


  render() {
    const {
      state,
      props,
      btnFn,
      getModalContent,
      returnTitle,
      handleModalOk,
      returnLockType,
      returnSisabled,
      handleRadio,
      changeRightMenu,
      onCancel,
      returnElement,
      changeChoosenRow,
      onSearch,
      onSearchDetail,
      returnListName,
      blankAccountPagination,

      getDetailList,
    } = this;
    const { modalType, addloading } = state;
    const {
      purchase,
      list,
      selectKey,
      choosenRowData,
      rightMenu,
      choosenContactsRowData,
      choosenBlankAccountRowData,
      contactsPagination,
    } = props;


    const modalFooter =
      modalType === 'plus'
        ? [
          <Button key="back" onClick={onCancel}>
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
        ]
        : [
          <Button key="back" onClick={onCancel}>
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

        ];


    return (
      <div className={styles.page}>
        {/* <Bread data={breadData} /> */}
        <div className={styles.center_content}>
          {/* lg={17} md={24} */}
          <div className={styles.main}>
            <div className={styles.right} style={{ width: '100%' }}>
              <RightContent
                choosenContactsRowData={choosenContactsRowData}
                choosenBlankAccountRowData={choosenBlankAccountRowData}
                rightMenu={rightMenu}
                type={selectKey}
                sourceList={list}
                changeRightMenu={changeRightMenu}
                choosenRowData={choosenRowData}
                blankAccountPagination={blankAccountPagination}
                contactsPagination={contactsPagination}
                btnFn={btnFn}
                btnGroup={rightMenu === 1 ? supplierBtnGroup : contactsBtnGroup}
                returnLockType={returnLockType}
                returnSisabled={returnSisabled}
                getDetailList={getDetailList}
                handleRadio={handleRadio}
                returnElement={returnElement}
                onSearch={onSearch}
                onSearchDetail={onSearchDetail}
                returnListName={returnListName}
              />
            </div>
          </div>
        </div>
        {handleModalOk && (
          <Modal
            title={<BuildTitle title={returnTitle()}/>}
            zIndex={1000}
            maskClosable={false}
            width={1000}
            className={styles.standardListForm}
            bodyStyle={{ padding: '28px 0 0' }}
            destroyOnClose
            visible={modalType !== ''}
            footer={modalFooter}
            onCancel={onCancel}
          >
            {getModalContent()}
          </Modal>
        )}
      </div>
    );
  }
}

const radioArr = ['供应商', '联系人', '账号信息'];

// 右手边正文内容
const RightContent = ({
                        type,
                        choosenRowData,
                        btnFn,
                        returnLockType,
                        returnSisabled,
                        handleRadio,
                        changeRightMenu,
                        rightMenu,
                        btnGroup,
                        choosenContactsRowData,
                        choosenBlankAccountRowData,
                        returnElement,
                        getDetailList,
                        onSearch,
                        onSearchDetail,
                        contactsPagination,
                        blankAccountPagination,
                        returnListName,
                      }) => (
  <GridContent>
    <Row gutter={24} className={styles.row_content}>
      {/* 中间table组件 */}
      <Col lg={16} md={24}>
        <CenterInfo
          type={type}
          handleRadio={handleRadio}
          getDetailList={getDetailList}
          returnElement={returnElement}
          contactsPagination={contactsPagination}
          blankAccountPagination={blankAccountPagination}
          onSearch={onSearch}
          onSearchDetail={onSearchDetail}
        />
      </Col>
      {/* 右边显示详细信息和按钮操作 */}
      <Col lg={8} md={24}>
        <div className={styles.view_right_content}>
          <Radio.Group
            size="small"
            className={styles.right_content_tabgroud}
            onChange={changeRightMenu}
            buttonStyle="solid"
            value={rightMenu}
            style={{ textAlign: 'center' }}
          >
            {radioArr.map((item, index) => (
              <Radio.Button
                key={item}
                style={{
                  height: 40,
                  width: 130,
                  textalign: 'center',
                  lineHeight: '40px',
                }}
                value={index + 1}
              >
                {item}
              </Radio.Button>
            ))}
          </Radio.Group>
          {/*{console.log(" ==>choosenRowData ",choosenRowData)}*/}
          <Card bordered={false} style={{ overflow: 'auto', flexGrow: 1 }}>
            <GetRenderitem
              data={rightMenu === 1 ? choosenRowData : rightMenu === 2 ? choosenContactsRowData : choosenBlankAccountRowData}
              type={rightMenu}
              returnListName={returnListName}
            />
          </Card>

          {/*  */}
          <Card
            bodyStyle={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {
                btnGroup.map(({ name, tag, type: t }) => (
                  <Button
                    key={tag}
                    className={styles.buttomControl}
                    type={
                      t === 'danger' || (returnLockType().type === 2 && tag === 'lock')
                        ? 'danger'
                        : 'primary'
                    }
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

// 右手边详情显示
const rowArr = [
  { key: '供应商编号', value: 'supplierCode' },
  { key: '简称', value: 'shotName' },
  { key: '供应商类别', value: 'supplierCategory', list: 'wordbookdropdownType', belong: 3 },
  { key: '中文名', value: 'zhName' },
  { key: '英文名', value: 'enName' },
  { key: '中文地址', value: 'zhAddress' },
  { key: '英文地址', value: 'enAddress' },
  { key: '开户行', value: 'openBank' },
  { key: '户名', value: 'accountName' },
  { key: '账号', value: 'accountNum' },
  { key: '结算币种', value: 'countCurrency', list: 'wordbookdropdownCurrency', belong: 3 },
  { key: '税率', value: 'rate' },
  { key: '结算方式', value: 'countMode', list: 'wordbookdropdownMode', belong: 3 },
  { key: '状态', value: 'status', belong: 2 },
  { key: '备注', value: 'remarks' },


];

// 右手边显示的详情信息
const GetRenderitem = ({ data, type, returnListName }) => {
  const selectRowItem = () => {
    // console.log('select the item');
  };

  const returnRowName = ({ value, list, belong }) => {
    if (data[value])
      return belong === 2
        ? returnName(value, data[value])
        : belong === 3
          ? returnListName(list, data[value])
          : data[value];
    return '';
  };

  const arr =
    type === 1
      ? [

        ...rowArr,
        { key: '新增人', value: 'createUser' },
        { key: '新增时间', value: 'createTime' },
        { key: '修改人', value: 'modifier' },
        { key: '修改时间', value: 'mtime' },
      ] : type === 2
      ? [
        ...detailList,
        { key: '新增人', value: 'createUser' },
        { key: '新增时间', value: 'createTime' },
        { key: '修改人', value: 'modifier' },
        { key: '修改时间', value: 'mtime' }] : [
        ...blankAccountList,
      ];


  // console.log(" returnRowName key = ",key,"value = ",value ," belong - ",belong," list = ",list)

  // console.log(" getRenderItem = type = ",type ," data ",arr,data)
  // console.log(" getRenderItem   type = ",type ," data ",arr,data)
  return (
    <div
      style={{ marginLeft: 10, marginTop: 10 }}
      className={styles.getRenderitem}
      onClick={selectRowItem}
    >
      <DescriptionList className={styles.headerList} size="small" col="1">
        {arr.map(({ key, value, belong, list }) => {
          const name = returnRowName({ belong, value, list });
          return name ? (
            <Description key={value} term={key}>
              {name}
            </Description>
          ) : (
            ''
          );
        })}
      </DescriptionList>
    </div>
  );
};

// Table 中间列表内容
@Form.create()
@connect(({ loading, purchase }) => {
  return {
    purchase,
    listLoading: loading.effects['purchase/getList'],
    listDetailLoading: loading.effects['purchase/getDetailList'],
    listContactsLoading: loading.effects['purchase/getContactsList'],
    listBlankAccountLoading: loading.effects['purchase/getBlankAccountList'],
    supplierList: purchase.supplierList,
    pagination: purchase.pagination,
    contactsPagination: purchase.contactsPagination,
    blankAccountPagination: purchase.blankAccountPagination,
    choosenRowData: purchase.choosenRowData,
    selectedRowKeys: purchase.selectedRowKeys,
    selectedRowKeys2: purchase.selectedRowKeys2,
    timeLine: purchase.timeLine,
    contactsList: purchase.contactsList,
    blankAccountList: purchase.blankAccountList,
    choosenContactsRowData: purchase.choosenContactsRowData,
    selectedContactsRowKeys: purchase.selectedContactsRowKeys,
    choosenBlankAccountRowData: purchase.choosenBlankAccountRowData,
    selectedBlankAccountRowKeys: purchase.selectedBlankAccountRowKeys,
    rightMenu: purchase.rightMenu,
  };
})
class CenterInfo extends Component {


  // 选中某行表头
  changeChoosenRow = (rowData, type) => {

    const { dispatch, getDetailList, timeLine } = this.props;
    const str = type === 1 ? '' : type === 2 ? 'Contacts' : 'BlankAccount';
    dispatch({
      type: `purchase/getChoosen${str}RowData`,
      payload: rowData,
    });

    // console.log(' url ', `purchase/getChoosen${str}RowData`);

    if (type === 1) {
      dispatch({
        type: `purchase/clearContacts`,
      });
      dispatch({
        type: `purchase/clearBlankAccount`,
      });
      dispatch({
        type: `purchase/clearContactsList`,
      });
      dispatch({
        type: `purchase/clearBlankAccountList`,
      });

      getDetailList(timeLine, { supplierCode: rowData.id });
    } else if (type === 2) {
      dispatch({
        type: `purchase/changeRightMenu`,
        payload: 2,
      });
    } else if (type === 3) {
      dispatch({
        type: `purchase/changeRightMenu`,
        payload: 3,
      });
    }
  };

  // 更改table select数组
  onSelectChange = (selectedRowKeys, type) => {
    const str = type === 2 ? 'Contacts' : type === 3 ? 'BlankAccount' : '';
    this.props.dispatch({
      type: `purchase/changeSelected${str}RowKeys`,
      payload: selectedRowKeys,
    });
  };

  // 当表头重复点击选中 清空选中 清空表体
  clearFn = type => {
    const { dispatch } = this.props;
    if (type === 1) {
      dispatch({
        type: `purchase/clearContacts`,
      });
      dispatch({
        type: `purchase/clearBlankAccount`,
      });
      dispatch({
        type: `purchase/clearContactsList`,
      });
      dispatch({
        type: `purchase/clearBlankAccountList`,
      });
      dispatch({
        type: `purchase/getChoosenRowData`,
        payload: {},
      });
    } else if (type === 2) {
      dispatch({
        type: `purchase/clearContacts`,
      });
    } else if (type === 3) {
      dispatch({
        type: `purchase/clearBlankAccount`,
      });
    }
  };

  changeSearchParams = v => {
    const { dispatch } = this.props;
    dispatch({
      type: `purchase/changeSearchParams`,
      payload: v,
    });
  };

  changeSearchContactsParams = v => {
    const { dispatch } = this.props;
    dispatch({
      type: `purchase/changeSearchContactsParams`,
      payload: v,
    });
  };


  changeSearchBlankAccountParams = v => {
    const { dispatch } = this.props;
    dispatch({
      type: `purchase/changeSearchBlankAccountParams`,
      payload: v,
    });
  };

  render() {
    const {
      onSelectChange,
      props,
      clearFn,
      changeSearchParams,
      changeSearchContactsParams,
      changeSearchBlankAccountParams,
    } = this;
    const {
      choosenRowData,
      pagination,
      blankAccountPagination,
      contactsPagination,
      selectedRowKeys,
      selectedContactsRowKeys,
      selectedBlankAccountRowKeys,
      listLoading,
      contactsList,
      timeLine,
      handleRadio,
      supplierList,
      choosenContactsRowData,
      choosenBlankAccountRowData,
      purchase,
      returnElement,
      listContactsLoading,
      listBlankAccountLoading,
      onSearch,
      getDetailList,
      onSearchDetail,
    } = props;

    const ttype = timeLine === 'contacts' ? 2 : 3;

    console.log(' contactsPagination is ', contactsPagination);

    return (
      <div className={styles.view_left_content}>
        <div style={{ marginBottom: 20 }}>

        </div>
        <SearchForm
          data={searchParamsArr}
          source={purchase}
          onSearch={onSearch}
          returnElement={returnElement}
          onchange={changeSearchParams}
        />
        <div className={styles.tableBox}>
          <Table
            columns={clientContentColumns}
            body={supplierList}
            changeChoosenRow={record => {
              this.changeChoosenRow(record, 1);
            }}
            selectKey={choosenRowData.id}
            pagination={pagination}
            handleTableChange={onSearch}
            selectedRowKeys={selectedRowKeys}
            onSelectChange={data => {
              onSelectChange(data, 1);
            }}
            listLoading={listLoading}
            clearFn={clearFn}
            type={1}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <Radio.Group value={timeLine} buttonStyle="solid" onChange={handleRadio}>
            <Radio.Button value="contacts">
              联系人
              {/* <FormattedMessage id={`app.quote.menuMap.${type}`} defaultMessage="" /> */}
            </Radio.Button>
            <Radio.Button value="blankAccount">
              账号信息
              {/* <FormattedMessage id={`app.quote.menuMap.${type}`} defaultMessage="" /> */}
            </Radio.Button>
          </Radio.Group>
        </div>
        {timeLine === 'contacts' ? (<div><SearchForm
          data={searchContactsParams}
          source={purchase}
          onSearch={onSearchDetail}
          returnElement={returnElement}
          onchange={changeSearchContactsParams}
        />
          <div className={styles.tableBox}>
            <Table
              columns={contactsColumns}
              body={contactsList}
              type={ttype}
              changeChoosenRow={record => {
                this.changeChoosenRow(record, ttype);
              }}
              selectKey={choosenContactsRowData.id}
              pagination={contactsPagination}
              handleTableChange={onSearchDetail}
              selectedRowKeys={selectedContactsRowKeys}
              onSelectChange={data => {
                onSelectChange(data, ttype);
              }}
              listLoading={listContactsLoading}
              clearFn={clearFn}
            />
          </div>
        </div>) : (<div><SearchForm
          data={searchBlackAccountParams}
          source={purchase}
          onSearch={onSearchDetail}
          returnElement={returnElement}
          onchange={changeSearchBlankAccountParams}
        />
          <div className={styles.tableBox}>
            <Table
              columns={openBlankColumns}
              body={blankAccountList}
              type={ttype}
              changeChoosenRow={record => {
                this.changeChoosenRow(record, ttype);
              }}
              selectKey={choosenBlankAccountRowData.id}
              pagination={blankAccountPagination}
              handleTableChange={onSearchDetail}
              selectedRowKeys={selectedBlankAccountRowKeys}
              onSelectChange={data => {
                onSelectChange(data, ttype);
              }}
              listLoading={listBlankAccountLoading}
              clearFn={clearFn}
            />
          </div>
        </div>)}
      </div>
    );
  }
}


export default Info;

