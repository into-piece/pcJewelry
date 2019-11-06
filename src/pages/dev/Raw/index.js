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
  Carousel,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Divider,
  notification,
  Select,
  Radio,
} from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Zmage from 'react-zmage';
import moment from 'moment';
import styles from './index.less';
import Table from '@/components/Table';
import UploadImg from '@/components/UploadImg';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import DescriptionList from '@/components/DescriptionList';
import serviceObj from '@/services/dev';
import LockTag from '@/components/LockTag';
import { modalContent } from './config/index';
import { statusConvert } from '@/utils/convert';
import ModalConfirm from '@/utils/modal';
import SearchFrom from './components/SearchFrom';
import SearchFromTab0 from './components/SearchFromTab0';
import BuildTitle from '@/components/BuildTitle';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const { Option } = Select;

const { TextArea } = Input;
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
    title: '类别',
    dataIndex: 'bTypeName',
    key: 'bType',
  },
  {
    title: '小类',
    dataIndex: 'sType',
    key: 'sType',
    render:(d,i)=>(i.sTypeName)
  },
  {
    title: '名称',
    dataIndex: 'zhName',
    key: 'zhName',
  },

];
typeTable = typeTable.map(item => ({ ...item, sorter: true }));

// table 当前页对应的表头配置
const columnsArr = {
  // 主材表头
  material: [
    {
      title: '原料编号',
      dataIndex: 'materialNo',
      key: 'materialNo1',
      render: data => isLockList ? (
        <LockTag>
          {data}
        </LockTag>
      )
        : (data),
    }, {
      title: '成色',
      dataIndex: 'assaying',
      key: 'assayingName1',
      render:(d,i)=>(i.assayingName)

    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhName1',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName1',
    },
    {
      title: '重量单位',
      dataIndex: 'weightUnit',
      key: 'weightUnitName1',
      render:(d,i)=>(i.weightUnitName)

    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '计价类别',
      dataIndex: 'valuationClass',
      key: 'valuationClassName1',
      render:(d,i)=>(i.valuationClassName)

    },
    {
      title: '库存重量',
      dataIndex: 'repertoryWeight',
      key: 'repertoryWeight1',
    },
    {
      title: '最低采购量',
      dataIndex: 'minimumPurchaseQuantity',
      key: 'minimumPurchaseQuantity1',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status1',
      render: data => statusConvert[data],
    },
  ],
  // 配件表头
  accessories: [
    {
      title: '原料编号',
      dataIndex: 'materialNo',
      key: 'materialNo2',
      render: data => isLockList ? (
        <LockTag>
          {data}
        </LockTag>
      )
        : (data),
    },
    {
      title: '成色',
      dataIndex: 'assaying',
      key: 'assayingName2',
      render:(d,i)=>(i.assayingName)

    },
    {
      title: '形状',
      dataIndex: 'shape',
      key: 'shapeNam2e',
      render:(d,i)=>(i.shapeName)

    },
    {
      title: '规格',
      dataIndex: 'specification',
      key: 'specificationNa2me',
      render:(d,i)=>(i.specificationName)

    },
    {
      title: '客户编号',
      dataIndex: 'customerNo',
      key: 'customerNo',
    },
    {
      title: '供应商编号',
      dataIndex: 'supplierNo',
      key: 'supplierNo',
    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhNa2me',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enNa2me',
    },
    {
      title: '计量单位',
      dataIndex: 'measureUnit',
      key: 'measureU2nitName',
      render:(d,i)=>(i.measureUnitName)

    },
    {
      title: '重量单位',
      dataIndex: 'weightUnit',
      key: 'weightUn2itName',
      render:(d,i)=>(i.weightUnitName)

    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '计价类别',
      dataIndex: 'valuationClass',
      key: 'valuationC2lassName',
      render:(d,i)=>(i.valuationClassName)

    },
    {
      title: '单重',
      dataIndex: 'inventoryWeight',
      key: 'inventor2yWeight',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'statu2s',
      render: data => statusConvert[data],
    },
  ],
  // 其他材料
  otherMaterial: [
    {
      title: '原料编号',
      dataIndex: 'materialNo',
      key: 'mater3ialNo',
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
      key: 'zhN3ame',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enN3ame',
    },
    {
      title: '计量单位',
      dataIndex: 'measureUnit',
      key: 'meas3ureUnit',
      render:(d,i)=>(i.measureUnitName)

    },
    {
      title: '重量单位',
      dataIndex: 'weightUnit',
      key: 'weigh3tUnit',
      render:(d,i)=>(i.weightUnitName)

    },
    {
      title: '计价类别',
      dataIndex: 'valuationClass',
      key: 'valua3tionClass',
      render:(d,i)=>(i.valuationClassName)

    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'statu3s',
      render: data => statusConvert[data],
    },
  ],
  wrapper: [
    {
      title: '原料编号',
      dataIndex: 'materialNo',
      key: 'mater4ialNo',
      render: data => isLockList ? (
        <LockTag>
          {data}
        </LockTag>
      )
        : (data),
    },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'colour4',
      render:(d,i)=>(i.colorName)

    },
    {
      title: '基本材料',
      dataIndex: 'basicMaterials',
      key: 'basicMaterials4',
    },
    {
      title: '条码',
      dataIndex: 'barCode',
      key: 'barCode4',
    },
    {
      title: '形状',
      dataIndex: 'shape',
      key: 'shape4',
      render:(d,i)=>(i.shapeName)

    },
    {
      title: '规格',
      dataIndex: 'specification',
      key: 'specification4',
      render:(d,i)=>(i.specificationName)

    },
    {
      title: '客户编号',
      dataIndex: 'customerNo',
      key: 'customerNo',
    },
    {
      title: '供应商编号',
      dataIndex: 'supplierNo',
      key: 'supplierNo',
    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhName4',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName4',
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price4',
    },
    {
      title: '成本价',
      dataIndex: 'costPirce',
      key: 'costPirce4',
    },
    {
      title: '计量单位',
      dataIndex: 'measureUnit',
      key: 'measureUnit4',
      render:(d,i)=>(i.measureUnitName)

    },
    {
      title: '重量单位',
      dataIndex: 'weightUnit',
      key: 'weightUnit4',
      render:(d,i)=>(i.weightUnitName)

    },
    {
      title: '计价类别',
      dataIndex: 'valuationClass',
      key: 'valuationClassName4',
      render:(d,i)=>(i.valuationClassName)

    },
    {
      title: '单重',
      dataIndex: 'singleWeight',
      key: 'singleWeight4',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status4',
      render: data => statusConvert[data],
    },
  ],
  auxiliaryMaterial: [
    {
      title: '原料编号',
      dataIndex: 'materialNo',
      key: 'material5No',
      render: data => isLockList ? (
        <LockTag>
          {data}
        </LockTag>
      )
        : (data),
    },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'color5',
      render:(d,i)=>(i.colorName)

    },
    {
      title: '形状',
      dataIndex: 'shape',
      key: 'shape5',
      render:(d,i)=>(i.shapeName)

    },
    {
      title: '规格',
      dataIndex: 'specification',
      key: 'specific5ation',
      render:(d,i)=>(i.specificationName)

    },
    {
      title: '客户编号',
      dataIndex: 'customerNo',
      key: 'customerNo',
    },
    {
      title: '供应商编号',
      dataIndex: 'supplierNo',
      key: 'supplierNo',
    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhNam5e',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enNam5e',
    },
    {
      title: '计量单位',
      dataIndex: 'measureUnit',
      key: 'measu5reUnit',
      render:(d,i)=>(i.measureUnitName)

    },
    {
      title: '重量单位',
      dataIndex: 'weightUnit',
      key: 'weigh5tUnit',
      render:(d,i)=>(i.weightUnitName)

    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '计价类别',
      dataIndex: 'valuationClass',
      key: 'valuat5ionClass',
      render:(d,i)=>(i.valuationClassName)

    },
    {
      title: '单重',
      dataIndex: 'singleWeight',
      key: 'single5Weight',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'stat5us',
      render: data => statusConvert[data],
    },
  ],
  stone: [
    {
      title: '原料编号',
      dataIndex: 'materialNo',
      key: 'materi6alNo',
      render: data => isLockList ? (
        <LockTag>
          {data}
        </LockTag>
      )
        : (data),
    },
    {
      title: '规格',
      dataIndex: 'specification',
      key: 'speci6ficationName',
      render:(d,i)=>(i.specificationName)

    },
    {
      title: '形状',
      dataIndex: 'shape',
      key: 'shap6eName',
      render:(d,i)=>(i.shapeName)

    },
    {
      title: '切工',
      dataIndex: 'cut',
      key: 'cutN6ame',
      render:(d,i)=>(i.cutName)

    },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'color6Name',
      render:(d,i)=>(i.colorName)

    },
    {
      title: '等级',
      dataIndex: 'quality',
      key: 'qualit6yName',
      render:(d,i)=>(i.qualityName)

    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhName6',
    },
    {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName6',
    },
    {
      title: '是否配料',
      dataIndex: 'isIngredient',
      key: 'isIngredientName6',
      render:(d,i)=>(i.isIngredientName)

    },
    {
      title: '计量单位',
      dataIndex: 'measureUnit',
      key: 'measureUnitName6',
      render:(d,i)=>(i.measureUnitName)

    },
    {
      title: '重量单位',
      dataIndex: 'weightUnit',
      key: 'weightUnitNam6e',
      render:(d,i)=>(i.weightUnitName)

    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '计价类别',
      dataIndex: 'valuationClass',
      key: 'valuationCl6assName',
      render:(d,i)=>(i.valuationClassName)

    },
    {
      title: '单重',
      dataIndex: 'inventoryWeight',
      key: 'inventory6Weight',
    },
    {
      title: '客户编号',
      dataIndex: 'customerNo',
      key: 'customerNo',
    },
    {
      title: '供应商编号',
      dataIndex: 'supplierNo',
      key: 'supplierNo',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'stat6us',
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
    addloading: false,
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
    this.initDropList();
    this.getTypeList();

  }

  initDropList = () => {
    const { dispatch } = this.props;
    // 切工下拉
    dispatch({
      type: 'devRaw/getCutDrop',
      payload: {},
    });
    // 等级下拉
    dispatch({
      type: 'devRaw/getQualityDrop',
      payload: {},
    });
    // 颜色下拉
    dispatch({
      type: 'devRaw/getColorDrop',
      payload: {},
    });
    // 主材类别下拉
    dispatch({
      type: 'devRaw/getTypeByWordbookCode',
      payload: { key: 'H016001' },
    });
    // 石材类别下拉
    dispatch({
      type: 'devRaw/getTypeByWordbookCode',
      payload: { key: 'H016002' },
    });
    // 配件类别下拉
    dispatch({
      type: 'devRaw/getTypeByWordbookCode',
      payload: { key: 'H016003' },
    });

    // 包装类别下拉
    dispatch({
      type: 'devRaw/getTypeByWordbookCode',
      payload: { key: 'H016004' },
    });
    // 辅材类别下拉
    dispatch({
      type: 'devRaw/getTypeByWordbookCode',
      payload: { key: 'H016005' },
    });


    // 大类下拉
    dispatch({
      type: 'devRaw/getListMstWordbookParams',
      payload: { wordbookTypeCode: 'H015' },
    });
    // 小类下拉
    dispatch({
      type: 'devRaw/getListMstWordbookParams',
      payload: { wordbookTypeCode: 'H016' },
    });
    // 成色列表
    dispatch({
      type: 'devRaw/getlistBasicColourSetDropDown',
      payload: {},
    });
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
    // 重量单位列表
    dispatch({
      type: 'devRaw/getBUMDropDown',
      payload: {},
    });
  };

  getTypeList = (params) => {
    const { dispatch, paginationTypes } = this.props;
    // getDevList
    dispatch({
      type: `devRaw/getList`,
      payload: { params: { ...(params&&params.current?{}:(paginationTypes)), ...params }, type: 'types' },
    });
    dispatch({
      type: 'devRaw/setsearchparams',
      payload: {},
    });
  };

  // 获取对应key=》页面进行数据请求
  getList = ({ key, params, sId }) => {
    const { dispatch, pagination, selectKey, choosenTypesRowData } = this.props;

    // 没有选择类型就没有查询下面
    if (!sId && (!choosenTypesRowData || choosenTypesRowData.id === '')) {
      return;
    }

    // getDevList
    dispatch({
      type: `devRaw/getList`,
      payload: { params: { ...(params&&params.current?{}:(pagination)), ...params, sId: sId || choosenTypesRowData.id }, type: key || selectKey },
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
        this.initDropList();
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


  returnElement = ({ type, dev, list, disable, number }) => {
    switch (type) {
      case 2:
        return (<Select placeholder="请选择" disabled={disable || false}>
          {dev[list] && dev[list].map(({ value, key }) =>
            <Option value={value} key={value}>{key}</Option>,
          )}
        </Select>);
      case 3:
        return (<Radio.Group disabled={disable || false}>
          <Radio value="0">计重</Radio>
          <Radio value="1">计件</Radio>
        </Radio.Group>);
      case 4:
        return (<Radio.Group disabled={disable || false}>
          <Radio value="0">否</Radio>
          <Radio value="1">是</Radio>
        </Radio.Group>);
      case 5:
        return (<Select
          placeholder="请选择"
          disabled={disable || false}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {dev[list] && dev[list].map(({ value, key }) =>
            <Option value={value} key={value}>{key}</Option>,
          )}
        </Select>);
      case 9:
        return (<TextArea disabled={disable || false} />);
      default:
        return <Input placeholder="请输入" disabled={disable || false} type={number ? 'number' : 'text'} />;
    }
  };


  // 根据btn点击 返回对应弹窗内容
  getModalContent = () => {
    const {
      selectKey,
      dev,
      choosenRowData,
      form: { getFieldDecorator, getFieldValue, setFieldsValue },
    } = this.props;
    const { modalType } = this.state;
    const content = '';
    const dataArr = modalContent[selectKey];
    const isEdit = modalType === 'edit';

    return (
      <Form size="small">
        {
          dataArr && dataArr.map(({ key, value, noNeed, type, list, dfv, span, disable, noedit, number }) => {
            const selectData = { ...choosenRowData };
            const sId = `${getFieldValue('sId')}`;
            const shapeId = `${getFieldValue('shape')}`;
            const assayingId = `${getFieldValue('assaying')}`;
            const specificationId = `${getFieldValue('specification')}`;
            const colorId = `${getFieldValue('color')}`;
            const cutId = `${getFieldValue('cut')}`;
            const qualityId = `${getFieldValue('quality')}`;
            let assaying = []
            let shape = []
            let specification = []
            let color = []
            let cut = []
            let quality = []
            let s = []
            if (assayingId) assaying = dev.listBasicColourSetDropDown.filter(e => e.id === assayingId);
            if (shapeId) shape = dev.shapeSettingList.filter(e => e.id === shapeId);
            if (specificationId) specification = dev.specificationSettingList.filter(e => e.id === specificationId);
            if (colorId) color = dev.listColorDrop.filter(e => e.id === colorId);
            if (cutId) cut = dev.listCutDrop.filter(e => e.id === cutId);
            if (qualityId) quality = dev.listQualityDrop.filter(e => e.id === qualityId);
            if (sId) s = dev.H016001.filter(e => e.id === sId);

            // modalContent => 每个menu不同的增加弹窗填写信息
            if (value === 'materialNo') {
              let va = '';
              if (selectKey === 'accessories') {
                s = dev.H016003.filter(e => e.id === sId);
                va = `${assaying.length > 0 ? (`${assaying[0].productMaterial}-`) : ''}${
                  s.length > 0 ? (`${s[0].unitCode}-`) : ''}${
                  shape.length > 0 ? (`${shape[0].shapeCode}-`) : ''}${
                  specification.length > 0 ? specification[0].specificationCode : ''}`;
              }
              if (selectKey === 'stone') {
                s = dev.H016002.filter(e => e.id === sId);

                va = `${s.length > 0 ? (`${s[0].unitCode}-`) : ''}${
                  shape.length > 0 ? (`${shape[0].shapeCode}-`) : ''}${
                  cut.length > 0 ? (`${cut[0].cuttingCode}-`) : ''}${
                  color.length > 0 ? (`${color[0].unitCode}-`) : ''}${
                  quality.length > 0 ? (`${quality[0].gradeCode}-`) : ''}${
                  specification.length > 0 ? specification[0].specificationCode : ''}`;
              }
              if (selectKey === 'wrapper' || selectKey === 'auxiliaryMaterial') {
                if (selectKey === 'wrapper') {
                  s = dev.H016004.filter(e => e.id === sId);
                }
                if (selectKey === 'auxiliaryMaterial') {
                  s = dev.H016005.filter(e => e.id === sId);
                }


                va = `${s.length > 0 ? (`${s[0].unitCode}-`) : ''}${
                  shape.length > 0 ? (`${shape[0].shapeCode}-`) : ''}${
                  color.length > 0 ? (`${color[0].unitCode}-`) : ''}${
                  specification.length > 0 ? specification[0].specificationCode : ''}`;
              }
              if (selectKey === 'otherMaterial') {
                s = dev.H016005.filter(e => e.id === sId);
                va = `${s.length > 0 ? (`${s[0].unitCode}-`) : ''}${moment().format('YYYYMMDDHHmmSSS')}`;
              }
              dfv = va;
              selectData[value] = va || choosenRowData[value];
            }

            // 带出中文名初始值
            // 主材：取成色的中文名与英文名，只有一个字段
            // 石材：类别代码-形状代码-切工代码-颜色代码-等级编号-规格代码
            // 配件：成色代码-类别代码-形状代码-规格代码
            // 包装材料：类别代码-形状代码-颜色代码-规格代码
            // 辅助材料：类别代码-形状代码-颜色代码-规格代码
            if (value === 'zhName') {
              let va = '';
              if (selectKey === 'material' && assaying.length > 0) {
                va = assaying[0].zhName
              }
              if (selectKey === 'stone') {
                s = dev.H016002.filter(e => e.id === sId);
                va = `${s.length > 0 ? (`${s[0].zhName}-`) : ''}${
                  shape.length > 0 ? (`${shape[0].zhName}-`) : ''}${
                  cut.length > 0 ? (`${cut[0].zhName}-`) : ''}${
                  color.length > 0 ? (`${color[0].zhName}-`) : ''}${
                  quality.length > 0 ? (`${quality[0].zhName}-`) : ''}${
                  specification.length > 0 ? specification[0].zhName : ''}`;
              }
              if (selectKey === 'accessories') {
                s = dev.H016003.filter(e => e.id === sId);
                va = `${assaying.length > 0 ? (`${assaying[0].zhName}-`) : ''}${
                  s.length > 0 ? (`${s[0].zhName}-`) : ''}${
                  shape.length > 0 ? (`${shape[0].zhName}-`) : ''}${
                  specification.length > 0 ? specification[0].zhName : ''}`;
              }

              if (selectKey === 'wrapper' || selectKey === 'auxiliaryMaterial') {
                if (selectKey === 'wrapper') {
                  s = dev.H016004.filter(e => e.id === sId);
                }
                if (selectKey === 'auxiliaryMaterial') {
                  s = dev.H016005.filter(e => e.id === sId);
                }

                va = `${s.length > 0 ? (`${s[0].zhName}-`) : ''}${
                  shape.length > 0 ? (`${shape[0].zhName}-`) : ''}${
                  color.length > 0 ? (`${color[0].zhName}-`) : ''}${
                  specification.length > 0 ? specification[0].zhName : ''}`;
              }

              if (selectKey === 'otherMaterial') {
                s = dev.H016005.filter(e => e.id === sId);
                va = `${s.length > 0 ? (`${s[0].zhName}-`) : ''}${moment().format('YYYYMMDDHHmmSSS')}`;
              }
              dfv = va;
            }

            if (value === 'enName') {
              let va = '';
              if (selectKey === 'material' && assaying.length > 0) {
                va = assaying[0].enName
              }
              if (selectKey === 'stone') {
                s = dev.H016002.filter(e => e.id === sId);
                va = `${s.length > 0 ? (`${s[0].enName}-`) : ''}${
                  shape.length > 0 ? (`${shape[0].enName}-`) : ''}${
                  cut.length > 0 ? (`${cut[0].enName}-`) : ''}${
                  color.length > 0 ? (`${color[0].enName}-`) : ''}${
                  quality.length > 0 ? (`${quality[0].enName}-`) : ''}${
                  specification.length > 0 ? specification[0].enName : ''}`;
              }
              if (selectKey === 'accessories') {
                s = dev.H016003.filter(e => e.id === sId);
                va = `${assaying.length > 0 ? (`${assaying[0].enName}-`) : ''}${
                  s.length > 0 ? (`${s[0].enName}-`) : ''}${
                  shape.length > 0 ? (`${shape[0].enName}-`) : ''}${
                  specification.length > 0 ? specification[0].enName : ''}`;
              }

              if (selectKey === 'wrapper' || selectKey === 'auxiliaryMaterial') {
                if (selectKey === 'wrapper') {
                  s = dev.H016004.filter(e => e.id === sId);
                }
                if (selectKey === 'auxiliaryMaterial') {
                  s = dev.H016005.filter(e => e.id === sId);
                }

                va = `${s.length > 0 ? (`${s[0].enName}-`) : ''}${
                  shape.length > 0 ? (`${shape[0].enName}-`) : ''}${
                  color.length > 0 ? (`${color[0].enName}-`) : ''}${
                  specification.length > 0 ? specification[0].enName : ''}`;
              }

              if (selectKey === 'otherMaterial') {
                s = dev.H016005.filter(e => e.id === sId);
                va = `${s.length > 0 ? (`${s[0].enName}-`) : ''}${moment().format('YYYYMMDDHHmmSSS')}`;
              }

              dfv = va;
            }

            if (value === 'materialNo') {
              console.log(value,selectData[value])
              console.log(value,dfv)
            }

            const col = !noedit ? <Col span={span || 12} key={`k${value}`}>
              <FormItem label={key} {...formLayout} key={`${key}=${dfv}`}>
                {
                  getFieldDecorator(value, {
                    rules: [{
                      required: !noNeed,
                      message: `请${type && (type === 2 || type === 3 || type === 4) ? '选择' : '输入'}${key}`,
                    }],
                    initialValue: isEdit ? selectData[value] : (dfv || ''),
                  })(this.returnElement({ type, dev, list, disable, number }))
                }
              </FormItem>
            </Col> : null;
            if (type === 9) {
              return <Row>{col}</Row>;
            }
            return (col);
          })
        }
        {(selectKey !== 'material' && selectKey !== 'otherMaterial') && <Col span={18}>
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
              defaultFileList={isEdit ? choosenRowData.pictures : []}
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
    const { selectKey } = this.props;

    const menuText = <FormattedMessage id={`app.dev.menuMap.${selectKey}`} defaultMessage="Settings" />;
    return menuText;
  };

  // 新增按钮事件回调
  handleAdd = (close) => {
    const { selectKey, form, choosenTypesRowData } = this.props;
    const filelist = this.state.filelist.flatMap(e => e.url);
    const {resetFields} = form


    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ addloading: true });

        values = {
          ...values,
          // sId: choosenTypesRowData.id
        };

        if (selectKey !== 'material' && selectKey !== 'otherMaterial') {
          values = {
            ...values, picPath: filelist,
          };
        }
        serviceObj[`addBasic${selectKey}`](values).then(res => {
          this.setState({ addloading: false });

          if (!res.head) {
            return;
          }
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList({ key: selectKey });
            if(close) this.btnFn('');

          }
        });
        this.setState({ filelist: [] });
        resetFields(['materialNo']);
        resetFields(['zhName']);
        resetFields(['enName']);

      }
    });
  };

  // 编辑按钮回调
  handleEdit = (close) => {
    const { selectKey, form } = this.props;
    const filelist = this.state.filelist.flatMap(e => e.url);
    const {resetFields} = form

    // 还要清空所选中项
    this.props.dispatch({
      type: 'devRaw/changeSelectedRowKeys',
      payload: [],
    });

    form.validateFields((err, values) => {
      this.setState({ addloading: true });

      if (!err) {
        const { choosenRowData, choosenTypesRowData } = this.props;

        let params = {
          ...values,
          id: choosenRowData.id,
          // sId: choosenTypesRowData.id,
        };

        if (selectKey !== 'material' && selectKey !== 'otherMaterial') {
          params = {
            ...params, picPath: filelist,
          };
        }

        serviceObj[`addBasic${selectKey}`](params).then(res => {
          this.setState({ addloading: false });

          if (!res.head) {
            return;
          }
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList({ key: selectKey });
            if(close) this.btnFn('');

          }
        });
        this.setState({ filelist: [] });
        resetFields(['materialNo']);
        resetFields(['zhName']);
        resetFields(['enName']);

      }
    });
  };

  // 删除按钮回调
  handleDelect = () => {
    const { selectKey, selectedRowKeys, dispatch } = this.props;
    serviceObj[`deleteBasic${selectKey}`](selectedRowKeys).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        dispatch({
          type: 'devRaw/getChoosenRowData',
          payload: { id: '', zhName: '', enName: '', unitCode: '' },
        });
        this.getList({ key: selectKey });
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
        this.getList({ key: selectKey });
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
    if (isShenPi) return { name: '审批', disabled: false, type: 1, isChexiao, isShenPi };
    if (isChexiao) return { name: '取消审批', disabled: false, type: 2, isChexiao, isShenPi };
    return { name: '审批', disabled: true, type: 1, isChexiao, isShenPi }; // 当两种状态都有 禁止点击
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
    const { selectedRowKeys, choosenTypesRowData, choosenRowData } = this.props;
    if (tag === 'plus') return (!choosenTypesRowData || choosenTypesRowData.id === '');
    if (tag === 'lock') {
      return selectedRowKeys.length === 0 || this.returnLockType().disabled;
    }

    if (tag === 'delete') {
      return selectedRowKeys.length === 0 || !this.returnLockType().isShenPi;
    }
    if (tag === 'edit') {
      return selectedRowKeys.length === 0 || Number(choosenRowData.status) === 2;
    }

    return selectedRowKeys.length === 0;
  };


  // 第一部分table 排序 页面切换 触发
  onSearchType = (v) => {
    const { dispatch, dev } = this.props;
    console.log(v)
    dispatch({
      type: 'devRaw/getTypesPagination',
      payload: v,
      callback:()=>{
        this.getTypeList({ ...v, ...dev.searchparamsTypes });

      }
    });
  };

  // 第二部分table 排序 页面切换 触发
  onSearch = (v) => {
    const { dispatch, selectKey, dev } = this.props;
    dispatch({
      type: 'devRaw/getPagination',
      payload: v,
      callback:()=>{
        this.getList({ key: selectKey, params: { ...v, ...dev.searchparams } });
      }
      });
  };

  render() {
    const { state, props, btnFn, getModalContent, returnTitle, handleModalOk, returnLockType, returnSisabled, onSearch, onSearchType } = this;
    const { mode, modalType ,addloading} = state;
    const { list, selectKey, choosenRowData } = props;

    const modalFooter = modalType === 'plus' ? [
      <Button
        key="back"
        onClick={() => {
          this.setState({ filelist: [] });
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
          this.setState({ filelist: [] });
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
          title={<BuildTitle title={returnTitle()} />}

          width={selectKey === 'material' ? 640 : 960}
          className={styles.standardListForm}
          bodyStyle={{ padding: '28px 0 0' }}
          destroyOnClose
          footer={modalFooter}
          visible={modalType !== ''}
          onCancel={() => {
            this.setState({ filelist: [] });
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
const RightContent =
  ({ onSearchType, getTypeList, getList, type, choosenRowData, btnFn, returnLockType, returnSisabled, onSearch, returnElement }) => (
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
              <div>
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


  changeChoosenTypeRow = rowData => {
    const { dispatch, getList } = this.props;
    dispatch({
      type: 'devRaw/getChoosenTypeRowData',
      payload: rowData,
    });
    // 清空右边 下边
    dispatch({
      type: 'devRaw/clearSixList',
      payload: {},
      callback: () => {
        getList({ sId: rowData.id });
      },
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

  turnTab= (e)=> {
    const key = e.target ? e.target.value : e;
    const { dispatch, getList } = this.props;
    dispatch({
      type: 'devRaw/setsearchparams',
      payload: {},
    });
    dispatch({
      type: 'devRaw/getSelectKey',
      payload: key,
      callback: () => {
        dispatch({
          type: 'devRaw/getPagination',
          payload: { current: 1 ,size:10},
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
    getList({ params: { ...pagination, ...params, current: 1,size:10 } });
    dispatch({
      type: 'devRaw/getPagination',
      payload: { current: 1 ,size:10},
    });
    dispatch({
      type: 'devRaw/setSearchParams',
      payload: params,
    });


  }

  // 类型搜索
  searchType(params) {
    const { dispatch, getTypeList, paginationTypes } = this.props;
    getTypeList({ ...paginationTypes, ...params, current: 1 ,size:4});

    dispatch({
      type: 'devRaw/getTypesPagination',
      payload: { current: 1,size: 4 },
    });

  }

  render() {
    const { onSelectChange, props } = this;
    const { type, onSearchType, choosenRowData, paginationTypes, choosenTypesRowData, pagination, dev, selectedRowKeys, listLoading, onSearch, returnElement } = props;
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

            onReset={() => {
              const { dispatch } = this.props;
              dispatch({
                type: 'devRaw/setsearchparamsTypes',
                payload: {},
              });
            }}
            onChange={(e) => {
              const { dispatch } = this.props;
              dispatch({
                type: 'devRaw/setsearchparamsTypes',
                payload: e,
              });
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
              onChange={this.turnTab}
            >
              主材
            </Radio.Button>
            <Radio.Button
              value="stone"
              onChange={this.turnTab}
            >
              石材
            </Radio.Button>
            <Radio.Button
              value="accessories"
              onChange={this.turnTab}
            >
              配件
            </Radio.Button>
            <Radio.Button
              value="wrapper"
              onChange={this.turnTab}
            >
              包装
            </Radio.Button>
            <Radio.Button
              value="auxiliaryMaterial"
              onChange={this.turnTab}
            >
              辅材
            </Radio.Button>
            <Radio.Button
              value="otherMaterial"
              onChange={this.turnTab}
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
              const { dispatch } = this.props;
              dispatch({
                type: 'devRaw/setsearchparams',
                payload: {},
              });
            }}

            onChange={(e) => {
              const { dispatch } = this.props;
              dispatch({
                type: 'devRaw/setsearchparams',
                payload: e,
              });
            }}
            wrappedComponentRef={e => this.SearchFromTab0 = e}
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
    ];
  }
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
    <Card bordered={false} style={{ overflow: 'auto' }} className={styles.carddiv} onClick={selectRowItem}>

      {(type !== 'material' && type !== 'otherMaterial') &&
        <Carousel speed={150} key={data.id} initialSlide={0} className={styles.carousel_content} autoplay>
          {getImages(images)}
        </Carousel>}
      {images && images.length > 0 && <Divider />}
      <DescriptionList className={styles.headerList} size="small" col="1">
        {
          arr.map(({ key, value, name }) => {
            return (name ? <Description key={`c${key}`} term={key}>{data[`${value}Name`]}</Description>
              : <Description
                key={`c${key}`}
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
