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
  Divider,
  notification,

} from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';

import ModalConfirm from '@/utils/modal';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
// 详情内容
import GetRenderitem from './components/GetRenderitem';
// 中间Table
import MiddleTable from './components/MiddleTable';
import BuildTitle from '@/components/BuildTitle';

// 弹窗输入配置&显示配置
import modalInput from './config/modalInput';
import showItem from './config/showItem';
import styles from './index.less';

import {
  querylistDept,
  saveOrUpdatedept,
  deleteTheDept,
  approvalDept,
  cancelDept
} from '@/services/api';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
// 右手边按钮集合
const btnGroup = [
  { name: '新增', tag: 'plus' },
  { name: '删除', tag: 'delete', type: 'danger' },
  { name: '编辑', tag: 'edit' },
  { name: '审批', tag: 'lock' },
  // { name: '复制', tag: 'copy' },
];

// const isLockList = false; // table是否锁定=》显示锁定标签做判断 先设定为否

const defaultModelName = 'Department';

const firstTabFlag = 'Department';

@Form.create()
@connect(({ loading, Department: model }) => {
  return {
    model,
    listLoading: loading.effects[`${defaultModelName}/getList`],
    list: model.list,
    pagination: model.pagination,
    choosenRowData: model.choosenRowData,
    selectedRowKeys: model.selectedRowKeys,
    searchParams: model.searchParams,
  };
})
class Index extends Component {
  state = {
    modalType: '',
    rightActive: firstTabFlag,
    addloading: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;


    // 获取初始表单数据
    this.getList();
  }

  // 右边顶部tab切换
  // changeRightActive = (v) => {
  //   this.setState({
  //     rightActive: v.target.value,
  //   });
  // };


  // table 搜索
  onSearch = (params) => {
    this.getList({}, params);
  };

  // 第一table获取list
  getList = (args, param) => {
    const { dispatch, pagination, searchParams } = this.props;
    // getDevList
    dispatch({
      type: `${defaultModelName}/getList`,
      payload: { params: { ...pagination, ...searchParams, ...param }, ...args },
    });


  };

  // type 2 下啦选择
  // type 3 点击事件
  // type 4 文字
  // type 5 check
  // type 6 radio
  // type 7 被顺带出的文字
  // type 8 inputext
  returnElement = ({ key, value, noNeed, type, list, clickFn, text, arr, data, form, number, disabled }) => {
    switch (type) {
      case 2:
        return (
          <Select
            style={{ width: 180 }}
            placeholder="请选择"
            onChange={(v) => {
              this.handleSelectChange && this.handleSelectChange(v, value);
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
        return <Input
          style={{ width: '100' }}
          type={number ? 'number' : 'text'}
          placeholder="请输入"
          disabled={disabled}
        />;
    }
    //  type === 7 ?
  };


  // 获取Modal的标题
  returnTitle = () => {
    const menuText = <FormattedMessage id="menu.erp.system.department" defaultMessage="Settings" />;
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
    const { selectedRowKeys, dispatch } = this.props;
    deleteTheDept({list:selectedRowKeys}).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.getList();
        dispatch({
          type: `${defaultModelName}/choosenRowData`,
          payload: { id: '' },
        });
      }
    });
  };

  // 审批/撤销 按钮回调
  handleLock = () => {
    const { selectedRowKeys } = this.props;
    const { rightActive } = this.state;
    const isLock = this.returnLockType().type === 1;  // 根据this.returnLockType()判断返回当前是撤回还是审批
    const service = isLock ? approvalDept : cancelDept;

    service({list:selectedRowKeys}).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.getList({});
      }
    });
  };

  // 新增||编辑 按钮事件回调
  handleAdd = (close) => {
    const { form, choosenRowData } = this.props;
    const { rightActive, modalType } = this.state;
    let params = {};

    if (modalType === 'edit') {
      params = { ...params, id: choosenRowData.id };
    }
    this.setState({ addloading: true });

    const dataArr = modalInput[rightActive];
    const fieldslist = dataArr.map(e=>e.value)
    form.validateFields(fieldslist,(err, values) => {
      if (!err) {
        params = {
          ...params,
          ...values,
        };


        saveOrUpdatedept(params).then(res => {
          if (!res.head) {
            return;
          }
          const { rtnCode, rtnMsg } = res.head;
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList({ type: rightActive });

            if(close) this.btnFn('');
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
      form,
      model,
    } = this.props;
    const {
      modalType,
      rightActive,
    } = this.state;
    const { getFieldDecorator, getFieldValue } = form;

    const content = '';
    const isEdit = modalType === 'edit';
    const addArr = modalInput[rightActive];
    return (
      <Form size="small" key="1">
        {
          addArr && addArr.map(({ key, value, noNeed, type, list, clickFn, text, arr, initValue, number, disabled }) => {
            const selectData = { ...choosenRowData };
            return (
              <div className="addModal" key={key}>
                <FormItem
                  label={key}
                >
                  {
                    getFieldDecorator(value, {
                      rules: [{ required: !noNeed, message: `请${type && type === 2 ? '选择' : '输入'}${key}` }],
                      initialValue: isEdit ? (selectData[value]) : initValue || (number ? 0 : undefined),
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
                      disabled,
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
    const { selectedRowKeys, model, list } = this.props;
    const { rightActive } = this.state;
    const listr = list;
    const selectedKeys = selectedRowKeys;
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
    const { selectedRowKeys, choosenRowData } = this.props;
    const { rightActive } = this.state;

    if (tag === 'plus') return (firstTabFlag === rightActive ? false : !choosenRowData.id);
    if (tag === 'lock') return (firstTabFlag === rightActive && selectedRowKeys.length === 0) || this.returnLockType().disabled;

    if (tag === 'delete') {
      return (firstTabFlag === rightActive && selectedRowKeys.length === 0) || !this.returnLockType().isShenPi;
    }
    if (tag === 'edit') {
      const d = choosenRowData;
      return (firstTabFlag === rightActive && selectedRowKeys.length === 0) || Number(d.status) === 2;
    }

    return (firstTabFlag === rightActive && selectedRowKeys.length === 0);
  };

  // 取消弹窗回调
  onCancel = () => {
    this.btnFn('');
  };

  render() {
    const {
      state,
      props,
      btnFn,
      returnSisabled,
      returnLockType,
      getModalContent,
      handleModalOk,
      onCancel,
      returnElement,
      onSearch,
      returnTitle,
    } = this;
    const { modalType, rightActive,addloading } = state;
    const { choosenRowData } = props;


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
                      firstType={firstTabFlag}
                      returnElement={returnElement}
                      onSearch={onSearch}
                    />
                  </Col>
                  {/* 右边显示详细信息和按钮操作 */}
                  <Col lg={8} md={24}>
                    <div className={styles.view_right_content}>

                      <div style={{display:"flex",justifyContent:"space-between",flexDirection: "column",    overflow: "hidden"}}>
                        <div>
                          <div className={styles.title_info}>{returnTitle()}详情</div>
                          <Divider className={styles.divder} />
                        </div>
                        <GetRenderitem
                          data={choosenRowData}
                          type={rightActive}
                          items={showItem}
                        />
                      </div>
                      <Card bodyStyle={{ display: 'flex', paddingLeft: 5, paddingRight: 5 }}>
                        <div>
                          {btnGroup.map(({ name, tag }) => (
                            <Button
                              key={tag}
                              className={styles.buttomControl}
                              type={(tag === 'delete' || (returnLockType().type === 2 && tag === 'lock')) ? 'danger' : 'primary'}
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
      </div>
    );
  }


}

export default Index;
