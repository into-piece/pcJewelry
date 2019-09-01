/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:47:00
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Row, Col, Card, Button, Modal, Form, Input, notification, Select, Radio, Checkbox } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import SvgUtil from '@/utils/SvgUtil';
import Table from '@/components/Table';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import DescriptionList from '@/components/DescriptionList';
import serviceObj from '@/services/quote';
import LockTag from '@/components/LockTag'
import jsonData from './index.json'
import SearchForm from '@/components/SearchForm'
import CustomerSearchFrom from "../Client/components/CustomerSearchFrom";
import { pingYincompare, encompare, formDatecompare } from '@/utils/utils';
// import Bread from '@/components/BreadCrumb'
import SelectProductModal from './SelectProductModal'

const { Description } = DescriptionList;
const FormItem = Form.Item;
const { Option } = Select;
const { deleteProductQuoteHeader } = serviceObj
// manuArr是 =》menu配置提供遍历
// modalContent => 每个menu不同的增加弹窗填写信息
const { modalContent } = jsonData

// 弹窗form表单样式
// const formLayout = {
//   labelCol: { span: 2 },
//   wrapperCol: {
//     span: 6,
//   },
// };

// 面包屑数据
// const breadData = [
//   {
//     name: '主页', link: '/'
//   },
//   {
//     name: '开发', link: '/quote/basic'
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

const isLockList = false // table是否锁定=》显示锁定标签做判断 先设定为否

function returnStatus(v) {
  return Number(v) === 2 ? '已审批' : Number(v) === 0 ? '输入' : ''
}

// createTime: "2019-06-07 10:49:57"
// createUser: "zengwl"
// enName: "Strategic Customer"
// id: "79066b803097ff4e6d28b0afbf20fed1"
// modifier: "zengwl"
// mtime: "2019-07-27 00:56:51"
// status: "0"
// zhName: "战略客户"

const clientContentColumns = [
  {
    title: <div className={styles.row_normal2}>客户编号</div>,
    dataIndex: 'customerId',
    key: 'customerId',
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    )
  },
  {
    title: <div className={styles.row_normal2}>简称</div>,
    dataIndex: 'customerShotName',
    key: 'customerShotName',
  },
  {
    title: <div className={styles.row_normal2}>报价单号</div>,
    dataIndex: 'quoteNumber',
    key: 'quoteNumber',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },
  {
    title: <div className={styles.row_normal2}>类别</div>, // ?
    dataIndex: 'typeName',
    key: 'typeName',
  },

  {
    title: <div className={styles.row_normal2}>报价日期</div>,
    dataIndex: 'quoteDate',
    key: 'quoteDate',
    render: (data) => (data)
  },

  {
    title: <div className={styles.row_normal2}>数量</div>,
    dataIndex: 'quoteTotalCount',
    key: 'quoteTotalCount',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },

  {
    title: <div className={styles.row_normal2}>重量</div>,
    dataIndex: 'quoteTotalWeight',
    key: 'quoteTotalWeight',
    sorter: (a, b) => {
      encompare(a.enAddress, b.enAddress);
    },
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
    title: <div className={styles.row_normal2}>产品说明</div>,// ?
    dataIndex: 'explains',
    key: 'explains',
  },
];


const customerColumns = [
  {
    title: <div className={styles.row_normal2}>产品编号</div>,
    dataIndex: 'productNo',
    key: 'productNo',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: <div className={styles.row_normal2}>客户货号</div>,
    dataIndex: 'custoerProductNo',
    key: 'custoerProductNo',
  },
  {
    title: <div className={styles.row_normal2}>前次工费/克</div>,
    dataIndex: 'lastCount',
    key: 'enName',
  },
  {
    title: <div className={styles.row_normal2}>实际工费/克</div>,
    dataIndex: 'actualCount',
    key: 'actualCount',
  },
  {
    title: <div className={styles.row_normal2}>最高工费/克</div>,
    dataIndex: 'topCount',
    key: 'topCount',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },
  {
    title: <div className={styles.row_normal2}>此次工费/克</div>,
    dataIndex: 'nowCount',
    key: 'nowCount',
  },

  {
    title: <div className={styles.row_normal2}>字印价/件</div>,
    dataIndex: 'markingPrice',
    key: 'markingPrice',
  },

  {
    title: <div className={styles.row_normal2}>包装价/件</div>,
    dataIndex: 'packPrice',
    key: 'packPrice',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },

  {
    title: <div className={styles.row_normal2}>报价金额</div>,
    dataIndex: 'quotedAmount',
    key: 'quotedAmount',
    sorter: (a, b) => {
      encompare(a.enAddress, b.enAddress);
    },
  },
];

