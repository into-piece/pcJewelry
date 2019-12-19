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
} from 'antd';
import ModalConfirm from '@/utils/modal';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
// 详情内容
import GetRenderitem from './components/GetRenderitem';
// 中间Table
import MiddleTable from './components/MiddleTable';
import { FormattedMessage } from 'umi-plugin-react/locale';
import UploadImg from '@/components/UploadImg';

// 弹窗输入配置&显示配置
import modalInput from './config/modalInput';
import showItem from './config/showItem';
import styles from './index.less';
import BuildTitle from '@/components/BuildTitle';

import serviceObj from '@/services/dev';
import component from '@/locales/en-US/component';

const ButtonGroup = Button.Group;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
// 右手边按钮集合
const btnGroup = [
  { name: '新增', tag: 'plus' },
  { name: '删除', tag: 'delete', type: 'danger' },
  { name: '编辑', tag: 'edit' },
  { name: '复制新增', tag: 'copy' },
];

const defaultModelName = 'devbom';
const FIRST_TAG = 'product';
const SECOND_TAG = 'material';

const radioArr = [
  { key: '产品信息', value: FIRST_TAG },
  { key: '原料信息', value: SECOND_TAG },
  { key: '生产工序', value: 'productProcess' },
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
    boomList: model.boomList,
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
    craftShow: false, // 增加工艺弹窗
    onCraft: { name: '' },
    craftForm: [
      [
        { key: '镶石公艺', title: '镶石公艺', value: '' },
        { key: '效率', title: '效率', value: '' },
      ],
    ],
  };

  onCraft = [
    { key: '镶石公艺', title: '镶石公艺', value: '' },
    { key: '效率', title: '效率', value: '' },
  ];

  componentDidMount() {
    this.initDrop();
    // 获取初始表单数据
    this.getList();
  }

  initDrop = () => {
    const { dispatch } = this.props;
    const { rightActive } = this.state;
    // // 产品编号下拉
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

    if (rightActive === SECOND_TAG) {
      const arr = [
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
          name: 'listFilmSettingsDropDown',
        },
      ];

      arr.forEach(item => {
        dispatch({
          type: `${defaultModelName}/getDropdownList`,
          payload: item,
        });
      });
    }
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
      payload: {
        type: FIRST_TAG,
        params: { ...pagination, ...searchParams, ...param },
        ...args,
      },
      callback: rowData => {
        const { id } = rowData;
        dispatch({
          type: `${defaultModelName}/setChoosenRowData`,
          payload: rowData,
        });
        dispatch({
          type: `${defaultModelName}/changeSelectedRowKeys`,
          payload: [id],
        });
        this.getbomlist({ pid: id });
      },
    });

    // 清除第二table内容
    dispatch({
      type: `${defaultModelName}/clearListScond`,
    });
  };

  // 第二table获取list
  getListSecond = (args, param) => {
    const { dispatch, paginationSecond, searchParamsSecond, choosenRowData } = this.props;
    const { switchMenu } = this.state;
    const mainMoldCode = param.mainMoldCode || choosenRowData.id;
    if (!mainMoldCode) return;
    // getDevList
    dispatch({
      type: `${defaultModelName}/getListSecond`,
      payload: {
        type: switchMenu,
        params: { ...paginationSecond, ...searchParamsSecond, ...param, mainMoldCode },
        ...args,
      },
    });
  };

  handleSelectChange = (value, type) => {
    const { dispatch } = this.props;
    // 当原料类别下拉选中时请求
    if (type === 'materialType') {
      // 原料小料
      dispatch({
        type: `${defaultModelName}/getDropdownList`,
        payload: { name: 'getTypeByWordbookCode', params: { key: value } },
      });

      dispatch({
        type: `${defaultModelName}/materialNoList`,
        payload: { name: 'materialNoList', materialType: value, params: {} },
      });
    }
  };

  addCraft = () => {
    this.setState({
      craftShow: true,
    });
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
  }) => {
    switch (type) {
      case 2:
        return (
          <Select
            style={{ width: 180 }}
            placeholder="请选择"
            onChange={v => {
              this.handleSelectChange && this.handleSelectChange(v, value);
            }}
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
          <p style={{ maxWidth: 180 }}>
            {' '}
            {form.getFieldValue(value) || ''}{' '}
            <span
              style={{ color: '#40a9ff', cursor: 'pointer' }}
              onClick={() => {
                this[clickFn](1);
              }}
            >
              {' '}
              {text}
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
        return <span>{form.getFieldValue(value) || ''}</span>;
      case 8:
        return <TextArea rows={2} placeholder="请输入" />;
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
          />
        ) : (
          <Input placeholder="请输入" />
        );
    }
    //  type === 7 ?
  };

  // 获取Modal的标题
  returnTitle = () => {
    const { rightActive } = this.state;

    const menuText = (
      <FormattedMessage id={`menu.erp.dev.${rightActive}`} defaultMessage="Settings" />
    );
    return menuText;
  };

  // 弹窗确定提交回调
  handleModalOk = close => {
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
    const { selectedBom, selectedRowKeysSecond, dispatch } = this.props;
    const { rightActive, switchMenu } = this.state;
    const data = rightActive === FIRST_TAG ? [selectedBom.id] : selectedRowKeysSecond;
    const service = rightActive === FIRST_TAG ? 'bom' : rightActive;
    serviceObj[`${service}delete`](data).then(res => {
      const { rtnCode, rtnMsg } = res ? res.head : {};
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        if (rightActive === FIRST_TAG) {
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
          this.getListSecond({ type: switchMenu }, {});
          // 清除第二table 选中 详情
          dispatch({
            type: `${defaultModelName}/clearDetailSecond`,
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
    // const { selectedRowKeys, selectedRowKeysSecond } = this.props;
    // const { rightActive, switchMenu } = this.state;
    // const data = rightActive === FIRST_TAG ? selectedRowKeys : selectedRowKeysSecond;
    // const serviceType = 'copy';
    // serviceObj[`${serviceType}${rightActive}`](data).then(res => {
    //   const { rtnCode, rtnMsg } = res ? res.head : {};
    //   if (rtnCode === '000000') {
    //     notification.success({
    //       message: rtnMsg,
    //     });
    //     if (rightActive === FIRST_TAG) {
    //       this.getList({ type: rightActive });
    //       this.getListSecond({ type: switchMenu }, {});
    //     } else {
    //       this.getListSecond({ type: switchMenu }, {});
    //     }
    //   }
    // });
  };

  // 新增||编辑 按钮事件回调
  handleAdd = close => {
    const { form, choosenRowData, choosenRowDataSecond } = this.props;
    const { switchMenu, rightActive, modalType } = this.state;
    const { resetFields } = form;
    let params = {};
    if (rightActive !== FIRST_TAG) {
      params = { mainMoldCode: choosenRowData.id };
    }
    if (modalType === 'edit') {
      params = {
        ...params,
        id: rightActive !== FIRST_TAG ? choosenRowDataSecond.id : choosenRowData.id,
      };
    }
    params = { ...params, pId: choosenRowData.id };

    this.setState({ addloading: true });

    const dataArr = modalInput[rightActive];
    const fieldslist = dataArr.map(e => e.value);

    form.validateFields(fieldslist, (err, values) => {
      if (!err) {
        params = {
          ...params,
          ...values,
        };

        const addService = rightActive === FIRST_TAG ? 'bomadd' : '';

        serviceObj[addService](params).then(res => {
          if (!res || !res.head) {
            return;
          }
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            if (rightActive === FIRST_TAG) {
              this.getbomlist({ type: rightActive }, {});
            } else {
              this.getListSecond({ type: switchMenu }, {});
            }

            if (close) this.btnFn('');
            if (close) this.setState({ filelist: [] });

            if (rightActive === 'dieSetChild') {
              resetFields(['mainMoldNo']);
            }
          }
        });
      }
      this.setState({ addloading: false });
    });
  };

  addCraftRow = (index, option) => {
    const func = option === 'add';
    this.setState(preState => {
      if (func) {
        return preState.craftForm.push(this.onCraft);
      } else {
        return preState.craftForm.splice(index, 1);
      }
    });
  };

  craftChange = (e, index, subIndex) => {
    console.log(e, index, subIndex, this.state.craftForm[index][subIndex].value);

    const v = e.target.value;
    this.setState(preState => {
      preState.craftForm[index][subIndex].value = v;
      return preState;
    });
  };

  // 获取新增/编辑弹窗内容
  getModalContent = () => {
    const { choosenRowData, choosenRowDataSecond, form } = this.props;
    const { modalType, rightActive, craftForm } = this.state;
    const { getFieldDecorator } = form;
    console.log(craftForm, '=====');

    const content = '';
    const isEdit = modalType === 'edit';
    const { model } = this.props;
    const addArr = modalInput[rightActive];
    const materialType = this.props.form.getFieldValue('materialType');
    console.log(model, '========');

    return (
      <Form size="small" key="1">
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
            }) => {
              if (rightActive === 'dieSetChild' && value === 'productNo') {
                initValue = `${choosenRowData.productNo}()`;
                // choosenRowDataSecond[value] = choosenRowData.id
              }

              if (mType === 1 && materialType !== 'H016002') {
                return;
              }
              return (
                <div className="addModal" key={key}>
                  <FormItem label={key}>
                    {getFieldDecorator(value, {
                      rules: [
                        {
                          required: !noNeed,
                          message: `请${type && type === 2 ? '选择' : '输入'}${key}`,
                        },
                      ],
                      initialValue: isEdit
                        ? rightActive === FIRST_TAG
                          ? choosenRowData[value]
                          : choosenRowDataSecond[value]
                        : initValue || (number ? 0 : undefined),
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
                      })
                    )}
                  </FormItem>
                </div>
              );
            }
          )}

        {rightActive === SECOND_TAG && this.returnCraftContent()}
        {content}
      </Form>
    );
  };

  returnCraftContent = () => {
    const { form } = this.props;
    const { craftForm } = this.state;
    const { getFieldDecorator } = form;
    return (
      <div style={{ width: '100%' }}>
        {craftForm.map((item, index) => (
          <div style={{ width: '100%', display: 'flex' }}>
            {item.map(({ key, value }, subIndex) => {
              console.log(key, value);
              return (
                <div className="addModal" key={key}>
                  <CraftRow name={key}>
                    <Input
                      placeholder="请输入"
                      onChange={e => {
                        this.craftChange(e, index, subIndex);
                      }}
                      value={value}
                    />
                  </CraftRow>
                </div>
              );
            })}
            <ButtonGroup>
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
          </div>
        ))}
      </div>
    );
  };

  // 列表对应操作button回调
  btnFn = async modalType => {
    switch (modalType) {
      case 'plus':
      case 'edit':
      default:
        this.initDrop();
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
    } = this.props;
    const { rightActive, selectedBom } = this.state;

    if (tag === 'plus') return false;
    // if (tag === 'lock')
    // return (
    //   (FIRST_TAG === rightActive && selectedRowKeys.length === 0) ||
    //   (FIRST_TAG !== rightActive && selectedRowKeysSecond.length === 0) ||
    //   this.returnLockType().disabled
    // );

    if (tag === 'delete') {
      return FIRST_TAG === rightActive && selectedBom.state == 1;
      // return (
      //   (FIRST_TAG === rightActive && selectedRowKeys.length === 0) ||
      //   (FIRST_TAG !== rightActive && selectedRowKeysSecond.length === 0) ||
      //   !this.returnLockType().isShenPi
      // );
    }
    if (tag === 'edit') {
      return FIRST_TAG === rightActive && selectedBom.state == 1;
      // const d = FIRST_TAG === rightActive ? choosenRowData : choosenRowDataSecond;
      // return (
      //   (FIRST_TAG === rightActive && selectedRowKeys.length === 0) ||
      //   (FIRST_TAG !== rightActive && selectedRowKeysSecond.length === 0) ||
      //   Number(d.status) === 2
      // );
    }

    return (
      (FIRST_TAG === rightActive && selectedRowKeys.length === 0) ||
      (FIRST_TAG !== rightActive && selectedRowKeysSecond.length === 0)
    );
  };

  // 取消弹窗回调
  onCancel = () => {
    this.btnFn('');
  };

  handleSwitchMenu = ({ target: { value } }) => {
    this.setState({ switchMenu: value });
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
      type: defaultModelName + '/bomOpration',
      payload: { params: [selectedBom.id], type },
      callback: () => {
        debugger;
        notification.success({
          message: str + '成功',
        });
        this.getbomlist();
      },
    });
  };

  // 导出bom
  exportBom = () => {};

  // 打印bom
  printBom = () => {};

  changeRightActive = ({ target: { value } }) => {
    this.setState({ rightActive: value });
  };

  getMaterialList = params => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/getMaterialList`,
      payload: { params },
      callback: arr => {
        // const selectedBom = arr.length > 0 ? arr[0] : { id: undefined };
        // this.setState({
        //   selectedBom,
        // });
      },
    });
  };

  getbomlist = params => {
    const { dispatch, choosenRowData } = this.props;
    dispatch({
      type: `${defaultModelName}/bomOpration`,
      payload: { params: { pid: choosenRowData.id, ...params }, type: 1 },
      callback: arr => {
        const selectedBom = arr.length > 0 ? arr[0] : { id: undefined };
        this.setState({
          selectedBom,
        });
        arr.length > 0 && this.getMaterialList({ BomId: arr[0].id });
      },
    });
  };

  // bom 列表切换
  handleBomSelectChange = v => {
    const { boomList } = this.props;
    console.log(v, '======bom');
    const arr = boomList.filter(({ id }) => id === v);
    this.setState({
      selectedBom: arr[0],
    });
  };

  craftInput = (e, type) => {};

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
      handleSwitchMenu,
      cancelVerify,
      verifyBom,
      exportBom,
      printBom,
      handleBomSelectChange,
      getbomlist,
      craftInput,
    } = this;
    const { modalType, rightActive, addloading, switchMenu, selectedBom, craftShow } = state;
    const { choosenRowData, choosenRowDataSecond, boomList, model, form } = props;
    const { getFieldDecorator } = form;
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
                handleModalOk(false);
              }}
            >
              保存
            </Button>,
          ];

    const secondOprationArr = [
      {
        key: '取消审批',
        fn: cancelVerify,
        disabled: !selectedBom.id || Number(selectedBom.status) === 0,
      },
      {
        key: '审批BOM',
        fn: verifyBom,
        disabled: !selectedBom.id || Number(selectedBom.status) === 2,
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

    console.log(this.props);

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
                      handleSwitchMenu={handleSwitchMenu}
                      // 第二表格操作
                      secondOprationArr={secondOprationArr}
                      boomList={boomList}
                      selectedBom={selectedBom}
                      getbomlist={getbomlist}
                      handleBomSelectChange={handleBomSelectChange}
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
                            onChange={changeRightActive}
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
                          <Divider className={styles.divder} />
                        </div>
                        <GetRenderitem
                          key={
                            FIRST_TAG === rightActive ? choosenRowData.id : choosenRowDataSecond.id
                          }
                          data={FIRST_TAG === rightActive ? choosenRowData : choosenRowDataSecond}
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
                          {btnGroup.map(({ name, tag }) => {
                            return (
                              <Button
                                key={tag}
                                className={styles.buttomControl}
                                type={tag === 'delete' ? 'danger' : 'primary'}
                                icon={tag}
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
            title={<BuildTitle title={returnTitle()} />}
            width={1000}
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
        <AddCraft craftShow={craftShow} onChange={craftInput} />
      </div>
    );
  }
}

@Form.create()
class AddCraft extends Component {
  state = {};

  render() {
    const { craftShow, onChange, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        title={<BuildTitle title="添加工艺" />}
        maskClosable={false}
        destroyOnClose
        visible={craftShow}
        onOK={() => {}}
      >
        {/* <Form size="small" key="1">
          <div className="addModal">
            <FormItem>
              {getFieldDecorator('', {
                rules: [
                  {
                    required: !noNeed,
                    message: `请${type && type === 2 ? '选择' : '输入'}${key}`,
                  },
                ],
                initialValue: undefined,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </div>
          <div className="addModal">
            <FormItem>
              <Input
                placeholder="请输入"
                onChange={() => {
                  onChange();
                }}
              />
            </FormItem>
          </div>
        </Form> */}
      </Modal>
    );
  }
}

const CraftRow = ({ name, value, children }) => {
  return (
    <div class="ant-row ant-form-item">
      <div class="ant-col ant-form-item-label">
        <label for="form1_craft1">{name}</label>
      </div>
      <div class="ant-col ant-form-item-control-wrapper">
        <div class="ant-form-item-control">
          <span class="ant-form-item-children">{children}</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
