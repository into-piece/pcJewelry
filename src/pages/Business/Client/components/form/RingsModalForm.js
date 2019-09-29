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
    const _this = this;
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
              data:body.records
            });

          }
        }
      }).catch(() => {
      message.error('加载失败！');
    });
  }

  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({ selectedRowKeys ,selectedRows});
  };

  getContactsContent = () => {
    const { dataBody, selectedRowKeys,data } = this.state;
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
            columns={ringsColumn}
            dataSource={data}
            rowSelection={rowSelection}
            pagination={paginationProps}
          />
        </Row>
      </div>
    );
  };


  handleContactsSubmit = () => {
    const { Submit } = this.props;
    const { selectedRows } = this.state;
    if (Submit)
      Submit(selectedRows);
  };

  handleCancel = () => {
    const { handleCancel } = this.props;

    if(handleCancel)handleCancel();
    return Promise.resolve();
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
