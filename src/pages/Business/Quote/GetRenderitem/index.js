
import React  from 'react';
import Carousel from '@/components/Carousel';
import {Divider} from 'antd'
import jsonData from '../index.json';
import styles from './index.less'
import DescriptionList from '@/components/DescriptionList';

const { Description } = DescriptionList;

const  remarksArr = [ { key: '备注', value: 'remarks' },
{ key: '新增人', value: 'createUser' },
{ key: '新增时间', value: 'createTime' },
{ key: '修改人', value: 'modifier' },
{ key: '修改时间', value: 'mtime' },
]


const {  detailList } = jsonData
const isCheck = {
  0: '否',
  1: '是',
};


const returnNameObj = {
  status: {
    0: '输入',
    2: '已审批',
  },
  quoteMethod: {
    H008002: '计重',
    H008001: '计件',
  },
  emergency: {
    0: '不紧急',
    1: '紧急',
  },
  isWeighStones: isCheck,
  packPriceType: {
    H011001: '计收',
    H011002: '不计收',
  },
  customerPreparation: isCheck,
  purchasingMaterialsFromCustomers: isCheck,
};
const returnName = (key, value) => returnNameObj[key][value];



const quoteMethodobj = {
  H008002: '克',
  H008001: '件',
};


// 右手边详情显示
const rowArr = [
  { key: '报价单号', value: 'quoteNumber' },
  { key: '报价日期', value: 'quoteDate' },
  { key: '客户', value: 'customerNo' },
  { key: '类别', value: 'type', belong: 3, list: 'wordbookdropdown' },
  { key: '终客', value: 'endNo' },
  { key: '中文名', value: 'zhName' },
  { key: '英文名', value: 'enName' },
  { key: '联系人', value: 'customerZhName' },
  { key: '手机', value: 'customerPhone' },
  { key: 'Email', value: 'customerEmail' },
  { key: '报价方式', value: 'quoteMethod', belong: 2 },
  { key: '主材价', value: 'quotePrice', belong: 3, list: 'materialPriceList' },
  { key: '结算币种', value: 'currency' },
  { key: '税率', value: 'taxRate' },
  { key: '紧急程度', value: 'emergency', belong: 2 },
  { key: '计石重', value: 'isWeighStones', belong: 2 },
  { key: '字印编码', value: 'markingId', belong: 3, list: 'markinglist' },
  { key: '字印英文名', value: 'markingEnName' },
  { key: '包装单价', value: 'packPriceType', belong: 2 },
  { key: '客户备料', value: 'customerPreparation', belong: 2 },
  { key: '向客户采购用料', value: 'purchasingMaterialsFromCustomers', belong: 2 },
  { key: '包装说明', value: 'packExplains' },
  { key: '报价总数', value: 'quoteTotalCount' },
  { key: '报价总重', value: 'quoteTotalWeight' },
  { key: '报价总额', value: 'quoteTotalAmount' },
  { key: '说明', value: 'explains' },
  { key: '备注', value: 'remark' },
  // { key: '新增人', value: 'createUser' },
  // { key: '新增时间', value: 'createTime' },
  // { key: '修改人', value: 'modifier' },
  // { key: '修改时间', value: 'mtime' },
];

const returnKey = ({key,priceUnit,currency,quoteMethod}) => 
  priceUnit?
    priceUnit === 1 ? 
      `${key + currency}/${quoteMethodobj[quoteMethod]}`:
      priceUnit === 2 ?`${key+currency}/件`:
  `${key+currency}`:key


// 右手边显示的详情信息
export default ({ data, type, returnListName,currency,quoteMethod }) => {
  const selectRowItem = () => {
    // console.log('select the item');
  };

  const returnRowName = ({ value, list, belong }) => {
    return belong === 2
      ? returnName(value, data[value])
      : belong === 3
      ? returnListName(list, data[value])
      : data[value];
  };

  const arr =
    type === 1
      ? rowArr
      : [
          // { key: '产品编号', value: 'productNo' },
          ...detailList,
          // { key: '新增人', value: 'createUser' },
          // { key: '新增时间', value: 'createTime' },
          // { key: '修改人', value: 'modifier' },
          // { key: '修改时间', value: 'mtime' },
        ];

  const {pictures} = data

  
  return (
    <div
      style={{ marginLeft: 10, marginTop: 10 }}
      className={styles.getRenderitem}
      onClick={selectRowItem}
    >
      <DescriptionList className={styles.headerList} size="small" col="1">
        {
        type === 2&&
        <div>
          <Carousel pictures={pictures} />
        </div>
      }
        {arr.map(({ key, value, belong, list ,priceUnit}) => {
          const name = returnRowName({ belong, value, list });
          return name ? (
            <Description key={value} term={returnKey({key,priceUnit,currency,quoteMethod})}>
              {name}
            </Description>
          ) : (
            ''
          );
        })}
      </DescriptionList>
      {data.createUser&&<><span className={styles.title_info}>备注</span>
        <Divider className={styles.divder} style={{marginTop:10}} />
      </>}

      <DescriptionList className={styles.headerList} size="small" col="1">
        {remarksArr.map(({ key, value}) => {
          const name = returnRowName({ value});
          return name ? (
            <Description key={value} term={key}>
              {name}
            </Description>
          ) : (
            ''
          );
        })}
      </DescriptionList>


      
    </div>
  );
};
