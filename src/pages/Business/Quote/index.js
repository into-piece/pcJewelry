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
  Icon,
  message,
  Upload,
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
import styles from './index.less';
import ModalConfirm from '@/utils/modal';
import HttpFetch from '@/utils/HttpFetch';
import { getCurrentUser } from '@/utils/authority';

import Table from '@/components/Table';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import DescriptionList from '@/components/DescriptionList';
import serviceObj from '@/services/quote';
import jsonData from './index.json';
import SearchForm from '@/components/SearchForm';
import SelectProductModal from './SelectProductModal';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Description } = DescriptionList;
const FormItem = Form.Item;
const { Option } = Select;
const {
  deleteProductQuoteHeader, deleteProformaInvoiceDetail, getLastQuoteDetailByProductId, getTopQuoteDetailByProductId, getlistProductLine,
  geInitializeCountByProductId,
  getMainMaterialPrice,
} = serviceObj;
const { headList, detailList } = jsonData;

// 右手边按钮集合
const btnGroup = [
  { name: '新增', tag: 'plus' },
  { name: '删除', tag: 'delete', type: 'danger' },
  { name: '编辑', tag: 'edit' },
  { name: '审批', tag: 'lock' },
  { name: '复制', tag: 'copy' },
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
  quoteMethod: {
    H008002: '计重',
    H008001: '计件',
  },
  emergency: {
    0: '不紧急',
    1: '紧急',
  },
  isWeighStones: isCheck,
  packPriceType: {
    H011001: '计收',
    H011002: '不计收',
  },
  customerPreparation: isCheck,
  purchasingMaterialsFromCustomers: isCheck,
};

const returnName = (key, value) => returnNameObj[key][value];

// 报价主页表头
let clientContentColumns = [
  {
    title: <div className={styles.row_normal2}>客户编号</div>,
    dataIndex: 'customerNo',
    key: 'customerNo',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    ),
  },
  {
    title: <div className={styles.row_normal2}>简称</div>,
    dataIndex: 'customerShotName',
    key: 'customerShotName',
    width: 100,
    render:(d,i)=>(i.customerShotName)

  },
  {
    title: <div className={styles.row_normal2}>报价单号</div>,
    dataIndex: 'quoteNumber',
    key: 'quoteNumber',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>类别</div>, // ?
    dataIndex: 'type',
    key: 'typeName',
    width: 100,
    render:(d,i)=>(i.typeName)

  },

  {
    title: <div className={styles.row_normal2}>报价日期</div>,
    dataIndex: 'quoteDate',
    key: 'quoteDate',
    width: 100,
    render: (data) => (data),
  },

  {
    title: <div className={styles.row_normal2}>数量</div>,
    dataIndex: 'quoteTotalCount',
    key: 'quoteTotalCount',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>重量</div>,
    dataIndex: 'quoteTotalWeight',
    key: 'quoteTotalWeight',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>总额</div>,
    dataIndex: 'quoteTotalAmount',
    key: 'quoteTotalAmount',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>终客号</div>,
    dataIndex: 'endNo',
    key: 'endNo',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>终客简称</div>,
    dataIndex: 'endShotName',
    key: 'endShotName',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>产品说明</div>,// ?
    dataIndex: 'explains',
    key: 'explains',
    width: 100,
  },
];

clientContentColumns = clientContentColumns.map(item => ({ ...item, sorter: true }));


// 报价详情表头
let customerColumns = [
  {
    title: <div className={styles.row_normal2}>产品编号</div>,
    dataIndex: 'productNo',
    key: 'productNo',
  },
  {
    title: <div className={styles.row_normal2}>客户货号</div>,
    dataIndex: 'custoerProductNo',
    key: 'custoerProductNo',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>前次工费/克</div>,
    dataIndex: 'lastCount',
    key: 'lastCount',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>实际工费/克</div>,
    dataIndex: 'actualCount',
    key: 'actualCount',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>最高工费/克</div>,
    dataIndex: 'topCount',
    key: 'topCount',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>此次工费/克</div>,
    dataIndex: 'nowCount',
    width: 100,
    key: 'nowCount',
  },

  {
    title: <div className={styles.row_normal2}>字印价/件</div>,
    dataIndex: 'markingPrice',
    key: 'markingPrice',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>包装价/件</div>,
    dataIndex: 'packPrice',
    key: 'packPrice',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>报价金额</div>,
    dataIndex: 'quotedAmount',
    key: 'quotedAmount',
    width: 100,
  },
];
customerColumns = customerColumns.map(item => ({ ...item, sorter: true }));


