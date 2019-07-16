import React, { PureComponent } from 'react';
import {
  Table,
  Card,
  Row,
  Col,
  Icon,
  Form,
  Select,
  Modal,
  Input,
  Button,
  Divider,
  Radio,
  message,
} from 'antd';
import styles from './Royalty.less';
import GridContent from '../../../components/PageHeaderWrapper/GridContent';
import SvgUtil from '../../../utils/SvgUtil';
import formstyles from './BasicForm.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Result from '@/components/Result';
import { connect } from 'dva';
import DescriptionList from '@/components/DescriptionList';
import clientStyle from '../Client/Client.less';

const RadioButton = Radio.Button;
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
    key: 'status',
  },
];

const paginationProps = {
  showQuickJumper: true,
  pageSize: 5,
};

const { Description } = DescriptionList;

@connect(({ loading, ringnum }) => {
  // const { rtnCode, rtnMsg } = ringnum;
  return {
    listLoading: loading.effects['ringnum/fetchListRingNum'],
    addloading: loading.effects['ringnum/addRingNum'],
    deleteloading: loading.effects['ringnum/deleteRingNum'],
    upateloading: loading.effects['ringnum/updateRingNum'],
    freezing: loading.effects['ringnum/freezeRingNum'],
    istLoading2: loading.effects['ringnum/fetchListSonRingNum'],
    addsonloading: loading.effects['ringnum/addSonRingNum'],
    deletesonloading: loading.effects['ringnum/deleteSonRingNumber'],
    upatesonloading: loading.effects['ringnum/updateSonRingNum'],
    sonfreezing: loading.effects['ringnum/freezeSonRingNum'],
    body2: ringnum.body2,
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
    });
    this.state.data2 = [];
  }

  handleSubmit = e => {
    e.preventDefault();
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
        if (data.status === '审批') data.status = 2;
        else if (data.status === '使用中') data.status = 1;
        else if (data.status === '输入') data.status = 0;

        // console.log('update ' + Object.keys(current));
        dispatch({
          type: 'ringnum/updateRingNum',
          payload: {
            ...data,
          },
        });
      }
      this.setState({
        visible: false,
      });
    });
  };

  handleNumberSubmit = e => {
    console.log('handleNumberSubmit');
    e.preventDefault();
    const { dispatch, form, rtnCode = {} } = this.props;

    const { showItem, isAdd, showNumberItem } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      if (isAdd) {
        let params = {};
        params.sizeCode = fieldsValue.sizeCode;
        (params.ringAroundStId = showItem.id),
          // console.log('params data = ' + Object.keys(params));

          dispatch({
            type: 'ringnum/addSonRingNum',
            payload: {
              ...params,
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
        if (data.status === '审批') data.status = 2;
        else if (data.status === '使用中') data.status = 1;
        else if (data.status === '输入') data.status = 0;

        dispatch({
          type: 'ringnum/updateSonRingNum',
          payload: {
            ...data,
          },
        });
      }
      this.setState({
        visible: false,
      });
    });
  };

  handleDone = () => {
    const { dispatch } = this.props;
    const { refreshList, showItem } = this.state;

    if (refreshList === 'standard') {
      dispatch({
        type: 'ringnum/fetchListRingNum',
      });

      this.setState({
        visible: false,
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
        type: 'ringnum/fetchListSonRingNum',
        payload: {
          ...params,
        },
      });
      this.setState({
        visible: false,
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

  render() {
    const {
      standardSelectedRowKeys = [],
      current = {},
      currentNumber = {},
      update,
      updateNumber,
      isEdit,
      modalType,
      fristLoad,
      tabType,
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
      addsonloading,
      deletesonloading,
      upatesonloading,
      sonfreezing,
      form: { getFieldDecorator },
    } = this.props;

    this.state.isLoading = addloading || deleteloading || upateloading || freezing || listLoading;

    if (addloading || deleteloading || upateloading || freezing) {
      this.state.update = true;
      if (upateloading) {
        this.state.isUpdateFrom = true;
      }
    } else {
      if (update) {
        if (body.rtnCode === '000000') {
          this.state.requestState = 'success';
        } else {
          this.state.requestState = 'error';
        }

        this.state.requestMes = body.rtnMsg;
        this.state.update = false;
        this.state.done = true;
        this.state.refreshList = 'standard';
        if (this.state.isUpdateFrom) {
          this.state.isUpdateFrom = false;
          this.state.showItem = { ...current };
        }
      }
    }

    this.state.isSonLoading =
      addsonloading || deletesonloading || upatesonloading || sonfreezing || istLoading2;

    // console.log('addsonloading =' + addsonloading + ',deletesonloading=' + deletesonloading + ',upatesonloading=' + upatesonloading + ',sonfreezing=' + sonfreezing + ',istLoading2=' + istLoading2);

    if (addsonloading || deletesonloading || upatesonloading || sonfreezing) {
      this.state.updateNumber = true;
      if (upatesonloading) {
        this.state.isUpdateNumberFrom = true;
      }
    } else {
      if (updateNumber) {
        if (body2.rtnCode === '000000') {
          this.state.requestState = 'success';
        } else {
          this.state.requestState = 'error';
        }

        this.state.requestMes = body2.rtnMsg;
        this.state.updateNumber = false;
        this.state.done = true;
        this.state.refreshList = 'number';
        if (this.state.isUpdateNumberFrom) {
          this.state.isUpdateNumberFrom = false;
          this.state.showNumberItem = { ...currentNumber };
          // console.log('number update ' + this.state.showNumberItem);
        }
      }
    }

    if (listLoading && body && body.data && body.data.length > 0) {
      const newdata = body.data.map(value => {
        const s = value.status;
        if (s == 0) {
          value.status = '输入';
        } else if (s == 1) {
          value.status = '使用中';
        } else if (s == 2) {
          value.status = '审批';
        }
        return value;
      });

      this.state.data = newdata;
    }

    this.state.data2 = [];
    // if (sonListLoading && body2 && body2.sonData && body2.sonData.length > 0) {
    if (!fristLoad && body2 && body2.sonData && body2.sonData.length > 0) {
      const newdata2 = body2.sonData.map(value => {
        const s = value.status;
        if (s == 0) {
          value.status = '输入';
        } else if (s == 1) {
          value.status = '使用中';
        } else if (s == 2) {
          value.status = '审批';
        }
        return value;
      });

      this.state.data2 = newdata2;
    }

    if (this.state.done) {
      if (this.state.requestState == 'success') {
        message.success(this.state.requestMes);
      } else {
        message.error(this.state.requestMes);
      }
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
          <Form size={'small'} onSubmit={this.handleNumberSubmit}>
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
      } else if (modalType === 'standard') {
        return (
          <Form size={'small'} onSubmit={this.handleSubmit}>
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

    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : {
          okText: '保存',
          onOk: this.state.modalType === 'standard' ? this.handleSubmit : this.handleNumberSubmit,
          onCancel: this.handleCancel,
        };

    // console.log('modalType ' + modalType);

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
                  component={SvgUtil.ring}
                />
                <FormattedMessage id="app.basic.menuMap.num" defaultMessage="戒围标准" />
              </div>
              <Card bordered={false} loading={false}>
                <Table
                  loading={this.state.isLoading}
                  pagination={paginationProps}
                  dataSource={this.state.data}
                  rowSelection={rowSelection}
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
                  pagination={paginationProps}
                  dataSource={this.state.data2}
                  bordered={false}
                  rowClassName={this.onSelectRowNumberClass}
                  rowSelection={rowNumberSelection}
                  rowKey={record => record.id}
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
                  // title={this.state.done ? null : `任务${current.brandNo ? '编辑' : '添加'}`}
                  width={640}
                  className={styles.standardListForm}
                  bodyStyle={this.state.done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
                  destroyOnClose
                  visible={this.state.visible}
                  {...modalFooter}
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
                      戒围标准
                    </Radio.Button>
                    <Radio.Button
                      value="number"
                      className={styles.right_radio_tab}
                      onClick={this.switchTabNumber}
                    >
                      戒围号
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
    let rowData = this.state.rowData;
    const selects = standardSelectedRowKeys ? standardSelectedRowKeys : [];
    const id = record.id;

    if (selects.includes(id)) {
      selects.splice(selects.findIndex(index => index === id), 1);
      if (rowData.includes(record)) rowData = [];

      if (standardRowData.includes(record)) {
        standardRowData.splice(standardRowData.findIndex(item => item.id === id), 1);
      }
    } else {
      if (rowData.length > 0) {
        selects.splice(selects.findIndex(index => index === rowData[0].id), 1);
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
    let rowNumberData = this.state.rowNumberData;
    const selects = numberSelectedRowKeys ? numberSelectedRowKeys : [];
    const id = record.id;

    if (selects.includes(id)) {
      selects.splice(selects.findIndex(index => index === id), 1);

      if (rowNumberData.includes(record)) rowNumberData = [];

      if (numberRowData.includes(record)) {
        numberRowData.splice(numberRowData.findIndex(item => item.id === id), 1);
      }
    } else {
      // console.log("record is ",rowData)
      if (numberRowData.length > 0) {
        selects.splice(selects.findIndex(index => index === numberRowData[0].id), 1);
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
    const { isEdit } = this.state;
    return (
      <div className={styles.view_dwon}>
        <div className={clientStyle.list_info}>
          {/*{this.getRingStandrad()}*/}
          <Card bordered={false} className={styles.rignum_right_card_view}>
            <div>
              <span
                title="戒围标准"
                style={{
                  marginBottom: 32,
                  paddingLeft: 10,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#35B0F4',
                }}
              >
                戒围标准信息
              </span>
              <Divider />
              {this.state.showItem ? this.getRenderitem(this.state.showItem) : ''}
            </div>
          </Card>
        </div>

        <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              className={styles.buttomControl}
              type="primary"
              icon="plus"
              size={'small'}
              onClick={this.clickNewFrom}
            >
              新增
            </Button>
            <Button
              className={styles.buttomControl}
              type="danger"
              icon="delete"
              size={'small'}
              onClick={this.clickDeleteFrom}
              disabled={isEdit}
            >
              删除
            </Button>
            <Button
              className={styles.buttomControl}
              type="primary"
              size={'small'}
              onClick={this.clickEditFrom}
              disabled={isEdit}
              icon="edit"
            >
              编辑
            </Button>
            <Button
              className={styles.buttomControl}
              size={'small'}
              type="primary"
              icon="lock"
              onClick={this.clickFreezeFrom}
              disabled={isEdit}
            >
              审批
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  getRingNumber = () => {
    const { isEditNumber, isEdit } = this.state;
    return (
      <div className={styles.view_dwon}>
        <div className={clientStyle.list_info}>
          {/*{this.getRingStandrad()}*/}
          <Card className={styles.rignum_right_card_view} bordered={false}>
            <div>
              <span
                title="戒围号"
                style={{
                  marginBottom: 32,
                  paddingLeft: 10,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#35B0F4',
                }}
              >
                戒围号信息
              </span>
              <Divider />
              {this.state.showNumberItem ? this.getRenderSonitem(this.state.showNumberItem) : ''}
            </div>
          </Card>
        </div>

        <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              className={styles.buttomControl}
              type="primary"
              icon="plus"
              size={'small'}
              onClick={this.clickNewSonFrom}
              disabled={isEdit}
            >
              新增
            </Button>
            <Button
              className={styles.buttomControl}
              type="danger"
              icon="delete"
              size={'small'}
              onClick={this.clickNumberDeleteFrom}
              disabled={isEditNumber}
            >
              删除
            </Button>
            <Button
              className={styles.buttomControl}
              type="primary"
              size={'small'}
              onClick={this.clickNumberEditFrom}
              disabled={isEditNumber}
              icon="edit"
            >
              编辑
            </Button>
            <Button
              className={styles.buttomControl}
              size={'small'}
              type="primary"
              icon="lock"
              onClick={this.clickNumberFreezeFrom}
              disabled={isEditNumber}
            >
              审批
            </Button>
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
      type: 'ringnum/deleteSonRingNumber',
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
    });
  };

  clickNumberFreezeFrom = () => {
    const { numberSelectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'ringnum/freezeSonRingNum',
      payload: { list: numberSelectedRowKeys },
    });
  };

  selectChange = (record, index) => {};

  loadNumList = record => {
    const params = {
      ring_around_st_id: { ...record }.id,
    };

    const { dispatch } = this.props;
    dispatch({
      type: 'ringnum/fetchListSonRingNum',
      payload: {
        ...params,
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
        numberSelectedRowKeys: numberSelectedRowKeys,
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
      <span style={{ marginLeft: 10, marginTop: 10 }}>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="戒围号">{item.sizeCode}</Description>
        </DescriptionList>
        {/* <Divider/>*/}
      </span>
    );
  };

  getRenderitem = item => {
    return (
      <span style={{ marginLeft: 10, marginTop: 10 }} onClick={this.selectRowItem}>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="中文名称">{item.zhName}</Description>
          <Description term="英文名称">{item.enName}</Description>
          <Description term="备注">{item.marks}</Description>
          <Description term="状态">{item.status}</Description>
        </DescriptionList>
        {/* <Divider/>*/}
      </span>
    );
  };
}

export default RingNum;
