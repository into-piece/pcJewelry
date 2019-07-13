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
const FormItem = Form.Item;
const clientContentColumns = [
  {
    title: '中文名',
    dataIndex: 'deliveryZhName',
    key: 'deliveryZhName',
  },
  {
    title: '英文名',
    dataIndex: 'deliveryEnName',
    key: 'deliveryEnName',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
];

const paginationProps = {
  // showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 10,
};
const { Description } = DescriptionList;

@connect(({ loading, sendway }) => {
  const { rtnCode, rtnMsg } = sendway;
  return {
    listLoading: loading.effects['sendway/fetchListSendWay'],
    addloading: loading.effects['sendway/addSendWay'],
    deleteloading: loading.effects['sendway/deleteSendWay'],
    upateloading: loading.effects['sendway/updateSendWay'],
    freezing: loading.effects['sendway/freezeSendWay'],
    body: sendway.body,
    rtnCode,
    rtnMsg,
  };
})
@Form.create()
class Requested extends PureComponent {
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
      selectedRowKeys: [],
      showItem: false,
      isEdit: true,
      update: false,
      isUpdateFrom: false,
      isAdd: true,
      requestState: 'success',
      requestMes: '保存成功！',
      isLoading: false,
      selectIndexAt: -1,
      rowSelectedData: [],
      rowData: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'sendway/fetchListSendWay',
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form, rtnCode = {} } = this.props;

    const { showItem, isAdd } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      if (isAdd) {
        // console.log('data = '+Object.keys({ ...fieldsValue}))

        dispatch({
          type: 'sendway/addSendWay',
          payload: {
            ...fieldsValue,
          },
        });

        this.setState({
          selectedRowKeys: '',
          rowData: [],
          selectIndexAt: -1,
          showItem: false,
          isEdit: true,
        });
      } else {
        const temp = { ...fieldsValue };
        const data = { ...showItem };
        data.deliveryZhName = temp.deliveryZhName;
        data.deliveryEnName = temp.deliveryEnName;
        this.state.current = { ...data };
        if (data.status === '审批') data.status = 2;
        else if (data.status === '使用中') data.status = 1;
        else if (data.status === '草稿') data.status = 0;

        // console.log('update ' + Object.keys(current));
        dispatch({
          type: 'sendway/updateSendWay',
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
    dispatch({
      type: 'sendway/fetchListSendWay',
    });

    this.setState({
      visible: false,
      done: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { selectedRowKeys = [], current = {}, isEdit, update } = this.state;

    const {
      listLoading,
      body = {},
      dispatch,
      addloading,
      deleteloading,
      upateloading,
      freezing,
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
        // console.log('rntCode=' + body.rtnCode);
        if (body.rtnCode === '000000') {
          this.state.requestState = 'success';
        } else {
          this.state.requestState = 'error';
        }

        this.state.requestMes = body.rtnMsg;
        this.state.update = false;
        this.state.done = true;
        if (this.state.isUpdateFrom) {
          this.state.isUpdateFrom = false;
          this.state.showItem = { ...current };
        }
      }
    }

    if (listLoading && body && body.data && body.data.length > 0) {
      const newdata = body.data.map(value => {
        const s = value.status;
        if (s == 0) {
          value.status = '草稿';
        } else if (s == 1) {
          value.status = '使用中';
        } else if (s == 2) {
          value.status = '审批';
        }
        return value;
      });

      this.state.data = newdata;
    }

    if (this.state.done) {
      if (this.state.requestState == 'success') {
        message.success(this.state.requestMes);
      } else {
        message.error(this.state.requestMes);
      }
      this.handleDone();
    }

    // console.log('rntCode=' + body.rtnCode+",data = "+(body.data));

    const rowSelection = {
      selectedRowKeys,
      type: 'checkbox',
      onChange: this.onSelectChange,
      onSelect: this.selectChange,
    };

    const getModalContent = () => {
      return (
        <Form size={'small'} onSubmit={this.handleSubmit}>
          <FormItem label="中文名" {...this.formLayout}>
            {getFieldDecorator('deliveryZhName', {
              rules: [{ required: true, message: '请输入中文名称' }],
              initialValue: current.deliveryZhName,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="英文名" {...this.formLayout}>
            {getFieldDecorator('deliveryEnName', {
              rules: [{ message: '请输入英文名称' }],
              initialValue: current.deliveryEnName,
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      );
    };

    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

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
                  component={SvgUtil.delivery}
                />
                <FormattedMessage id="app.basic.menuMap.way" defaultMessage="配送方式" />
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
                        this.clickRowItem(record);
                      },
                    };
                  }}
                  rowClassName={this.onSelectRowClass}
                  size="middle"
                  columns={clientContentColumns}
                />
                <Modal
                  title={this.state.done ? null : `任务${current.brandNo ? '编辑' : '添加'}`}
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
              <Card bordered={false}>
                <div>
                  <span
                    title="配送方式"
                    style={{
                      marginBottom: 32,
                      paddingLeft: 10,
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#35B0F4',
                    }}
                  >
                    配送方式信息
                  </span>
                  <Divider />
                  {this.state.showItem ? this.getRenderitem(this.state.showItem) : ''}
                </div>
              </Card>

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
          </Col>
        </Row>
      </GridContent>
    );
  }

  onSelectRowClass = (record, index) => {
    let color = '';
    if (index % 2 == 0) {
      color = styles.row_normal;
    }
    return color;
  };

  clickNewFrom = () => {
    this.state.isAdd = true;
    this.setState({ visible: true, current: {} });
  };

  clickDeleteFrom = () => {
    // const SendWayNo = this.state.showItem;
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'sendway/deleteSendWay',
      payload: { list: selectedRowKeys },
    });

    this.setState({
      selectedRowKeys: '',
      rowData: [],
      selectIndexAt: -1,
      showItem: false,
      isEdit: true,
    });
  };

  clickEditFrom = () => {
    this.state.isAdd = false;
    this.setState({
      current: this.state.showItem,
      visible: true,
    });
  };

  clickFreezeFrom = () => {
    const { selectedRowKeys } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'sendway/freezeSendWay',
      payload: { list: selectedRowKeys },
    });
  };

  clickRowItem = record => {
    const { selectedRowKeys, rowSelectedData } = this.state;
    let rowData = this.state.rowData;
    const selects = selectedRowKeys ? selectedRowKeys : [];
    const id = record.id;

    if (selects.includes(id)) {
      selects.splice(selects.findIndex(index => index === id), 1);
      if (rowData.includes(record)) rowData = [];
      if (rowSelectedData.includes(record)) {
        // console.log('includes ' + record.id);
        rowSelectedData.splice(rowSelectedData.findIndex(item => item.id === id), 1);
      }
    } else {
      if (rowData.length > 0) {
        selects.splice(selects.findIndex(index => index === rowData[0].id), 1);
      }
      rowData = [];
      rowData.push({ ...record });
      selects.push(id);
      rowSelectedData.push(record);
    }

    if (selects.length > 0) {
      const recordK = selects[selects.length - 1];
      // const r = rowData.filter(value => value.id == recordK);
      const r = rowSelectedData.filter(value => value.id == recordK);

      this.showSelectItem(r[0]);
    } else {
      this.setState({
        showItem: false,
        isEdit: true,
        current: false,
      });
    }
    this.setState({
      selectedRowKeys: [].concat(selects),
      rowData,
    });
  };

  selectChange = (record, index) => {};

  onSelectChange = (selectedRowKeys, selectedRows) => {
    if (selectedRowKeys.length > 0) {
      const recordK = selectedRowKeys[selectedRowKeys.length - 1];
      const record = selectedRows.filter(value => value.id == recordK);
      this.showSelectItem(record[0]);
    } else {
      this.setState({
        showItem: false,
        isEdit: true,
        current: false,
      });
    }
    this.setState({
      selectedRowKeys,
      rowSelectedData: selectedRows,
    });
    // if (selectedRowKeys.length > 0) {
    //   const recordK = selectedRowKeys[selectedRowKeys.length - 1];
    //   const record = selectedRows.filter(value => value.id == recordK);
    //   // this.showSelectItem(selectedRows[selectedRows.length-1])
    //
    //   this.showSelectItem(record[0]);
    // } else {
    //   this.setState({
    //     showItem: false,
    //     isEdit: true,
    //     current: false,
    //   });
    // }
    //
    //
    // this.setState({
    //   selectedRowKeys,
    //   rowData:selectedRows
    // });
  };

  showSelectItem = record => {
    let edit = false;
    if (record === '') {
      edit = true;
    }

    this.setState({
      showItem: { ...record },
      isEdit: edit,
      current: record,
      // selectIndexAt: index,
    });
  };

  selectRowItem = () => {};

  getRenderitem = item => {
    return (
      <span style={{ marginLeft: 10, marginTop: 10 }} onClick={this.selectRowItem}>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="中文名">{item.deliveryZhName}</Description>
          <Description term="英文名">{item.deliveryEnName}</Description>
          <Description term="状态">{item.status}</Description>
        </DescriptionList>
        {/* <Divider/>*/}
      </span>
    );
  };
}

export default Requested;
