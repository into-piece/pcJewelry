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
  message,
} from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './Royalty.less';
import GridContent from '../../../components/PageHeaderWrapper/GridContent';
import { royalty } from '@/utils/SvgUtil';
import { connect } from 'dva';
import DescriptionList from '@/components/DescriptionList';
import ModalConfirm from '@/utils/modal';
import { statusConvert } from '@/utils/convert';
import BuildTitle from '@/components/BuildTitle';

const FormItem = Form.Item;

const clientContentColumns = [
  {
    title: '提成中文名',
    dataIndex: 'paymentZhName',
    key: 'paymentZhName',
  },
  {
    title: '提成英文名',
    dataIndex: 'paymentEnName',
    key: 'paymentEnName',
  },
  {
    title: '利润比例从(%)',
    dataIndex: 'profitShareFrom',
    key: 'profitShareFrom',
  },
  {
    title: '利润比例到(%)',
    dataIndex: 'profitShareTo',
    key: 'profitShareTo',
  },
  {
    title: '提成比率(%)',
    dataIndex: 'royaltyRate',
    key: 'royaltyRate',
  },
  {
    title: '状态  ',
    dataIndex: 'status',
    key: 'status',
  },
];

const { Description } = DescriptionList;

@connect(({ loading, royalty }) => {
  const { rtnCode, rtnMsg } = royalty;
  return {
    listLoading: loading.effects['royalty/fetchListRoyalty'],
    addloading: loading.effects['royalty/addRoyalty'],
    deleteloading: loading.effects['royalty/deleteRoyalty'],
    upateloading: loading.effects['royalty/updateRoyalty'],
    freezing: loading.effects['royalty/freezeRoyalty'],
    unfreezing: loading.effects['royalty/unfreezeRoyalty'],
    body: royalty.body,
    rtnCode,
    rtnMsg,
  };
})
@Form.create()
class Royalty extends PureComponent {
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
      type: 'royalty/fetchListRoyalty',
      payload: { current: 1, size: 10 },

    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form, rtnCode = {} } = this.props;

    const { showItem, isAdd } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      if (isAdd) {
        // console.log('data = ' + Object.keys({ ...fieldsValue }));

        dispatch({
          type: 'royalty/addRoyalty',
          payload: {
            ...fieldsValue,
          },
          // callback: () => {
          //   this.setState({
          //     visible: false,
          //   });
          // },
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
        data.paymentEnName = temp.paymentEnName;
        data.paymentZhName = temp.paymentZhName;
        data.profitShareFrom = temp.profitShareFrom;
        data.profitShareTo = temp.profitShareTo;
        data.royaltyRate = temp.royaltyRate;
        this.state.current = { ...data };
        if (data.status === '审批') data.status = 2;
        else if (data.status === '使用中') data.status = 1;
        else if (data.status === '输入') data.status = 0;

        // console.log('update ' + Object.keys(current));
        dispatch({
          type: 'royalty/updateRoyalty',
          payload: {
            ...data,
          },
          // callback: () => {
          //   this.setState({
          //     visible: false,
          //   });
          // },
        });
      }
      // this.setState({
      //   visible: false,
      // });
    });
  };

  handleDone = () => {
    const { dispatch, body } = this.props;
    dispatch({
      type: 'royalty/fetchListRoyalty',
      payload: { current: body.current, size: body.size },

    });

    this.setState({
      done: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { selectedRowKeys = [], current = {}, isEdit, update, showItem } = this.state;

    const {
      listLoading,
      body = {},
      dispatch,
      addloading,
      deleteloading,
      upateloading,
      freezing,
      unfreezing,
      form: { getFieldDecorator },
    } = this.props;

    this.state.isLoading = addloading || deleteloading || upateloading || freezing || listLoading || unfreezing;
    if (addloading || deleteloading || upateloading || freezing || unfreezing) {
      this.state.update = true;
      if (upateloading) {
        this.state.isUpdateFrom = true;
      }
    } else if (update) {
      // console.log('rntCode=' + body.rtnCode);
      if (body.rtnCode === '000000') {
        this.state.requestState = 'success';
      } else {
        this.state.requestState = 'error';
      }

      this.state.requestMes = body.rtnMsg;
      // console.log('result = ' + this.state.requestMes);
      this.state.update = false;
      this.state.done = true;
      if (this.state.isUpdateFrom) {
        this.state.isUpdateFrom = false;
        // this.state.showItem = { ...current };
      }
    }

    if (listLoading) {
      this.state.isLoadList = true;
    } else if (this.state.isLoadList) {
      if (body && body.data && body.data.length > 0) {
        const newdata = body.data.map(value => {
          const s = value.status;
          value.status = statusConvert[s];
          return value;
        });

        this.state.data = newdata;
      }
      this.updateSelectDatas();
      this.state.isLoadList = false;
    }

    if (this.state.done) {
      if (this.state.requestState == 'success') {
        message.success(this.state.requestMes);
      } else {
        message.error(this.state.requestMes);
      }
      this.handleDone();
    }

    const rowSelection = {
      selectedRowKeys,
      type: 'checkbox',
      onChange: this.onSelectChange,
      onSelect: this.selectChange,
    };

    const getModalContent = () => {
      return (
        <Form size="small" onSubmit={this.handleSubmit}>
          <FormItem label="业务提成中文名" {...this.formLayout}>
            {getFieldDecorator('paymentZhName', {
              rules: [{ required: true, message: '请输入中文名称' }],
              initialValue: current.paymentZhName,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="业务提成英文名称" {...this.formLayout}>
            {getFieldDecorator('paymentEnName', {
              rules: [{ message: '请输入品牌编号' }],
              initialValue: current.paymentEnName,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="利润比例从(%)" type="integer" {...this.formLayout}>
            {getFieldDecorator('profitShareFrom', {
              rules: [{ required: true, message: '请输入利润比例从' }],
              initialValue: current.profitShareFrom,
            })(<Input placeholder="请输入" type="number" />)}
          </FormItem>
          <FormItem label="利润比例到(%)" {...this.formLayout}>
            {getFieldDecorator('profitShareTo', {
              rules: [{ required: true, message: '利润比例到' }],
              initialValue: current.profitShareTo,
            })(<Input placeholder="请输入" type="number" />)}
          </FormItem>
          <FormItem label="提成比率(%)" {...this.formLayout}>
            {getFieldDecorator('royaltyRate', {
              rules: [{ required: true, message: '请输入提成比率' }],
              initialValue: current.royaltyRate,
            })(<Input placeholder="请输入" type="number" />)}
          </FormItem>
        </Form>
      );
    };

    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };


    const onChange = (pagination, filters, sorter) => {
      const { current: currentIndex, pageSize } = pagination;
      dispatch({
        type: 'royalty/fetchListRoyalty',
        payload: { current: currentIndex, size: pageSize },
      });

    };

    const paginationProps = {
      showQuickJumper: true,
      pageSize: 10,
      total: body.total,
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
                  component={royalty}
                />
                <FormattedMessage id="app.basic.menuMap.royalty" defaultMessage="业务提成设当" />
              </div>
              <Card bordered={false} loading={false}>
                <Table
                  loading={this.state.isLoading}
                  pagination={paginationProps}
                  dataSource={this.state.data}
                  rowSelection={rowSelection}
                  rowKey={record => record.id}
                  bordered={false}
                  onChange={onChange}
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
                  maskClosable={false}
                  title={<BuildTitle title={this.state.done ? null : `任务${current.id ? '编辑' : '添加'}`}/>}
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
                    title="业务提成设定"
                    style={{
                      marginBottom: 32,
                      paddingLeft: 10,
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#35B0F4',
                    }}
                  >
                    业务提成设定
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
                        content: '确定删除吗？', onOk: () => {
                          this.clickDeleteFrom();
                        },
                      });
                    }}
                    disabled={isEdit || (this.state.showItem && this.state.showItem.status === '审批')}
                  >
                    删除
                  </Button>
                  <Button
                    className={styles.buttomControl}
                    type="primary"
                    size="small"
                    onClick={this.clickEditFrom}
                    disabled={isEdit || (this.state.showItem && this.state.showItem.status === '审批')}
                    icon="edit"
                  >
                    编辑
                  </Button>
                  {this.state.showItem.status === '审批' ? (<Button
                    className={styles.buttomControl}
                    size="small"
                    type="danger"
                    icon="unlock"
                    onClick={() => {
                      ModalConfirm({
                        content: '确定取消审批吗？', onOk: () => {
                          this.clickUnFreezeFrom();
                        },
                      });
                    }}
                    disabled={isEdit}
                  >
                    取消审批
                  </Button>) : (<Button
                                                            className={styles.buttomControl}
                                                            size="small"
                                                            type="primary"
                                                            icon="lock"
                                                            onClick={() => {
                      ModalConfirm({
                        content: '确定审批吗？', onOk: () => {
                          this.clickFreezeFrom();
                        },
                      });
                    }}
                                                            disabled={isEdit}
                                                          >
                    审批
                                                                        </Button>)}
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

    return index == this.state.selectIndexAt ? styles.row_select : color;
    // return index == this.state.selectIndexAt ? styles.row_select :"";
  };

  /** *
   *
   *
   * 通过最新列表更新选择的值
   * */
  updateSelectDatas = () => {

    const { rowSelectedData, showItem } = this.state;
    // console.log(" updateSelectDatas ..",rowSelectedData,showItem,this.state.data)
    if (rowSelectedData && rowSelectedData.length > 0) {
      const newRowSelected = this.state.data.filter(v => {
        const rs = rowSelectedData.filter(v1 => {
          if (v1.id === v.id)
            return v;
        });
        if (rs.length > 0) return rs[0];
      });
      // console.log(" updateSelectDatas  rowSelecteData ",newRowSelected)
      if (newRowSelected && newRowSelected.length > 0) {
        this.state.rowSelectedData = newRowSelected;
      }
    }

    if (showItem && this.state.rowSelectedData) {
      const newShowItem = this.state.rowSelectedData.filter(v => {
        if (showItem.id === v.id)
          return v;
      });
      // console.log(" updateSelectDatas  rowSelecteData ",newShowItem)
      if (newShowItem && newShowItem[0]) {
        this.state.showItem = newShowItem[0];
        this.setState({
          showItem: newShowItem[0],
        });
      }
    }
  };

  clickNewFrom = () => {
    this.state.isAdd = true;
    this.setState({ visible: true, current: {} });
  };

  clickRowItem = record => {
    const { selectedRowKeys, rowSelectedData } = this.state;
    let { rowData } = this.state;
    const selects = selectedRowKeys || [];
    const { id } = record;

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

  selectChange = (record, index) => {
  };

  clickDeleteFrom = () => {
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;

    dispatch({
      type: 'royalty/deleteRoyalty',
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
      type: 'royalty/freezeRoyalty',
      payload: { list: selectedRowKeys },
    });
  };

  clickUnFreezeFrom = () => {
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'royalty/unfreezeRoyalty',
      payload: { list: selectedRowKeys },
    });
  };

  selectChange = (record, index) => {
  };

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

  selectRowItem = () => {
    // console.log('select the item');
  };

  getRenderitem = item => {
    return (
      <span style={{ marginLeft: 10, marginTop: 10 }} onClick={this.selectRowItem}>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="提成中文名">{item.paymentZhName}</Description>
          <Description term="提成英文名">{item.paymentEnName}</Description>
          <Description term="利润比例从(%)">{item.profitShareFrom}</Description>
          <Description term="利润比例到(%)">{item.profitShareTo}</Description>
          <Description term="提成比率(%)">{item.royaltyRate}</Description>
          <Description term="状态">{item.status}</Description>
        </DescriptionList>
        {/* <Divider/> */}
      </span>
    );
  };
}

export default Royalty;
