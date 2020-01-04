import React from 'react';
import { Input, Select } from 'antd';
import Table from '@/components/Table';
import styles from './index.less';

const { Option } = Select;

const columnsarr = [
  {
    title: '产品编号',
    dataIndex: 'productNo',
    key: 'productNo',
  },
  {
    title: '电镀颜色',
    dataIndex: 'platingColorName',
    key: 'platingColorName',
  },
  {
    title: '类别',
    dataIndex: 'productTypeName',
    key: 'productTypeName',
  },
  {
    title: '颜色名称',
    dataIndex: 'gemColorName',
    key: 'gemColorName',
  },
  {
    title: '成色名称',
    dataIndex: 'productColorName',
    key: 'productColorName',
  },
  {
    title: '英文名',
    dataIndex: 'enName',
    key: 'enName',
  },
  {
    title: '客户编号',
    dataIndex: 'customerNo',
    key: 'customerNo',
  },
  {
    title: '客户货号',
    dataIndex: 'customerProductNo',
    key: 'customerProductNo',
  },
  {
    title: '客户简称',
    dataIndex: 'customerShotName',
    key: 'customerShotName',
  },
];


export default (({ handleBomSelectChange, productChoosenData, choosenRowData, pagination, source, list, selectedRowKeys, changeChoosenRow, onSelectChange, handleTableChange }) => {
  console.log(pagination, 'pagination======');

  return (
    <div className={styles.productModal}>
      <div style={{ marginBottom: 20 }}><span>产品编号：</span> {productChoosenData.productNo}</div>
      <div style={{ marginBottom: 20 }}>
        {/* bom列表 */}
        <span>BOM：</span>
        <Select
          value={source.sysProductSelectedBom || undefined}
          showSearch
          allowClear
          mode="multiple"
          style={{ width: 480 }}
          placeholder="请选择"
          onChange={v => {
               handleBomSelectChange(v);
            }}
          optionFilterProp="children"
          filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
          {source.bomlist &&
            source.bomlist.map(({ value, key }) => (
              <Option value={value} key={value}>
                {key}
              </Option>
            ))}
        </Select>
      </div>
      <Table
        scroll={{ x: "max-content" ,y: "280px" }}

        columns={columnsarr}
        body={list}
        selectedRowKeys={selectedRowKeys}
        changeChoosenRow={changeChoosenRow}
        selectKey={choosenRowData.id}
        onSelectChange={onSelectChange}
        handleTableChange={handleTableChange}
      />
    </div>
  );
});
