import React, { Component } from 'react';
import { Divider, Modal, Row, Table, message } from 'antd';
import clientStyle from '../../Client.less';
import styles from '../../../../Account/Center/Center.less';
import HttpFetch from '@/utils/HttpFetch';
import { getCurrentUser } from '@/utils/authority';


const ringsColumn = [
  {
    title: '圈戒编号',
    field: 'sizeCode',
    dataIndex: 'sizeCode',
    key: 'sizeCode',
  },
];

class RingsModalForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataBody: {},
      data: [],
      selectedRowKeys: [],
      selectedRows: [],
    };
  }

  componentDidMount() {
    const params = {
      current: 1,
      size: 5,
    };
    this.getList(params);
  }

  getList = (params) => {
    const _this = this;
    _this.setState({ listLoading: true });
    fetch(HttpFetch.listRingAround, {
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      body: JSON.stringify(params),
    }).then(response => response.json())
      .then(rep => {
        const { body } = rep;
        if (body && body.records) {
          if (body.records.length > 0) {
            _this.setState({
              dataBody: body,
              data: body.records,
              listLoading: false,
            });
          }
        }
      }).catch(() => {
      message.error('加载失败！');
    });
  };

  onRow = record => ({
    onClick: () => {
      this.clickRowItem(record);
    }, // 点击行
  });

  /**
   * 点击单行
   */
  clickRowItem = record => {
    let { selectedRowKeys, selectedRows } = this.state;
    console.log(selectedRowKeys, selectedRows);
    if (selectedRowKeys.some(e => e === record.id)) {
      selectedRowKeys = selectedRowKeys.filter(item => item !== record.id);
    } else {
      selectedRowKeys.push(record.id);
    }

    this.onSelectChange(selectedRowKeys, selectedRows);
  };


  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  getContactsContent = () => {
    const { dataBody, selectedRowKeys, listLoading, data } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const paginationProps = {
      showQuickJumper: true,
      pageSize: 5,
      total: dataBody ? dataBody.total : 0,
    };

    return (
      <div>
        <span className={clientStyle.sun_title_info}>圈戒资料</span>
        <Divider className={clientStyle.divder} />

        <Row>
          <Table
            onChange={this.onChange.bind(this)}
            columns={ringsColumn}
            dataSource={data}
            rowSelection={rowSelection}
            loading={listLoading}
            pagination={paginationProps}
            onRow={this.onRow}
            rowKey="id"
          />
        </Row>
      </div>
    );
  };


  handleContactsSubmit = () => {
    const { Submit } = this.props;
    const { selectedRowKeys } = this.state;
    if (Submit)
      Submit(selectedRowKeys);
  };

  handleCancel = () => {
    const { handleCancel } = this.props;

    if (handleCancel) handleCancel();
    return Promise.resolve();
  };


  /**
   * 翻页 或 排序触发回调
   * handleTableChange 为列表请求函数
   * 直接传参数触发更新
   */
  onChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    const { order, field } = sorter;
    const orderKey = order === 'ascend' ? 'Asc' : order === 'descend' ? 'Desc' : '';

    this.setState({
      current, pageSize,
    }, () => {
      this.getList({ current, size: pageSize });
    });
  };

  render() {
    const contactsModalFooter = {
      okText: '保存',
      onOk: this.handleContactsSubmit,
      onCancel: this.handleCancel,
    };

    return (
      <Modal
        maskClosable={false}
        {...this.props}
        width={720}
        className={styles.standardListForm}
        destroyOnClose

        {...contactsModalFooter}
      >
        {this.getContactsContent()}
      </Modal>
    );
  }


}

export default RingsModalForm;