// 报价主页的筛选参数
const searchParamsArr = [
  { key: '客户编号', value: 'customerId' },
  { key: '报价单号', value: 'quoteNumber' },
  { key: '类别', value: 'type', 'type': 2, 'list': 'wordbookdropdown', noNeed: true },
  { key: '报价日期', value: 'quoteDate', type: 9 },
  { key: '终客编号', value: 'endId' },
];

// 报价主页的筛选参数
const searchDetailParams = [
  { key: '产品编号', value: 'productNo' },
  { key: '客户货号', value: 'custoerProductNo' },
  { key: '前次工费/克', value: 'lastCount' },
  { key: '实际工费/克', value: 'actualCount' },
];

// 新增 产品 遍历配置
const productSearchParams = [
  { key: '产品编号', value: 'productNo' },
  { key: '客户编号', value: 'customerNo' },
];


@Form.create()
@connect(({ loading, quote }) => {
  return {
    quote,
    list: quote.list,
    pagination: quote.pagination,
    selectKey: quote.selectKey,
    choosenRowData: quote.choosenRowData,
    colorSetList: quote.colorSetList,
    selectedRowKeys: quote.selectedRowKeys,
    gemSetProcessDropDown: quote.gemSetProcessDropDown,
    timeline: quote.timeline,
    listLoading: loading.effects['quote/getList'],
    rightMenu: quote.rightMenu,
    choosenDetailRowData: quote.choosenDetailRowData,
    detailChoosenType: quote.detailChoosenType,
    productPagination: quote.productPagination,
    showProductModal: quote.showProductModal,
    quotelist: quote.quotelist,
    quoteDatialList: quote.quoteDatialList,
    selectedDetailRowKeys: quote.selectedDetailRowKeys,
    productList: quote.productList,
    productselectedKeys: quote.productselectedKeys,
    productChoosenRowData: quote.productChoosenRowData,
    productListLoading: loading.effects['quote/getProductList'],
    searchParams: quote.searchParams,
    searchDetailParams: quote.searchDetailParams,
  };
})
class Info extends Component {
  state = {
    addLoading: false,
    modalType: '',
    quoteDateFrom: null,
    quoteDateTo: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // this.unLockEdit("6ededc36-3322-4232-b0dd-183a4cfdf9a3")
    // 获取客户编号下拉
    dispatch({
      type: 'quote/getlistCustomerDropDown',
    });

    // 类别下拉
    dispatch({
      type: 'quote/getwordbookdropdown',
    });

    // 终客编号下拉
    dispatch({
      type: 'quote/getEndCustomerListDropDown',
    });

    // 字印编码
    dispatch({
      type: 'quote/getMarkinglistDropDown',
    });

    // 获取初始表单数据
    this.getList({ sendReq: 'currentQuote' });
  }

  // 获取对应key=》页面进行数据请求
  getList = (args, param) => {
    const { dispatch, pagination, searchParams } = this.props;
    // getDevList
    dispatch({
      type: `quote/getList`,
      payload: { params: { ...pagination, ...searchParams, ...param }, ...args },
    });
    dispatch({
      type: `quote/clearDetailList`,
    });
  };

  getProduct = (args) => {
    const { dispatch, productPagination } = this.props;
    dispatch({
      type: 'quote/getProductList',
      payload: { params: { ...productPagination, ...args } },
    });
  };

  openAddModal = () => {
    const { rightMenu, dispatch, form } = this.props;
    const isHead = rightMenu === 1;

    if (isHead) {
      dispatch({
        type: 'quote/getcurrencydropdown',
      });
    }

    getMainMaterialPrice().then(res => {
      const { head, body } = res;
      if (head.rtnCode === '000000' && body.records.length > 0) {
        const { silver } = body.records[0];
        form.setFieldsValue({
          quotePrice: silver,
        });
      }
    });
  };

