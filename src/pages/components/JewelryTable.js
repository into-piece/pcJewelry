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
    const { body = {}, isLoading, scroll = {} } = this.props;

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
        scroll={scroll}
        rowClassName={this.props.rowClassName ? this.props.rowClassName : this.onSelectRowClass}
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
    let { rowData } = this.state;
    const selects = selectedRowKeys || [];
    const { id } = record;

    let selectItem = { ...record };

    if (selects.includes(id)) {
      selects.splice(selects.findIndex(index => index === id), 1);
      if (rowData.flatMap(e=>e.id).includes(record.id)) rowData = [];
      if (rowSelectedData.flatMap(e => e.id).includes(record.id)) {
        // console.log(`includes ${  record.id}`);
        rowSelectedData.splice(rowSelectedData.findIndex(item => item.id === id), 1);
      }
    } else {
      if (rowData.length > 0) {
        selects.splice(selects.findIndex(index => index === rowData[0].id), 1);
      }
      rowData = [];
      rowData.push({ ...record });
      selects.splice(0,selects.length);
      selects.push(id);
      rowSelectedData.splice(0,rowSelectedData.length);
      rowSelectedData.push(record);
    }
    if (selects.length === 0) {
      // const recordK = selects[selects.length - 1];
      // const r = rowSelectedData.filter(value => value.id == recordK);
      // selectItem = r[0];
      // this.showSelectItem(r[0]);

      // } else {
      this.setState({
        showItem: false,
        selectItem: false,
      });
      selectItem = false;
    }

    this.state.selectItem = selectItem;

    this.state.selectCustomerItem = '';
    this.setState({
      selectedRowKeys: [].concat(selects),
      rowData,
      selectItem,
    });
    console.log('2', [...this.state.rowSelectedData]);
    console.log('2', [...rowData]);
    console.log('2', selectItem);
    if (onSelectItem) onSelectItem(selectItem, rowData);

  };

  selectChange = (record, index) => {
  };


  /** *
   *
   * 通过最新列表更新选择的值
   * */
  updateSelectDatas = (body) => {
    const { onSelectItem } = this.props;

    const { rowSelectedData, selectItem } = this.state;

    if (rowSelectedData && rowSelectedData.length > 0) {
      const newRowSelected = body.records.filter(v => {
        const rs = rowSelectedData.filter(v1 => {
          if (v1.id === v.id)
            return v;
        });
        if (rs.length > 0) return rs[0];
      });
      // console.log(" updateSelectDatas  rowSelecteData ",newRowSelected,selectItem)
      if (newRowSelected && newRowSelected.length > 0) {
        // this.state.rowSelectedData = newRowSelected;
        // this.setState({
        //   rowSelectedData: newRowSelected,
        // });
      }
    }

    if (selectItem && this.state.rowSelectedData) {
      // console.log("   showItem ",this.state.selectItem)
      const newShowItem = this.state.rowSelectedData.filter(v => {
        if (selectItem.id === v.id)
          return v;
      });
      // console.log(" updateSelectDatas  showItem ",newShowItem)
      if (newShowItem && newShowItem[0]) {
        this.state.selectItem = newShowItem[0];
        this.setState({
          selectItem: newShowItem[0],
        });
      } else {
        this.state.selectItem = false;
      }
      if (onSelectItem) onSelectItem(this.state.selectItem, this.state.rowSelectedData);
    }

  };

  pageChange = (page, pageSize) => {
    const { pageChange } = this.props;
    if (pageChange) pageChange(page, pageSize);
    if (this.props.onSelectItem) this.props.onSelectItem(false, []);


    this.setState({
      pageCurrent: page,
      selectItem: false,
      selectedRowKeys: [],
      rowSelectedData: [],

    });

  };

  onSelectChange = (selectedRowKeys, selectedRows) => {

    const { onSelectItem } = this.props;
    let selectItem = false;
    if (selectedRowKeys.length > 0) {
      const recordK = selectedRowKeys[selectedRowKeys.length - 1];
      const record = selectedRows.filter(value => value.id == recordK);
      // this.showSelectItem(record[0]);
      selectItem = record[0];
    }
    else {
      // this.setState({
      //   // showItem: false,
      //   selectItem: false,
      //   // isEdit: true,
      //   // current: false,
      //   // fristLoad: true,
      // });
      // this.state.showItem = false;
      selectItem = false;

    }

    this.setState({
      selectItem,
      selectedRowKeys,
      rowSelectedData: selectedRows,
      selectCustomerItem: '',
    });
    console.log('ss',selectedRows)
    this.state.selectCustomerItem = '';
    if (onSelectItem) onSelectItem(selectItem, selectedRows);
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
