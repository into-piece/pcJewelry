import React, { Component } from 'react';
import { connect } from 'dva/index';
import { Form, Divider, Radio, Select, Button } from 'antd';
import styles from './MiddleTable.less';
import Table from '@/components/Table';
import SearchForm from '@/components/SearchForm';
import columnsConfig from '../config/columns';
import searchParamsArrConfig from '../config/search';
const { Option } = Select;
const { Group } = Radio;
const FIRST_TAG = 'product';
const SECOND_TAG = 'material';
const THIRD_TAG = 'productProcess';
const menuRadio = [
  {
    title: '原料信息',
    key: 'material',
  },
  {
    title: '生产流程',
    key: 'productProcess',
  },
];
const defaultModelName = 'devbom';

const BtnGroup = ({ arr }) => {
  return (
    <div className={styles.btnGroup}>
      {arr.map(({ key, fn, disabled }) => (
        <Button key={key} onClick={fn} type={'primary'} disabled={disabled}>
          {key}
        </Button>
      ))}
    </div>
  );
};

@Form.create()
@connect(({ loading, devbom: model }) => {
  return {
    model,
    listLoading: loading.effects[`${defaultModelName}/getList`],
    listLoadingSecond: loading.effects[`${defaultModelName}/getListSecond`],
    list: model.list || [],
    listSecond: model.listSecond,
    pagination: model.pagination,
    paginationSecond: model.paginationSecond,
    choosenRowData: model.choosenRowData,
    choosenRowDataSecond: model.choosenRowDataSecond,
    selectedRowKeys: model.selectedRowKeys,
    selectedRowKeysSecond: model.selectedRowKeysSecond,
    searchParams: model.searchParams,
    searchParamsSecond: model.searchParamsSecond,
    materialList: model.materialList,
    processList: model.processList,
    processDropdown: model.processDropdown,
  };
})
class MiddleTable extends Component {
  // 选中某行   type  1 主table
  changeChoosenRow = (rowData, type) => {
    const { rightActive } = this.props;
    // 判断 2/3
    const isthird = rightActive === THIRD_TAG;
    const { dispatch, pagination, onSearch } = this.props;
    const str = type === 1 ? '' : 'Second';
    dispatch({
      type: `${defaultModelName}/setChoosenRowData${str}`,
      payload: rowData,
    });
    if (type === 1) {
      // this.searchSecond.handleReset();
      if (onSearch) onSearch({ mainMoldCode: rowData.id }, 2);
      debugger;
      this.props.getbomlist({ pid: rowData.id });
    } else {
      this.props.changeRightActive();
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
  clearFn = type => {
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

  changeSearchParams = v => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/changeSearchParams`,
      payload: v,
    });
  };

  changeSearchDetailParams = v => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/changeSearchParamsSecond`,
      payload: v,
    });
  };

  render() {
    const { onSelectChange, props, changeSearchParams, changeSearchDetailParams, clearFn } = this;
    const {
      firstType,
      returnElement,
      onSearch,
      list,
      materialList,
      processList,
      choosenRowData,
      choosenRowDataSecond,
      pagination,
      paginationSecond,
      selectedRowKeys,
      selectedRowKeysSecond,
      model,
      listLoading,
      listLoadingSecond,
      switchMenu,
      handleSwitchMenu,
      boomList,
      secondOprationArr,
      selectedBom,
      handleBomSelectChange,
      rightActive,
      processDropdown,
      selectedProccess,
    } = props;
    const isthird = rightActive === THIRD_TAG;
    const tablelist = isthird ? processList : materialList;
    const menuValue =
      rightActive === FIRST_TAG || rightActive === SECOND_TAG ? SECOND_TAG : THIRD_TAG;

    console.log(selectedProccess, '=======');

    return (
      <div className={styles.view_left_content}>
        <SearchForm
          data={searchParamsArrConfig[firstType]}
          source={model}
          onSearch={p => {
            onSearch({ ...p, current: 1 }, 1);
          }}
          returnElement={returnElement}
          onchange={changeSearchParams}
        />
        <div className={styles.tableBox}>
          <Table
            scroll={{ x: 'max-content' }}
            columns={columnsConfig[firstType]}
            pagination={pagination}
            selectKey={choosenRowData.id}
            handleTableChange={p => {
              onSearch(p, 1);
            }}
            body={list}
            selectedRowKeys={selectedRowKeys}
            changeChoosenRow={record => {
              this.changeChoosenRow(record, 1);
            }}
            onSelectChange={data => {
              onSelectChange(data, 1);
            }}
            listLoading={listLoading}
            clearFn={clearFn}
            type={1}
          />
        </div>
        <Divider />
        {/*  生产流程 原料信息  */}

        {/*  操作部分  */}
        <div className={styles.tableBox}>
          <div>
            <Group value={menuValue} buttonStyle="solid" onChange={handleSwitchMenu}>
              {menuRadio.map(({ title, key }) => (
                <Radio.Button value={key} key={key}>
                  {title}
                  {/* <FormattedMessage id={`app.quote.menuMap.${type}`} defaultMessage="" /> */}
                </Radio.Button>
              ))}
            </Group>
          </div>
          <div style={{ margin: '20px 0 ', display: 'flex', justifyContent: 'space-between' }}>
            {/* bom列表 */}
            {isthird ? (
              <Select
                style={{ width: 180 }}
                placeholder="请选择"
                value={selectedProccess.processCode || undefined}
                onChange={handleBomSelectChange}
              >
                {processDropdown &&
                  processDropdown.map(({ value, key }) => (
                    <Option value={value} key={value}>
                      {key}
                    </Option>
                  ))}
              </Select>
            ) : (
              <Select
                style={{ width: 180 }}
                placeholder="请选择"
                value={selectedBom.id || undefined}
                onChange={handleBomSelectChange}
              >
                {boomList &&
                  boomList.map(({ value, key }) => (
                    <Option value={value} key={value}>
                      {key}
                    </Option>
                  ))}
              </Select>
            )}
            <BtnGroup arr={secondOprationArr} />
          </div>

          <Table
            scroll={{ x: 'max-content' }}
            columns={columnsConfig[switchMenu]}
            pagination={paginationSecond}
            selectKey={choosenRowDataSecond.id}
            handleTableChange={p => {
              onSearch(p, 2);
            }}
            selectedRowKeys={selectedRowKeysSecond}
            body={tablelist}
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