// 筛选参数
const searchParams = [
  { key: '客户货号', value: 'custoerProductNo' },
  { key: '类别名称', value: 'name' },
  { key: '颜色', value: 'color' },
  { key: '成色', value: 'color1' },
  { key: '电镀颜色', value: 'color2' },
  { key: '客户编号', value: 'customerNo' },
  // { key: '客户货号', value: 'goodsNo' },
  { key: '供应商编号', value: 'supplierNo' },
  { key: '供应商名称', value: 'supplierName' },
]

// 弹窗获取产品id传参数  产品编码、客户货号、宝石颜色、成色、颜色、中文名、英文名
// 表头列表的产品编码productNo、客户货号supplierProductNo、宝石颜色gemColor、成色productColor、电镀颜色platingColor、中文名zhName、英文名enName
const headList = [
  { key: '报价单号', value: '系统自动生成', type: 4 },
  { key: '报价日期', value: '系统自动生成', type: 4 },
  { key: '类别', value: 'custoerProductNo', "type": 2, "list": "wordbookdropdown" },
  { key: '紧急程度', value: '紧急', type: 5 },
  { key: '客户编号', value: 'customerNo', "type": 2, "list": "customerDropDownList" },
  { key: '客户简称', value: 'custoerProductNo' },
  { key: '终客编号', value: 'custoerProductNo' },
  { key: '终客简称', value: 'endShotName' },
  { key: '报价方式', value: 'quoteMethod', type: 6, arr: [{ key: '计重', value: 1 }, { key: '计件', value: 2 }], initValue: 1 },
  { key: '是否计石重', value: 'isWeighStonesName', type: 6, arr: [{ key: '是', value: 1 }, { key: '否', value: 2 }], initValue: 1 },
  { key: '结算币种', value: 'currency' },
  { key: '主材价', value: 'quotePrice' },
  { key: '税率', value: 'taxRate' },
  { key: '字印编码', value: 'markingId', "type": 2, "list": "markinglist" },
  { key: '字印英文名', value: 'markingEnName' },
  { key: '包装单价', value: 'packPriceType', type: 6, arr: [{ key: '计收', value: 1 }, { key: '不计收', value: 2 }], initValue: 1 },
  { key: '客户备料', value: 'customerPreparation' },
  { key: '向客户备料', value: 'custoerProductNo' }, //?
  { key: '说明', value: 'explains' },
  { key: '备注', value: 'remark' },
]

const detailList = [
  { key: '产品编号', value: 'productNo', clickFn: 'showProductModalFunc', text: '选择产品编号', type: 3 },
  { key: '客户货号', value: 'custoerProductNo' },
  { key: '类别', value: 'type' },
  { key: '成色名称', value: '1' }, // ?
  { key: '宝石颜色', value: 'gemColorName' },
  { key: '电镀颜色', value: 'platingColorName' },
  { key: '产品系列', value: 'productLineName' },
  { key: '产品报价系数', value: 'productLineCoefficientQuotation' },
  { key: '计量单位', value: 'unitOfMeasurementName' },
  { key: '重量单位', value: 'unitOfWeightName' },
  { key: '前次工费/克', value: 'lastCount' },
  { key: '最高工费/克', value: 'topCount' },
  { key: '实际工费/克', value: 'actualCount' },
  { key: '此次工费/克', value: 'nowCount' },
  { key: '是否计石重', value: 'isWeighStonesName' },
  { key: '石材重量', value: 'stonesWeight' },
  { key: '主材重量', value: 'mainMaterialWeight' },
  { key: '石材价', value: 'stonePrice' },
  { key: '字印编码', value: 'markingId' },
  { key: '字印英文名', value: 'markingEnName' },
  { key: '字印价/件', value: 'markingPrice' },
  { key: '包装单价/件', value: 'packPrice' },
  { key: '单价', value: 'price' },
  { key: '报价数量', value: 'qty' },
  { key: '报价金额', value: 'quotedAmount' },
  { key: '报价重量范围', value: 'quotedWeightRange' },
  { key: '产品工费/件', value: 'productCost' },
  { key: '产品长度', value: 'productLength' },
  { key: '长度描述', value: 'lengthDescription' },
  { key: '长度单位', value: 'lengthUnit' },
  { key: '戒围标准', value: 'ringAroundStId' },
  { key: '戒围号', value: 'sizeCodeId' },
  { key: '备注', value: 'remark' },
  { key: '客户要求', value: '1' } // ?
]

