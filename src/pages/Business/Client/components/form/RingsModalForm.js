import React, { Component } from 'react';
import { Divider, Modal, Row, Table, message } from 'antd';
import clientStyle from '../../Client.less';
import styles from '../../../../Account/Center/Center.less';
import HttpFetch from '@/utils/HttpFetch';
import { getCurrentUser } from '@/utils/authority';
import { statusConvert } from '@/utils/convert';


const ringsStandColumn = [
  {
    title: '中文名称',
    field: 'zhName',
    dataIndex: 'zhName',
    key: 'zhName',
  },
  {
    title: '英文名称',
    field: 'enName',
    dataIndex: 'enName',
    key: 'enName',
  },
  {
    title: '备注',
    field: 'remarks',
    dataIndex: 'remarks',
    key: 'remarks',
  },
  {
    title: '状态',
    field: 'status',
    dataIndex: 'status',
    key: 'status',
    render:data=>statusConvert[data]
  }
];
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
      dataBody01: {},
      data01: [],
      selectedRowKeys01: [],
      selectedRows01: [],
      current: 1,
      pageSize: 5,
      current01: 1,
      pageSize01: 3,
    };
  }

  componentDidMount() {
    const params = {
      current: 1,
      size: 3,
    };
    this.getList01(params);
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

  getList01 = (params) => {
    const _this = this;
    _this.setState({ listLoading01: true });
    fetch(HttpFetch.listRingStandAround, {
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
              dataBody: [],
              data: [],
              listLoading: false,
              dataBody01: body,
              data01: body.records,
              listLoading01: false,
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

  onRow01 = record => ({
    onClick: () => {
      this.clickRowItem01(record);
    }, // 点击行
  });

  /**
   * 点击单行
   */
  clickRowItem = record => {
    let { selectedRowKeys, selectedRows } = this.state;
    if (selectedRowKeys.some(e => e === record.id)) {
      selectedRowKeys = selectedRowKeys.filter(item => item !== record.id);
    } else {
      selectedRowKeys.push(record.id);
    }

    this.onSelectChange(selectedRowKeys, selectedRows);
  };

  clickRowItem01 = record => {
    let { selectedRowKeys01, selectedRows01 } = this.state;

    selectedRowKeys01 = selectedRowKeys01.slice(1);

    selectedRowKeys01.push(record.id);
    this.onSelectChange01(selectedRowKeys01, selectedRows01);
  };


  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  onSelectChange01 = (selectedRowKeys01, selectedRows01) => {
    this.setState({ selectedRowKeys01, selectedRows01 }, () => {
      this.getList({ current: 1, size: 5, ringAroundStId: selectedRowKeys01[0] });
    });
  };

  getContactsContent = () => {
    const { dataBody, selectedRowKeys, listLoading, data } = this.state;
    const { dataBody01, selectedRowKeys01, listLoading01, data01 } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const paginationProps = {
      showQuickJumper: true,
      pageSize: 5,
      total: dataBody ? dataBody.total : 0,
    };

    const rowSelection01 = {
      selectedRowKeys: selectedRowKeys01,
      onChange: this.onSelectChange01,
    };
    const paginationProps01 = {
      showQuickJumper: true,
      pageSize: 3,
      total: dataBody01 ? dataBody01.total : 0,
    };

    return (
      <div>
        <span className={clientStyle.sun_title_info}>圈戒资料</span>
        <Divider className={clientStyle.divder} />
        <Row>
          <Table
            onChange={this.onChange01.bind(this)}
            columns={ringsStandColumn}
            dataSource={data01}
            rowSelection={rowSelection01}
            loading={listLoading01}
            pagination={paginationProps01}
            onRow={this.onRow01}
            rowKey="id"
          />
        </Row>
        <Divider className={clientStyle.divder} />
        <Row>
          <Table
            key={selectedRowKeys01 && selectedRowKeys01[0]}
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
    const { selectedRowKeys01 } = this.state;
    if (selectedRowKeys01.length < 1) {
      return;
    }
    const orderKey = order === 'ascend' ? 'Asc' : order === 'descend' ? 'Desc' : '';

    this.setState({
      current, pageSize,
    }, () => {
      this.getList({ current, size: pageSize, ringAroundStId: selectedRowKeys01[0] });
    });
  };

  onChange01 = (pagination, filters, sorter) => {
    const { current: current01, pageSize: pageSize01 } = pagination;
    const { order, field } = sorter;
    const orderKey = order === 'ascend' ? 'Asc' : order === 'descend' ? 'Desc' : '';

    this.setState({
      current01, pageSize01,
    }, () => {
      this.getList01({ current: current01, size: pageSize01 });
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
