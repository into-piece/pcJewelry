import React, { Component } from 'react';
import { Table } from 'antd';
import clientStyle from '../Client.less';


class JewelryTable extends Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      pageCurrent: 1,
      rowSelectedData:[],
      rowData:[],

    };
  }


  render() {

    const { body={}, isLoading,onSelectItem } = this.props;

    const { pageCurrent, selectedRowKeys } = this.state;

    const paginationProps = {
      showQuickJumper: true,
      pageSize: body ? body.size : 0,
      current: pageCurrent,
      total: body ? body.total : 0,
      onChange: this.pageChange,
    };

    const rowSelection = {
      selectedRowKeys,
      type: 'checkbox',
      onChange: this.onSelectChange,
      onSelect: this.selectChange,
    };

    // console.log("contactsTableBody" , body)
    return (
      <Table
        {...this.props}
        size="middle"
        loading={isLoading}
        dataSource={body.records}
        rowSelection={rowSelection}
        pagination={paginationProps}
        rowClassName={this.onSelectRowClass}
        rowKey={record =>
          record.id
        }
        onRow={record => {
          return {
            onClick: event => {
              this.clickRowItem(record);
            },
          };
        }}
      />
    );
  }

  clickRowItem = (record) => {

    const { onSelectItem } = this.props;
    const { selectedRowKeys, rowSelectedData } = this.state;
    let rowData = this.state.rowData;
    const selects = selectedRowKeys ? selectedRowKeys : [];
    const id = record.id;

    let selectItem ='';
    if (selects.includes(id)) {
      selects.splice(selects.findIndex(index => index === id), 1);
      if (rowData.includes(record))
        rowData = [];
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
      const r = rowSelectedData.filter(value => value.id == recordK);

      // this.showSelectItem(r[0]);
      selectItem = r[0]
    } else {
      this.setState({
        showItem: false,
        // isEdit: true,
        // current: false,
        // fristLoad: true,
      });
      this.state.showItem = false;
      selectItem=false

    }

    this.state.selectCustomerItem = '';
    this.setState({
      selectedRowKeys: [].concat(selects),
      rowData,
      // customerSelectedRowKeys: [],
      // selectCustomerItem: '',
      // rowCustomerData: [],
      // customerPageCurrent: 1,
      // rowCustomerSelectedData: [],
    });
    if(onSelectItem)
        onSelectItem(selectItem)

    // this.clearClient();
    // this.startShowTab();
  };



  selectChange = (record, index) => {
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {

    const { onSelectItem } = this.props;
    let jewItem = false;
    if (selectedRowKeys.length > 0) {
      const recordK = selectedRowKeys[selectedRowKeys.length - 1];
      const record = selectedRows.filter(value => value.id == recordK);
      // this.showSelectItem(record[0]);
      jewItem = record[0]
    } else {


      this.setState({
        showItem: false,
        // isEdit: true,
        // current: false,
        // fristLoad: true,
      });
      this.state.showItem = false;
      jewItem = false;
    }


    this.setState({
      selectedRowKeys,
      rowSelectedData: selectedRows,
      selectCustomerItem: '',
    });
    this.state.selectCustomerItem = '';

    if(onSelectItem)
      onSelectItem(jewItem)

  };

  onSelectRowClass = (record, index) => {
    let color = '';
    if (index % 2 == 0) {
      color = clientStyle.row_normal;
    }
    return color;
  };

}

export default JewelryTable;