const productSearchParams = [
  { key: '产品编码', value: 'productNo' },
  { key: '客户货号', value: 'supplierProductNo' },
  { key: '宝石颜色', value: 'gemColor' },
  { key: '成色', value: 'productColor' },
  { key: '电镀颜色', value: 'platingColor' },
  { key: '中文名', value: 'zhName' },
  { key: '英文名', value: 'enName' },
]

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
  };
})
class Info extends Component {
  state = {
    modalType: '',
    addData: {
      measureUnit: {
        unitCode: '',
        zhName: '',
        enName: ''
      },
      colorPercentage: {}
    },
  };

  componentDidMount() {
    // 获取初始表单数据
    this.getList({ sendReq: 'currentQuote' });
  }

  // 获取对应key=》页面进行数据请求
  getList = (args) => {
    const { dispatch, pagination } = this.props;
    // getDevList
    dispatch({
      type: `quote/getList`,
      payload: { params: pagination, ...args },
    });
  }

  getProduct = (args) => {
    const { dispatch, productPagination } = this.props
    debugger
    dispatch({
      type: 'quote/getProductList',
      payload: { params: productPagination, ...args },
    })
  }

  openAddModal = () => {
    const { dispatch, rightMenu } = this.props
    const isHead = rightMenu === 1
    if (isHead) {
      dispatch({
        type: 'quote/getwordbookdropdown'
      })
      dispatch({
        type: 'quote/getlistCustomerDropDown'
      })
      dispatch({
        type: 'quote/getMarkinglistDropDown'
      })
    }
  }

  // 列表对应操作button回调
  btnFn = modalType => {
    const { selectKey, dispatch } = this.props
    switch (modalType) {
      case 'plus':
      case 'edit':
      default:
        console.log(selectKey, '==============selectKey')
        this.openAddModal()
        this.setState({ modalType });
        break;
      case 'delete':
        this.handleDelect()
        break;
      case 'lock':
        this.handleLock()
        break;
    }
  };

  showProductModalFunc = (type = 1) => {
    const { dispatch } = this.props
    if (type === 1) {
      this.getProduct()
    }
    dispatch({
      type: 'quote/showProductModalFn',
      payload: type === 1
    })
  }

