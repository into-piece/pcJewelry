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
  InputNumber
} from 'antd';
import moment from 'moment';
import ModalConfirm from '@/utils/modal';
import HttpFetch from '@/utils/HttpFetch';
import { getCurrentUser } from '@/utils/authority';
import Table from '@/components/Table';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import serviceObj from '@/services/quote';
import jsonData from './index.json';
import SearchForm from '@/components/SearchForm';
import SelectProductModal from './SelectProductModal';
import PrintTable from './PrintPage';
import styles from './index.less';
import { defaultImages } from '@/utils/utils';
import BuildTitle from '@/components/BuildTitle';
import GetRenderitem from './GetRenderitem'
import Carousel from '@/components/Carousel';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
const {
  deleteProductQuoteHeader,
  deleteProductQuoteDetail,
  getLastQuoteDetailByProductId,
  getTopQuoteDetailByProductId,
  getlistProductLine,
  geInitializeCountByProductId,
  getMainMaterialPrice,
} = serviceObj;
const { headList, detailList } = jsonData;

const menuRadio2 = ['产品清单'];

// 右手边按钮集合
const btnGroup = [
  { name: '新增', tag: 'plus' },
  { name: '删除', tag: 'delete', type: 'danger' },
  { name: '编辑', tag: 'edit' },
  { name: '审批', tag: 'lock' },
  { name: '复制', tag: 'copy' },
  { name: '打印', tag: 'printer' },
];

const isLockList = false; // table是否锁定=》显示锁定标签做判断 先设定为否

const isCheck = {
  0: '否',
  1: '是',
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

const quoteMethodobj = {
  H008002: '克',
  H008001: '件',
};

// 报价主页表头
let clientContentColumns = [
  {
    title: <div className={styles.row_normal2}>客户编号</div>,
    dataIndex: 'customerNo',
    key: 'customerNo',
  },
  {
    title: <div className={styles.row_normal2}>简称</div>,
    dataIndex: 'customerShotName',
    key: 'customerShotName',

    render: (d, i) => i.customerShotName,
  },
  {
    title: <div className={styles.row_normal2}>报价单号</div>,
    dataIndex: 'quoteNumber',
    key: 'quoteNumber',
  },
  {
    title: <div className={styles.row_normal2}>类别</div>, // ?
    dataIndex: 'type',
    key: 'typeName',

    render: (d, i) => i.typeName,
  },

  {
    title: <div className={styles.row_normal2}>报价日期</div>,
    dataIndex: 'quoteDate',
    key: 'quoteDate',

    render: data => data,
  },

  {
    title: <div className={styles.row_normal2}>数量</div>,
    dataIndex: 'quoteTotalCount',
    key: 'quoteTotalCount',
  },

  {
    title: <div className={styles.row_normal2}>重量</div>,
    dataIndex: 'quoteTotalWeight',
    key: 'quoteTotalWeight',
  },
  {
    title: <div className={styles.row_normal2}>总额</div>,
    dataIndex: 'quoteTotalAmount',
    key: 'quoteTotalAmount',
  },
  {
    title: <div className={styles.row_normal2}>终客号</div>,
    dataIndex: 'endNo',
    key: 'endNo',
  },
  {
    title: <div className={styles.row_normal2}>终客简称</div>,
    dataIndex: 'endShotName',
    key: 'endShotName',
  },
  {
    title: <div className={styles.row_normal2}>产品说明</div>, // ?
    dataIndex: 'explains',
    key: 'explains',
  },
];

clientContentColumns = clientContentColumns.map(item => ({ ...item, sorter: true }));

// 报价详情表头
const returnCustomerColumns = (qm)=>{
  const quoteMethod  = quoteMethodobj[qm]
  let  customerColumns = [
  {
    title: <div className={styles.row_normal2}>序号</div>,
    dataIndex: 'seq',
    key: 'seq',
  },
  {    
    title: <div className={styles.row_normal2}>产品编号</div>,
    dataIndex: 'productNo',
    key: 'productNo',
    sorter: true
  },
  {
    title: <div className={styles.row_normal2}>客户货号</div>,
    dataIndex: 'custoerProductNo',
    key: 'custoerProductNo',
    sorter: true
  },
  {
    title: <div className={styles.row_normal2}>前次工费/{quoteMethod}</div>,
    dataIndex: 'lastCount',
    key: 'lastCount',
    sorter: true
  },
  {
    title: <div className={styles.row_normal2}>实际工费/{quoteMethod}</div>,
    dataIndex: 'actualCount',
    key: 'actualCount',
    sorter: true
  },
  {
    title: <div className={styles.row_normal2}>最高工费/{quoteMethod}</div>,
    dataIndex: 'topCount',
    key: 'topCount',
    sorter: true
  },
  {
    title: <div className={styles.row_normal2}>此次工费/{quoteMethod}</div>,
    dataIndex: 'nowCount',
    sorter: true,

    key: 'nowCount',
  },

  {
    title: <div className={styles.row_normal2}>字印价/{quoteMethod}</div>,
    dataIndex: 'markingPrice',
    key: 'markingPrice',
    sorter: true
  },

  {
    title: <div className={styles.row_normal2}>包装价/{quoteMethod}</div>,
    dataIndex: 'packPrice',
    key: 'packPrice',
    sorter: true
  },

  {
    title: <div className={styles.row_normal2}>报价金额</div>,
    dataIndex: 'quotedAmount',
    key: 'quotedAmount',
    sorter: true
  },
  ]
  customerColumns = customerColumns.map(item => ({ ...item }));
  return customerColumns
};

// 报价主页的筛选参数
const searchParamsArr = [
  { key: '客户编号', value: 'customerId' },
  { key: '报价单号', value: 'quoteNumber' },
  { key: '类别', value: 'type', type: 2, list: 'wordbookdropdown', noNeed: true },
  { key: '报价日期', value: 'quoteDate', type: 9 },
  { key: '终客编号', value: 'endId' },
];

// 报价主页的筛选参数
const searchDetailParams = [
  { key: '产品编号', value: 'productNo' },
  { key: '客户货号', value: 'customerProductNo' },
  { key: '前次工费/克', value: 'lastCount' },
  { key: '实际工费/克', value: 'actualCount' },
];

// 新增 产品 遍历配置
const productSearchParams = [
  { key: '产品编号', value: 'productNo' },
  { key: '客户货号', value: 'customerProductNo' },
];
const isHeadFn = (rightMenu) => rightMenu===1


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
    endCustomerList:quote.endCustomerList,
    searchProductParams:quote.searchProductParams,
    customerDropDownList:quote.customerDropDownList,
    detailPagination:quote.detailPagination
  };
})
class Info extends Component {
  state = {
    addLoading: false,
    modalType: '',
    quoteDateFrom: null,
    quoteDateTo: null,
    quoteDate: null,
    quotePriceUSA:'',// 美元的主材价
    currencyArr:[],
    productCostAndCoefficient:''
  };

