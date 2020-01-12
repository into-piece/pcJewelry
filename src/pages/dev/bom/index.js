import React, { Component, Children } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Divider,
  Select,
  Radio,
  Checkbox,
  DatePicker,
  notification,
  Upload,
  Icon,
  message,
  Carousel,
} from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import ModalConfirm from '@/utils/modal';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
// 详情内容
import Zmage from 'react-zmage';
import GetRenderitem from './components/GetRenderitem';
// 中间Table
import MiddleTable from './components/MiddleTable';
import UploadImg from '@/components/UploadImg';

// 弹窗输入配置&显示配置
import modalInput from './config/modalInput';
import showItem from './config/showItem';
import styles from './index.less';
import BuildTitle from '@/components/BuildTitle';

import serviceObj from '@/services/dev';
import component from '@/locales/en-US/component';
import columnsConfig from './config/columns';
import ThemeColor from '@/components/SettingDrawer/ThemeColor';
import SelectMaterialNo from './components/SelectMaterialNo';
import SysProduct from './components/SysProduct';
import { defaultImages } from '@/utils/utils';
import PrintTable from './PrintPage';

const priefx = process.env.NODE_ENV === 'production' ? '' : '/server';
const uploadvideo = `${priefx}/zuul/business/business/file/uploadFile`;
const uploadfile = `${priefx}/zuul/business/business/file/uploadDocuments`;

const { Dragger } = Upload;
const ButtonGroup = Button.Group;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
// 右手边按钮集合
const btnGroup = [
  { name: '新增', tag: 'plus', icon: 'plus' },
  { name: '删除', tag: 'delete', type: 'danger', icon: 'delete' },
  { name: '编辑', tag: 'edit', icon: 'edit' },
  // { name: '同步数据', tag: 'sys' , icon: 'copy'},
];

const defaultModelName = 'devbom';
const FIRST_TAG = 'product';
const SECOND_TAG = 'material';
const THIRD_TAG = 'productProcess';

const radioArr = [
  { key: '产品信息', value: FIRST_TAG },
  { key: '原料信息', value: SECOND_TAG },
  { key: '生产工序', value: THIRD_TAG },
];

@Form.create({ name: 'form1' })
@connect(({ loading, devbom: model }) => {
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
    materialNoSearchParams: model.materialNoSearchParams,
    bomlist: model.bomlist,
    processList: model.processList,
    listGemSetProcessDropDown: model.listGemSetProcessDropDown,
    processDropdown: model.processDropdown,
    choosenProccessData: model.choosenProccessData,
    selectedProccessRowKeys: model.selectedProccessRowKeys,
    proccessPagination: model.proccessPagination,

    materialNoList: model.materialNoList,
    materialNoChoosenRowData: model.materialNoChoosenRowData,
    materialNoListLoading: loading.effects[`${defaultModelName}/materialNoList`],
    materialSelectedKeys: model.materialSelectedKeys,
    materialNoPagination: model.materialNoPagination,


    sysProductSelectedBom: model.sysProductSelectedBom,
    productBomRevokeList: model.productBomRevokeList,
    productBomRevokePagination: model.productBomRevokePagination,
    productBomRevokeSelectedKeys: model.productBomRevokeSelectedKeys,
    productBomRevokeChoosenRowData: model.productBomRevokeChoosenRowData,
    productBomRevokeListLoading: loading.effects[`${defaultModelName}/productBomRevokeList`],


    flowlistDropDown: model.flowlistDropDown,
    processRelationDropDown: model.processRelationDropDown,
    listChildDieSetDropDown: model.listChildDieSetDropDown,
  };
})
class Index extends Component {
  state = {
    addloading: false,
    modalType: '',
    // 右边默认选中tab标志
    rightActive: FIRST_TAG,
    filelist: [],
    // 第二个table选中tab标志 没有tab则冗余
    switchMenu: SECOND_TAG,
    selectedBom: { id: '' },
    selectedProccess: { processId: '' },
    craftShow: false, // 增加工艺弹窗
    onCraft: { name: '' },
    craftForm: [
      [
        { key: '镶石工艺', title: '镶石工艺', value: '' },
        { key: '石头数量', title: '石头数量', value: '' },
        { key: '效率', title: '效率', value: '' },
      ],
    ],
    videoPath: '',
    filePath: '',
    showMaterialNoModal: false,
    showExplaintionModal: false,
    processCode: '',
    flowList: [],
  };


  onCraft = [
    { key: '镶石工艺', title: '镶石工艺', value: '' },
    { key: '石头数量', title: '石头数量', value: '' },
    { key: '效率', title: '效率', value: '' },
  ];

  componentDidMount() {
    this.initDrop();
    // 获取初始表单数据
    this.getList();
  }