  // 根据btn点击 返回对应弹窗内容
  // type 2 下啦选择
  // type 3 点击事件
  // type 4 文字
  // type 5 radio
  getModalContent = () => {
    const {
      rightMenu,
      choosenRowData,
      form: { getFieldDecorator },
    } = this.props;
    const { modalType } = this.state
    const content = ''
    const isEdit = modalType === 'edit'
    const { quote } = this.props
    const addArr = rightMenu === 1 ? headList : detailList
    console.log(quote.wordbookdropdown)
    return (
      <Form size="small">
        {
          addArr && addArr.map(({ key, value, noNeed, type, list, clickFn, text, arr, initValue }) => {
            if (type === 2) {
              console.log(list, quote, quote[list])
            }
            return (
              <div className="addModal" key={key}>
                <FormItem
                  label={key}
                  // {...formLayout}
                  key={Math.random() + key}
                >
                  {
                    getFieldDecorator(value, {
                      rules: [{ required: !noNeed, message: `请${type && type === 2 ? '选择' : '输入'}${key}` }],
                      initialValue: isEdit ? choosenRowData[value] : initValue ? initValue : '',
                    })(type === 2 ?
                      <Select style={{ width: 180 }} placeholder="请选择">
                        {quote[list] && quote[list].map(({ value, key }) => <Option value={value} key={value}>{key}</Option>
                        )}
                      </Select> :
                      type === 3 ?
                        <span onClick={() => { this[clickFn](1) }} style={{ cursor: 'pointer' }}>{text}</span>
                        :
                        type === 4 ?
                          <span>{value}</span>
                          :
                          type === 5 ?
                            <Checkbox checked={true}>{value}</Checkbox>
                            :
                            type === 6 ?
                              <Radio.Group>
                                {
                                  arr.map(({ key, value }) => {
                                    return <Radio value={value}>{key}</Radio>
                                  })
                                }
                              </Radio.Group> : <Input style={{ width: '100' }} placeholder="请输入" />
                    )
                  }
                </FormItem>
              </div>
            )
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
    const { rightMenu } = this.props
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
    const str = rightMenu === 1 ? '' : '明细'
    return `${text}报价${str}`;
  };

  // 新增按钮事件回调
  handleAdd = () => {
    const { selectKey, form } = this.props
    const { addData } = this.state

    form.validateFields((err, values) => {
      if (!err) {
        // this.setState({
        //   [selectKey]
        // })
        // serviceObj[`addBasic${selectKey}`](addData[selectKey]).then()
        serviceObj[`addBasic${selectKey}`](values).then(res => {
          const { rtnCode, rtnMsg } = res.head
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList()
            this.btnFn('');
          }
        })
      }
    });
  }

  // 编辑按钮回调
  handleEdit = () => {
    const { selectKey, form } = this.props
    const { addData } = this.state

    // 还要清空所选中项
    this.props.dispatch({
      type: 'quote/changeSelectedRowKeys',
      payload: [],
    });

    form.validateFields((err, values) => {
      if (!err) {
        const { choosenRowData } = this.props
        // serviceObj[`addBasic${selectKey}`](addData[selectKey]).then()
        const params = {
          ...values,
          id: choosenRowData.id
        }
        serviceObj[`addBasic${selectKey}`](params).then(res => {
          const { rtnCode, rtnMsg } = res.head
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList()
            this.btnFn('');
          }
        })
      }
    });
  }

  // 删除按钮回调
  handleDelect = () => {
    const { rightMenu, selectedRowKeys, selectedDetailRowKeys } = this.props
    console.log(selectedRowKeys, selectedDetailRowKeys)
    const sendApi = rightMenu === 1 ? deleteProductQuoteHeader : ''
    const data = rightMenu === 1 ? selectedRowKeys : selectedDetailRowKeys
    sendApi(data).then(res => {
      const { rtnCode, rtnMsg } = res.head
      debugger
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.getList()
      }
    })
  }

  // 审批/撤销 按钮回调
  handleLock = () => {
    const { selectedRowKeys } = this.props
    const isLock = this.returnLockType().type === 1  // 根据this.returnLockType()判断返回当前是撤回还是审批
    const serviceType = isLock ? 'approve' : 'cancelApproval'
    serviceObj[serviceType](selectedRowKeys).then(res => {
      const { rtnCode, rtnMsg } = res.head
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.getList()
      }
    })
  }

  /**
   * 根据已经选中的列id 遍历获取对应status数组 判断返回是否显示撤销或审批 按钮是否可用
   * return obj
   * params: name 名称
   * params: disabled 是否可点击
   * params: type 1为审批 2为撤销
   */
  returnLockType = () => {
    const { selectedRowKeys, selectedDetailRowKeys, quote, rightMenu, quotelist, quoteDatialList } = this.props
    const list = rightMenu === 1 ? quotelist : quoteDatialList
    const selectedKeys = rightMenu === 1 ? selectedRowKeys : selectedDetailRowKeys
    console.log(list, '============')
    if (list && list.records.length === 0) return { name: '审批', disabled: true, type: 1 }
    const isLock1 = selectedKeys.reduce((res, cur) => {
      const singleObjcect = list.records.find(subItem => subItem.id === cur)
      if (singleObjcect) res.push(singleObjcect.status)
      return res
    }, [])
    const isShenPi = isLock1.every((item) => Number(item) === 0) // 是否全是0
    const isChexiao = isLock1.every((item) => Number(item) === 2) // 是否全是2
    if (isShenPi) return { name: '审批', disabled: false, type: 1 }
    if (isChexiao) return { name: '撤销', disabled: false, type: 2 }
    return { name: '审批', disabled: true, type: 1 } // 当两种状态都有 禁止点击
  }

  // 弹窗确定提交回调
  handleModalOk = () => {
    const { modalType } = this.state;
    switch (modalType) {
      case 'plus':
        this.handleAdd()
        break;
      case 'edit':
        this.handleEdit()
        break;
      default:
        break;
    }

  }

