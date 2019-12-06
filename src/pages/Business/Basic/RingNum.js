import React, { PureComponent } from 'react';
import {
  Table,
  Card,
  Row,
  Col,
  Icon,
  Form,
  Modal,
  Input,
  Button,
  Divider,
  Radio,
  message,
} from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { formatMessage } from 'umi/locale';

import { connect } from 'dva';
import styles from './Royalty.less';
import GridContent from '../../../components/PageHeaderWrapper/GridContent';
import { ring } from '@/utils/SvgUtil';
import DescriptionList from '@/components/DescriptionList';
import clientStyle from '../Client/Client.less';
import ModalConfirm from '@/utils/modal';
import { statusConvert } from '@/utils/convert';
import BuildTitle from '@/components/BuildTitle';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

const ringNumContentColumns = [
  {
    title: '中文名称',
    dataIndex: 'zhName',
    key: 'zhName',
  },
  {
    title: '英文名称',
    dataIndex: 'enName',
    key: 'enName',
  },

  {
    title: '备注',
    dataIndex: 'marks',
    key: 'marks',
  },

  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: s => statusConvert[s],
  },
];

const subringNumContentColumns = [
  {
    title: '戒围号',
    dataIndex: 'sizeCode',
    key: 'sizeCode',
  },

  {
    title: '状态',
    dataIndex: 'status',
    key: 'status2',
    render: s => statusConvert[s],
  },
];

const { Description } = DescriptionList;