  uploadFile = (type) => {
    const { choosenProccessData } = this.props;
    const action = type === 'filePath' ? uploadfile : uploadvideo;
    const uploadConfig = {
      name: 'file',
      multiple: true,
      action,
      onChange: (info) => {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          const { response: { body } } = info.file;
          if (body && body.records && body.records.length > 0) {
            console.log(type, body, body.records[0], body.records[0], body.records[0].savePath);
            this.setState({
              [type]: body.records[0].savePath,
            });
          }

          message.success(`${info.file.name} file uploaded successfully.`);

        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const childkey = type === 'filePath' ? 'files' : 'videos';
    const filekey = type === 'filePath' ? 'filePath' : 'videoPath';

    const fileList = choosenProccessData && choosenProccessData[childkey] ? choosenProccessData[childkey].map((item) => {
      return (
        {
          uid: item.id,
          url: item.filekey,
          name: item[filekey].substring(item[filekey].lastIndexOf('\\') + 1, item[filekey].length),
        }
      );
    }) : [];

    // const fileList = [
    //   {
    //     uid: '-1',
    //     name: 'xxx.png',
    //     status: 'done',
    //     url: 'http://www.baidu.com/xxx.png',
    //   },
    // ]

    return (
      <div style={{ width: 400 }}>
        <Dragger {...uploadConfig} defaultFileList={fileList}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Dragger>
      </div>
    );

  };

  // 获取生产流程的下拉
  getWorkFlowDropdownList = (params) => {
    const { dispatch } = this.props;
    const { selectedBom } = this.state;
    // getDevList
    dispatch({
      type: `${defaultModelName}/getDropdownList`,
      payload: {
        name: 'processDropdown',
        key1: 'processName',
        value1: 'processId',
        params: { ...params, bomId: selectedBom.id },
      },
      callback: data => {
        this.setState({
          selectedProccess: data,
        });
        this.getProccessList({ id: data.id });
      },
    });
  };

  initDrop = (modalType) => {
    const { getProductBomRevoke } = this;
    const { dispatch, form, choosenRowData, choosenRowDataSecond } = this.props;
    const { setFieldsValue } = form;
    const { rightActive, selectedProccess } = this.state;
    // // 产品编号下拉production-flow
    // dispatch({
    //   type: `${defaultModelName}/getlistDieSetSubDropDown`,
    //   payload: { params: {}, listName: 'listDieSetSubDropDown' },
    // });
    // // 成品类别下拉
    // dispatch({
    //   type: `${defaultModelName}/getTypeByWordbookCode`,
    //   payload: { params: { key: 'H016009' }, listName: 'H016009' },
    // });

    // // 成色下拉
    // dispatch({
    //   type: `${defaultModelName}/getlistBasicColourSetDropDown`,
    // });

    // // 存放位置 胶膜仓位编号下拉
    // dispatch({
    //   type: `${defaultModelName}/getlistMoldPositioningSettingsDropDown`,
    //   payload: {},
    // });
    // // 模具编号下拉接口
    // dispatch({
    //   type: `${defaultModelName}/getlistFilmSettings`,
    //   payload: {},
    // });
    if (modalType === 'sys') {
      getProductBomRevoke({});
    }
    let arr = [];
    if (rightActive === FIRST_TAG) {
      arr = [
        {
          name: 'productTypeDropDown',
          // value1:'unitCode',
          params: {
            bType: 'H015002',
          },
        },
        {
          name: 'listCustomerDropDown',
          key1: 'shotName',
          value1: 'id',
        },
      ];
    }

    if (rightActive === SECOND_TAG) {
      setFieldsValue({ bomId: this.state.selectedBom.id });
      arr = [
        // 原料类别
        {
          name: 'listMstWordbook',
          params: {
            wordbookTypeCode: 'H016',
          },
          key1: 'wordbookContentZh',
          value1: 'wordbookCode',
        },
        {
          name: 'listChildDieSetDropDown',
          key1: 'productNo',
          value1: 'id',
          params: {
            productNo: choosenRowData.productNo.slice(0, 9),
          },
        },
        {
          name: 'listGemSetProcessDropDown',
        },
        {
          name: 'listBasicSpecificationSettingsDropDown',
          key1: 'specificationCode',
          value1: 'id',
        },
        {
          name: 'listDeptDropDown',
        },
        {
          name: 'listBasicMeasureUnitDropDown',
        },

      ];

      if (choosenRowDataSecond && choosenRowDataSecond.materialType && modalType === 'edit') {
        // 原料小料
        dispatch({
          type: `${defaultModelName}/getDropdownList`,
          payload: { name: 'getTypeByWordbookCode', params: { key: choosenRowDataSecond.materialType } },
        });
      }

    }

    if (rightActive === THIRD_TAG) {
      console.log(selectedProccess, '==========');

      arr = [
        {
          name: 'processRelationDropDown',
          key1: 'processName',
          value1: 'processCode',
          params: {
            flowId: selectedProccess.processId,
          },
        },
      ];
    }

    arr.forEach(item => {
      dispatch({
        type: `${defaultModelName}/getDropdownList`,
        payload: item,
      });
    });
  };

  // table 搜索
  onSearch = (params, table) => {
    const obj = {
      platingColorName: 'platingColor',
      productTypeName: 'productType',
      gemColorName: 'gemColor',
      productColorName: 'productColor',

      materialTypeName: 'materialType',
      acquisitionDepartmentName: 'acquisitionDepartment',
      specificationName: 'specification',
    };
    const keys = Object.keys(obj);
    if ('orderByAsc' in params) {
      if (keys.includes(params.orderByAsc)) {
        params.orderByAsc = obj[params.orderByAsc];
      }
    }
    if (table === 1) {
      this.getList({}, params);
    }
    if (table === 2) {
      this.getMaterialList(params);
    }
    if (table === 3) {
      this.getProccessList(params);
    }
  };

  // 第一table获取list
  getList = (args, param) => {
    const { dispatch, pagination, searchParams } = this.props;
    console.log(searchParams)
    // getDevList
    dispatch({
      type: `${defaultModelName}/getList`,
      payload: {
        type: FIRST_TAG,
        params: { status:0, ...pagination, ...searchParams, ...param },
        ...args,
      },
      callback: rowData => {
        const { id } = rowData;
        dispatch({
          type: `${defaultModelName}/setChooseData`,
          payload: { name: 'choosenRowData', list: rowData },
        });
        dispatch({
          type: `${defaultModelName}/changeStateOut`,
          payload: { name: 'selectedRowKeys', data: [id] },
        });
        this.getbomlist({ pid: id });
      },
    });

    // 清除第二table内容
    dispatch({
      type: `${defaultModelName}/clearListScond`,
    });
  };


  handleSelectChange = (value, type) => {
    const { rightActive } = this.state;
    const { dispatch, form, materialNoList, flowlistDropDown, processRelationDropDown } = this.props;
    const { setFieldsValue } = form;
    // 当原料类别下拉选中时请求
    if (type === 'materialType') {
      setFieldsValue({
        materialNo: undefined,
        materialSub: undefined,
        specification: undefined,
        zhName: undefined,
        enName: undefined,
        weightUnit: undefined,
        weightUnitName: undefined,
        measureUnit: undefined,
        inventoryWeight: undefined,
        valuationClass: undefined,
      });
      this.setState({
        inventoryWeight:undefined,
        singleWeight:undefined
      })
      dispatch({
        type: `${defaultModelName}/clearmaterialNoList`,
      });
      // 原料小料
      dispatch({
        type: `${defaultModelName}/getDropdownList`,
        payload: { name: 'getTypeByWordbookCode', params: { key: value } },
      });
    }
    if (type === 'materialSub') {
      setFieldsValue({
        materialNo: undefined,
        specification: undefined,
        zhName: undefined,
        enName: undefined,
        weightUnit: undefined,
        weightUnitName: undefined,
        measureUnit: undefined,
        inventoryWeight: undefined,
        valuationClass: undefined,
      });
      this.setState({
        inventoryWeight:undefined,
        singleWeight:undefined
      })
    }
    if (type === 'materialNo') {
      const selectedArr = materialNoList.filter(item => item.materialNo === value);
      const chooseData = selectedArr && selectedArr.length > 0 && selectedArr[0];
      const {
        zhName,
        enName,
        specification,
        valuationClass,
        measureUnit,
        weightUnit,
        inventoryWeight,
      } = chooseData;
      setFieldsValue({
        zhName,
        enName,
        specification,
        valuationClass,
        measureUnit,
        weightUnit,
        inventoryWeight,
      });
      this.setState({
        inventoryWeight
      })
    }
    if (rightActive === THIRD_TAG && type === 'zhName') {
      const workProcessCode = processRelationDropDown.filter(item => (item.processCode === value))[0].processCode;
      setFieldsValue({ workProcessCode });
    }
    if (type === 'processId') {
      console.log(value, flowlistDropDown);
      // debugger;
      const flowList = value.map(item => {
        const processCode = flowlistDropDown.filter(subitem => (subitem.id === item))[0].flowCode;
        return ({ processId: item, processCode });
      });
      this.setState({
        flowList,
      });
      // const processCode = flowlistDropDown.filter(item => (item.id === value))[0].flowCode;
      // this.setState({ processCode });
    }
  };

  addCraft = () => {
    this.setState({
      craftShow: true,
    });
  };

  getmaterialNoList = (args = {}) => {
    const { materialNoPagination, form, dispatch, materialNoSearchParams } = this.props;
    const { getFieldValue } = form;
    const value = getFieldValue('materialType');
    const sId = getFieldValue('materialSub');
    if ('current' in args) {
      dispatch({
        type: `${defaultModelName}/changeStateOut`,
        payload: { name: 'materialNoPagination', data: { ...materialNoPagination, current: args.current } },
      });
    }

    dispatch({
      type: `${defaultModelName}/materialNoList`,
      payload: {
        name: 'materialNoList',
        materialType: value,
        params: { sId, size: 10, current: 1, ...materialNoPagination, ...materialNoSearchParams, ...args },
      },
    });
  };


  handleInputChange = (v, type) => {
    const { setFieldsValue, getFieldValue } = this.props.form;
    const materialType = getFieldValue('materialType');
    const {inventoryWeight,singleWeight} = this.state;
    console.log(inventoryWeight,singleWeight,type,v)
    
    const key = materialType==='H016004'? singleWeight:inventoryWeight
    // 为主材 =》单件用重= 单件用量
    if (type === 'singleDosage') {
      if(materialType === 'H016001'){
        setFieldsValue({ sheetWithHeavy: v  });
        return
      }
      setFieldsValue({ sheetWithHeavy: (v * Number(key)).toFixed(3) });
    }
  };

  // type 2 下啦选择
  // type 3 点击事件
  // type 4 文字
  // type 5 check
  // type 6 radio
  // type 7 被顺带出的文字
  // type 8 inputext
  returnElement = ({
                     key,
                     value,
                     noNeed,
                     type,
                     list,
                     clickFn,
                     text,
                     arr,
                     data,
                     form,
                     number,
                     step,
                     min,
                     max,
                     disabled,
                     multiple,
                   }) => {
    switch (type) {
      case 2:
        return (
          <Select
            allowClear
            style={{ width: 180 }}
            placeholder="请选择"
            onChange={v => {
              this.handleSelectChange && this.handleSelectChange(v, value);
            }}
            showSearch
            disabled={disabled}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            mode={multiple && 'multiple'}
          >
            {data[list] &&
            data[list].length > 0 &&
            data[list].map(({ value, key }) => (
              <Option value={value} key={value}>
                {key}
              </Option>
            ))}
          </Select>
        );
      case 3:
        return (
          <p>
            {form.getFieldValue(value) || ''}
            <span
              style={{ color: '#40a9ff', cursor: 'pointer', marginLeft: 10 }}
              onClick={() => {
                // 获取原料编号列表
                this.getmaterialNoList();
                this.showMaterialModalFunc(1);
              }}
            >
              选择
            </span>
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
        return <span>{form.getFieldValue(value) || '原料编号带出'}</span>;
      case 8:
        return <TextArea rows={2} placeholder="请输入" style={{ width: 800 }} />;
      case 9:
        return (
          <RangePicker
            style={{ marginRight: 10 }}
            onChange={(date, dateString) => {
              this.handleDatePicker(date, dateString, value);
            }}
          />
        );
      case 10:
        return (
          <p>
            <span style={{ color: '#40a9ff', cursor: 'pointer' }} onClick={this.addCraft}>
              添加工艺
            </span>
          </p>
        );

      default:
        return number ? (
          <InputNumber
            placeholder="请输入"
            style={{ width: '100%' }}
            step={step}
            min={min}
            max={max}
            onChange={v => {
              this.handleInputChange(v, value);
            }}
          />
        ) : (
          <Input
            placeholder="请输入"
          />
        );
    }
    //  type === 7 ?
  };

  // 获取Modal的标题
  returnTitle = () => {
    const { rightActive } = this.state;
    const name =
      rightActive === FIRST_TAG
        ? 'bom'
        : rightActive === SECOND_TAG
        ? 'material' :
        this.isEditworkFlow ? 'productflow' : 'productProcess';
    const menuText = <FormattedMessage id={`menu.erp.dev.${name}`} defaultMessage="Settings" />;
    return menuText;
  };

  // 弹窗确定提交回调
  handleModalOk = close => {
    const { modalType } = this.state;
    switch (modalType) {
      case 'plus':
        this.handleAdd(close);
        break;
      case 'edit':
        this.handleAdd(close, true);
        break;
      case 'sys':
        this.handleSysAdd(close);
        break;
      default:
        break;
    }
  };

  // 删除按钮回调
  handleDelect = () => {
    const { selectedBom, selectedProccess } = this.state;
    const { selectedRowKeysSecond, dispatch, selectedProccessRowKeys } = this.props;
    const { rightActive, switchMenu } = this.state;
    let data = '';
    let service = '';
    switch (rightActive) {
      case FIRST_TAG:
        service = 'bom';
        data = [selectedBom.id];
        break;
      case  SECOND_TAG:
        service = 'bomDt';
        data = selectedRowKeysSecond;
        break;
      case  THIRD_TAG:
        if (this.isEditworkFlow) {
          service = 'workFlow';
          data = [selectedProccess.id];
        } else {
          service = 'bomProcess';
          data = selectedProccessRowKeys;
        }
        break;

      default:
        break;
    }

    console.log(service, data);

    serviceObj[`${service}delete`](data).then(res => {
      const { rtnCode, rtnMsg } = res ? res.head : {};
      if (rtnCode === '000000') {
        notification.success({
          message: '删除成功',
        });
        if (rightActive === FIRST_TAG) {
          this.getbomlist();
          this.setState({
            selectedBom: { id: '' },
          });
          return;
        }
        if (rightActive === SECOND_TAG) {
          this.getMaterialList();
          // 清除第二table 选中 详情
          dispatch({
            type: `${defaultModelName}/clearDetailSecond`,
          });

          return;
        }

        if (this.isEditworkFlow) {
          this.getWorkFlowDropdownList();
          this.setState({
            selectedProccess: { processId: '' },
          });
        } else {
          this.getProccessList();
          dispatch({
            type: `${defaultModelName}/clearProccess`,
          });
        }

      }
    });
  };

  // 审批/撤销 按钮回调
  handleLock = () => {
    const { selectedRowKeys, selectedRowKeysSecond } = this.props;
    const { rightActive, switchMenu } = this.state;
    const data = rightActive === FIRST_TAG ? selectedRowKeys : selectedRowKeysSecond;
    const isLock = this.returnLockType().type === 1; // 根据this.returnLockType()判断返回当前是撤回还是审批
    const serviceType = isLock ? 'approve' : 'revoke';

    serviceObj[`${serviceType}${rightActive}`](data).then(res => {
      const { rtnCode, rtnMsg } = res ? res.head : {};
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        if (rightActive === FIRST_TAG) {
          this.getList({ type: rightActive });
          this.getListSecond({ type: switchMenu }, {});
        } else {
          this.getListSecond({ type: switchMenu }, {});
        }
      }
    });
  };

  // 复制 按钮回调
  handleCopy = () => {
    const { rightActive, selectedBom } = this.state;
    if (!selectedBom.id) {
      notification.error({
        message: '请选择BOM',
      });
      return;
    }

    const data = [selectedBom.id];
    serviceObj.bomcopy(data).then(res => {
      const { rtnCode, rtnMsg } = res ? res.head : {};
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.getList({ type: rightActive });
      }
    });
  };

  handleSysAdd = (close) => {
    this.setState({ addloading: true });
    const {
      rightActive,
    } = this.state;
    const { choosenRowData, productBomRevokeSelectedKeys, sysProductSelectedBom } = this.props;
    const params = {
      sourcePId: choosenRowData.id,
      bomIds: sysProductSelectedBom,
      pIds: productBomRevokeSelectedKeys,
    };
    serviceObj.bomSynchronize(params).then(res => {
      if (!res || !res.head) {
        return;
      }
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        rightActive === FIRST_TAG && this.getbomlist();
        rightActive === SECOND_TAG && this.getMaterialList();
        if (close) this.btnFn('');

      }

    });

    this.setState({ addloading: false });


  };