  // 判断按钮是否禁止 返回boolean
  returnSisabled = (tag) => {
    const { selectedRowKeys } = this.props
    if (tag === 'plus') return false
    if (tag === 'lock') {
      return selectedRowKeys.length === 0 || this.returnLockType().disabled
    }
    return selectedRowKeys.length === 0
  }


  handleRadio = (e) => {
    const v = e.target.value
    this.props.dispatch({
      type: `quote/getTimeline`,
      payload: e.target.value,
    })
    this.getList({ sendReq: v })
  }

  changeRightMenu = v => {
    const { dispatch } = this.props;
    dispatch({
      type: 'quote/changeRightMenu',
      payload: v.target.value,
    });
  }

  render() {
    const { state, props, btnFn, getModalContent, returnTitle, handleModalOk, returnLockType, returnSisabled, handleRadio, changeRightMenu, showProductModalFunc } = this;
    const { modalType, } = state;
    const { list, selectKey, choosenRowData, rightMenu, choosenDetailRowData, showProductModal } = props;
    console.log(showProductModal, '========showProductModal')
    return (
      <div className={styles.page}>
        {/* <Bread data={breadData} /> */}
        <div className={styles.center_content}>
          {/* lg={17} md={24} */}
          <div className={styles.main}>
            <div className={styles.right}>
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
              />
            </div>
          </div>
        </div>
        {handleModalOk && <Modal
          title={returnTitle()}
          width={1000}
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
        }

        <Modal
          title='选择产品'
          width={1000}
          className={styles.standardListForm}
          bodyStyle={{ padding: '28px 0 0' }}
          destroyOnClose
          onOk={handleModalOk}
          visible={showProductModal}
          onCancel={() => {
            showProductModalFunc(2);
          }}
        >
          <SelectProductModal productSearchParams={productSearchParams} />
        </Modal>
      </div>
    );
  }
}




const radioArr = ['报价主页', '报价明细']


// 右手边正文内容
const RightContent = ({ type, choosenRowData, btnFn, returnLockType, returnSisabled, handleRadio, changeRightMenu, rightMenu, choosenDetailRowData }) => (
  <GridContent>
    <Row gutter={24} className={styles.row_content}>

      {/* 中间table组件 */}
      <Col lg={16} md={24}>
        <CenterInfo type={type} handleRadio={handleRadio} />
      </Col>


      {/* 右边显示详细信息和按钮操作 */}
      <Col lg={8} md={24}>
        <div className={styles.view_right_content}>
          <Card bordered={false}>
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
                    style={{
                      height: 40,
                      width: 130,
                      textalign: 'center',
                      lineHeight: '40px'
                    }}
                    value={index + 1}
                  >{item}
                  </Radio.Button>)
              }
            </Radio.Group>
            <GetRenderitem data={rightMenu === 1 ? choosenRowData : choosenDetailRowData} type={rightMenu} />
          </Card>

          {/*  */}
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
                  onClick={() => { btnFn(tag) }}
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

const rowArr = [
  { key: '报价单号', value: 'quoteNumber' },
  { key: '报价日期', value: 'quoteDate' },
  { key: '客户', value: 'customerId' },
  { key: '类别', value: 'type' },
  { key: '终客', value: 'endNo' },
  { key: '中文名', value: 'zhName' },
  { key: '英文名', value: 'enName' },
  { key: '联系人', value: 'quoteNumber' },
  { key: '手机', value: 'quoteNumber' },
  { key: 'Email', value: 'quoteNumber' },
  { key: '报价方式', value: 'quoteMethod' },
  { key: '主材价', value: 'quotePrice' },
  { key: '结算币种', value: 'currency' },
  { key: '税率', value: 'taxRate' },
  { key: '紧急程度', value: 'emergency' },
  { key: '计石重', value: 'isWeighStones' },
  { key: '字印编码', value: 'markingId' },
  { key: '字印英文名', value: 'markingEnName' },
  { key: '包装单价', value: 'packPriceType' },
  { key: '客户备料', value: 'customerPreparation' },
  { key: '向客户采购用料', value: 'purchasingMaterialsFromCustomers' },
  { key: '包装说明', value: 'packExplains' },
  { key: '报价总数', value: 'quoteTotalCount' },
  { key: '报价总重', value: 'quoteTotalWeight' },
  { key: '报价总额', value: 'quoteTotalAmount' },
  { key: '说明', value: 'explains' },
  { key: '备注', value: 'remark' },
]

