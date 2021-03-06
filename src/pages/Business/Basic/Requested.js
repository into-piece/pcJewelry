import React, { PureComponent } from 'react';

import { Table, Card, Row, Col, Icon, Form, Modal, Input, Button, Divider, message } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { formatMessage } from 'umi/locale';

import { connect } from 'dva';
import styles from './Requested.less';
import GridContent from '../../../components/PageHeaderWrapper/GridContent';
import { requested as Requested } from '@/utils/SvgUtil';
import DescriptionList from '@/components/DescriptionList';
import ModalConfirm from '@/utils/modal';
import { statusConvert } from '@/utils/convert';
import BuildTitle from '@/components/BuildTitle';

const FormItem = Form.Item;
const clientContentColumns = [
  {
    title: '品质要求中文名称',
    dataIndex: 'qualityZhName',
    key: 'qualityZhName',
  },
  {
    title: '品质要求英文名称',
    dataIndex: 'qualityEnName',
    key: 'qualityEnName',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
];

const { Description } = DescriptionList;

@connect(({ loading, requested }) => {
  const { rtnCode, rtnMsg } = requested;
  return {
    listLoading: loading.effects['requested/fetchListRequested'],
    addloading: loading.effects['requested/addRequested'],
    deleteloading: loading.effects['requested/deleteRequested'],
    upateloading: loading.effects['requested/updateRequested'],
    unfreezing: loading.effects['requested/unfreezeRequested'],
    freezing: loading.effects['requested/freezeRequested'],
    body: requested.body,
    rtnCode,
    rtnMsg,
  };
})
@Form.create()
class RequestedComponent extends PureComponent {
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
      // multipleData: [],
      rowData: [],
      rowSelectedData: [],
      selectIndexAt: -1,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'requested/fetchListRequested',
      payload: { size: 5, current: 1 },
    });
  }

  handleSubmit = close => {
    const { dispatch, form, rtnCode = {} } = this.props;

    const { showItem, isAdd } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      if (isAdd) {
        // console.log('data = ' + Object.keys({ ...fieldsValue }));

        dispatch({
          type: 'requested/addRequested',
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
          selectedRowKeys: '',
          rowData: [],
          selectIndexAt: -1,
          showItem: false,
          isEdit: true,
        });
      } else {
        const temp = { ...fieldsValue };
        const data = { ...showItem };
        data.qualityZhName = temp.qualityZhName;
        data.qualityEnName = temp.qualityEnName;
        this.state.current = { ...data };
        if (data.status === '审批') data.status = 2;
        else if (data.status === '使用中') data.status = 1;
        else if (data.status === '输入') data.status = 0;

        // console.log('update ' + Object.keys(current));
        dispatch({
          type: 'requested/updateRequested',
          payload: {
            ...data,
          },
          callback: () => {
            this.setState({
              visible: !close,
            });
          },
        });
      }
    });
  };

  handleDone = () => {
    const { dispatch, body } = this.props;
    dispatch({
      type: 'requested/fetchListRequested',
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

  returnTotal = total => (
    <p>
      <FormattedMessage id="app.table.total" defaultMessage="" />
      {total}
      <FormattedMessage id="app.table.totalEnd" defaultMessage="" />
    </p>
  );

  onSelectRowClass = (record, index) => {
    let color = '';
    if (index % 2 == 0) {
      color = styles.row_normal;
    }

    // return index == this.state.selectIndexAt ? styles.row_select : color;
    return color;
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
          if (v1.id === v.id) return v;
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
        if (showItem.id === v.id) return v;
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

  clickDeleteFrom = () => {
    // const requestedNo = this.state.showItem;
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    // const data =  Array.from(multipleData)
    const data = [];
    data.push(selectedRowKeys);

    dispatch({
      type: 'requested/deleteRequested',
      payload:
        // ...requestedNo,
        { list: selectedRowKeys },
    });

    this.setState({
      selectedRowKeys: '',
      selectIndexAt: -1,
      rowData: [],
      showItem: false,
      isEdit: true,
    });
  };

  errorHandler = () => {
    message.warn('报错！');
  };

  clickEditFrom = () => {
    this.state.isAdd = false;
    this.setState({
      current: this.state.showItem,
      visible: true,
    });
  };

  clickRowItem = record => {
    const { selectedRowKeys, rowSelectedData } = this.state;
    let { rowData } = this.state;
    const selects = selectedRowKeys || [];
    const { id } = record;

    if (selects.includes(id)) {
      selects.splice(
        selects.findIndex(index => index === id),
        1
      );
      if (rowData.includes(record)) rowData = [];
      if (rowSelectedData.includes(record)) {
        // console.log('includes ' + record.id);
        rowSelectedData.splice(
          rowSelectedData.findIndex(item => item.id === id),
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

  clickFreezeFrom = () => {
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'requested/freezeRequested',
      payload: { list: selectedRowKeys },
    });
  };

  clickUnFreezeFrom = () => {
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'requested/unfreezeRequested',
      payload: { list: selectedRowKeys },
    });
  };

  selectChange = (record, index) => {
    // console.log('changle record  ' + Object.keys(record));
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
      // rowData:selectedRows
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
      <Card bordered={false} style={{ overflow: 'auto' }} onClick={this.selectRowItem}>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="品质要求中文名">{item.qualityZhName}</Description>
          <Description term="品质要求英文名">{item.qualityEnName}</Description>
          <Description term="状态">{item.status}</Description>
        </DescriptionList>
        {/* <Divider/> */}
      </Card>
    );
  };

  render() {
    const { selectedRowKeys = [], current = {}, isEdit, update, isAdd, showItem } = this.state;

    const {
      listLoading,
      body = {},
      dispatch,
      addloading,
      deleteloading,
      upateloading,
      unfreezing,
      freezing,
      form: { getFieldDecorator },
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
      } else {
        this.state.requestState = 'error';
      }

      this.state.requestMes = body.rtnMsg;
      this.state.update = false;
      this.state.done = true;
      // this.state.visible = true;
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

    const rowSelection = {
      selectedRowKeys,
      type: 'checkbox',
      onChange: this.onSelectChange,
      onSelect: this.selectChange,
    };

    if (this.state.done) {
      if (this.state.requestState == 'success') {
        message.success(this.state.requestMes);
      } else {
        message.error(this.state.requestMes);
      }
      this.handleDone();
    }

    const getModalContent = () => {
      return (
        <Form size="small" onSubmit={this.handleSubmit}>
          <FormItem label="品质要求英文名称" {...this.formLayout}>
            {getFieldDecorator('qualityEnName', {
              rules: [{ required: true, message: '请输入英文名称' }],
              initialValue: current.qualityEnName,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="品质要求中文名" {...this.formLayout}>
            {getFieldDecorator('qualityZhName', {
              rules: [{ message: '请输入中文名称' }],
              initialValue: current.qualityZhName,
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      );
    };

    const modalFooter = isAdd
      ? [
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={addloading}
            onClick={() => {
              this.handleSubmit(true);
            }}
          >
            保存
          </Button>,
          <Button
            key="continue"
            type="primary"
            loading={addloading}
            onClick={() => {
              this.handleSubmit(false);
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
            loading={upateloading}
            onClick={() => {
              this.handleSubmit(false);
            }}
          >
            保存
          </Button>,
        ];

    const onChange = (pagination, filters, sorter) => {
      const { current: currentIndex, pageSize } = pagination;
      dispatch({
        type: 'requested/fetchListRequested',
        payload: { current: currentIndex, size: pageSize },
      });
    };

    const paginationProps = {
      // showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
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
                  component={Requested}
                />
                <FormattedMessage id="app.basic.menuMap.requested" defaultMessage="品质要求" />
              </div>
              <Card bordered={false} loading={false}>
                <Table
                  loading={this.state.isLoading}
                  pagination={paginationProps}
                  dataSource={this.state.data}
                  rowSelection={rowSelection}
                  rowKey={record => record.id}
                  onRow={record => {
                    return {
                      onClick: event => {
                        this.clickRowItem(record);
                      },
                    };
                  }}
                  bordered={false}
                  rowClassName={this.onSelectRowClass}
                  size="middle"
                  columns={clientContentColumns}
                  onChange={onChange}
                />
                <Modal
                  maskClosable={false}
                  title={
                    <BuildTitle
                      title={
                        this.state.done
                          ? null
                          : formatMessage({ id: 'app.basic.menuMap.requested' })
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
                    {formatMessage({ id: 'app.basic.menuMap.requested' })}
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
                    disabled={
                      isEdit || (this.state.showItem && this.state.showItem.status === '审批')
                    }
                  >
                    删除
                  </Button>
                  <Button
                    className={styles.buttomControl}
                    type="primary"
                    size="small"
                    onClick={this.clickEditFrom}
                    disabled={
                      isEdit || (this.state.showItem && this.state.showItem.status === '审批')
                    }
                    icon="edit"
                  >
                    编辑
                  </Button>
                  {this.state.showItem.status === '审批' ? (
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
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default RequestedComponent;