  // 新增||编辑 按钮事件回调
  handleAdd = (close, isEdit) => {
    const { form, choosenRowData, choosenRowDataSecond, choosenProccessData, dispatch, materialNoChoosenRowData } = this.props;
    const {
      rightActive, modalType, craftForm, selectedBom, filelist, selectedProccess, filePath, videoPath, processCode,
      flowList,
    } = this.state;
    const { getFieldValue } = form;
    const materialType = getFieldValue('materialType');
    let params = {};
    let inputarr = rightActive;
    const notFlowIsProccess = !this.isEditworkFlow && rightActive === THIRD_TAG;


    // if (rightActive !== FIRST_TAG) {
    //   params = { mainMoldCode: choosenRowData.id };
    // }
    // if (modalType === 'edit') {
    //   params = {
    //     ...params,
    //     id: rightActive !== FIRST_TAG ? choosenRowDataSecond.id : choosenRowData.id,
    //   };
    // }
    if (rightActive === FIRST_TAG) {
      params = { ...params, pId: choosenRowData.id };
      if (isEdit) {
        params.id = selectedBom.id;
      }
    } else if (rightActive === SECOND_TAG) {

      if (isEdit) {
        params.id = choosenRowDataSecond.id;
      }

      if (materialType === 'H016002') {
        const Technology = [];
        console.log(craftForm);
        craftForm.forEach(item => {
          let mosaic = '';
          let efficiency = '';
          let stoneCount = '';
          item.forEach(({ value }, index) => {
            if (index === 0) {
              mosaic = value;
            } else if (index === 1) {
              stoneCount = value;
            } else {
              efficiency = value;
            }
          });
          Technology.push({ mosaic, stoneCount, efficiency });
        });
        params = { ...params, pId: choosenRowData.id, Technology };
        if (isEdit) {
          params.id = choosenRowDataSecond.id;
        }
      }
    }

    if (rightActive === THIRD_TAG) {
      if (notFlowIsProccess) {
        const filelistArr = filelist.flatMap(e => e.url);
        params.picPath = filelistArr;
        params.processId = selectedProccess.id;
        modalInput[THIRD_TAG].forEach(item => {
          if (item.number) {
            params[item.value] = Number(params[item.value]);
          }
        });
        params.videoPath = videoPath;
        params.filePath = filePath;
        // 编辑
        if (isEdit) {
          params.id = choosenProccessData.id;
        }
      } else {
        params.bomId = selectedBom.id;
        params.flowList = flowList;
        inputarr = 'proccess';
      }
    }

    this.setState({ addloading: true });

    const dataArr = modalInput[inputarr];
    const fieldslist = dataArr.map(e => e.value);

    if (rightActive === SECOND_TAG) {
      fieldslist.push('bomId');
      fieldslist.push('materialId');
      params.materialId = choosenRowDataSecond.materialId||materialNoChoosenRowData.id;
    }
    form.validateFields(fieldslist, (err, values) => {
      console.log(fieldslist, values, '=======values');

      if (inputarr === 'proccess') {
        values = {
          ...values,
          processCode,
        };
      }
      if (!err) {
        params = {
          ...params,
          ...values,
        };

        const addService =
          rightActive === FIRST_TAG ? 'bomadd' :
            rightActive === SECOND_TAG ?
              'bomDtadd' :
              notFlowIsProccess ?
                'bomProcessadd' :
                'workFlowadd';

        serviceObj[addService](params).then(res => {
          if (!res || !res.head) {
            return;
          }
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            rightActive === FIRST_TAG && this.getbomlist();
            if (rightActive === SECOND_TAG) {
              this.getMaterialList();
              // 清空镶石工艺
              this.clearCraftForm();
            }

            if (this.isEditworkFlow) {
              this.getWorkFlowDropdownList();
              this.setState({
                selectedProccess: { processId: '' },
              });
            } else {
              this.getProccessList();
              dispatch({
                type: `${defaultModelName}/clearProccess`,
              });
            }
            if (close) this.btnFn('');
            if (close) this.setState({ filelist: [] });
          }
        });
      }
      this.setState({ addloading: false });
    });
  };


  clearCraftForm = () => {
    const craftForm = [
      [
        { key: '镶石工艺', title: '镶石工艺', value: '' },
        { key: '石头数量', title: '石头数量', value: '' },
        { key: '效率', title: '效率', value: '' },
      ],
    ];
    this.setState({
      craftForm,
    });
  };

  addCraftRow = (index, option) => {
    const isAdd = option === 'add';
    console.log(this.state.craftForm, '===this.state.craftForm');
    if (!isAdd && this.state.craftForm.length === 1) return;
    this.setState(preState => {
      if (isAdd) {
        return preState.craftForm.push([
          { key: '镶石工艺', title: '镶石工艺', value: '' },
          { key: '石头数量', title: '石头数量', value: '' },
          { key: '效率', title: '效率', value: '' },
        ]);
      }
      return preState.craftForm.splice(index, 1);
    });
  };

  craftChange = (v, index, subIndex) => {
    console.log(v, index, subIndex, '[============');
    this.setState(preState => {
      preState.craftForm[index][subIndex].value = v;
      console.log(preState);
      return preState;
    }, () => {
      console.log(this.state.craftForm, '============');

    });
  };

