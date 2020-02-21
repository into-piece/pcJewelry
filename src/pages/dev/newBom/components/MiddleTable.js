import React, { Component } from 'react';
import { connect } from 'dva/index';
import { Form, Divider, Radio, Select, Button } from 'antd';
import ReactToPrint from 'react-to-print';
import styles from './MiddleTable.less';
import Table from '@/components/Table';
import SearchForm from '@/components/SearchForm';
import columnsConfig from '../config/columns';
import searchParamsArrConfig from '../config/search';
import { getCurrentUser } from '../../../../utils/authority';



const { Option } = Select;
const { Group } = Radio;
const FIRST_TAG = 'sample';
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
const defaultModelName = 'devnewbom';

const BtnGroup = ({ arr }) => {
  const bomPermission = getCurrentUser().permission.bom || []
  console.log(arr,bomPermission,'===============bomPermission')
  return (
    <div className={styles.btnGroup}>
      {arr.map(({ key, fn, disabled,permissionConfig}) => {

        if(!bomPermission.includes(permissionConfig)) return null
        return(
          <Button key={key} onClick={fn} type="primary" disabled={disabled}>
            {key}
          </Button>
        )
      })}
    </div>
  );
};

@Form.create()
@connect(({ loading, devnewbom: model }) => {
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
    bomlist: model.bomlist,
    choosenProccessData: model.choosenProccessData,
    selectedProccessRowKeys: model.selectedProccessRowKeys,
    proccessPagination: model.proccessPagination,
  };
})
class MiddleTable extends Component {



  // 选中某行   type  1 主table
  changeChoosenRow = (rowData, type) => {

    // 判断 2/3
    const { dispatch, pagination, onSearch, rightActive,changedetailtab } = this.props;
    const isMaterial = rightActive === FIRST_TAG || rightActive === SECOND_TAG;
    const choosenSecondRow = isMaterial ? 'choosenRowDataSecond' : 'choosenProccessData';
    const str = type === 1 ? 'choosenRowData' : choosenSecondRow;
    console.log(isMaterial, choosenSecondRow, str, '=======');

    dispatch({
      type: `${defaultModelName}/setChooseData`,
      payload: { name: str, list: rowData },
    });
    changedetailtab&&changedetailtab(type);
    if (type === 1) {
      // onSearch && onSearch({ mainMoldCode: rowData.id }, 2);
      this.props.getbomlist({ pid: rowData.id });
    } else {
      if (rightActive === FIRST_TAG) {
        this.props.changeRightActive(SECOND_TAG);
      }
      // this.props.changeRightActive();
      // dispatch({
      //   type: `${defaultModelName}/changeRightMenu`,
      //   payload: 2,
      // });
    }
  };

  // 更改table select数组
  onSelectChange = (selectedRowKeys, type) => {
    const { dispatch, rightActive, selectedRowKeysSecond, selectedProccessRowKeys } = this.props;
    const isMaterial = rightActive === FIRST_TAG || rightActive === SECOND_TAG;
    const selectedSecondRowKeys = isMaterial ? 'selectedRowKeysSecond' : 'selectedProccessRowKeys';
    const selectedRowArr = type === 1 ? 'selectedRowKeys' : selectedSecondRowKeys;
    dispatch({
      type: `${defaultModelName}/changeStateOut`,
      payload: { name: selectedRowArr, data: selectedRowKeys },
    });
  };

  // 当表头重复点击选中 清空选中 清空表体
  clearFn = type => {
    const { dispatch } = this.props;
    if (type === 1) {
      // 清除第二table数据
      dispatch({
        type: `${defaultModelName}/setChooseData`,
        payload: { name: 'choosenRowData', list: [] },
      });
      dispatch({
        type: `${defaultModelName}/setChooseData`,
        payload: { name: 'choosenRowDataSecond', list: [] },
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
      handleSwitchMenu,
      bomlist,
      secondOprationArr,
      selectedBom,
      handleBomSelectChange,
      handleWorkFlowSelectChange,
      rightActive,
      processDropdown,
      selectedProccess,
      selectedProccessRowKeys,
      choosenProccessData,
      proccessPagination,
    } = props;
    const isthird = rightActive === THIRD_TAG;
    const tablelist = isthird ? processList : materialList;
    const isMaterial = rightActive === FIRST_TAG || rightActive === SECOND_TAG;
    const menuValue =
      isMaterial ? SECOND_TAG : THIRD_TAG;
    const selectedSecondRowKeys = isMaterial ? selectedRowKeysSecond : selectedProccessRowKeys;
    const choosenSecondRow = isMaterial ? choosenRowDataSecond : choosenProccessData;
    console.log(processList, selectedSecondRowKeys, selectedProccess, '=====selectedProccess');
    console.log(materialList, '====materialList');
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
          needStatus
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
          <div style={{marginBottom:20}}>
            {/* <span>BOM: </span> */}
            {/* bom列表 */}
            <Select
              style={{ width: 180, marginRight: 20 }}
              placeholder="请选择"
              value={selectedBom.id || undefined}
              onChange={handleBomSelectChange}
            >
              {bomlist &&
              bomlist.map(({ value, key }) => (
                <Option value={value} key={value}>
                  {key}
                </Option>
              ))}
            </Select>
          </div>
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
          <div style={{ margin: '20px 0 ', display: 'flex', justifyContent: isthird?'space-between':'flex-end'}}>
            {/* 生产流程列表 */}
            {isthird ? (
              <div>
                {/* <span>生产流程: </span> */}
                <Select
                  style={{ width: 180 }}
                  placeholder="请选择"
                  value={selectedProccess && selectedProccess.processId || undefined}
                  onChange={handleWorkFlowSelectChange}
                >
                  {processDropdown &&
                processDropdown.map(({ value, key }) => (
                  <Option value={value} key={value}>
                    {key}
                  </Option>
                ))}
                </Select>
              </div>) : null}

            {selectedProccess&&selectedProccess.processName&&selectedProccess.processName===getCurrentUser().dept||rightActive!==THIRD_TAG?<BtnGroup arr={secondOprationArr} />:null}
          </div>

          <Table
            scroll={{ x: 'max-content' }}
            columns={columnsConfig[menuValue]}
            pagination={isMaterial ? paginationSecond : proccessPagination}
            selectKey={choosenSecondRow.id}
            handleTableChange={p => {
              onSearch(p, isMaterial ? 2 : 3);
            }}
            selectedRowKeys={selectedSecondRowKeys}
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