  componentDidMount() {
    this.initDropdownReq()
  }

  // 初始化表单数据
  initDropdownReq = () => {
    const { dispatch } = this.props;
        // this.unLockEdit("424f66d2-2cff-4312-8a0e-67ccd3332589")
    // 获取客户编号下拉
    dispatch({
      type: 'quote/getlistCustomerDropDown',
    });

    // 类别下拉
    dispatch({
      type: 'quote/getwordbookdropdown',
    });

    // 获取初始表单数据
    this.getList({ sendReq: 'currentQuote' });

    // 获取汇率数组
    this.setCurrency()    
  }

  // 获取对应key=》页面进行数据请求
  getList = (args, param) => {
    const { dispatch, pagination, searchParams } = this.props;
    if(param && 'current' in param){
      dispatch({
        type: `quote/changeStateOut`,
        payload: { key: 'pagination', value: { ...pagination, current: param.current } },
      });
    }

    // getDevList
    dispatch({
      type: `quote/getList`,
      payload: { params: { ...pagination, ...searchParams, ...param }, ...args },
    });
    dispatch({
      type: `quote/clearDetailList`,
    });
  };

  getProduct = (args={}) => {
    const { dispatch, productPagination ,choosenRowData,searchProductParams} = this.props;
    const customerNo = choosenRowData.customerNo

    if ('current' in args) {
      dispatch({
        type: `quote/changeStateOut`,
        payload: { key: 'productPagination', value: { ...productPagination, current: args.current } },
      });
    }

    dispatch({
      type: 'quote/getProductList',
      payload: { params: {...searchProductParams, customerNo,...productPagination, ...args } },
      callback: res => {
        if (res && res.records.length === 1 && args.search) {
          this.changeChoosenRow(res.records[0]);
          this.onSelectChange([res.records[0].id]);
        }
      },
    });
  };

  openAddModal = (isEdit) => {
    const { rightMenu, dispatch, form, choosenRowData } = this.props;
    const {currencyArr} = this.state
    const isHead = isHeadFn(rightMenu);
    if (isHead) {
      dispatch({
        type: 'quote/getcurrencydropdown',
      });
    }

    // 终客编号下拉
    dispatch({
      type: 'quote/getEndCustomerListDropDown',
      payload: { key: choosenRowData.customerId },
    });


    if(!isEdit){
      // 获取到的是美元的主材价 还需
      getMainMaterialPrice().then(res => {
        const { head, body } = res;
        if (head.rtnCode === '000000' && body.records.length > 0) {
          const { silver } = body.records[0];
          this.setState({
            quotePriceUSA: silver,
          })
        }
      });
    }

    let arr = []
    if(rightMenu === 1){
      arr = [
        {
          name: 'mainTypeDropdown',
          params: {
            sType: 'H016001',
          },
        },
      ];
    }
    if(rightMenu === 2 && currencyArr.length>0){
      const listTodayRate =currencyArr.filter(item=>item.currency === choosenRowData.currency )        
      this.setState({ listTodayRate: Number(listTodayRate[0].bocConversionPrice)/100 });
    }

    arr.length>0 && arr.forEach(item => {
      dispatch({
        type: `quote/getDropdownList`,
        payload: item,
      });
    });
  };

  setCurrency = () => {
    serviceObj.listTodayRate().then(res=>{
      const {  rtnCode } = res.head;
      if (rtnCode === '000000'&& res.body.records && res.body.records.length>0) {
        this.setState({
          currencyArr: [...res.body.records,{currency:'RMB',bocConversionPrice:100}]
        })
      }else{
        notification.error({message:'无汇率数据，无法自动计算'})
      }
    })   
  }