  // 复制
  handleCopy = () => {
    const { id } = this.props.choosenRowData;
    serviceObj.copyQuote({ id }).then(res => {
      const { rtnMsg, rtnCode } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.getList({ sendReq: 'currentQuote' });
      }
    });
  };

  // 列表对应操作button回调
  btnFn = async (modalType) => {
    const { selectKey, dispatch, choosenRowData, form, rightMenu } = this.props;
    switch (modalType) {
      case 'plus':
      case 'edit':
      default:
        if (rightMenu === 2) {
          const { markingId, markingEnName } = choosenRowData;
          form.setFieldsValue({
            markingId,
            markingEnName,
          });
        }
        if (modalType === 'edit') {
          const isEdit = await serviceObj.checkIsEdit({ id: choosenRowData.id }).then(res => {
            if (res.head.rtnCode !== '000000') return false;
            return true;
          });
          if (!isEdit) return;
        }
        this.openAddModal();
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
      case 'copy':
        this.handleCopy();
        break;
      case 'freshList':
        this.freshList();
        break;
    }
  };

  // 控制产品弹窗 type = 1出现
  showProductModalFunc = (type = 1) => {
    const { dispatch } = this.props;
    if (type === 1) {
      this.getProduct();

      // 获取筛选参数下拉
      dispatch({
        type: 'quote/getBrandsList',
      });
      dispatch({
        type: 'quote/getbasicColourSettingsList',
      });
    }
    dispatch({
      type: 'quote/showProductModalFn',
      payload: type === 1,
    });
  };

  // 弹窗表单 下拉回调
  handleSelectChange = (value, type) => {
    const { quote, form, rightMenu } = this.props;
    // 自动带出字印英文名
    if (type === 'markingId') {
      const obj = quote.markinglist.find(item => {
        return item.value === value;
      });
      const { enName } = obj;
      form.setFieldsValue({
        markingEnName: enName,
      });
    }

    // 自动带出
    if (type === 'customerId') {
      const { quote, form } = this.props;
      const obj = quote.customerDropDownList.find(item => item.value === value);
      const { shotName, currencyCode } = obj;
      form.setFieldsValue({
        customerShotName: shotName,
        currency: currencyCode,
      });
    }

    if (type === 'endId') {
      const obj = quote.endCustomerList.find(item => item.value === value);
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
    const isstonePrice = v === 'stonePrice' && form.getFieldValue('isWeighStones') === 'H009001';
    const ismainMaterialWeight = v === 'mainMaterialWeight' && form.getFieldValue('isWeighStones') === 'H009001';
    return isstonePrice || ismainMaterialWeight;
  };

  handleDatePicker = (date, dateString) => {
    const quoteDateFrom = moment(date[0]).valueOf();
    const quoteDateTo = moment(date[1]).valueOf();
    this.setState({
      quoteDateFrom,
      quoteDateTo,
    });
  };

  // 根据btn点击 返回对应弹窗内容
  // type 2 下啦选择
  // type 3 点击事件
  // type 4 文字
  // type 5 check
  // type 6 radio
  // type 7 被顺带出的文字
  // type 8 inputext
  returnElement = ({ key, value, noNeed, type, list, clickFn, text, arr, data, form }) => {
    switch (type) {
      case 2:
        return (
          <Select
            style={{ width: 180 }}
            placeholder="请选择"
            onChange={(v) => {
              this.handleSelectChange(v, value);
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
        return <Input disabled={this.disabledCondition(value, form)} style={{ width: '100' }} placeholder="请输入" />;
    }
    //  type === 7 ?
  };

  // 获取新增/编辑弹窗内容
  getModalContent = () => {
    const {
      rightMenu,
      choosenRowData,
      form,
      choosenDetailRowData,
    } = this.props;
    const { getFieldDecorator } = form;
    const { modalType } = this.state;
    const content = '';
    const isEdit = modalType === 'edit';
    const { quote } = this.props;
    const addArr = rightMenu === 1 ? headList : detailList;
    return (
      <Form size="small">
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
                      initialValue: isEdit ? (rightMenu === 1 ? choosenRowData[value] : choosenDetailRowData[value]) : initValue || (number ? 0 : undefined),
                    })(this.returnElement({
                      key,
                      value,
                      noNeed,
                      type,
                      list,
                      clickFn,
                      text,
                      arr,
                      initValue,
                      data: quote,
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
    const str = rightMenu === 1 ? '主页' : '明细';
    return `${text}报价${str}`;
  };

  // 新增按钮事件回调
  handleAdd = (close) => {
    const { rightMenu, form, choosenRowData } = this.props;
    const { productLineId } = this.state;
    const isHead = rightMenu === 1;
    const str = isHead ? 'quotelist' : 'quoteDatialList';
    let params = {};
    if (!isHead) {
      params = { quoteHeadId: choosenRowData.id, productLineId };
    }

    form.validateFields((err, values) => {
      if (!err) {

        this.setState({addLoading:true});
        params = {
          ...params,
          ...values,
          emergency: values.emergency ? 1 : 0,
          customerPreparation: values.customerPreparation ? 1 : 0,
          purchasingMaterialsFromCustomers: values.purchasingMaterialsFromCustomers ? 1 : 0,
        };
        serviceObj[`add${str}`]({ ...params }).then(res => {
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList({ sendReq: 'currentQuote' });
            if(close) this.btnFn('');
          }
          this.setState({addLoading:false});

        });
      }
    });
  };

  // 编辑按钮回调
  handleEdit = (close) => {
    const { rightMenu, form, choosenRowData, dispatch, choosenDetailRowData } = this.props;
    const { productLineId } = choosenDetailRowData;
    const isHead = rightMenu === 1;
    const str = isHead ? 'quotelist' : 'quoteDatialList';

    let params = {
      id: choosenRowData.id,
    };

    if (!isHead) {
      params = { quoteHeadId: choosenRowData.id, productLineId };
    }

    // 还要清空所选中项
    dispatch({
      type: 'quote/changeSelectedRowKeys',
      payload: [],
    });

    form.validateFields((err, values) => {
      if (!err) {
        this.setState({addLoading:true});

        params = {
          ...params,
          ...values,
          emergency: values.emergency ? 1 : 0,
          customerPreparation: values.customerPreparation ? 1 : 0,
          purchasingMaterialsFromCustomers: values.purchasingMaterialsFromCustomers ? 1 : 0,
        };
        serviceObj[`add${str}`](params).then(res => {
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList({ sendReq: 'currentQuote' });
            if(close) this.btnFn('');

          }
          this.setState({addLoading:false});

        });
      }
    });
  };

  // 删除按钮回调
  handleDelect = () => {
    const { rightMenu, selectedRowKeys, selectedDetailRowKeys } = this.props;
    console.log(selectedRowKeys, selectedDetailRowKeys);
    const sendApi = rightMenu === 1 ? deleteProductQuoteHeader : deleteProformaInvoiceDetail;
    const data = rightMenu === 1 ? selectedRowKeys : selectedDetailRowKeys;
    sendApi(data).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.getList({ sendReq: 'currentQuote' });
      }
    });
  };


  freshList = () => {
    this.getList({ sendReq: 'currentQuote' });
  };

  // 审批/撤销 按钮回调
  handleLock = () => {
    const { selectedRowKeys, dispatch } = this.props;
    const isLock = this.returnLockType().type === 1;  // 根据this.returnLockType()判断返回当前是撤回还是审批
    const serviceType = isLock ? 'approval' : 'cancelApproval';
    console.log(serviceObj, serviceObj[serviceType], selectedRowKeys);
    serviceObj[serviceType](selectedRowKeys).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        const payload = isLock ? 'historyQuote' : 'currentQuote';
        dispatch({
          type: 'quote/getTimeline',
          payload,
        });

        this.getList({ sendReq: payload });
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
    const { selectedRowKeys, selectedDetailRowKeys, quote, rightMenu, quotelist, quoteDatialList } = this.props;
    const list = rightMenu === 1 ? quotelist : quoteDatialList;
    const selectedKeys = rightMenu === 1 ? selectedRowKeys : selectedDetailRowKeys;
    // console.log(list, selectedKeys, rightMenu, selectedRowKeys, selectedDetailRowKeys, '============');
    if (list && list.records.length === 0) return { name: '审批', disabled: true, type: 1 };
    const isLock1 = selectedKeys.reduce((res, cur) => {
      const singleObjcect = list.records.find(subItem => subItem.id === cur);
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
    const { selectedRowKeys, rightMenu, selectedDetailRowKeys } = this.props;
    if (tag === 'plus') return false;
    if (tag === 'lock') return rightMenu === 1 && selectedRowKeys.length === 0 || rightMenu === 2 && selectedDetailRowKeys.length === 0 || this.returnLockType().disabled;
    return rightMenu === 1 && selectedRowKeys.length === 0 || rightMenu === 2 && selectedDetailRowKeys.length === 0;
  };

  // 弹窗单选框 回调
  handleRadio = (e) => {
    const v = e.target.value;
    this.props.dispatch({
      type: `quote/getTimeline`,
      payload: e.target.value,
    });
    this.getList({ sendReq: v });
  };

  // 更改dmenu主页/详情
  changeRightMenu = v => {
    const { dispatch } = this.props;
    dispatch({
      type: 'quote/changeRightMenu',
      payload: v.target.value,
    });
  };

  //
  unLockEdit = (id) => {
    const { choosenRowData } = this.props;
    serviceObj.unLockEdit({ id: id || choosenRowData.id }).then(res => {
    });
  };

  // 取消弹窗回调
  onCancel = () => {
    this.btnFn('');
    this.unLockEdit();
  };

  // 选中某行表头
  changeChoosenRow = (rowData) => {
    const { dispatch } = this.props;
    dispatch({
      type: `quote/getProductChoosenRowData`,
      payload: rowData,
    });
  };

  // 产品选择弹窗确认回调
  handleProductModalOk = async () => {
    const { choosenRowData } = this.props;
    const {
      id,
      custoerProductNo,
      productTypeName,
      gemColorName,
      platingColorName,
      productColorName,
      productType,
      productLineId,
      productLineName,
      finishedWeight,
      unitOfMeasurementName,
      unitOfWeightName,
    } = this.props.productChoosenRowData;
    let lastCount = 0;
    let topCount = 0;
    let productLineCoefficientQuotation = '';
    let packPrice = '';
    let actualCount = '';
    // await getLastQuoteDetailByProductId({ productId: id }).then(res => {
    //   if (res.head && res.head.rtnCode === '000000' && res.body.records && res.body.records.length > 0) {
    //     lastCount = res.body.records[0].count
    //   }
    // })
    // let topCount = 0
    // await getTopQuoteDetailByProductId({ productId: id }).then(res => {
    //   if (res.head && res.head.rtnCode === '000000' && res.body.records && res.body.records.length > 0) {
    //     topCount = res.body.records[0].count
    //   }
    // })
    await getlistProductLine({ productId: id }).then(res => {
      if (res.head && res.head.rtnCode === '000000' && res.body.records && res.body.records.length > 0) {
        productLineCoefficientQuotation = res.body.records[0].productLineCoefficientQuotation;
      }
    });
    await geInitializeCountByProductId({ productId: id, customerId: choosenRowData.customerId }).then(res => {
      if (res.head && res.head.rtnCode === '000000' && res.body.records && res.body.records.length > 0) {
        const data = res.body.records[0];
        actualCount = data.actualCount;
        packPrice = data.lastPackPrice;
        lastCount = data.lastQuoteCount;
        topCount = data.topQuoteCount;
      }
    });

    // let packPrice = ''
    // await getLastPackPriceByProductId({ productId: id, customerId: choosenRowData.customerId }).then(res => {
    //   if (res.head && res.head.rtnCode === '000000' && res.body.records && res.body.records.length > 0) {
    //     packPrice = res.body.records[0].count
    //   }
    // })

    // let actualCount = ''
    // await getActualCountByProductId({ productId: id }).then(res => {
    //   if (res.head && res.head.rtnCode === '000000' && res.body.records && res.body.records.length > 0) {
    //     actualCount = res.body.records[0].count
    //   }
    // })
    this.showProductModalFunc(2);
    this.props.form.setFieldsValue({
      productId: id,
      productColorName,
      custoerProductNo,
      productTypeName,
      productType,
      gemColorName,
      platingColorName,
      productLineId,
      finishedWeight,
      topCount,
      lastCount,
      unitOfMeasurementName,
      unitOfWeightName,
      productLineName,
      packPrice,
      actualCount,
      productLineCoefficientQuotation,
    });
    this.setState({
      productLineId,
    });
  };

  // 产品选择弹窗取消回调
  handleProductModalCancel = () => {
    this.showProductModalFunc(2);
  };

  onSelectChange = (selectedRowKeys) => {
    this.props.dispatch({
      type: `quote/changeProductselectedKeys`,
      payload: selectedRowKeys,
    });
  };

  onSearch = (v) => {
    const { timeline } = this.props;
    const { quoteDateFrom, quoteDateTo } = this.state;
    if (v.quoteDate) {
      v.quoteDateFrom = quoteDateFrom;
      v.quoteDateTo = quoteDateTo;
      v.quoteDate = null;
    }
    this.getList({ sendReq: timeline }, v);
  };

  returnListName = (list, v) => v && this.props.quote[list].length > 0 && this.props.quote[list].find(item => item.value === v).key;

  render() {
    const { state, props, btnFn, getModalContent, returnTitle, handleModalOk, returnLockType, returnSisabled, handleRadio, changeRightMenu, showProductModalFunc, onCancel, returnElement, changeChoosenRow, handleProductModalOk, handleProductModalCancel, onSelectChange, getProduct, onSearch, returnListName } = this;
    const { modalType ,addloading} = state;
    const { quote, list, selectKey, choosenRowData, rightMenu, choosenDetailRowData, showProductModal, productPagination, productList, productselectedKeys, productChoosenRowData, productListLoading } = props;


    const modalFooter = modalType === 'plus' ? [
      <Button
        key="back"
        onClick={onCancel}
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
        onClick={onCancel}
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
              <RightContent
                choosenDetailRowData={choosenDetailRowData}
                rightMenu={rightMenu}
                type={selectKey}
                sourceList={list}
                changeRightMenu={changeRightMenu}
                choosenRowData={choosenRowData}
                btnFn={btnFn}
                returnLockType={returnLockType}
                returnSisabled={returnSisabled}
                handleRadio={handleRadio}
                returnElement={returnElement}
                onSearch={onSearch}
                returnListName={returnListName}
              />
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
          visible={modalType !== ''}
          footer={modalFooter}
          onCancel={onCancel}

        >
          {getModalContent()}
        </Modal>
        }

        <Modal
          maskClosable={false}
          title='选择产品'
          width={1000}
          className={styles.standardListForm}
          bodyStyle={{ padding: '28px 0 0' }}
          destroyOnClose
          onOk={handleProductModalOk}
          visible={showProductModal}
          onCancel={handleProductModalCancel}
        >
          <SelectProductModal
            list={productList}
            productSearchParams={productSearchParams}
            pagination={productPagination}
            returnElement={returnElement}
            source={quote}
            productselectedKeys={productselectedKeys}
            changeChoosenRow={changeChoosenRow}
            choosenRowData={productChoosenRowData}
            onSelectChange={onSelectChange}
            listLoading={productListLoading}
            onSearch={getProduct}
            changeProductSearch={getProduct}
          />
        </Modal>
      </div>
    );
  }
}


const radioArr = ['报价主页', '报价明细'];

// 右手边正文内容
const RightContent = ({ type, choosenRowData, btnFn, returnLockType, returnSisabled, handleRadio, changeRightMenu, rightMenu, choosenDetailRowData, returnElement, onSearch, returnListName }) => (
  <GridContent>
    <Row gutter={24} className={styles.row_content}>
      {/* 中间table组件 */}
      <Col lg={16} md={24}>
        <CenterInfo type={type} handleRadio={handleRadio} returnElement={returnElement} onSearch={onSearch} />
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
            {
              radioArr.map((item, index) =>
                <Radio.Button
                  key={item}
                  style={{
                    height: 40,
                    width: 130,
                    textalign: 'center',
                    lineHeight: '40px',
                  }}
                  value={index + 1}
                >{item}
                </Radio.Button>)
            }
          </Radio.Group>
          <Card bordered={false} style={{ overflow: 'auto' }}>
            <GetRenderitem
              data={rightMenu === 1 ? choosenRowData : choosenDetailRowData}
              type={rightMenu}
              returnListName={returnListName}
            />
          </Card>

          {/*  */}
          <Card bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingLeft: 5,
            paddingRight: 5,
          }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {btnGroup.map(({ name, tag, type: t }) => (
                <Button
                  key={tag}
                  className={styles.buttomControl}
                  type={(t === 'danger' || (returnLockType().type === 2 && tag === 'lock')) ? 'danger' : 'primary'}
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
            {<div style={{ paddingTop: '10px' }}>

              <Upload
                name='file'
                action={HttpFetch.productExcelImport}
                showUploadList={false}
                headers={{
                  token: getCurrentUser() ? getCurrentUser().token : '',
                }}
                onChange={(info) => {
                  if (info.file.status !== 'uploading') {
                    // console.log(info.file, info.fileList);
                  }
                  if (info.file.status === 'done') {
                    // 获取初始表单数据
                    btnFn('freshList');
                    const {response} = info.file;

                    if (response.head&&response.head.btnCode !== '000000') {
                      message.error(response.head.rtnMsg);
                    }

                    // console.log(JSON.stringify(info.file.response))
                    // message.success(info.file.response);
                  } else if (info.file.status === 'error') {
                    message.error(`import fail`);
                  }
                }}
              > <Button type="primary" size="small" className={styles.buttomControl}><Icon type="upload" />导入</Button>
              </Upload>
            </div>}

          </Card>
        </div>
      </Col>
    </Row>
  </GridContent>
);

// 右手边详情显示
const rowArr = [
  { key: '报价单号', value: 'quoteNumber' },
  { key: '报价日期', value: 'quoteDate' },
  { key: '客户', value: 'customerNo' },
  { key: '类别', value: 'type', belong: 3, 'list': 'wordbookdropdown' },
  { key: '终客', value: 'endNo' },
  { key: '中文名', value: 'zhName' },
  { key: '英文名', value: 'enName' },
  { key: '联系人', value: 'customerZhName' },
  { key: '手机', value: 'customerPhone' },
  { key: 'Email', value: 'customerEmail' },
  { key: '报价方式', value: 'quoteMethod', belong: 2 },
  { key: '主材价', value: 'quotePrice', belong: 3, 'list': 'materialPriceList' },
  { key: '结算币种', value: 'currency' },
  { key: '税率', value: 'taxRate' },
  { key: '紧急程度', value: 'emergency', belong: 2 },
  { key: '计石重', value: 'isWeighStones', belong: 2 },
  { key: '字印编码', value: 'markingId' },
  { key: '字印英文名', value: 'markingEnName' },
  { key: '包装单价', value: 'packPriceType', belong: 2 },
  { key: '客户备料', value: 'customerPreparation', belong: 2 },
  { key: '向客户采购用料', value: 'purchasingMaterialsFromCustomers', belong: 2 },
  { key: '包装说明', value: 'packExplains' },
  { key: '报价总数', value: 'quoteTotalCount' },
  { key: '报价总重', value: 'quoteTotalWeight' },
  { key: '报价总额', value: 'quoteTotalAmount' },
  { key: '说明', value: 'explains' },
  { key: '备注', value: 'remark' },
];

// 右手边显示的详情信息
const GetRenderitem = ({ data, type, returnListName }) => {
  const selectRowItem = () => {
    // console.log('select the item');
  };

  const arr = type === 1 ? rowArr : detailList;

  return (
    <div style={{ marginLeft: 10, marginTop: 10 }} className={styles.getRenderitem} onClick={selectRowItem}>
      <DescriptionList className={styles.headerList} size="small" col="1">
        {
          arr.map(({ key, value, belong, list }) =>
            <Description key={value} term={key}>
              {
                belong === 2 ?
                  returnName(value, data[value])
                  :
                  belong === 3 ?
                    returnListName(list, data[value]) :
                    data[value]
              }
            </Description>,
          )
        }
      </DescriptionList>
    </div>
  );
};


// Table 中间列表内容
@Form.create()
@connect(({ loading, quote }) => {
  return {
    quote,
    listLoading: loading.effects['quote/getList'],
    listDetailLoading: loading.effects['quote/getDetailList'],
    quotelist: quote.quotelist,
    pagination: quote.pagination,
    choosenRowData: quote.choosenRowData,
    selectedRowKeys: quote.selectedRowKeys,
    selectedRowKeys2: quote.selectedRowKeys2,
    timeline: quote.timeline,
    quoteDatialList: quote.quoteDatialList,
    choosenDetailRowData: quote.choosenDetailRowData,
    selectedDetailRowKeys: quote.selectedDetailRowKeys,
    detailChoosenType: quote.detailChoosenType,
    rightMenu: quote.rightMenu,
    detailPagination: quote.detailPagination,
  };
})
class CenterInfo extends Component {

  getDetailList = (params) => {
    const { dispatch, pagination, choosenRowData } = this.props;
    dispatch({
      type: `quote/getDetailList`,
      payload: {
        params: { quoteHeadId: choosenRowData.id, ...pagination, ...params },
      },
    });
  };

  // 选中某行表头
  changeChoosenRow = (rowData, type) => {
    const { dispatch, pagination } = this.props;
    const str = type === 1 ? '' : 'Detail';
    dispatch({
      type: `quote/getChoosen${str}RowData`,
      payload: rowData,
    });
    if (type === 1) {
      this.getDetailList({ quoteHeadId: rowData.id });
    } else {
      dispatch({
        type: `quote/changeRightMenu`,
        payload: 2,
      });
    }
  };

  // 更改table select数组
  onSelectChange = (selectedRowKeys, type) => {
    const str = type === 2 ? 'Detail' : '';
    this.props.dispatch({
      type: `quote/changeSelected${str}RowKeys`,
      payload: selectedRowKeys,
    });
  };

  // 当表头重复点击选中 清空选中 清空表体
  clearFn = (type) => {
    const { dispatch } = this.props;
    if (type === 1) {
      dispatch({
        type: `quote/clearDetailList`,
      });
      dispatch({
        type: `quote/getChoosenRowData`,
        payload: {},
      });
    }
  };

  changeSearchParams = (v) => {
    const { dispatch } = this.props;
    dispatch({
      type: `quote/changeSearchParams`,
      payload: v,
    });
  };

  changeSearchDetailParams = (v) => {
    const { dispatch } = this.props;
    dispatch({
      type: `quote/changeSearchParams`,
      payload: v,
    });
  };

  render() {
    const { onSelectChange, props, clearFn, getDetailList, changeSearchParams, changeSearchDetailParams } = this;
    const { choosenRowData, pagination, selectedRowKeys, selectedDetailRowKeys, listLoading, quoteDatialList, timeline, handleRadio, quotelist, choosenDetailRowData, detailChoosenType, detailPagination, quote, returnElement, listDetailLoading, onSearch } = props;
    return (
      <div className={styles.view_left_content}>
        <div style={{ marginBottom: 20 }}>
          <Radio.Group value={timeline} buttonStyle="solid" onChange={handleRadio}>
            <Radio.Button value="currentQuote">
              当前报价
              {/* <FormattedMessage id={`app.quote.menuMap.${type}`} defaultMessage="" /> */}
            </Radio.Button>
            <Radio.Button value="historyQuote">
              历史报价
              {/* <FormattedMessage id={`app.quote.menuMap.${type}`} defaultMessage="" /> */}
            </Radio.Button>
          </Radio.Group>
        </div>
        <SearchForm
          data={searchParamsArr}
          source={quote}
          onSearch={onSearch}
          returnElement={returnElement}
          onchange={changeSearchParams}
        />
        <div className={styles.tableBox}>
          <Table
            scroll={{ x:'max-content' }}
            columns={clientContentColumns}
            body={quotelist}
            changeChoosenRow={record => {
              this.changeChoosenRow(record, 1);
            }}
            selectKey={choosenRowData.id}
            pagination={pagination}
            handleTableChange={onSearch}
            selectedRowKeys={selectedRowKeys}
            onSelectChange={(data) => {
              onSelectChange(data, 1);
            }}
            listLoading={listLoading}
            clearFn={clearFn}
            type={1}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <Radio.Group value={detailChoosenType} buttonStyle="solid" onChange={handleRadio}>
            {
              menuRadio2.map((item, index) => {
                return (
                  <Radio.Button value={index + 1} key={item}>
                    {item}
                    {/* <FormattedMessage id={`app.quote.menuMap.${type}`} defaultMessage="" /> */}
                  </Radio.Button>
                );
              })
            }
          </Radio.Group>
        </div>
        <SearchForm
          data={searchDetailParams}
          source={quote}
          onSearch={getDetailList}
          returnElement={returnElement}
          onchange={changeSearchDetailParams}
        />
        <div className={styles.tableBox}>
          <Table
            scroll={{ x:'max-content' }}

            columns={customerColumns}
            body={quoteDatialList}
            type={2}
            changeChoosenRow={record => {
              this.changeChoosenRow(record, 2);
            }}
            selectKey={choosenDetailRowData.id}
            pagination={detailPagination}
            handleTableChange={getDetailList}
            selectedRowKeys={selectedDetailRowKeys}
            onSelectChange={data => {
              onSelectChange(data, 2);
            }}
            listLoading={listDetailLoading}
            clearFn={clearFn}
          />
        </div>
      </div>
    );
  }
}

const menuRadio2 = ['产品清单'];

export default Info;