// 右手边显示的详情信息
const GetRenderitem = ({ data, type }) => {
  const selectRowItem = () => {
    // console.log('select the item');
  };

  // const arr = [
  //   ...modalContent[type],
  //   { "key": "状态", "value": "status" },
  // ]

  const arr = type === 1 ? rowArr : detailList

  return (
    <div style={{ marginLeft: 10, marginTop: 10 }} className={styles.getRenderitem} onClick={selectRowItem}>
      <DescriptionList className={styles.headerList} size="small" col="1">
        {
          arr.map(({ key, value }) => {
            return (
              <Description term={key}>{value === 'status' ? returnStatus(data[value]) : data[value]}</Description>
            )
          })
        }
      </DescriptionList>
    </div>
  );
};



const menuRadio2 = ['产品清单']


// Table 中间列表内容
@Form.create()
@connect(({ loading, quote }) => {
  return {
    quote,
    listLoading: loading.effects['quote/getList'],
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
  changePagination = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'quote/getDevList',
      payload: obj,
    });
    dispatch({
      type: 'quote/getPagination',
      payload: obj,
    });
  };


  // 选中某行表头
  changeChoosenRow = (rowData, type) => {
    const { dispatch, pagination } = this.props;
    const str = type === 1 ? '' : 'Detail'
    dispatch({
      type: `quote/getChoosen${str}RowData`,
      payload: rowData,
    });
    if (type === 1) {
      dispatch({
        type: `quote/getDetailList`,
        payload: {
          params: { pagination, quoteHeadId: rowData.id },
        },
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
    const str = type === 2 ? 'Detail' : ''
    this.props.dispatch({
      type: `quote/changeSelected${str}RowKeys`,
      payload: selectedRowKeys,
    })
  };

  // 当表头重复点击选中 清空选中 清空表体
  clearFn = (type) => {
    const { dispatch, rightMenu } = this.props;
    debugger
    if (type === 1) {
      debugger
      dispatch({
        type: `quote/clearDetailList`,
      });
    } else { }
  }

  onSearch = (v) => {
    this.getList(v)
  }

  // 获取对应key=》页面进行数据请求
  getList = (args) => {
    const { dispatch, pagination } = this.props;
    // getDevList
    dispatch({
      type: `quote/getList`,
      payload: { params: { ...pagination, ...args } },
    });
  }

  render() {
    const { onSelectChange, props, clearFn, onSearch } = this
    const { choosenRowData, pagination, selectedRowKeys, selectedDetailRowKeys, listLoading, quoteDatialList, timeline, handleRadio, quotelist, choosenDetailRowData, detailChoosenType, detailPagination } = props;
    console.log(quotelist, quoteDatialList, choosenRowData, '================quotelist')
    return (
      <div className={styles.view_left_content}>
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
        <SearchForm data={searchParams} onSearch={onSearch} />
        <div className={styles.tableBox}>
          <Table
            columns={clientContentColumns}
            body={quotelist}
            changeChoosenRow={record => { this.changeChoosenRow(record, 1) }}
            selectKey={choosenRowData.id}
            pagination={pagination}
            changePagination={this.changePagination}
            selectedRowKeys={selectedRowKeys}
            onSelectChange={(data) => { onSelectChange(data, 1) }}
            listLoading={listLoading}
            clearFn={clearFn}
            type={1}
          />
        </div>

        <Radio.Group value={detailChoosenType} buttonStyle="solid" onChange={handleRadio}>
          {
            menuRadio2.map((item, index) => {
              return (
                <Radio.Button value={index + 1}>
                  {item}
                  {/* <FormattedMessage id={`app.quote.menuMap.${type}`} defaultMessage="" /> */}
                </Radio.Button>
              )
            })
          }
        </Radio.Group>
        <div className={styles.tableBox}>
          <Table
            columns={customerColumns}
            body={quoteDatialList}
            type={2}
            changeChoosenRow={record => { this.changeChoosenRow(record, 2) }}
            selectKey={choosenDetailRowData.id}
            pagination={detailPagination}
            changePagination={this.changePagination}
            selectedRowKeys={selectedDetailRowKeys}
            onSelectChange={(data) => { onSelectChange(data, 2) }}
            listLoading={listLoading}
            clearFn={clearFn}
          />
        </div>
      </div>
    );
  }
}


export default Info;
