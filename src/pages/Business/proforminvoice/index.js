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
  Table,
  DatePicker,
  notification,
} from 'antd';

import ModalConfirm from '@/utils/modal';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import GetRenderitem from './components/GetRenderitem';
import MiddleTable from './components/MiddleTable';
import SplitTable from './components/SplitTable';

// 弹窗输入配置&显示配置
import modalInput from './config/modalInput';
import showItem from './config/showItem';
import btnGroup from './config/btnGroup';
import styles from './index.less';

import serviceObj from '@/services/business';
import BuildTitle from '@/components/BuildTitle';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;

// const isLockList = false; // table是否锁定=》显示锁定标签做判断 先设定为否

const defaultModelName = 'businessPI';

const firstTabFlag = 'piHead';

const radioArr01 = [
  { key: '当前审批', value: '0' },
  { key: '历史审批', value: '2' }];

const radioArr02 = [
  { key: '产品信息', value: 'piDetail' }];
const radioArr = [
  { key: '订单主页', value: 'piHead' },
  { key: '产品详细信息', value: 'piDetail' },
];

@Form.create()
@connect(({ loading, businessPI: model }) => {
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
    secondTableActive: 'piDetail',
    // 右边默认选中tab标志
    rightActive: firstTabFlag,
    firstRadioValue: '0',
    SplitTableLoading: false,
    SplitTableList: [],
  };

  componentDidMount() {

    this.initDropList();
    // 获取初始表单数据
    this.getList({ piListType: '0' }, {});
  }

  initDropList = () => {
    const { dispatch } = this.props;

    // // 类别下拉
    // dispatch({
    //   type: `${defaultModelName}/getwordbookdropdown`,
    //   payload: { params: { 'wordbookTypeCode': 'H017' }, listName: 'listH017' },
    // });

    // 类别下拉
    dispatch({
      type: `${defaultModelName}/getwordbookdropdown`,
      payload: { params: { 'wordbookTypeCode': 'H007' }, listName: 'piTypeList' },
    });

  };

  // 右边顶部tab切换
  changeRightActive = (v, clear) => {
    const { secondTableActive } = this.state;
    this.setState({
      rightActive: v.target.value,
      secondTableActive: v.target.value === firstTabFlag ? secondTableActive : v.target.value,
    });

    if (clear) {
      const { dispatch, paginationSecond, choosenRowData } = this.props;
      // 清除第二右边详细
      dispatch({
        type: `${defaultModelName}/clearSecondDetail`,
      });
      // 搜索
      dispatch({
        type: `${defaultModelName}/getListSecond`,
        payload: {
          type: v.target.value,
          params: { ...paginationSecond, piHeadId: choosenRowData.piHeadId },
        },
      });
    }
  };


  // table 搜索
  onSearch = (params, table) => {
    if (table === 1) {
      const pp = { ...params, status: undefined };
      this.setState({ firstRadioValue: params.status });
      this.getList({ piListType: params.status }, pp);
    }
    if (table === 2) {
      this.getListSecond({}, params);
    }
  };

  // 第一table获取list
  getList = (args, param) => {
    const { dispatch, pagination, searchParams } = this.props;

    dispatch({
      type: `${defaultModelName}/getList`,
      payload: { type: firstTabFlag, params: { ...pagination, ...searchParams, ...param }, ...args },
    });

    // 清除第二table内容 右边详细
    dispatch({
      type: `${defaultModelName}/clearListSecond`,
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
        params: { ...paginationSecond, ...searchParamsSecond, ...param, piHeadId: param.piHeadId || choosenRowData.id },
        ...args,
      },
    });

  };


  // type 2 下啦选择
  // type 3 点击事件
  // type 4 文字
  // type 5 check
  // type 6 radio
  // type 7 被顺带出的文字
  // type 8 inputext
  returnElement = ({ key, value, noNeed, type, list, clickFn, text, arr, data, form, number }) => {
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
        return <Input style={{ width: '100' }} type={number ? 'number' : 'text'} placeholder="请输入" />;
    }
    //  type === 7 ?
  };


  // 获取Modal的标题
  returnTitle = () => {
    const { modalType } = this.state;
    let text = '';
    switch (modalType) {
      case 'edit':
        text = '编辑';
        break;
      case 'merge':
        text = 'PI合并';
        break;
      case 'split':
        text = 'PI拆分';
        break;
      default:
        text = '操作面板';
        break;
    }
    return `${text}`;
  };

  // 弹窗确定提交回调
  handleModalOk = () => {
    const { modalType } = this.state;
    switch (modalType) {
      case 'lock':
        // ModalConfirm({
        //   content: '确定审批吗？', onOk: () => {
        this.handleLock();
        //   },
        // });
        break;
      case 'merge':
        this.handleMerge();
        break;
      default:
        break;
    }

  };


  // 合并PI
  handleMerge = () => {
    const { selectedRowKeys } = this.props;
    const { firstRadioValue } = this.state;
    serviceObj[`merge${firstTabFlag}`](selectedRowKeys).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.btnFn('');
        this.getList({ piListType: firstRadioValue });
      }
    });

  };

  // 审批 按钮回调
  // handleLock = () => {
  //   const { selectedRowKeys, selectedRowKeysSecond } = this.props;
  //   const { rightActive, secondTableActive } = this.state;
  //   const data = rightActive === firstTabFlag ? selectedRowKeys : selectedRowKeysSecond;
  //   const isLock = this.returnLockType().type === 1;  // 根据this.returnLockType()判断返回当前是撤回还是审批
  //   const serviceType = isLock ? 'approve' : 'revoke';
  //
  //   serviceObj[`${serviceType}${rightActive}`](data).then(res => {
  //     const { rtnCode, rtnMsg } = res.head;
  //     if (rtnCode === '000000') {
  //       notification.success({
  //         message: rtnMsg,
  //       });
  //       if (rightActive === firstTabFlag) {
  //         this.getList({ type: rightActive });
  //       } else {
  //         this.getListSecond({ type: secondTableActive });
  //       }
  //     }
  //   });
  // };


  // 获取审批弹窗内容
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


  getModalContentSpecial = () => {
    const {
      list,
      selectedRowKeys,
    } = this.props;
    const {
      modalType,
      SplitTableList,
      SplitTableLoading,
    } = this.state;

    if (modalType === 'merge' && selectedRowKeys.length >= 2) {
      const nlist = list.records.filter(e => selectedRowKeys.indexOf(e.id) >= 0);
      return <div className={styles.mergediv}>
        <div className={styles.mergedivtitle}>共<span>{nlist.length}</span>条合并数据</div>
        <Table
          columns={[
            {
              title: '序号',
              dataIndex: 'piNo',
              key: 'index',
              render: (d, item, i) => i + 1,
            }, {
              title: '订单号码',
              dataIndex: 'piNo',
              key: 'piNo',
            }, {
              title: '客户编号',
              dataIndex: 'customerNo',
              key: 'customerNo222',
            }]}
          dataSource={nlist}
          pagination={false}
        />
      </div>;
    }

    if ((modalType === 'split') && selectedRowKeys.length === 1) {
      const nlist = list.records.filter(e => selectedRowKeys.indexOf(e.id) >= 0);

      return <SplitTable
        piData={nlist[0]}
        data={SplitTableList}
        loading={SplitTableLoading}
      />;
    }


    return null;
  };

  // 列表对应操作button回调
  btnFn = async (modalType) => {
    const {
      list,
      selectedRowKeys,
    } = this.props;
    switch (modalType) {
      case 'lock':
        ModalConfirm({
          content: '确定审批吗？', onOk: () => {
            this.handleLock();
          },
        });
        break;
      case 'split':
        const nlist = list.records.filter(e => selectedRowKeys.indexOf(e.id) >= 0);
        this.setState({ SplitTableLoading: true });
        serviceObj.listAllPiDetail({ piHeadId: nlist[0].id }).then((res) => {
          this.setState({ SplitTableLoading: false });
          if (!res && !res.head) return;
          const { rtnCode } = res.head;
          if (rtnCode === '000000') {
            this.setState({ SplitTableList: res.body.records });
          }
        });
        this.setState({ modalType });
        break;
      default:
        this.setState({ modalType });
        break;
    }
  };

  // 取消弹窗回调
  onCancel = () => {
    this.btnFn('');
  };

  /**
   * 根据已经选中的列id 遍历获取对应status数组 判断返回是否显示取消审批或审批 按钮是否可用
   * return obj
   * params: name 名称
   * params: disabled 是否可点击
   * params: type 1为审批 2为取消审批
   */
  returnLockType = () => {
    const { selectedRowKeys, selectedRowKeysSecond, list, listSecond } = this.props;
    const { rightActive } = this.state;

    const selectkeys = rightActive === firstTabFlag ? selectedRowKeys : selectedRowKeysSecond;
    const listtt = rightActive === firstTabFlag ? list : listSecond;

    if (listtt.records.length === 0) return {
      name: '审批',
      disabled: true,
      type: 1,
    };
    const isLock1 = selectkeys.reduce((res, cur) => {
      const singleObjcect = listtt.records.find(subItem => subItem.id === cur);
      if (singleObjcect) res.push(singleObjcect.status);
      return res;
    }, []);
    const isShenPi = isLock1.every((item) => Number(item) === 0); // 是否全是0
    const isChexiao = isLock1.every((item) => Number(item) === 2); // 是否全是2
    if (isShenPi) return { name: '审批', disabled: false, type: 1, isChexiao, isShenPi };
    if (isChexiao) return { name: '取消审批', disabled: false, type: 2, isChexiao, isShenPi };
    return { name: '审批', disabled: true, type: 1, isChexiao, isShenPi }; // 当两种状态都有 禁止点击
  };

  render() {
    const {
      state,
      props,
      btnFn,
      changeRightActive,
      getModalContent,
      getModalContentSpecial,
      handleModalOk,
      onCancel,
      returnElement,
      onSearch,
      returnTitle,
      returnLockType,
    } = this;
    const { modalType, rightActive, secondTableActive, firstRadioValue } = state;
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
                      wrappedComponentRef={ref => {
                        this.middleTab = ref;
                      }}
                      firstRadioValue={firstRadioValue}
                      btnFn={btnFn}
                      firstType={firstTabFlag}
                      secondType={secondTableActive}
                      returnElement={returnElement}
                      onSearch={onSearch}
                      changeRightActive={changeRightActive}
                      radioArr01={radioArr01}
                      radioArr02={radioArr02}
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
                            onChange={v => {
                              changeRightActive(v, true);
                            }}
                            buttonStyle="solid"
                            value={rightActive}
                            style={{ textAlign: 'center' }}
                          >
                            {
                              radioArr.map((item, index) =>
                                <Radio.Button
                                  key={item.value}
                                  style={{
                                    height: 30,
                                    minWidth: 80,
                                    textalign: 'center',
                                    lineHeight: '30px',
                                  }}
                                  value={item.value}
                                >{item.key}
                                </Radio.Button>)
                            }
                          </Radio.Group>
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
                        <div>
                          {btnGroup[rightActive].map(({ name, tag, icon }) => (
                            <Button
                              key={tag}
                              className={styles.buttomControl}
                              type={(tag === 'delete' || (tag === 'lock' && returnLockType().type === 2)) ? 'danger' : 'primary'}
                              icon={icon || tag}
                              size="small"
                              disabled={false}
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
        {
          handleModalOk &&
          <Modal
            maskClosable={false}
            title={<BuildTitle title={returnTitle()} />}
            width={1000}
            bodyStyle={{ padding: '28px 0 0' }}
            destroyOnClose
            onOk={handleModalOk}
            visible={modalType !== ''}
            onCancel={onCancel}
          >
            {['merge', 'split', 'split-auto'].indexOf(modalType) === -1 ? getModalContent() : getModalContentSpecial()}
          </Modal>
        }
      </div>
    );

  }


}

export default Index;
