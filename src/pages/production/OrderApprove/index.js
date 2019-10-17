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
  notification,
} from 'antd';
import ModalConfirm from '@/utils/modal';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
// 详情内容
import GetRenderitem from './components/GetRenderitem';
// 中间Table
import MiddleTable from './components/MiddleTable';

// 弹窗输入配置&显示配置
import modalInput from './config/modalInput';
import showItem from './config/showItem';
import styles from './index.less';

import serviceObj from '@/services/production';
import BuildTitle from '@/components/BuildTitle';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
// 右手边按钮集合
const btnGroup = [
  { name: '审批', tag: 'lock' },
];

// const isLockList = false; // table是否锁定=》显示锁定标签做判断 先设定为否

const defaultModelName = 'productionOrderApprove';

const firstTabFlag = 'orderApproveInfo';

const radioArr01 = [
  { key: '当前审批', value: '0' },
  { key: '历史审批', value: '2' }];

const radioArr02 = [
  { key: '产品信息', value: 'orderApproveProduct' },
  { key: '审批结果', value: 'orderApproveResult' }];
const radioArr = [
  { key: '审批信息', value: 'orderApproveInfo' },
  { key: '产品信息', value: 'orderApproveProduct' },
  { key: '审批结果', value: 'orderApproveResult' }];

@Form.create()
@connect(({ loading, productionOrderApprove: model }) => {
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
    secondTableActive: 'orderApproveProduct',
    // 右边默认选中tab标志
    rightActive: firstTabFlag,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // 类别下拉
    dispatch({
      type: `${defaultModelName}/getwordbookdropdown`,
      payload: { params: { 'wordbookTypeCode': 'H017' }, listName: 'listH017' },
    });
    // 成品类别下拉
    dispatch({
      type: `${defaultModelName}/getTypeByWordbookCode`,
      payload: { params: { 'key': 'H016009' }, listName: 'listH016009' },
    });
    // 部门下拉
    dispatch({
      type: `${defaultModelName}/listDeptDropDown`,
    });
    // 镶石工艺下拉
    dispatch({
      type: `${defaultModelName}/listGemSetProcessDropDown`,
      payload: {},
    });


    // 获取初始表单数据
    this.getList({}, { status: '0' });
  }

  // 右边顶部tab切换
  changeRightActive = (v,clear) => {
    const { secondTableActive } = this.state;
    this.setState({
      rightActive: v.target.value,
      secondTableActive: v.target.value === firstTabFlag ? secondTableActive : v.target.value,
    });

    if (clear) {
      const {  dispatch, paginationSecond, choosenRowData } = this.props;
      // 清除第二右边详细
      dispatch({
        type: `${defaultModelName}/clearSecondDetail`,
      });
      // 搜索
      dispatch({
        type: `${defaultModelName}/getListSecond`,
        payload: {
          type: v.target.value,
          params: { ...paginationSecond, approveNo: choosenRowData.approveNo },
        },
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
        params: { ...paginationSecond, ...searchParamsSecond, ...param, approveNo: choosenRowData.approveNo },
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
      case 'lock':
        text = '审批';
        break;
      default:
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
      default:
        break;
    }

  };


  // 审批 按钮回调
  handleLock = () => {
    const { selectedRowKeys, selectedRowKeysSecond } = this.props;
    const { rightActive, secondTableActive } = this.state;
    const data = rightActive === firstTabFlag ? selectedRowKeys : selectedRowKeysSecond;
    const isLock = this.returnLockType().type === 1;  // 根据this.returnLockType()判断返回当前是撤回还是审批
    const serviceType = isLock ? 'approve' : 'revoke';

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

  // 列表对应操作button回调
  btnFn = async (modalType) => {
    switch (modalType) {
      case 'lock':
        this.setState({ modalType });
        // ModalConfirm({
        //   content: '确定审批吗？', onOk: () => {
        //     this.handleLock();
        //   },
        // });
        break;
    }
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
      changeRightActive,
      getModalContent,
      handleModalOk,
      onCancel,
      returnElement,
      onSearch,
      returnTitle,
    } = this;
    const { modalType, rightActive, secondTableActive } = state;
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
                      <Card bordered={false}>
                        <Radio.Group
                          size="small"
                          className={styles.right_content_tabgroud}
                          onChange={v=>{changeRightActive(v,true)}}
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
                                  width: 80,
                                  textalign: 'center',
                                  lineHeight: '30px',
                                }}
                                value={item.value}
                              >{item.key}
                              </Radio.Button>)
                          }
                        </Radio.Group>
                        <GetRenderitem
                          key={firstTabFlag === rightActive ? choosenRowData.id : choosenRowDataSecond.id}
                          data={firstTabFlag === rightActive ? choosenRowData : choosenRowDataSecond}
                          type={rightActive}
                          items={showItem}
                        />
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
                              disabled={secondTableActive !== 'orderApproveProduct'}
                              onClick={() => {
                                btnFn(tag);
                              }}
                            >
                              审批
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
          onOk={handleModalOk}
          visible={modalType !== ''}
          onCancel={onCancel}
        >
          {getModalContent()}
        </Modal>
        }
      </div>
    );
  }


}

export default Index;
