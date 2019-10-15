import { statusConvert } from '@/utils/convert';


// menu配置提供遍历
export const manuArr = [
  'cushionWeightInfo',

];

// 每个menu不同的增加弹窗填写信息
export const modalContent = {
  'cushionWeightInfo': [
    { 'key': '胶膜编号', 'value': 'cushionNo' },
    { 'key': '胶膜重量', 'value': 'weight' },
    { 'key': '备注', 'value': 'remark', 'noNeed': true },
  ],
};


// table 当前页对应的表头配置
export const columnsArr = {
  // 胶膜重量表头
  cushionWeightInfo: [
    {
      title: '胶膜编号',
      dataIndex: 'cushionNo',
      key: 'cushionNo',
    },
    {
      title: '胶膜重量',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data]
    },
  ],

}


export default {
  manuArr, modalContent,columnsArr
}