  countProductCost = (params) => {
    const {listTodayRate} = this.state
    const {form,choosenRowData} = this.props
    const {quoteMethod} = choosenRowData
    const nowCount = Number(params.nowCount|| form.getFieldValue('nowCount') ) // 此次工费
    const finishedWeight = Number(params.finishedWeight|| form.getFieldValue('finishedWeight')) // 成品重量
    
    console.log(nowCount,listTodayRate,finishedWeight);
    
    // 计件
    if(quoteMethod === 'H008001'){
      form.setFieldsValue({
        productCost:(listTodayRate*nowCount).toFixed(3)
      })
    }else{
      form.setFieldsValue({
        productCost:(listTodayRate*nowCount*finishedWeight).toFixed(3)
      })
    }
  }
      

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
  btnFn = async modalType => {
    const { selectKey, dispatch, choosenRowData, form, rightMenu } = this.props;
    switch (modalType) {
      case 'plus':
      case 'edit':
      default:
        if (rightMenu === 2) {
          const { markingId, markingEnName } = choosenRowData;
          if(!choosenRowData.id){
            notification.error({
              message: '请先选择对应的报价主页',
            })
            return
          }
          if(markingId){
            form.setFieldsValue({
              markingId,
              markingEnName,
            });
          }

          // // 终客编号下拉
          // dispatch({
          //   type: 'quote/getEndCustomerListDropDown',
          //   payload: { key: choosenRowData.customerId },
          // });
          // // 字印下拉
          // dispatch({
          //   type: 'quote/getMarkinglistDropDown',
          //   payload: {key:choosenRowData.customerId},
          // });

        }
        if (modalType === 'edit') {
          const isEdit = await serviceObj.checkIsEdit({ id: choosenRowData.id }).then(res => {
            if (res.head.rtnCode !== '000000') return false;
            return true;
          });
          if (!isEdit) return;
        }
        this.openAddModal(modalType === 'edit');
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
      case 'printer':
        this.setState({ modalType });
        break;
    }
  };

  // 控制产品弹窗 type = 1出现
  showProductModalFunc = (type = 1) => {
    const { dispatch } = this.props;
    if (type === 1) {
      this.getProduct();
      // 获取筛选参数下拉，注释原因：当前未用上
      // dispatch({
      //   type: 'quote/getBrandsList',
      // });
      // dispatch({
      //   type: 'quote/getbasicColourSettingsList',
      // });
    }else{
      // 清空筛选参数
      dispatch({
        type:'quote/changeStateOut',
        payload:{key:'searchProductParams',value:{}}
      })
    }
    dispatch({
      type: 'quote/showProductModalFn',
      payload: type === 1,
    });
  };

  // 弹窗表单 下拉回调
  handleSelectChange = (value, type) => {
    const { quote, form, rightMenu, dispatch,customerDropDownList } = this.props;
    
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
      // 终客编号下拉
      dispatch({
        type: 'quote/getEndCustomerListDropDown',
        payload: { key: value },
      });

      // 字印编码
      dispatch({
        type: 'quote/getMarkinglistDropDown',
        payload: { key: value },
      });

      const obj = customerDropDownList.find(item => item.value === value);
      const { shotName, settlementCurrency } = obj;
      const date = form.getFieldValue('quoteDate') || '';
      form.setFieldsValue({
        customerShotName: shotName,
        quoteNumber: `${moment(date).format('YYYYMMDD')}_Quote_${shotName}`,
        currency: settlementCurrency||'USD',
      });

      this.countQuotePrice(settlementCurrency||'USD')
    }

    if (type === 'endId') {
      const obj = quote.endCustomerList.find(item => item.value === value);
      const { key } = obj;
      // debugger
      const startIndex = key.indexOf('(') + 1;
      const endIndex = key.indexOf(')');
      const endShotName = key.substring(startIndex,endIndex);
      console.log(key)
      form.setFieldsValue({
        endShotName,
      });
    }

    // 更换当前汇率