@connect(({ loading, ringnum, ringnum2 }) => {
  // const { rtnCode, rtnMsg } = ringnum;
  return {
    listLoading: loading.effects['ringnum/fetchListRingNum'],
    addloading: loading.effects['ringnum/addRingNum'],
    deleteloading: loading.effects['ringnum/deleteRingNum'],
    upateloading: loading.effects['ringnum/updateRingNum'],
    freezing: loading.effects['ringnum/freezeRingNum'],
    unfreezing: loading.effects['ringnum/unfreezeRingNum'],
    istLoading2: loading.effects['ringnum2/fetchListSonRingNum'],
    addsonloading: loading.effects['ringnum2/addSonRingNum'],
    deletesonloading: loading.effects['ringnum2/deleteSonRingNumber'],
    upatesonloading: loading.effects['ringnum2/updateSonRingNum'],
    sonfreezing: loading.effects['ringnum2/freezeSonRingNum'],
    sonunfreezing: loading.effects['ringnum2/unfreezeSonRingNum'],
    body2: ringnum2.body2,
    body: ringnum.body,
  };
})
@Form.create()
class RingNum extends PureComponent {
  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      visible: false,
      done: false,
      list: [],
      standardSelectedRowKeys: [],
      numberSelectedRowKeys: [],
      showItem: false,
      showNumberItem: false,
      isEdit: true,
      isEditNumber: true,
      update: false,
      isUpdateFrom: false,
      updateNumber: false,
      isUpdateNumberFrom: false,
      isAdd: true,
      modalType: 'standard',
      requestState: 'success',
      requestMes: '保存成功！',
      isLoading: false,
      isSonLoading: false,
      tabType: 'standard',
      refreshList: 'standard',
      standardRowData: [],
      standarRowKeys: [],
      numberRowData: [],
      numberRowKeys: [],
      rowData: [],
      rowNumberData: [],
      fristLoad: true,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ringnum/fetchListRingNum',
      payload: { current: 1, size: 5 },
    });
    this.state.data2 = [];
  }

  handleSubmit = close => {
    const { dispatch, form, rtnCode = {} } = this.props;

    const { showItem, isAdd } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      if (isAdd) {
        dispatch({
          type: 'ringnum/addRingNum',
          payload: {
            ...fieldsValue,
          },
          callback: () => {
            this.setState({
              visible: !close,
            });
          },
        });

        this.setState({
          standardSelectedRowKeys: '',
          selectIndexAt: -1,
          showItem: false,
          isEdit: true,
        });
      } else {
        const temp = { ...fieldsValue };
        const data = { ...showItem };
        data.zhName = temp.zhName;
        data.enName = temp.enName;
        data.marks = temp.marks;
        this.state.current = { ...data };

        // console.log('update ' + Object.keys(current));
        dispatch({
          type: 'ringnum/updateRingNum',
          payload: {
            ...data,
            callback: () => {
              this.setState({
                visible: !close,
              });
            },
          },
        });
      }
      // this.setState({
      //   visible: false,
      // });
    });
  };

  handleNumberSubmit = close => {
    const { dispatch, form, rtnCode = {} } = this.props;

    const { showItem, isAdd, showNumberItem } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      if (isAdd) {
        const params = {};
        params.sizeCode = fieldsValue.sizeCode;
        (params.ringAroundStId = showItem.id),
          // console.log('params data = ' + Object.keys(params));

          dispatch({
            type: 'ringnum2/addSonRingNum',
            payload: {
              ...params,
            },
            callback: () => {
              this.setState({ visiable: !close });
            },
          });

        this.setState({
          // selectedRowKeys: '',
          sonSelectIndexAt: -1,
          showNumberItem: false,
          isEditNumber: true,
        });
      } else {
        const temp = { ...fieldsValue };
        const data = { ...showNumberItem };
        data.sizeCode = temp.sizeCode;
        this.state.currentNumber = { ...temp };

        dispatch({
          type: 'ringnum2/updateSonRingNum',
          payload: {
            ...data,
          },
          callback: () => {
            this.setState({ visiable: !close });
          },
        });
      }
    });
  };

  handleDone = () => {
    const { dispatch, body, body2 } = this.props;
    const { refreshList, showItem } = this.state;

    if (refreshList === 'standard') {
      dispatch({
        type: 'ringnum/fetchListRingNum',
        payload: { current: body.current, size: body.size },
      });

      this.setState({
        done: false,
        sonSelectIndexAt: -1,
        showNumberItem: false,
        isEditNumber: true,
      });
    } else {
      const params = {
        ring_around_st_id: showItem.id,
      };
      dispatch({
        type: 'ringnum2/fetchListSonRingNum',
        payload: {
          ...params,
          current: body2.current,
          size: body2.size,
        },
      });
      this.setState({
        done: false,
        fristLoad: false,
      });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  returnTotal = total => (
    <p>
      <FormattedMessage id="app.table.total" defaultMessage="" />
      {total}
      <FormattedMessage id="app.table.totalEnd" defaultMessage="" />
    </p>
  );

  render() {
    const {
      standardSelectedRowKeys = [],
      current = {},
      currentNumber = {},
      update,
      updateNumber,
      isAdd,
      isEdit,
      modalType,
      fristLoad,
      tabType,
      showItem,
      numberSelectedRowKeys,
    } = this.state;

    const {
      listLoading,
      istLoading2,
      body = {},
      body2 = {},
      addloading,
      deleteloading,
      upateloading,
      freezing,
      unfreezing,
      addsonloading,
      deletesonloading,
      upatesonloading,
      sonfreezing,
      sonunfreezing,
      form: { getFieldDecorator },
      dispatch,
    } = this.props;

    this.state.isLoading =
      addloading || deleteloading || upateloading || freezing || listLoading || unfreezing;

    if (addloading || deleteloading || upateloading || freezing || unfreezing) {
      this.state.update = true;
      if (upateloading) {
        this.state.isUpdateFrom = true;
      }
    } else if (update) {
      if (body.rtnCode === '000000') {
        this.state.requestState = 'success';
        message.success(body.rtnMsg);
      } else {
        this.state.requestState = 'error';
        message.error(body.rtnMsg);
      }

      // this.state.requestMes = body.rtnMsg;
      this.state.update = false;
      this.state.done = true;
      this.state.refreshList = 'standard';
      if (this.state.isUpdateFrom) {
        this.state.isUpdateFrom = false;
        // this.state.showItem = { ...current };
      }
    }

    this.state.isSonLoading =
      addsonloading ||
      deletesonloading ||
      upatesonloading ||
      sonfreezing ||
      istLoading2 ||
      sonunfreezing;

    if (addsonloading || deletesonloading || upatesonloading || sonfreezing || sonunfreezing) {
      this.state.updateNumber = true;
      if (upatesonloading) {
        this.state.isUpdateNumberFrom = true;
      }
    } else if (updateNumber) {
      // console.log(" save body ",body2)

      if (body2.rtnCode2 === '000000') {
        // this.state.requestState = 'success';
        message.success(body2.rtnMsg2);
      } else {
        this.state.requestState = 'error';
        message.error(body2.rtnMsg2);
      }
      const params = {
        ring_around_st_id: showItem.id,
      };
      dispatch({
        type: 'ringnum2/fetchListSonRingNum',
        payload: {
          ...params,
          current: 1,
          size: 5,
        },
      });
      // this.state.requestMes = body2.rtnMsg;
      this.state.updateNumber = false;
      this.state.done = true;
      this.state.refreshList = 'number';
      if (this.state.isUpdateNumberFrom) {
        this.state.isUpdateNumberFrom = false;
        // this.state.showNumberItem = { ...currentNumber };
        // console.log('number update ' + this.state.showNumberItem);
      }
    }

    if (listLoading) {
      this.state.isLoadList = true;
    } else if (this.state.isLoadList) {
      if (body && body.data && body.data.length > 0) {
        const newdata = body.data;
        this.state.data = newdata;
      }
      this.updateSelectStandardDatas();
      this.state.isLoadList = false;
    }

    this.state.data2 = [];
    // console.log("   data ",body2.sonData)
    if (!fristLoad && body2 && body2.sonData && body2.sonData.length > 0) {
      const newdata = body2.sonData;
      // console.log(" new data ",newdata2)
      this.state.data2 = newdata;
    }
    if (istLoading2) {
      this.state.isRingNumLoadList = true;
    } else if (this.state.isRingNumLoadList) {
      const newdata = body2.sonData;
      this.state.data2 = newdata;
      this.updateSelectRingNumDatas();
      this.state.isRingNumLoadList = false;
      // console.log(" new data  updateSelectRingNumDatas",this.state.data2)
    }

    if (this.state.done) {
      this.handleDone();
    }

    // console.log('rntCode2=' + body2.rtnCode + ',data2 = ' + (this.state.data2));

    const rowSelection = {
      selectedRowKeys: standardSelectedRowKeys,
      type: 'checkbox',
      onChange: this.onSelectChange,
      onSelect: this.selectChange,
    };

    const rowNumberSelection = {
      selectedRowKeys: numberSelectedRowKeys,
      type: 'checkbox',
      onChange: this.onSelectNumberChange,
    };

    const getModalContent = () => {
      const { modalType } = this.state;

      if (modalType === 'number') {
        return (
          <Form size="small" onSubmit={this.handleNumberSubmit}>
            <FormItem
              label="戒围号"
              help="手寸输入用逗号'.'分割，如7.8.9录后请按回车健"
              validateStatus="success"
              {...this.formLayout}
            >
              {getFieldDecorator('sizeCode', {
                rules: [{ required: true, message: '请输入戒围标准编号' }],
                initialValue: currentNumber.sizeCode,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Form>
        );
      }
      if (modalType === 'standard') {
        return (
          <Form size="small" onSubmit={this.handleSubmit}>
            <FormItem label="中文名称" {...this.formLayout}>
              {getFieldDecorator('zhName', {
                rules: [{ required: true, message: '请输入中文名称' }],
                initialValue: current.zhName,
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="英文名称" {...this.formLayout}>
              {getFieldDecorator('enName', {
                rules: [{ required: true, message: '请输入英文名称' }],
                initialValue: current.enName,
              })(<Input placeholder="请输入" />)}
            </FormItem>{' '}
            <FormItem label="备注" {...this.formLayout}>
              {getFieldDecorator('marks', {
                rules: [{ message: '请输入备注' }],
                initialValue: current.marks,
              })(<TextArea placeholder="请输入" />)}
            </FormItem>
          </Form>
        );
      }
    };

    const modalFooter = isAdd
      ? [
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={this.state.modalType === 'standard' ? addloading : addsonloading}
            onClick={() => {
              this.state.modalType === 'standard'
                ? this.handleSubmit(true)
                : this.handleNumberSubmit(true);
            }}
          >
            保存
          </Button>,
          <Button
            key="continue"
            type="primary"
            loading={this.state.modalType === 'standard' ? addloading : addsonloading}
            onClick={() => {
              this.state.modalType === 'standard'
                ? this.handleSubmit(false)
                : this.handleNumberSubmit(false);
            }}
          >
            继续添加
          </Button>,
        ]
      : [
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={this.state.modalType === 'standard' ? upateloading : upatesonloading}
            onClick={() => {
              this.state.modalType === 'standard'
                ? this.handleSubmit(false)
                : this.handleNumberSubmit(false);
            }}
          >
            保存
          </Button>,
        ];

    // console.log('modalType ' + modalType);

    const onChange = (pagination, filters, sorter) => {
      const { current: currentIndex, pageSize } = pagination;
      dispatch({
        type: 'ringnum/fetchListRingNum',
        payload: { current: currentIndex, size: pageSize },
      });
    };
    const onChange2 = (pagination, filters, sorter) => {
      const { current: currentIndex, pageSize } = pagination;
      dispatch({
        type: 'ringnum2/fetchListSonRingNum',
        payload: { ring_around_st_id: showItem.id, current: currentIndex, size: pageSize },
      });
    };

    const paginationProps = {
      showQuickJumper: true,
      pageSize: 5,
      total: body.total,
      current: body.current,
      showTotal: this.returnTotal,
    };

    const paginationProps2 = {
      showQuickJumper: true,
      pageSize: 5,
      total: body2.total,
      current: body2.current,
      showTotal: this.returnTotal,
    };
    return (
      <GridContent>
        <Row gutter={24} className={styles.row_content}>
          <Col lg={16} md={24}>
            <div className={styles.view_left_content}>
              <div style={{ fontSize: 25, textAlign: 'vertical-center' }}>
                <Icon
                  style={{
                    width: 50,
                    height: 50,
                    paddingRight: 10,
                    paddingTop: 10,
                    paddingLeft: 10,
                  }}
                  component={ring}
                />
                <FormattedMessage id="app.basic.menuMap.num" defaultMessage="戒围标准" />
              </div>
              <Card bordered={false} loading={false}>
                <Table
                  loading={this.state.isLoading}
                  pagination={paginationProps}
                  dataSource={this.state.data}
                  rowSelection={rowSelection}
                  onChange={onChange}
                  rowKey={record => record.id}
                  bordered={false}
                  onRow={record => {
                    return {
                      onClick: event => {
                        this.clickStandardRowItem(record);
                      },
                    };
                  }}
                  rowClassName={this.onSelectRowClass}
                  size="middle"
                  columns={ringNumContentColumns}
                />
                <Table
                  loading={this.state.isSonLoading}
                  pagination={paginationProps2}
                  dataSource={this.state.data2}
                  bordered={false}
                  rowClassName={this.onSelectRowNumberClass}
                  rowSelection={rowNumberSelection}
                  rowKey={record => record.id}
                  onChange={onChange2}
                  onRow={record => {
                    return {
                      onClick: event => {
                        this.clickRowNumberItem(record);
                      },
                    };
                  }}
                  size="middle"
                  columns={subringNumContentColumns}
                />

                <Modal
                  maskClosable={false}
                  title={
                    <BuildTitle
                      title={
                        this.state.done
                          ? null
                          : formatMessage({
                              id: `app.basic.menuMap.${
                                this.state.modalType === 'number' ? 'numson' : 'num'
                              }`,
                            })
                      }
                    />
                  }
                  width={640}
                  className={styles.standardListForm}
                  bodyStyle={this.state.done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
                  destroyOnClose
                  visible={this.state.visible}
                  footer={modalFooter}
                  onCancel={this.handleCancel}
                >
                  {getModalContent()}
                </Modal>
              </Card>
            </div>
          </Col>
          <Col lg={8} md={24}>
            <div className={styles.view_right_content}>
              <div className={styles.right_content_tbs}>
                <div className={styles.right_content_tabgroud}>
                  <RadioGroup
                    defaultValue="standard"
                    size="small"
                    className={styles.right_content_tabs}
                    onChange={this.onChange}
                    value={modalType}
                    buttonStyle="solid"
                  >
                    <Radio.Button
                      value="standard"
                      className={styles.right_radio_tab}
                      onClick={this.switchTabStandrad}
                    >
                      {formatMessage({ id: 'app.basic.menuMap.num' })}
                    </Radio.Button>
                    <Radio.Button
                      value="number"
                      className={styles.right_radio_tab}
                      onClick={this.switchTabNumber}
                    >
                      {formatMessage({ id: 'app.basic.menuMap.numson' })}
                    </Radio.Button>
                  </RadioGroup>
                </div>
              </div>
              {tabType === 'standard' ? this.getRingStandrad() : this.getRingNumber()}
            </div>
          </Col>
        </Row>
      </GridContent>
    );
  }

  clickStandardRowItem = record => {
    const { standardSelectedRowKeys, standardRowData } = this.state;
    let { rowData } = this.state;
    const selects = standardSelectedRowKeys || [];
    const { id } = record;

    if (selects.includes(id)) {
      selects.splice(
        selects.findIndex(index => index === id),
        1
      );
      if (rowData.includes(record)) rowData = [];

      if (standardRowData.includes(record)) {
        standardRowData.splice(
          standardRowData.findIndex(item => item.id === id),
          1
        );
      }
    } else {
      if (rowData.length > 0) {
        selects.splice(
          selects.findIndex(index => index === rowData[0].id),
          1
        );
      }
      rowData = [];
      rowData.push({ ...record });
      selects.push(id);
      standardRowData.push(record);
    }

    if (selects.length > 0) {
      const recordK = selects[selects.length - 1];
      const r = standardRowData.filter(value => value.id == recordK);

      this.showSelectItem(r[0]);
    } else {
      this.setState({
        showItem: false,
        data2: [],
        fristLoad: true,
        numberSelectedRowKeys: [],
        numberRowData: [],
        isEditNumber: true,
        isEdit: true,
        current: false,
      });
    }

    this.setState({
      standardSelectedRowKeys: [].concat(selects),
      rowData,
    });
  };

  clickRowNumberItem = record => {
    const { numberSelectedRowKeys, numberRowData } = this.state;
    let { rowNumberData } = this.state;
    const selects = numberSelectedRowKeys || [];
    const { id } = record;

    if (selects.includes(id)) {
      selects.splice(
        selects.findIndex(index => index === id),
        1
      );

      if (rowNumberData.includes(record)) rowNumberData = [];

      if (numberRowData.includes(record)) {
        numberRowData.splice(
          numberRowData.findIndex(item => item.id === id),
          1
        );
      }
    } else {
      // console.log("record is ",rowData)
      if (numberRowData.length > 0) {
        selects.splice(
          selects.findIndex(index => index === numberRowData[0].id),
          1
        );
      }
      rowNumberData = [];
      rowNumberData.push({ ...record });

      selects.push(id);
      numberRowData.push(record);
    }

    if (selects.length > 0) {
      const recordK = selects[selects.length - 1];
      const r = numberRowData.filter(value => value.id == recordK);
      this.showSelectNumberItem(r[0]);
    } else {
      this.setState({
        showNumberItem: false,
        isEditNumber: true,
        currentNumber: false,
      });
    }

    this.setState({
      numberSelectedRowKeys: [].concat(selects),
      rowNumberData,
    });
  };

  switchTabStandrad = () => {
    this.setState({
      tabType: 'standard',
      modalType: 'standard',
    });
  };

  switchTabNumber = () => {
    this.setState({
      tabType: 'number',
      modalType: 'number',
    });
  };

  getRingStandrad = () => {
    const { isEdit, showItem } = this.state;
    return (
      <div className={styles.view_dwon}>
        {/* {this.getRingStandrad()} */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
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
              {formatMessage({ id: 'app.basic.menuMap.num' })}
            </div>
            <Divider className={styles.divder} />
          </div>
          {this.state.showItem ? this.getRenderitem(this.state.showItem) : ''}
        </div>

        <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              className={styles.buttomControl}
              type="primary"
              icon="plus"
              size="small"
              onClick={this.clickNewFrom}
            >
              新增
            </Button>
            <Button
              className={styles.buttomControl}
              type="danger"
              icon="delete"
              size="small"
              onClick={() => {
                ModalConfirm({
                  content: '确定删除吗？',
                  onOk: () => {
                    this.clickDeleteFrom();
                  },
                });
              }}
              disabled={isEdit || (this.state.showItem && this.state.showItem.status === '2')}
            >
              删除
            </Button>
            <Button
              className={styles.buttomControl}
              type="primary"
              size="small"
              onClick={this.clickEditFrom}
              disabled={isEdit || (this.state.showItem && this.state.showItem.status === '2')}
              icon="edit"
            >
              编辑
            </Button>
            {this.state.showItem.status === '2' ? (
              <Button
                className={styles.buttomControl}
                size="small"
                type="danger"
                icon="unlock"
                onClick={() => {
                  ModalConfirm({
                    content: '确定取消审批吗？',
                    onOk: () => {
                      this.clickUnFreezeFrom();
                    },
                  });
                }}
                disabled={isEdit}
              >
                取消审批
              </Button>
            ) : (
              <Button
                className={styles.buttomControl}
                size="small"
                type="primary"
                icon="lock"
                onClick={() => {
                  ModalConfirm({
                    content: '确定审批吗？',
                    onOk: () => {
                      this.clickFreezeFrom();
                    },
                  });
                }}
                disabled={isEdit}
              >
                审批
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  };

  getRingNumber = () => {
    const { isEditNumber, isEdit } = this.state;
    return (
      <div className={styles.view_dwon}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
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
              {formatMessage({ id: 'app.basic.menuMap.numson' })}
            </div>
            <Divider className={styles.divder} />
          </div>
          {this.state.showItem ? this.getRenderSonitem(this.state.showNumberItem) : ''}
        </div>

        <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              className={styles.buttomControl}
              type="primary"
              icon="plus"
              size="small"
              onClick={this.clickNewSonFrom}
              disabled={isEdit}
            >
              新增
            </Button>
            <Button
              className={styles.buttomControl}
              type="danger"
              icon="delete"
              size="small"
              onClick={() => {
                ModalConfirm({
                  content: '确定删除吗？',
                  onOk: () => {
                    this.clickNumberDeleteFrom();
                  },
                });
              }}
              disabled={
                isEditNumber ||
                (this.state.showNumberItem && this.state.showNumberItem.status === '2')
              }
            >
              删除
            </Button>
            <Button
              className={styles.buttomControl}
              type="primary"
              size="small"
              onClick={this.clickNumberEditFrom}
              disabled={
                isEditNumber ||
                (this.state.showNumberItem && this.state.showNumberItem.status === '2')
              }
              icon="edit"
            >
              编辑
            </Button>
            {this.state.showNumberItem.status === '2' ? (
              <Button
                className={styles.buttomControl}
                size="small"
                type="danger"
                icon="unlock"
                onClick={() => {
                  ModalConfirm({
                    content: '确定取消审批吗？',
                    onOk: () => {
                      this.clickUnNumberFreezeFrom();
                    },
                  });
                }}
                disabled={isEditNumber}
              >
                取消审批
              </Button>
            ) : (
              <Button
                className={styles.buttomControl}
                size="small"
                type="primary"
                icon="lock"
                onClick={() => {
                  ModalConfirm({
                    content: '确定审批吗？',
                    onOk: () => {
                      this.clickNumberFreezeFrom();
                    },
                  });
                }}
                disabled={isEditNumber}
              >
                审批
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  };

  onSelectRowClass = (record, index) => {
    let color = '';
    if (index % 2 == 0) {
      color = styles.row_normal;
    }
    return color;
  };

  onSelectRowNumberClass = (record, index) => {
    let color = '';
    if (index % 2 == 0) {
      color = styles.row_normal;
    }
    return color;
  };

  /** *
   * 通过最新列表更新选择的值
   * */
  updateSelectStandardDatas = () => {
    const { standardRowData, showItem } = this.state;
    // console.log(" updateSelectDatas ..",rowSelectedData,showItem,this.state.data)
    if (standardRowData && standardRowData.length > 0) {
      const newRowSelected = this.state.data.filter(v => {
        const rs = standardRowData.filter(v1 => {
          if (v1.id === v.id) return v;
        });
        if (rs.length > 0) return rs[0];
      });
      // console.log(" updateSelectDatas  rowSelecteData ",newRowSelected)
      if (newRowSelected && newRowSelected.length > 0) {
        this.state.standardRowData = newRowSelected;
        // this.setState({
        //   rowSelectedData: newRowSelected,
        // });
      }
    }

    if (showItem && this.state.standardRowData) {
      const newShowItem = this.state.standardRowData.filter(v => {
        if (showItem.id === v.id) return v;
      });
      // console.log(" updateSelectDatas  showItem ",newShowItem)
      if (newShowItem && newShowItem[0]) {
        this.state.showItem = newShowItem[0];
        this.setState({
          showItem: newShowItem[0],
        });
      }
    }
  };

  /** *
   * 通过最新列表更新选择的值
   * */
  updateSelectRingNumDatas = () => {
    const { numberRowData, showNumberItem } = this.state;
    if (numberRowData && numberRowData.length > 0) {
      const newRowSelected = this.state.data2.filter(v => {
        const rs = numberRowData.filter(v1 => {
          if (v1.id === v.id) return v;
        });
        if (rs.length > 0) return rs[0];
      });
      // console.log(" updateSelectDatas  rowSelecteData ",newRowSelected)
      if (newRowSelected && newRowSelected.length > 0) {
        this.state.numberRowData = newRowSelected;
        // this.setState({
        //   rowSelectedData: newRowSelected,
        // });
      }
    }

    if (showNumberItem && this.state.numberRowData) {
      const newShowItem = this.state.numberRowData.filter(v => {
        if (showNumberItem.id === v.id) return v;
      });
      // console.log(" updateSelectDatas  newShowItem ",newShowItem)
      if (newShowItem && newShowItem[0]) {
        this.state.showNumberItem = newShowItem[0];
        this.setState({
          showNumberItem: newShowItem[0],
        });
      }
    }
  };

  clickNewFrom = () => {
    // this.state.modalType = 'standard';
    this.state.isAdd = true;
    this.setState({ visible: true, current: {} });
  };

  clickNewSonFrom = () => {
    // this.state.modalType = 'number';
    this.state.isAdd = true;
    this.setState({ visible: true, currentNumber: {} });
  };

  clickDeleteFrom = () => {
    const { standardSelectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'ringnum/deleteRingNum',
      payload: {
        list: standardSelectedRowKeys,
      },
    });

    this.setState({
      standardSelectedRowKeys: '',
      showItem: false,
      isEdit: true,
      showNumberItem: false,
      isEditNumber: true,
      fristLoad: true,
      numberSelectedRowKeys: [],
      numberRowData: [],
      data2: [],
    });
  };

  clickNumberDeleteFrom = () => {
    const { numberSelectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'ringnum2/deleteSonRingNumber',
      payload: { list: numberSelectedRowKeys },
    });

    this.setState({
      showNumberItem: false,
      isEditNumber: true,
    });
  };

  clickEditFrom = () => {
    this.state.isAdd = false;
    this.setState({
      current: this.state.showItem,
      visible: true,
    });
  };

  clickNumberEditFrom = () => {
    this.state.isAdd = false;
    this.setState({
      currentNumber: this.state.showNumberItem,
      visible: true,
    });
  };

  clickFreezeFrom = () => {
    // const ringNumNo = this.state.showItem;
    const { standardSelectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'ringnum/freezeRingNum',
      payload: { list: standardSelectedRowKeys },
      callback: () => {
        dispatch({
          type: 'ringnum/fetchListRingNum',
          payload: { current: 1, size: 5 },
        });
      },
    });
  };

  clickUnFreezeFrom = () => {
    const { standardSelectedRowKeys } = this.state;

    const { dispatch } = this.props;

    dispatch({
      type: 'ringnum/unfreezeRingNum',
      payload: { list: standardSelectedRowKeys },
      callback: () => {
        dispatch({
          type: 'ringnum/fetchListRingNum',
          payload: { current: 1, size: 5 },
        });
      },
    });
  };

  clickNumberFreezeFrom = () => {
    const { numberSelectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'ringnum2/freezeSonRingNum',
      payload: { list: numberSelectedRowKeys },
      callback: () => {
        const { showItem } = this.state;
        dispatch({
          type: 'ringnum2/fetchListSonRingNum',
          payload: { ring_around_st_id: showItem.id, current: currentIndex, size: pageSize },
        });
      },
    });
  };

  clickUnNumberFreezeFrom = () => {
    const { numberSelectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'ringnum2/unfreezeSonRingNum',
      payload: { list: numberSelectedRowKeys },
      callback: () => {
        const { showItem } = this.state;
        dispatch({
          type: 'ringnum2/fetchListSonRingNum',
          payload: { ring_around_st_id: showItem.id, current: currentIndex, size: pageSize },
        });
      },
    });
  };

  selectChange = (record, index) => {};

  loadNumList = record => {
    const params = {
      ring_around_st_id: { ...record }.id,
    };

    const { dispatch } = this.props;
    dispatch({
      type: 'ringnum2/fetchListSonRingNum',
      payload: {
        ...params,
        current: 1,
        size: 5,
      },
    });
  };

  selectSonChange = (record, index) => {
    let edit = false;
    if (record === '') {
      edit = true;
    }

    this.setState({
      showNumberItem: { ...record },
      isEditNumber: edit,
      currentNumber: record,
      modalType: 'number',
      tabType: 'number',
    });
  };

  selectRowChange = (record, index) => {
    let edit = false;
    if (record === '') {
      edit = true;
    }
  };

  onSelectChange = (standardSelectedRowKeys, selectedRows) => {
    if (standardSelectedRowKeys.length > 0) {
      const recordK = standardSelectedRowKeys[standardSelectedRowKeys.length - 1];
      const record = selectedRows.filter(value => value.id == recordK);
      this.showSelectItem(record[0]);
    } else {
      this.setState({
        showItem: false,
        isEdit: true,
        data2: [],
        fristLoad: true,
        numberSelectedRowKeys: [],
        numberRowData: [],
        isEditNumber: true,
        current: false,
        currentNumber: false,
      });
    }

    this.setState({
      standardSelectedRowKeys,
      standardRowData: selectedRows,
    });
  };

  onSelectNumberChange = (numberSelectedRowKeys, selectRows) => {
    // console.log('num '+numberSelectedRowKeys.length)
    if (numberSelectedRowKeys.length > 0) {
      const recordK = numberSelectedRowKeys[numberSelectedRowKeys.length - 1];
      const record = selectRows.filter(value => value.id == recordK);
      // console.log(record)
      const d = record[0];
      const showNumberItem = { ...d };
      this.setState({
        showNumberItem,
        rowNumberData: selectRows,
        numberSelectedRowKeys,
      });
      this.state.showNumberItem = showNumberItem;
      this.showSelectNumberItem(record[0]);
    } else {
      // console.log('number is 0')
      this.setState({
        showNumberItem: false,
        isEditNumber: true,
        currentNumber: false,
      });
    }

    this.setState({
      numberSelectedRowKeys,
      numberRowData: selectRows,
    });
  };

  showSelectItem = record => {
    let edit = false;
    if (record === '') {
      edit = true;
    }

    this.loadNumList(record);

    this.setState({
      showItem: { ...record },
      isEdit: edit,
      current: record,
      isEditNumber: true,
      currentNumber: false,
      showNumberItem: false,
      fristLoad: false,
      modalType: 'standard',
      tabType: 'standard',
    });
  };

  showSelectNumberItem = record => {
    let edit = false;
    if (record === '') {
      edit = true;
    }

    this.setState({
      showNumberItem: { ...record },
      isEditNumber: edit,
      currentNumber: record,
      modalType: 'number',
      tabType: 'number',
    });
  };

  selectRowItem = () => {
    // console.log('select the item');
  };

  getRenderSonitem = item => {
    return (
      <Card bordered={false} style={{ overflow: 'auto' }}>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="戒围号">{item.sizeCode}</Description>
        </DescriptionList>
        {/* <Divider/> */}
      </Card>
    );
  };

  getRenderitem = item => {
    return (
      <Card bordered={false} style={{ overflow: 'auto' }} onClick={this.selectRowItem}>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="中文名称">{item.zhName}</Description>
          <Description term="英文名称">{item.enName}</Description>
          <Description term="备注">{item.marks}</Description>
          <Description term="状态">{statusConvert[item.status]}</Description>
        </DescriptionList>
        {/* <Divider/> */}
      </Card>
    );
  };
}

export default RingNum;
