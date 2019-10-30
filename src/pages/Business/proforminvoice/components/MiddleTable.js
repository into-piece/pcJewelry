import React, { Component } from 'react';
import { connect } from 'dva/index';
import { Form, Divider, Radio } from 'antd';
import styles from './MiddleTable.less';
import Table from '@/components/Table';
import SearchForm from '@/components/SearchForm';
import columnsConfig from '../config/columns';
import searchParamsArrConfig from '../config/search';

const defaultModelName = 'businessPI';


@Form.create()
@connect(({ loading, businessPI: model }) => {
  return {
    model,
    listLoading: loading.effects[`${defaultModelName}/getList`],
    listLoadingSecond: loading.effects[`${defaultModelName}/getListSecond`],
    list: model.list,
    listSecond: model.listSecond,
    pagination: model.pagination,
    paginationSecond: model.paginationSecond,
    choosenRowData: model.choosenRowData,
    choosenRowDataSecond: model.choosenRowDataSecond,
    selectedRowKeys: model.selectedRowKeys,
    selectedRowKeysSecond: model.selectedRowKeysSecond,
    searchParams: model.searchParams,
    searchParamsSecond: model.searchParamsSecond,
  };
})
class MiddleTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstRadioValue: '0',
    };
  }


  // 选中某行   type  1 主table
  changeChoosenRow = (rowData, type) => {
    const { dispatch, pagination, onSearch } = this.props;
    const str = type === 1 ? '' : 'Second';
    dispatch({
      type: `${defaultModelName}/setChoosenRowData${str}`,
      payload: rowData,
    });
    if (type === 1) {
      this.searchSecond.handleReset();
      if (onSearch) onSearch({ flowCode: rowData.flowCode }, 2);
    } else {
      // dispatch({
      //   type: `${defaultModelName}/changeRightMenu`,
      //   payload: 2,
      // });
    }
  };

  // 更改table select数组
  onSelectChange = (selectedRowKeys, type) => {
    const { dispatch } = this.props;

    const str = type === 2 ? 'Second' : '';
    dispatch({
      type: `${defaultModelName}/changeSelectedRowKeys${str}`,
      payload: selectedRowKeys,
    });
  };

  // 当表头重复点击选中 清空选中 清空表体
  clearFn = (type) => {
    const { dispatch } = this.props;
    if (type === 1) {
      // 清除第二table数据
      dispatch({
        type: `${defaultModelName}/clearListSecond`,
      });
      dispatch({
        type: `${defaultModelName}/setChoosenRowData`,
        payload: {},
      });
    }
  };

  changeSearchParams = (v) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/changeSearchParams`,
      payload: v,
    });
  };

  changeSearchDetailParams = (v, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/changeSearchParamsSecond`,
      payload: v,
      callback,
    });
  };

  // 首table切换tab 条件搜索
  changeFirstTabActive = (v) => {
    const { onSearch } = this.props;
    const { firstRadioValue } = this.state;

    this.setState({ firstRadioValue: v.target.value }, () => {
      onSearch && onSearch({ status: v.target.value }, 1);
    });
  };


  // 第二table 切换tab
  changeTabActive = (v, clear) => {
    const { changeRightActive, dispatch, paginationSecond, choosenRowData } = this.props;

    // 右边tab也变
    if (changeRightActive) changeRightActive(v, false);


    // 清空搜索条件
    this.changeSearchDetailParams({});

    // 搜索
    dispatch({
      type: `${defaultModelName}/getListSecond`,
      payload: {
        type: v.target.value,
        params: { ...paginationSecond, approveNo: choosenRowData.approveNo },
      },
    });

  };

  render() {
    const { changeFirstTabActive, changeTabActive, onSelectChange, props, changeSearchParams, changeSearchDetailParams, clearFn } = this;
    const {
      firstType,
      secondType,
      returnElement,
      onSearch,

      list,
      listSecond,

      choosenRowData,
      choosenRowDataSecond,
      pagination,
      paginationSecond,

      selectedRowKeys,
      selectedRowKeysSecond,

      model,
      radioArr01,
      radioArr02,
      listLoading,
      listLoadingSecond,
    } = props;
    const { firstRadioValue } = this.state;
    return (
      <div className={styles.view_left_content}>
        {radioArr01 && <Radio.Group
          size="small"
          className={styles.right_content_tabgroud}
          onChange={changeFirstTabActive}
          buttonStyle="solid"
          value={firstRadioValue}
          style={{ paddingBottom: '20px' }}
        >
          {
            radioArr01.map((item, index) =>
              <Radio.Button
                key={item.value}
                style={{
                  height: 30,
                  width: 80,
                  textAlign: 'center',
                  lineHeight: '30px',
                }}
                value={item.value}
              >{item.key}
              </Radio.Button>)
          }
        </Radio.Group>}
        <SearchForm
          key={firstType}
          data={searchParamsArrConfig[firstType]}
          source={model}
          onSearch={(p) => {
            onSearch({ ...p, status: firstRadioValue }, 1);
          }}
          returnElement={returnElement}
          onchange={changeSearchParams}
        />
        <div className={styles.tableBox}>
          <Table
            scroll={{ x: 1400 }}
            columns={columnsConfig[firstType]}
            pagination={pagination}
            selectKey={choosenRowData.id}
            handleTableChange={(p) => {
              onSearch({ ...p, status: firstRadioValue }, 1);
            }}
            body={list}
            selectedRowKeys={selectedRowKeys}
            changeChoosenRow={record => {
              this.changeChoosenRow(record, 1);
            }}
            onSelectChange={(data) => {
              onSelectChange(data, 1);
            }}

            listLoading={listLoading}
            clearFn={clearFn}
            type={1}
          />
        </div>
        <Divider />
        {
          radioArr02 && <Radio.Group
            size="small"
            className={styles.right_content_tabgroud}
            onChange={changeTabActive}
            buttonStyle="solid"
            value={secondType}
            style={{ paddingBottom: '20px' }}
          >
            {
              radioArr02.map((item, index) =>
                <Radio.Button
                  key={item.value}
                  style={{
                    height: 30,
                    width: 80,
                    textAlign: 'center',
                    lineHeight: '30px',
                  }}
                  value={item.value}
                >{item.key}
                </Radio.Button>)
            }
          </Radio.Group>}
        <SearchForm
          key={secondType}
          wrappedComponentRef={ref => {
            this.searchSecond = ref;
          }}
          data={searchParamsArrConfig[secondType]}
          source={model}
          onSearch={(p) => {
            onSearch(p, 2);
          }}
          returnElement={returnElement}
          onchange={changeSearchDetailParams}
        />
        <div className={styles.tableBox}>
          <Table
            scroll={{ x: 1600 }}
            columns={columnsConfig[secondType]}
            pagination={paginationSecond}
            selectKey={choosenRowDataSecond.id}
            handleTableChange={(p) => {
              onSearch(p, 2);
            }}
            selectedRowKeys={selectedRowKeysSecond}
            body={listSecond}
            changeChoosenRow={record => {
              this.changeChoosenRow(record, 2);
            }}
            onSelectChange={data => {
              onSelectChange(data, 2);
            }}

            listLoading={listLoadingSecond}
            clearFn={clearFn}
            type={2}
          />
        </div>
      </div>
    );
  }
}

export default MiddleTable;