    if(type==='currency'){
      this.countQuotePrice(value)
    }
  };

  countQuotePrice = (value) => {
    const {form} = this.props
    const {currencyArr,quotePriceUSA} = this.state
    const listTodayRateArr =currencyArr.filter(item=>item.currency === value )       
    const listTodayRateCur = (Number(listTodayRateArr[0].bocConversionPrice)/100)// 当前汇率
    const listTodayRateUsaArr =currencyArr.filter(item=>item.currency === 'USD' )       
    const listTodayRateUsa = (Number(listTodayRateUsaArr[0].bocConversionPrice)/100) // 美元汇率
    // 先通过美元汇率换算成人民币 再换算当前选中汇率计算
    console.log(quotePriceUSA,listTodayRateUsa,listTodayRateCur)
    form.setFieldsValue({
      quotePrice: ((quotePriceUSA*listTodayRateUsa)/listTodayRateCur).toFixed(2)
    })
  }

  //  弹窗表单 check回调
  handleCheckChange = (e, value) => {
    const { form } = this.props;
    form.setFieldsValue({
      value: e.target.checked ? 1 : 0,
    });
    if (value === 'isWeighStones') {
      const isWeighStones = e.target.checked ;
      if (isWeighStones) {
        form.validateFields(['stonePrice', 'mainMaterialWeight'], { disabled: true });
      }
    }
  };

  disabledCondition = (v, form) => {
    const {markingType,packPriceType} = this.props.choosenRowData
    // const isstonePrice = v === 'stonePrice' && form.getFieldValue('isWeighStones') === 'H009001';
    // const ismainMaterialWeight =
    //   v === 'mainMaterialWeight' && form.getFieldValue('isWeighStones') === 'H009001';
    // return isstonePrice || ismainMaterialWeight;
    if((markingType === 'H011002'&&v==='markingPrice') || (packPriceType === 'H011002'&&v==='packPrice') ){
      return true
    }

    return false;
  };

  // 计算单价
  countPrice = (params={nowCount:'',finishedWeight:'',markingPrice:'',packPrice:'',mainMaterialWeight:'',stonePrice:''})=>{
    const {form,choosenRowData} = this.props
    let {isWeighStones,quoteMethod,quotePrice} = choosenRowData
    quotePrice = Number(quotePrice) // 主材价
    const nowCount= Number(params.nowCount||form.getFieldValue('nowCount')) || 0// 此次工费
    const finishedWeight=  Number(params.finishedWeight||form.getFieldValue('finishedWeight') )|| 0// 成品重量
    const markingPrice=  Number(params.markingPrice||form.getFieldValue('markingPrice'))|| 0 // 字印价
    const packPrice=  Number(params.packPrice||form.getFieldValue('packPrice'))|| 0 // 包装单价
    const mainMaterialWeight=  Number(params.mainMaterialWeight||form.getFieldValue('mainMaterialWeight'))|| 0 // 主材重量
    const stonePrice=  Number(params.stonePrice||form.getFieldValue('stonePrice'))|| 0 // 石材价
    let price = 0
    console.log(nowCount,finishedWeight,markingPrice,packPrice,mainMaterialWeight,stonePrice,'=======')
    // 计重
    if(quoteMethod === 'H008002'){
      // 是否计石重 是
      if(isWeighStones === 'H009001'){
        price = ((quotePrice+nowCount)*finishedWeight+markingPrice + packPrice).toFixed(2)
        form.setFieldsValue({
          price 
        });
      }else{
        price = ((quotePrice+nowCount)*mainMaterialWeight+stonePrice+markingPrice+packPrice).toFixed(2)
        console.log(price,nowCount,quotePrice+nowCount,(quotePrice+nowCount)*mainMaterialWeight,'====')
        form.setFieldsValue({
          price
        });
      }
    }
    // 计件
    else{
      // 是否计石重 是
      if(isWeighStones === 'H009001'){
        price = (quotePrice*finishedWeight+nowCount+markingPrice+packPrice).toFixed(2)
        form.setFieldsValue({
          price  
        });
      }else{
        price = (quotePrice*mainMaterialWeight+nowCount+stonePrice+markingPrice+packPrice).toFixed(2)
        form.setFieldsValue({
          price
        });
      }
    }

    const qty = form.getFieldValue('qty')
    if (qty && price) {
      const quotedAmount = (Number(qty) * Number(price)).toFixed(2);
      form.setFieldsValue({
        quotedAmount,
      });
    }

  }

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
    console.log(form.getFieldValue('customerShotName'));
    const customerShotName = form.getFieldValue('customerShotName') || '';
    const quoteDate = moment(dateString);
    // const quoteDate = moment(date[0]).valueOf();
    form.setFieldsValue({
      quoteDate,
      quoteNumber: `${moment(quoteDate).format('YYYYMMDD')}_Quote_${customerShotName}`,
    });
  };

  inputChange = (value, type) => {
    const { form,choosenRowData,choosenDetailRowData } = this.props;
    const {listTodayRate} = this.state
    const productCostAndCoefficient = this.state.productCostAndCoefficient||choosenDetailRowData.productCostAndCoefficient
    const customerQuoteCoeff = this.state.customerQuoteCoeff||choosenDetailRowData.customerQuoteCoeff
    const productCostInit = this.state.productCostInit
    
    // 报价金额 = 单价*报价数量
    const price = form.getFieldValue('price') || '';
    if (type === 'qty' && price) {
      const quotedAmount = (Number(value) * Number(price)).toFixed(2);
      form.setFieldsValue({
        quotedAmount,
      });
    }
    
    // 计算单价
    const arr = ['nowCount','finishedWeight','markingPrice','packPrice','mainMaterialWeight','stonePrice']
    arr.includes(type) && this.countPrice({[type]:value})


    const arr2 = ['nowCount','finishedWeight']
    arr2.includes(type) && this.countProductCost({[type]:value})
    
    // 石材重量
    const  stonesWeight = Number(form.getFieldValue('stonesWeight')) || '';
    // 成品重量
    const  finishedWeight = Number(form.getFieldValue('finishedWeight')) || '';
    
    // 计算主材重量  成品重量-石材重量
    console.log(stonesWeight,finishedWeight,value,'==========成品重量-石材重量')
    if(type === 'stonesWeight'&&finishedWeight){
      form.setFieldsValue({
        mainMaterialWeight: (finishedWeight - value).toFixed(2),
      });
    }
    if(type === 'finishedWeight' && stonesWeight){
      form.setFieldsValue({
        mainMaterialWeight: (value - stonesWeight).toFixed(2),
      });
    }

    // 修改主材重量时需要反推石材重量
    if(type === 'mainMaterialWeight' && finishedWeight ){
      form.setFieldsValue({
        stonesWeight: (finishedWeight - value).toFixed(2),
      })
    }


    console.log(productCostAndCoefficient,customerQuoteCoeff,'=========productCostAndCoefficient')
    
    // 计算实际工费 计重
    if(choosenRowData.quoteMethod === 'H008002' && type === 'finishedWeight'){
      form.setFieldsValue({
        actualCount:(productCostAndCoefficient*customerQuoteCoeff/value).toFixed(2),
        productCost:(productCostInit*value).toFixed(2)
      })
    }
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
  // type 11 inputnumber
  returnElement = ({ key, value, noNeed, type, list, clickFn, text, arr, data, form,disabled,precision,isEdit ,noedit}) => {
    switch (type) {
      case 2:
        return (
          <Select
            style={{ width: 180 }}
            placeholder="请选择"
            disabled={disabled || noedit&&isEdit}
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
        const v = form.getFieldValue(value);
        return (
          <Checkbox
            checked={this.switchBooleanToInt(v)}
            onChange={e => {
              this.handleCheckChange(e, value);
            }}
          >
            {text}
          </Checkbox>
        );
      case 6:
        return (
          <Radio.Group
            disabled={noedit&&isEdit}
          >
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
        return <Input disabled style={{ width: '100' }} placeholder="自动带出" />;
      case 8:
        return <TextArea rows={1} placeholder="请输入" style={{width:820}} />;
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
        return (
          <InputNumber 
            style={{ width: '100' }} 
            precision={0} 
            onChange={v => {
              this.inputChange(v, value);
            }}
          />
        )
      default:
        return (
          <Input
            disabled={this.disabledCondition(value, form)}
            style={{ width: '100' }}
            placeholder="请输入"
            onChange={v => {
              this.inputChange(v.target.value, value);
            }}
          />
        );
    }
    //  type === 7 ?
  };


  switchBooleanToInt =(v)=>{
    return v===true?1:(v===false?0:Number.parseInt(v));
  }

  // 获取新增/编辑弹窗内容
  getModalContent = () => {
    const {
      rightMenu,
      choosenRowData,
      form,
      choosenDetailRowData,
      quote,
      productChoosenRowData,
    } = this.props;
    const { pictures } = productChoosenRowData;
    const { getFieldDecorator, getFieldValue } = form;
    const { modalType } = this.state;
    const isEdit = modalType === 'edit';
    const addArr = rightMenu === 1 ? headList : detailList;
    const productTypeName = getFieldValue('productTypeName');
    const { currency, quoteMethod } = choosenRowData;
    const productNo = getFieldValue('productNo') || '';
    const productNoStyle = productNo ? { marginLeft: 20 } : {};
    const {isWeighStones,packPriceType} = choosenRowData;

    if (modalType === 'printer') {
      return <PrintTable />;
    }
 
    return (
      <Form size="small">
        {rightMenu === 2 && (
          <React.Fragment>
            <div className="addModal" style={{ width: 800 }}>
              <FormItem label="产品编号">
                {getFieldDecorator('productNo', {
                  rules: [
                    {
                      required: true,
                      message: `选择产品编号`,
                    },
                  ],
                  // eslint-disable-next-line
                  initialValue: isEdit ? choosenDetailRowData.productNo : undefined,
                })(
                  <p>
                    {productNo}
                    <span
                      style={{ color: '#40a9ff', cursor: 'pointer', ...productNoStyle }}
                      onClick={() => {
                        this.showProductModalFunc(1);
                      }}
                    >
                      选择产品编号
                    </span>
                  </p>
                )}
              </FormItem>
            </div>

            {
              pictures && pictures.length>0 &&
              <div className={styles.carousel_content}>
                <img style={{width:'100%'}} src={pictures[0].picPath} alt="show" />
              </div>
            }
          </React.Fragment>
        )}
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
              disabled,
              positiveInteger,
              precision,
              noedit
            }) => { 
              // 计石重不需要石材重量、主材重量、石材价
              if(value==='mainMaterialWeight' && isWeighStones === 'H009001')return
              if(value === 'stonePrice'&& isWeighStones === 'H009001')return
              if(value === 'markingPrice' &&  packPriceType === 'H011002')return
              if(value === 'packPrice' &&  packPriceType === 'H011002')return
              if(value ==='stonesWeight' && isWeighStones === 'H009001') return
              //  eslint-disable-next-line
              return(
                <div
                  className="addModal"
                  key={key}
                  style={value === 'productTypeName' ? { marginRight: 100 } : {}}
                >
                  <FormItem
                    label={
                      rightMenu === 2?
                        (priceUnit === 1 ? `${key + currency}/${quoteMethodobj[quoteMethod]}`:
                          priceUnit === 2 ?`${key+currency}/件`:
                           priceUnit === 3 ?`${key+currency}`:key)
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
                    initialValue: isEdit
                      ? rightMenu === 1
                        ? value === 'quoteDate'
                          ? moment(choosenRowData[value])
                          : choosenRowData[value]
                        : choosenDetailRowData[value]
                      : value === 'quoteDate'
                        ? moment(moment().format('L'))
                        : value === 'quoteNumber' ? `${moment(moment().format('L')).format('YYYYMMDD')}_Quote_`
                          :initValue || (number ?positiveInteger === 1? 0: '0.00' : undefined),
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
                      data: quote,
                      form,
                      disabled,
                      positiveInteger,
                      precision,
                      noedit,
                      isEdit
                    })
                  )}
                  </FormItem>
                </div>
            )}
          )}

        {/* {rightMenu === 2 && productTypeName === '戒指' && (
          <React.Fragment>
            <div className="addModal">
              <FormItem label={'戒围标准'}>
                {getFieldDecorator('ringAroundStId', {
                  rules: [{ required: true, message: '请输入戒围标准' }],
                  initialValue: isEdit ? choosenDetailRowData.ringAroundStId : undefined,
                })(<Input style={{ width: '100' }} placeholder="请输入戒围标准" />)}
              </FormItem>
            </div>
            <div className="addModal">
              <FormItem label={'戒围号'}>
                {getFieldDecorator('ringAroundStId', {
                  rules: [{ required: true, message: '请输入戒围标准' }],
                  initialValue: isEdit ? choosenDetailRowData.ringAroundStId : undefined,
                })(<Input style={{ width: '100' }} placeholder="请输入戒围标准" />)}
              </FormItem>
            </div>
          </React.Fragment>
        )} */}
      </Form>
    );
  };

  // 获取Modal的标题
  returnTitle = () => {
    const { modalType } = this.state;
    let text = '';
    const { rightMenu } = this.props;
    if (modalType == 'printer') return '报价单';
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

  getDetailList = (params = {}) => {
    const {dispatch,choosenRowData,detailPagination} = this.props
    if( 'current' in params){
      dispatch({
        type: `quote/changeStateOut`,
        payload: { key: 'detailPagination', value: { ...detailPagination, current: params.current } },
      });
    }
    dispatch({
      type: `quote/getDetailList`,
      payload: {
        params: { quoteHeadId: choosenRowData.id, ...detailPagination, ...params },
      },
    });
  }

  // 新增按钮事件回调
  handleAdd = close => {
    const { rightMenu, form, choosenRowData,productChoosenRowData,choosenDetailRowData } = this.props;
    const {productCostAndCoefficient,customerQuoteCoeff,productCostInit} = this.state
    const isHead = isHeadFn(rightMenu);
    const str = isHead ? 'quotelist' : 'quoteDatialList';
    let params = {}; 
    if (!isHead) {
      params = { 
        quoteHeadId: choosenRowData.id ,
        productId:productChoosenRowData.id || choosenDetailRowData.productId ,
        productCostAndCoefficient: productCostAndCoefficient|| choosenDetailRowData.productCostAndCoefficient ,
        customerQuoteCoeff:customerQuoteCoeff|| choosenDetailRowData.customerQuoteCoeff ,
        productCostInit:productCostInit||choosenDetailRowData.productCostInit
      };
    }

    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ addLoading: true });
        params = {
          ...params,
          ...values,
          emergency: this.switchBooleanToInt(values.emergency),
          customerPreparation: this.switchBooleanToInt(values.customerPreparation),
          purchasingMaterialsFromCustomers: this.switchBooleanToInt(values.purchasingMaterialsFromCustomers),
        };
        serviceObj[`add${str}`]({ ...params }).then(res => {
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            if(isHead){
              this.getList({ sendReq: 'currentQuote' })
            }else{
              this.getDetailList()
              this.getList({ sendReq: 'currentQuote' })
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
    const { rightMenu, form, choosenRowData, dispatch, choosenDetailRowData,productChoosenRowData} = this.props;
    const isHead = isHeadFn(rightMenu);
    const str = isHead ? 'quotelist' : 'quoteDatialList';

    let params = {
      id: choosenRowData.id,
    };

    if (!isHead) {
      params = { 
        id:choosenDetailRowData.id,
        quoteHeadId: choosenRowData.id ,
        productId: productChoosenRowData.id || choosenDetailRowData.productId ,
        productCostAndCoefficient:  choosenDetailRowData.productCostAndCoefficient ,
        customerQuoteCoeff: choosenDetailRowData.customerQuoteCoeff ,
        productCostInit:choosenDetailRowData.productCostInit
      };
      console.log(choosenDetailRowData.productId,choosenDetailRowData,'=========')
    }

    // 还要清空所选中项
    // dispatch({
    //   type: 'quote/changeSelectedRowKeys',
    //   payload: [],
    // });

    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ addLoading: true });

        params = {
          ...params,
          ...values,
          emergency: this.switchBooleanToInt(values.emergency),
          customerPreparation: this.switchBooleanToInt(values.customerPreparation),
          purchasingMaterialsFromCustomers: this.switchBooleanToInt(values.purchasingMaterialsFromCustomers),
        };
        serviceObj[`add${str}`](params).then(res => {
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList({ sendReq: 'currentQuote' });
            !isHead && this.getDetailList()
            if (close) this.btnFn('');
          }
          this.setState({ addLoading: false });
        });
      }
    });
  };

  // 删除按钮回调
  handleDelect = () => {
    const { rightMenu, selectedRowKeys, selectedDetailRowKeys } = this.props;
    const isHead = isHeadFn(rightMenu)
    console.log(selectedRowKeys, selectedDetailRowKeys);
    const sendApi = isHead ? deleteProductQuoteHeader : deleteProductQuoteDetail;
    const data = isHead ? selectedRowKeys : selectedDetailRowKeys;
    sendApi(data).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.getList({ sendReq: 'currentQuote' });
        !isHead && (this.getDetailList())
      }
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
    const {
      selectedRowKeys,
      selectedDetailRowKeys,
      quote,
      rightMenu,
      quotelist,
      quoteDatialList,
    } = this.props;
    const list = rightMenu === 1 ? quotelist : quoteDatialList;
    const selectedKeys = rightMenu === 1 ? selectedRowKeys : selectedDetailRowKeys;
    // console.log(list, selectedKeys, rightMenu, selectedRowKeys, selectedDetailRowKeys, '============');
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
    this.unLockEdit();
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
    const { selectedRowKeys, rightMenu, selectedDetailRowKeys } = this.props;
    if (tag === 'plus') return false;
    if (tag === 'lock')
      return (
        (rightMenu === 1 && selectedRowKeys.length === 0) ||
        (rightMenu === 2 && selectedDetailRowKeys.length === 0) ||
        this.returnLockType().disabled
      );
    if (tag === 'printer') {
      return !(rightMenu === 1 && selectedRowKeys.length !== 0);
    }
    return (
      (rightMenu === 1 && selectedRowKeys.length === 0) ||
      (rightMenu === 2 && selectedDetailRowKeys.length === 0)
    );
  };

  // 弹窗单选框 回调
  handleRadio = e => {
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

  unLockEdit = id => {
    const { choosenRowData } = this.props;
    serviceObj.unLockEdit({ id: id || choosenRowData.id }).then(res => {});
  };

  // 取消弹窗回调
  onCancel = () => {
    this.btnFn('');
    this.unLockEdit();
  };

  // 选中某行表头
  changeChoosenRow = rowData => {
    const { dispatch } = this.props;
    dispatch({
      type: `quote/getProductChoosenRowData`,
      payload: rowData,
    });
  };

  // 根据主页换算价格
  conversionPrice = (v) => {
    v = typeof v !== "number" ? Number(v) : v
    const {choosenRowData} = this.props
    const {currency} = choosenRowData
    const {currencyArr} = this.state
    const curRate =(currencyArr.find(item=>item.currency === currency ).bocConversionPrice)/100
    return (v/curRate).toFixed(2)
  }

  // 产品选择弹窗确认回调
  handleProductModalOk = async () => {
    const { choosenRowData, form ,dispatch,productChoosenRowData} = this.props;
    const {
      id,
      productNo,
      customerProductNo,
      productTypeName,
      gemColorName,
      platingColorName,
      productColorName,
      productType,
      productLineName,
      unitOfMeasurementName,
      unitOfWeightName,
      specification,
      unitOfLengthName,
      unitOfLength
    } = productChoosenRowData;
    let {finishedWeight} = productChoosenRowData
    const {listTodayRate} = this.state
    let lastCount = '0.00';
    let topCount = '0.00';
    let productLineCoefficientQuotation = '';
    let packPrice = '';
    let actualCount = '0.00';
    let nowCount = 0;
    finishedWeight = Number(finishedWeight)

    await getlistProductLine({ productId: id }).then(res => {
      if (
        res.head &&
        res.head.rtnCode === '000000' &&
        res.body.records &&
        res.body.records.length > 0
      ) {
        productLineCoefficientQuotation = res.body.records[0].productLineCoefficientQuotation;
      }
    });

    const resData = await geInitializeCountByProductId({
      productId: id,
      customerId: choosenRowData.customerId,
    })
    if (
      resData.head &&
      resData.head.rtnCode === '000000' &&
      resData.body.records &&
      resData.body.records.length > 0
    ) {
      const data = resData.body.records[0];
      actualCount = this.conversionPrice(data.actualCount);
      packPrice = this.conversionPrice(data.lastPackPrice);
      lastCount = this.conversionPrice(data.lastQuoteCount);
      topCount = this.conversionPrice(data.topQuoteCount);
      nowCount = lastCount || actualCount
      if (nowCount) {
        form.setFieldsValue({
          nowCount,
        });
      }
    }


    // 获取计算明细的相关数据
    await serviceObj.getQuoteDtInit({key:id, markingId: choosenRowData.markingId}).then(res=>{
      const { rtnMsg, rtnCode } = res.head;
      if (rtnCode === '000000'&& res.body.records && res.body.records.length>0) {        
        console.log(res.body.records,'==========getQuoteDtInit')
        let {customerQuoteCoeff,productCost,stonePriceTotal,stoneWeightTotal,packagePrice, markingPrice,productCostAndCoefficient} = res.body.records[0]
        customerQuoteCoeff = this.conversionPrice(customerQuoteCoeff)
        productCost = this.conversionPrice(productCost)
        stonePriceTotal = this.conversionPrice(stonePriceTotal)
        stoneWeightTotal = this.conversionPrice(stoneWeightTotal)
        packagePrice = this.conversionPrice(packagePrice)
        markingPrice = this.conversionPrice(markingPrice)
        productCostAndCoefficient = this.conversionPrice(productCostAndCoefficient)
        const mainMaterialWeightT = (finishedWeight - stoneWeightTotal).toFixed(2);
        // 产品工费 按件：产品成本*汇率；按重：产品成本*成品重量*汇率
        // 实际工费/件=产品成本*客户报价系数*汇率。
        // 实际工费/克=产品成本*报价系数/成品重量*汇率
        // 计算实际工费 计件情况下
        if(choosenRowData.quoteMethod === 'H008001'){
          actualCount = (productCostAndCoefficient*customerQuoteCoeff).toFixed(2);
        }
        if(choosenRowData.quoteMethod === 'H008002'){
          actualCount = (productCostAndCoefficient*customerQuoteCoeff/finishedWeight).toFixed(2);
          productCost = (productCost*finishedWeight).toFixed(2)
        }
        
        // 主材重量，报价主页是【不计石重】则需要计算主材重量，主材重量=成品重量-石材重量
        if(choosenRowData.isWeighStones === 'H009002'){
          console.log(finishedWeight,stoneWeightTotal,'======')
          form.setFieldsValue({
            mainMaterialWeight:mainMaterialWeightT
          })
        }
        // 字印价/件；报价主页选择计收的时候需要带出
        if(choosenRowData.markingTypeName === '计收') {
          form.setFieldsValue({
            markingPrice
          })
        }

        this.countPrice({
          finishedWeight,markingPrice,packPrice,mainMaterialWeight:mainMaterialWeightT,stonePrice:stonePriceTotal,
          nowCount
        })

        form.setFieldsValue({
          productCost,
          actualCount,
          stonesWeight:stoneWeightTotal,
          stonePrice:stonePriceTotal,
          markingPrice,
          packPrice:packagePrice,
          productId: id,
          productNo,
          productColorName,
          customerProductNo,
          productTypeName,
          productType,
          gemColorName,
          platingColorName,
          finishedWeight,
          topCount,
          lastCount,
          unitOfMeasurementName,
          unitOfWeightName,
          productLineName,
          productLineCoefficientQuotation,
          specification,
        })
        this.setState({
          productCostAndCoefficient,
          customerQuoteCoeff,
          productCostInit:productCost
        })
        dispatch({
          type:'quote/changeStateOut',
          payload:{key:'unitOfLengthDropdown',value:[{key:unitOfLengthName,value:unitOfLength}]},
          callback:()=>{
            form.setFieldsValue({unitOfLength});
            this.showProductModalFunc(2);
          }
        })
      }
    })
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

  };

  // 产品选择弹窗取消回调
  handleProductModalCancel = () => {
    this.showProductModalFunc(2);
  };

  onSelectChange = selectedRowKeys => {
    this.props.dispatch({
      type: `quote/changeProductselectedKeys`,
      payload: selectedRowKeys,
    });
  };

  onSearch = v => {
    const { timeline } = this.props;
    const { quoteDateFrom, quoteDateTo } = this.state;
    if (v.quoteDate) {
      v.quoteDateFrom = quoteDateFrom;
      v.quoteDateTo = quoteDateTo;
      v.quoteDate = null;
    }
    this.getList({ sendReq: timeline }, v);
  };

  returnListName = (list, v) => {
    const { quote } = this.props;
    if (v && quote[list].length > 0) {
      const value = quote[list].find(item => item.value === v);
      return (value && value.key) || '';
    }
  };

  getProductSearch = args => {
    const {dispatch} = this.props
    dispatch({
      type:'quote/changeStateOut',
      payload:{key:'searchProductParams',value:args}
    })
    this.getProduct({ ...args, search: true });
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
      showProductModalFunc,
      onCancel,
      returnElement,
      changeChoosenRow,
      handleProductModalOk,
      handleProductModalCancel,
      onSelectChange,
      getProduct,
      onSearch,
      returnListName,
      getProductSearch,
    } = this;
    const { modalType, addloading } = state;
    const {
      quote,
      list,
      selectKey,
      choosenRowData,
      rightMenu,
      choosenDetailRowData,
      showProductModal,
      productPagination,
      productList,
      productselectedKeys,
      productChoosenRowData,
      productListLoading,
      endCustomerList
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

    console.log(choosenRowData, choosenRowData.id);
    console.log(productList, '=======');
    console.log(endCustomerList, '=======');

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
        {handleModalOk && (
          <Modal
            title={<BuildTitle title={returnTitle()} />}
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

        <Modal
          title={<BuildTitle title="选择产品" />}
          maskClosable={false}
          width={1000}
          className={styles.standardListForm}
          bodyStyle={{ padding: '28px 0 0' }}
          destroyOnClose
          onOk={handleProductModalOk}
          visible={showProductModal}
          onCancel={handleProductModalCancel}
          zIndex={1002}
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
            changeProductSearch={getProductSearch}
            handleTableChange={args => {
              // search 看看搜索完要不要做点处理
              this.getProduct({ ...args });
            }}
          />
        </Modal>
      </div>
    );
  }
}

const radioArr = ['报价主页', '报价明细'];

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
  choosenDetailRowData,
  returnElement,
  onSearch,
  returnListName,
  
}) => (
  <GridContent>
    <Row gutter={24} className={styles.row_content}>
      {/* 中间table组件 */}
      <Col lg={16} md={24}>
        <CenterInfo
          type={type}
          handleRadio={handleRadio}
          returnElement={returnElement}
          onSearch={onSearch}
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
          <Card bordered={false} style={{ overflow: 'auto', flexGrow: 1 }}>
            <GetRenderitem
              data={rightMenu === 1 ? choosenRowData : choosenDetailRowData}
              type={rightMenu}
              returnListName={returnListName}
              currency={choosenRowData.currency}
              quoteMethod={choosenRowData.quoteMethod}
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
              {btnGroup.map(({ name, tag, type: t }) => (
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
            <div style={{ paddingTop: '10px' }}>
              <Upload
                name="file"
                action={HttpFetch.productExcelImport}
                showUploadList={false}
                headers={{
                  token: getCurrentUser() ? getCurrentUser().token : '',
                }}
                onChange={info => {
                  if (info.file.status !== 'uploading') {
                    // console.log(info.file, info.fileList);
                  }
                  if (info.file.status === 'done') {
                    // 获取初始表单数据
                    btnFn('freshList');
                    const { response } = info.file;

                    if (response.head && response.head.btnCode !== '000000') {
                      message.error(response.head.rtnMsg);
                    }

                    // console.log(JSON.stringify(info.file.response))
                    // message.success(info.file.response);
                  } else if (info.file.status === 'error') {
                    message.error(`import fail`);
                  }
                }}
              >
                {' '}
                <Button type="primary" size="small" className={styles.buttomControl}>
                  <Icon type="upload" />
                  导入
                </Button>
              </Upload>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  </GridContent>
);




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
  getDetailList = params => {
    const { dispatch, detailPagination, choosenRowData } = this.props;
    if('current' in params){
      dispatch({
        type: `quote/changeStateOut`,
        payload: { key: 'detailPagination', value: { ...detailPagination, current: params.current } },
      });
    }
    
    dispatch({
      type: `quote/getDetailList`,
      payload: {
        params: { quoteHeadId: choosenRowData.id, ...detailPagination, ...params },
      },
    });
  };

  // 选中某行表头
  changeChoosenRow = (rowData, type) => {
    const { dispatch, pagination } = this.props;
    const isHead = type === 1
    const str = isHead ? '' : 'Detail';
    dispatch({
      type: `quote/getChoosen${str}RowData`,
      payload: rowData,
    });
    if (isHead) {
      this.getDetailList({ quoteHeadId: rowData.id });
      // 字印下拉
      dispatch({
        type: 'quote/getMarkinglistDropDown',
        payload: {key:rowData.customerId},
      });
      dispatch({
        type: `quote/getChoosenDetailRowData`,
        payload: {id: ''},
      });
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
  clearFn = type => {
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

  changeSearchParams = v => {
    const { dispatch } = this.props;
    dispatch({
      type: `quote/changeSearchParams`,
      payload: v,
    });
  };

  changeSearchDetailParams = v => {
    const { dispatch } = this.props;
    dispatch({
      type: `quote/changeSearchParams`,
      payload: v,
    });
  };

  render() {
    const {
      onSelectChange,
      props,
      clearFn,
      getDetailList,
      changeSearchParams,
      changeSearchDetailParams,
    } = this;
    const {
      choosenRowData,
      pagination,
      selectedRowKeys,
      selectedDetailRowKeys,
      listLoading,
      quoteDatialList,
      timeline,
      handleRadio,
      quotelist,
      choosenDetailRowData,
      detailChoosenType,
      detailPagination,
      quote,
      returnElement,
      listDetailLoading,
      onSearch,
    } = props;
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
            columns={clientContentColumns}
            body={quotelist}
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
          <Radio.Group value={detailChoosenType} buttonStyle="solid" onChange={handleRadio}>
            {menuRadio2.map((item, index) => {
              return (
                <Radio.Button value={index + 1} key={item}>
                  {item}
                  {/* <FormattedMessage id={`app.quote.menuMap.${type}`} defaultMessage="" /> */}
                </Radio.Button>
              );
            })}
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
            columns={returnCustomerColumns(choosenRowData.quoteMethod)}
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


export default Info;