// start 复制产品 bom
  getProductBomRevoke = (args) => {
    const { productBomRevokePagination, form, dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/productBomRevokeList`,
      payload: {
        name: 'productBomRevokeList',
        params: {
          // size: 10, current: 1, ...productBomRevokePagination,
          ...args,
        },
      },
    });
  };


  // 选中某行表头
  changeProductBomRevokeChoosenRow = rowData => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/changeStateOut`,
      payload: { data: rowData, name: 'productBomRevokeChoosenRowData' },
    });
  };


  onProductBomRevokeSelectChange = selectedRowKeys => {
    this.props.dispatch({
      type: `${defaultModelName}/changeStateOut`,
      payload: { data: selectedRowKeys, name: 'productBomRevokeSelectedKeys' },
    });
  };

  handleProductBomSelectChange = v => {
    this.props.dispatch({
      type: `${defaultModelName}/changeStateOut`,
      payload: { data: v, name: 'sysProductSelectedBom' },
    });
  };

  getImages = pictures => {
    const images = pictures && pictures.flatMap(e => e.picPath || e);
    if (!images) return;
    return images.map(v => (
      <div className={styles.carousel_image_ground} key={`as${Math.random(1)}`}>
        <Zmage
          alt="图片"
          align="center"
          className={styles.carousel_image}
          src={v}
          edge={20}
          set={images.map(image => ({ src: image, style: { minWidth: 800, minHeight: 800 } }))}
        />
      </div>
    ));
  };

  // 获取新增/编辑弹窗内容
  getModalContent = () => {
    const {
      onProductBomRevokeSelectChange, changeProductBomRevokeChoosenRow, handleProductBomSelectChange,
      returnElement,
    } = this;
    const {
      model,
      choosenRowData,
      choosenRowDataSecond,
      form,
      choosenProccessData,
      productBomRevokeList,
      productBomRevokePagination,
      productBomRevokeSelectedKeys,
      productBomRevokeListLoading,
      productBomRevokeChoosenRowData,
      bomlist,
      
    } = this.props;
    const printSearchParams = {}
    const { modalType, rightActive, craftForm, selectedBom, selectedProccess } = this.state;

    const { getFieldDecorator, getFieldValue } = form;
    console.log(craftForm, '=====');

    let inputarr = rightActive;
    const notFlowIsProccess = !this.isEditworkFlow && rightActive === THIRD_TAG;
    if (rightActive === THIRD_TAG && this.isEditworkFlow) {
      inputarr = 'proccess';
    }
    const content = '';
    const isEdit = modalType === 'edit';
    const addArr = modalInput[inputarr];
    const materialType = getFieldValue('materialType');
    const materialNo = getFieldValue('materialNo');
    const { pictures } = choosenRowData;

    if (modalType === 'sys') {
      // todo 同步产品数据到其他产品modal
      return <SysProduct
        list={productBomRevokeList}
        productChoosenData={choosenRowData}
        choosenRowData={productBomRevokeChoosenRowData}
        pagination={productBomRevokePagination}
        source={model}
        selectedRowKeys={productBomRevokeSelectedKeys}
        changeChoosenRow={changeProductBomRevokeChoosenRow}
        onSelectChange={onProductBomRevokeSelectChange}
        listLoading={productBomRevokeListLoading}
        onSearch={this.getProductBomRevoke}
        handleBomSelectChange={handleProductBomSelectChange}


        handleTableChange={args => {
          const { dispatch } = this.props;
          dispatch({
            type: `${defaultModelName}/changeStateOut`,
            payload: {
              name: 'productBomRevokePagination',
              data: {
                ...args,
              },
            },
          });
        }}
      />;
    }


    if (modalType === 'printer') {
      return <PrintTable args={printSearchParams} />;
    }

    return (
      <Form size="small" key="1">
        {rightActive === SECOND_TAG &&
        <React.Fragment>
          <div
            className="addModal"
            style={{ width: '100%', height: '150px' }}
          >
            <FormItem label='bom名称'>
              {getFieldDecorator('bomId', {
                rules: [
                  {
                    required: true,
                    message: `请选择bom名称`,
                  },
                ],
                initialValue: choosenRowDataSecond.bomId || undefined,
              })(
                <Select
                  allowClear
                  style={{ width: 180 }}
                  placeholder="请选择"
                  onChange={v => {
                    this.handleSelectChange && this.handleSelectChange(v, 'bomId');
                  }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {bomlist &&
                  bomlist.length > 0 &&
                  bomlist.map(({ value, key }) => (
                    <Option value={value} key={value}>
                      {key}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </div>

        </React.Fragment>
        }
        {rightActive === SECOND_TAG || (rightActive === THIRD_TAG && !this.isEditworkFlow) ?
          <div className={styles.carousel_content}>
            <Carousel {...this.carouselsettings} key="as123">
              {this.getImages(pictures && (pictures.length === 0 ? defaultImages : pictures))}
            </Carousel>
          </div>
          : null}

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
             step,
             min,
             max,
             mType,
             row,
             disabled,
             multiple,
           }) => {
            if (mType === 1 && materialType !== 'H016002') {
              return;
            }

            if (['H016003', 'H016003', 'H016003'].indexOf(materialType) > -1 && (['modelNo', 'modulusRatio'].indexOf(value) > -1)) {
              return;
            }


            // 判断编辑默认值
            let initValue2 = '';
            if (isEdit) {
              switch (rightActive) {
                case FIRST_TAG:
                  initValue2 = selectedBom[value];
                  break;
                case SECOND_TAG:
                  initValue2 = choosenRowDataSecond[value];
                  break;
                case THIRD_TAG:
                  if (this.isEditworkFlow) {
                    initValue2 = selectedProccess.processId;
                  } else {
                    initValue2 = choosenProccessData[value];
                  }
                  break;
                default:
                  break;
              }
            }

            /* eslint-disable */
            return (
              <div
                className="addModal"
                key={key}
                style={row === 1 ? { width: '100%' } : row === 2 ? { width: '45%' } :
                  // value === 'modelNo' ? { marginRight: 100 } :
                  {}}
              >
                <FormItem label={key}>
                  {
                    value === 'picPath' ?
                      <UploadImg
                        key="uimg"
                        maxcount={10}
                        defaultFileList={isEdit ? choosenProccessData.pictures : []}
                        fileListFun={list => {
                          this.setState({ filelist: list });
                        }}
                      />
                      :
                      value === 'videoPath' || value === 'filePath' ?
                        this.uploadFile(value)
                        :
                        getFieldDecorator(value, {
                          rules: [
                            {
                              required: !noNeed,
                              message: `请${type && type === 2 ? '选择' : '输入'}${key}`,
                            },
                          ],
                          initialValue: initValue2 || initValue || (number ? 0.00 : undefined),
                        })(
                          this.returnElement({
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
                            step,
                            min,
                            max,
                            disabled,
                            multiple,
                          }),
                        )
                  }
                </FormItem>
              </div>
            );
          },
        )}

        {rightActive === SECOND_TAG && materialType === 'H016002' && this.returnCraftContent()}
        {content}
      </Form>
    );
  };

  returnCraftContent = () => {
    const { form, listGemSetProcessDropDown } = this.props;
    const { craftForm } = this.state;
    const { getFieldDecorator } = form;
    return (
      <div style={{ width: '100%' }}>
        {craftForm.map((item, index) => (
          <div style={{ width: '100%', display: 'flex' }}>
            {item.map(({ key, value }, subIndex) => {
              return (
                <div className="addModal" key={key} style={{ minWidth: 240 }}>
                  <CraftRow name={key}>
                    {subIndex === 0 ? (
                        <Select
                          allowClear
                          style={{ width: 130 }}
                          placeholder="请选择"
                          value={value || undefined}
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          onChange={v => {
                            this.craftChange(v, index, subIndex);
                          }}
                        >
                          {listGemSetProcessDropDown &&
                          listGemSetProcessDropDown.length > 0 &&
                          listGemSetProcessDropDown.map(({ value, key }) => (
                            <Option value={value} key={value}>
                              {key}
                            </Option>
                          ))}
                        </Select>
                      ) :
                      subIndex === 1 ? (
                          <InputNumber
                            style={{ width: 130 }}
                            placeholder="请输入"
                            // step={step}
                            onChange={v => {
                              this.craftChange(v, index, subIndex);
                              // this.handleInputChange(v, value);
                            }}
                          />
                        ) :
                        (
                          <Input
                            placeholder="请输入"
                            onChange={e => {
                              this.craftChange(e.target.value, index, subIndex);
                            }}
                            style={{ width: 130 }}
                            value={value}
                          />
                        )}
                  </CraftRow>
                </div>
              );
            })}
            {this.state.modalType !== 'edit' &&
            <ButtonGroup style={{ paddingTop: 5 }}>
              <Button
                onClick={() => {
                  this.addCraftRow(index, 'add');
                }}
              >
                +
              </Button>
              <Button
                onClick={() => {
                  this.addCraftRow(index, 'jian');
                }}
              >
                -
              </Button>
            </ButtonGroup>
            }
          </div>
        ))}
      </div>
    );
  };

  // 列表对应操作button回调
  btnFn = async modalType => {
    const { rightActive } = this.state;
    const { choosenRowDataSecond } = this.props;
    if (this.isEditworkFlow) {
      this.isEditworkFlow = false;
    }
    const { dispatch } = this.props;

    switch (modalType) {
      case '':
        dispatch({
          type: `${defaultModelName}/changeStateOut`,
          payload: { name: 'productBomRevokeChoosenRowData', data: {} },
        });
        dispatch({
          type: `${defaultModelName}/changeStateOut`,
          payload: { name: 'productBomRevokeSelectedKeys', data: [] },
        });
        dispatch({
          type: `${defaultModelName}/changeStateOut`,
          payload: { name: 'sysProductSelectedBom', data: [] },
        });
        dispatch({
          type: `${defaultModelName}/changeStateOut`,
          payload: { name: 'productBomRevokeList', data: [] },
        });
        dispatch({
          type: `${defaultModelName}/changeStateOut`,
          payload: {
            name: 'productBomRevokePagination', data: {
              current: 1,
              size: 5,
            },
          },
        });
        this.setState({ modalType });
        break;
      case 'plus':
      case 'edit':
      default:
        if (rightActive === SECOND_TAG && modalType === 'edit') {
          if (choosenRowDataSecond && choosenRowDataSecond.technology) {
            const craftForm = [];
            choosenRowDataSecond.technology.forEach(({ mosaic, stoneCount, efficiency }) => {
              craftForm.push(
                [
                  { key: '镶石工艺', title: '镶石工艺', value: mosaic },
                  { key: '石头数量', title: '石头数量', value: stoneCount },
                  { key: '效率', title: '效率', value: efficiency },
                ],
              );
            });
            this.setState({
              craftForm,
            });
          }
        }
        this.initDrop(modalType);
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
        ModalConfirm({
          content: '确定复制吗？',
          onOk: () => {
            this.handleCopy();
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
    const listr = rightActive === FIRST_TAG ? list : listSecond;
    const selectedKeys = rightActive === FIRST_TAG ? selectedRowKeys : selectedRowKeysSecond;
    if (listr && listr.records.length === 0) return { name: '审批', disabled: true, type: 1 };
    const isLock1 = selectedKeys.reduce((res, cur) => {
      const singleObjcect = listr.records.find(subItem => subItem.id === cur);
      if (singleObjcect) res.push(singleObjcect.status);
      return res;
    }, []);
    const isShenPi = isLock1.every(item => Number(item) === 0); // 是否全是0
    const isChexiao = isLock1.every(item => Number(item) === 2); // 是否全是2
    if (isShenPi) return { name: '审批', disabled: false, type: 1, isShenPi, isChexiao };
    if (isChexiao) return { name: '取消审批', disabled: false, type: 2, isShenPi, isChexiao };
    return { name: '审批', disabled: true, type: 1, isShenPi, isChexiao }; // 当两种状态都有 禁止点击
  };

  // 判断按钮是否禁止 返回boolean
  returnSisabled = tag => {
    const {
      selectedRowKeys,
      selectedRowKeysSecond,
      choosenRowData,
      choosenRowDataSecond,
      selectedProccessRowKeys,
    } = this.props;
    console.log(selectedProccessRowKeys);

    const { rightActive, selectedBom } = this.state;

    switch (tag) {
      case 'plus':
        return ~~selectedBom.status === 2;
      case 'delete':
        return (
          (FIRST_TAG === rightActive && selectedBom.state === 1) ||
          (rightActive === SECOND_TAG && selectedRowKeysSecond.length === 0) ||
          (rightActive === THIRD_TAG && selectedProccessRowKeys.length === 0) ||
          ~~selectedBom.status === 2
        );
      case 'edit':
        return (
          (FIRST_TAG === rightActive && selectedBom.state === 1) ||
          (rightActive === SECOND_TAG && selectedRowKeysSecond.length === 0) ||
          (rightActive === THIRD_TAG && selectedProccessRowKeys.length === 0) ||
          ~~selectedBom.status === 2
        );
      default:
        return (
          (FIRST_TAG === rightActive && selectedRowKeys.length === 0) ||
          (rightActive === SECOND_TAG && selectedRowKeysSecond.length === 0) ||
          (rightActive === THIRD_TAG && selectedProccessRowKeys.length === 0) ||
          ~~selectedBom.status === 2
        );
    }
  };

  // 取消弹窗回调
  onCancel = () => {
    this.btnFn('');
  };

  // 第二个表格操作
  // 取消审批
  cancelVerify = () => {
    this.isVerifyBom(5);
  };

  // 审批
  verifyBom = () => {
    this.isVerifyBom(4);
  };

  isVerifyBom = type => {
    const { dispatch } = this.props;
    const { selectedBom } = this.state;
    const str = type === 4 ? '审批' : '取消审批';
    dispatch({
      type: `${defaultModelName  }/commonOpration`,
      payload: { params: [selectedBom.id], type, name: 'bom' },
      callback: () => {
        debugger;
        notification.success({
          message: `${str  }成功`,
        });
        this.getbomlist();
      },
    });
  };

  // 导出bom
  exportBom = () => {
  };

  // 打印bom
  printBom = () => {
    this.btnFn('printer')
  };

  _changeRightActive = ({ target: { value } }) => {
    this.changeRightActive(value);
  };

  changeRightActive = v => {
    this.setState({ rightActive: v });
  };

  // 获取原料信息列表
  getMaterialList = params => {
    console.log(params, '==========');
    const { selectedBom } = this.state;
    const { dispatch, paginationSecond } = this.props;
    dispatch({
      type: `${defaultModelName}/getMaterialList`,
      payload: { params: { BomId: selectedBom.id, ...paginationSecond, ...params } },
    });
  };

  // 获取bom下拉列表
  getbomlist = params => {
    const { dispatch, choosenRowData } = this.props;

    dispatch({
      type: `${defaultModelName}/getDropdownList`,
      payload: { params: { pid: choosenRowData.id, ...params }, key1: 'bName', value1: 'id', name: 'bomlist' },
      callback: obj => {
        console.log(obj, '======obj');
        const selectedBom = obj || { id: undefined };
        this.setState({
          selectedBom,
        }, () => {
          if (obj) {
            this.getMaterialList({ BomId: obj.id });
            this.getWorkFlowDropdownList({ bomId: obj.id });
          } else {
            dispatch({
              type: `${defaultModelName}/changeStateOut`,
              payload: { data: { records: [] }, name: 'materialList' },
            });
          }
        });

      },
    });

    // dispatch({
    //   type: `${defaultModelName}/bomOpration`,
    //   payload: { params: { pid: choosenRowData.id, ...params,}, type: 1 },
    //   callback: arr => {
    //     const selectedBom = arr.length > 0 ? arr[0] : { id: undefined };
    //     this.setState({
    //       selectedBom,
    //     });
    //     arr.length > 0 && this.getMaterialList({ BomId: arr[0].id });
    //   },
    // });
  };

  // 获取生产工序列表
  getProccessList = (params) => {
    const { dispatch, proccessPagination } = this.props;
    const { selectedProccess } = this.state;
    const sendParams = {
      ...proccessPagination,
      processId: params && params.id || selectedProccess && selectedProccess.id,
      ...params,
    };
    dispatch({
      type: `${defaultModelName}/commonOpration`,
      payload: { params: sendParams, type: 1, name: 'bomProcess', listName: 'processList' },
    });
  };

  // bom 列表切换
  handleBomSelectChange = v => {
    const { rightActive } = this.state;
    const { bomlist, processDropdown } = this.props;
    const isthird = rightActive === THIRD_TAG;
    const list = isthird ? processDropdown : bomlist;
    const key = isthird ? 'selectedProccess' : 'selectedBom';
    let arr = [];
    if (isthird) {
      arr = list.filter(({ processId }) => processId === v);
      this.getProccessList({ id: arr[0].id });
    } else {
      arr = list.filter(({ id }) => id === v);
      this.getMaterialList({ BomId: v });
    }
    this.setState({
      [key]: arr[0],
    });
  };

  craftInput = (e, type) => {
  };

  // 获取生产流程的下拉
  getFlowDropdownList = () => {
    const { dispatch } = this.props;
    // getDevList
    dispatch({
      type: `${defaultModelName}/getDropdownList`,
      payload: { name: 'flowlistDropDown', key1: 'flowName', value1: 'id', params: { flowClass: 'H017002' } },
      // callback: data => {
      //   this.setState({
      //     selectedProccess: data,
      //   });
      // },
    });
  };

  addProccess = () => {
    this.getFlowDropdownList();
    this.isEditworkFlow = true;
    this.setState({ modalType: 'plus' });
  };

  deleteProccess = () => {
    this.isEditworkFlow = true;
    ModalConfirm({
      content: '确定删除吗？',
      onOk: () => {
        this.handleDelect();
      },
    });
  };

  // 控制产品弹窗 type = 1出现
  showMaterialModalFunc = (type = 1) => {
    const { dispatch } = this.props;
    if (type === 1) {
      // this.getProduct();
      // 获取筛选参数下拉
      // dispatch({
      //   type: `${defaultModelName}/getBrandsList`,
      // });
      // dispatch({
      //   type: `${defaultModelName}/getbasicColourSettingsList`,
      // });
    }
    this.setState({
      showMaterialNoModal: type === 1,
    });
  };

  // 控制说明弹窗 type = 1出现
  showExplaintionModalFunc = (type = 1) => {
    if (type === 1) {
      const { choosenRowData: { productExplain } } = this.props;
      if (productExplain) {
        this.setState({
          productExplain,
        });
      }
    }
    this.setState({
      showExplaintionModal: type === 1,
    });
  };

  // 确认原料弹窗选择
  handleMaterialNoOk = () => {
    const { form, materialNoChoosenRowData, dispatch } = this.props;
    const { setFieldsValue } = form;
    const {
      materialNo, specification, zhName, enName, weightUnit, weightUnitName, measureUnit, inventoryWeight, valuationClass,
      valuationClassName,
      measureUnitName,
      id,
      singleWeight
    } = materialNoChoosenRowData;
    const weightUnitList = [{ key: weightUnitName, value: weightUnit }];
    const countist = measureUnit ? [{ key: measureUnitName, value: measureUnit }] : [];
    const valuationClasslist = [{ key: valuationClassName, value: valuationClass }];
    console.log(inventoryWeight,'=======');
    
    dispatch({
      type: `${defaultModelName}/batchUpdatedispatch`,
      payload: { weightUnitList, countist, valuationClasslist },
      callback: () => {
        setFieldsValue({
          materialNo,
          specification,
          zhName,
          enName,
          weightUnit,
          weightUnitName,
          measureUnit,
          inventoryWeight,
          valuationClass,
          materialId: id,
        });
        this.setState({
          inventoryWeight,
          singleWeight
        })
        this.showMaterialModalFunc(2);
      },
    });
  };

  handleMaterialNoCancel = () => {
    this.showMaterialModalFunc(2);
  };

  handleExplaintionModalCancel = () => {
    this.showExplaintionModalFunc(2);
  };

  handleExplaintionModalOk = () => {
    const { choosenRowData } = this.props;
    const { productExplain } = this.state;
    serviceObj.updateProductExplain({ pId: choosenRowData.id, productExplain }).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.showExplaintionModalFunc(2);
        this.getList();
      }
    });
  };


  // 选中某行表头
  changeMaterialChoosenRow = rowData => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/changeStateOut`,
      payload: { data: rowData, name: 'materialNoChoosenRowData' },
    });
  };


  onMaterialSelectChange = selectedRowKeys => {
    this.props.dispatch({
      type: `${defaultModelName}/changeStateOut`,
      payload: { data: selectedRowKeys, name: 'materialSelectedKeys' },
    });
  };

  onchangeExplaination = (e) => {
    console.log(e.target.value);
    this.setState({
      productExplain: e.target.value,
    });
  };

  getAddExplaintionModal = () => {
    return (
      <div
        className="addModal"
        style={{ width: '100%' }}
      >
        <FormItem label='产品说明'>
          <TextArea placeholder="请输入说明" value={this.state.productExplain} style={{ width: 800 }}
                    onChange={this.onchangeExplaination}/>
        </FormItem>
      </div>
    );
  };


  changeMaterialSearch = args => {
    // search 看看搜索完要不要做点处理
    this.props.dispatch({
      type: `${defaultModelName}/changeStateOut`,
      payload: { data: args, name: 'materialNoSearchParams' },
    });
    this.getmaterialNoList({ ...args });
  };


  render() {
    const {
      state,
      props,
      btnFn,
      returnSisabled,
      returnLockType,
      returnListName,
      changeRightActive,
      _changeRightActive,
      getModalContent,
      handleModalOk,
      onCancel,
      returnElement,
      onSearch,
      returnTitle,
      cancelVerify,
      verifyBom,
      exportBom,
      printBom,
      handleBomSelectChange,
      getbomlist,
      craftInput,
      addProccess,
      editProccess,
      deleteProccess,
      handleMaterialNoOk,
      handleMaterialNoCancel,
      changeMaterialChoosenRow,
      onMaterialSelectChange,
      getAddExplaintionModal,
      handleExplaintionModalCancel,
      handleExplaintionModalOk,
      changeMaterialSearch,
    } = this;
    const {
      modalType,
      rightActive,
      addloading,
      switchMenu,
      selectedBom,
      craftShow,
      selectedProccess,
      showMaterialNoModal,
      showExplaintionModal,
    } = state;
    const {
      choosenRowData,
      choosenRowDataSecond,
      model,
      form,
      choosenProccessData,
      materialNoList,
      materialNoPagination,
      bomselectedKeys,
      materialNoChoosenRowData,
      materialNoListLoading,
      materialSelectedKeys,
      listChildDieSetDropDown,
    } = props;
    const { getFieldDecorator, getFieldValue } = form;
    const modalFooter =
      modalType === 'plus'
        ? [
          <Button
            key="back"
            onClick={() => {
              btnFn('');
              this.setState({ filelist: [] });
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
        ]
        : [
          <Button
            key="back"
            onClick={() => {
              btnFn('');
              this.setState({ filelist: [] });
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
        ];

    const secondOprationArr = [
      {
        key: '取消审批',
        fn: cancelVerify,
        disabled: !selectedBom.id || ~~selectedBom.status === 0,
      },
      {
        key: '审批BOM',
        fn: verifyBom,
        disabled: !selectedBom.id || ~~selectedBom.status === 2,
      },
      {
        key: '导出BOM',
        fn: exportBom,
        disabled: !selectedBom.id,
      },
      {
        key: '打印BOM',
        fn: printBom,
        disabled: !selectedBom.id,
      },
    ];

    const secondProccessOprationArr = [
      {
        key: '批量新增',
        fn: addProccess,
      },
      {
        key: '删除流程',
        fn: deleteProccess,
        disabled: !(selectedProccess && selectedProccess.processId),
      },
    ];
    const opration = rightActive === THIRD_TAG ? secondProccessOprationArr : secondOprationArr;
    const isthird = rightActive === THIRD_TAG;
    const materialType = getFieldValue('materialType');

    console.log(materialNoList, '======materialNoList');

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
                      firstType={FIRST_TAG}
                      returnElement={returnElement}
                      onSearch={onSearch}
                      switchMenu={switchMenu}
                      handleSwitchMenu={_changeRightActive}
                      // 第二表格操作
                      secondOprationArr={opration}
                      selectedBom={selectedBom}
                      getbomlist={getbomlist}
                      rightActive={rightActive}
                      handleBomSelectChange={handleBomSelectChange}
                      changeRightActive={changeRightActive}
                      selectedProccess={selectedProccess}
                    />
                  </Col>
                  {/* 右边显示详细信息和按钮操作 */}
                  <Col lg={8} md={24}>
                    <div className={styles.view_right_content}>
                      <div
                        style={{
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
                            onChange={_changeRightActive}
                            buttonStyle="solid"
                            value={rightActive}
                            style={{ textAlign: 'center' }}
                          >
                            {radioArr.map(({ value, key }) => (
                              <Radio.Button
                                key={value}
                                style={{
                                  height: 40,
                                  width: 130,
                                  textalign: 'center',
                                  lineHeight: '40px',
                                }}
                                value={value}
                              >
                                {key}
                              </Radio.Button>
                            ))}
                          </Radio.Group>
                          <Divider className={styles.divder}/>
                        </div>
                        <GetRenderitem
                          key={
                            FIRST_TAG === rightActive ? choosenRowData.id : choosenRowDataSecond.id
                          }
                          data={
                            FIRST_TAG === rightActive
                              ? choosenRowData
                              : isthird
                              ? choosenProccessData
                              : choosenRowDataSecond
                          }
                          type={rightActive}
                          items={showItem}
                        />
                      </div>
                      {/*  */}
                      <Card bodyStyle={{ display: 'flex', paddingLeft: 5, paddingRight: 5 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            flexWrap: 'wrap',
                          }}
                        >
                          {btnGroup.map(({ name, tag, icon }) => {
                            return (
                              <Button
                                key={tag}
                                className={styles.buttomControl}
                                type={tag === 'delete' ? 'danger' : 'primary'}
                                icon={icon}
                                size="small"
                                disabled={returnSisabled(tag)}
                                onClick={() => {
                                  btnFn(tag);
                                }}
                              >
                                {name}
                              </Button>
                            );
                          })}
                          {
                            rightActive === FIRST_TAG ?
                              <React.Fragment>
                                <Button
                                  className={styles.buttomControl}
                                  type="primary"
                                  icon="copy"
                                  size="small"
                                  disabled={returnSisabled('copy')}
                                  onClick={() => {
                                    btnFn('copy');
                                  }}
                                >
                                  复制新增
                                </Button>
                                <Button
                                  className={styles.buttomControl}
                                  type={'primary'}
                                  icon={'plus'}
                                  size="small"
                                  onClick={() => {
                                    this.showExplaintionModalFunc(1);
                                  }}
                                >
                                  {choosenRowData.productExplain ? '编辑' : '新增'}说明
                                </Button>
                                <Button
                                  className={styles.buttomControl}
                                  type="primary"
                                  icon="copy"
                                  size="small"
                                  disabled={returnSisabled('sys')}
                                  onClick={() => {
                                    btnFn('sys');
                                  }}
                                >
                                  同步数据
                                </Button>
                              </React.Fragment>
                              : null
                          }
                        </div>
                      </Card>
                    </div>
                  </Col>
                </Row>
              </GridContent>
            </div>
          </div>
        </div>
        {handleModalOk && (
          <Modal
            maskClosable={false}
            title={<BuildTitle title={returnTitle()}/>}
            width={this.isEditworkFlow || (rightActive === FIRST_TAG && modalType!=='sys') ?600: 1000}
            className={styles.standardListForm}
            bodyStyle={{ padding: '28px 0 0' }}
            destroyOnClose
            visible={modalType !== ''}
            footer={modalFooter}
            onCancel={() => {
              btnFn('');
              this.setState({ filelist: [] });
            }}
          >
            {getModalContent()}
          </Modal>
        )}

        <Modal
          title={<BuildTitle title="选择原料编号"/>}
          maskClosable={false}
          width={1000}
          className={styles.standardListForm}
          bodyStyle={{ padding: '28px 0 0' }}
          destroyOnClose
          onOk={handleMaterialNoOk}
          visible={showMaterialNoModal}
          onCancel={handleMaterialNoCancel}
          zIndex={1002}
        >
          <SelectMaterialNo
            list={materialNoList}
            materialType={materialType}
            pagination={materialNoPagination}
            returnElement={returnElement}
            source={model}
            selectedRowKeys={materialSelectedKeys}
            changeChoosenRow={changeMaterialChoosenRow}
            choosenRowData={materialNoChoosenRowData}
            onSelectChange={onMaterialSelectChange}
            listLoading={materialNoListLoading}
            onSearch={this.getMaterialList}
            changeMaterialSearch={changeMaterialSearch}
            handleTableChange={args => {
              // search 看看搜索完要不要做点处理
              this.getmaterialNoList({ ...args });
            }}

          />
        </Modal>


        <Modal
          title={<BuildTitle title="新增说明"/>}
          maskClosable={false}
          width={1000}
          className={styles.standardListForm}
          bodyStyle={{ padding: '28px 0 0' }}
          destroyOnClose
          onOk={handleExplaintionModalOk}
          visible={showExplaintionModal}
          onCancel={handleExplaintionModalCancel}
          zIndex={1002}
        >
          {getAddExplaintionModal()}
        </Modal>


      </div>
    );
  }
}

const CraftRow = ({ name, value, children }) => {
  return (
    <div className="ant-row ant-form-item">
      <div className="ant-col ant-form-item-label">
        <label htmlFor="form1_craft1">{name}</label>
      </div>
      <div className="ant-col ant-form-item-control-wrapper">
        <div className="ant-form-item-control">
          <span className="ant-form-item-children">{children}</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
