import React, { Component } from 'react';
import { Table } from 'antd';
import clientStyle from '../Business/Client/Client.less';

class JewelryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      pageCurrent: 1,
      rowSelectedData: [],
      rowData: [],
    };
  }

  render() {
    const { body = {}, isLoading } = this.props;

    const { pageCurrent, selectedRowKeys } = this.state;

    const paginationProps = {
      showQuickJumper: true,
      pageSize: body ? body.size : 0,
      current: pageCurrent,
      total: body ? body.total : 0,
      onChange: this.pageChange,
    };


    // console.log("jeweler data ",body)


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
        dataSource={body.records}
        rowSelection={rowSelection}
        pagination={paginationProps}
        rowClassName={this.onSelectRowClass}
        rowKey={record => record.id}
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

  clickRowItem = record => {
    const { onSelectItem } = this.props;
    const { selectedRowKeys, rowSelectedData } = this.state;
    let rowData = this.state.rowData;
    const selects = selectedRowKeys ? selectedRowKeys : [];
    const id = record.id;

    let selectItem = record;
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
      const r = rowSelectedData.filter(value => value.id == recordK);

      // this.showSelectItem(r[0]);

    } else {
      this.setState({
        showItem: false,
        // isEdit: true,
        // current: false,
        // fristLoad: true,
      });
      this.state.showItem = false;
      selectItem = false;
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
    if (onSelectItem) onSelectItem(selectItem,rowData);

    // this.clearClient();
    // this.startShowTab();
  };

  selectChange = (record, index) => {};


  /***
   *
   * 通过最新列表更新选择的值
   * */
  updateSelectDatas =(body)=>{

    // console.log(" updateSelectDatas  :",body)

    const { rowSelectedData, showItem } = this.state;
    if (rowSelectedData && rowSelectedData.length > 0) {
      const newRowSelected = body.records.filter(v => {
        const rs = rowSelectedData.filter(v1 => {
          if (v1.id === v.id)
            return v;
        });
        if (rs.length > 0) return rs[0];
      });
      // console.log(" updateSelectDatas  rowSelecteData ",newRowSelected)
      if (newRowSelected && newRowSelected.length > 0) {
        this.state.rowSelectedData = newRowSelected;
        // this.setState({
        //   rowSelectedData: newRowSelected,
        // });
      }
    }

    if (showItem && this.state.rowSelectedData) {
      const newShowItem = this.state.rowSelectedData.filter(v => {
        if (showItem.id === v.id)
          return v;
      });
      // console.log(" updateSelectDatas  showItem ",newShowItem)
      if (newShowItem && newShowItem[0]) {
        this.state.showItem = newShowItem[0];
        // this.setState({
        //   showItem: newShowItem[0],
        // });
      }
    }
  }

  pageChange = (page, pageSize) => {
    const { pageChange } = this.props;
    if (pageChange) pageChange(page, pageSize);
    if (this.props.onSelectItem) this.props.onSelectItem(false,[]);


    this.setState({
      pageCurrent:page,
      selectedRowKeys:[],
      rowSelectedData:[],

    })

  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    const { onSelectItem } = this.props;
    let jewItem = false;
    if (selectedRowKeys.length > 0) {
      const recordK = selectedRowKeys[selectedRowKeys.length - 1];
      const record = selectedRows.filter(value => value.id == recordK);
      // this.showSelectItem(record[0]);
      jewItem = record[0];
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

    if (onSelectItem) onSelectItem(jewItem,selectedRows);
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
