/*
*
* 右边详情内容部分
* */

import {
  Card
} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import moment from 'moment';
import styles from './GetRenderitem.less';

const { Description } = DescriptionList;

// 右手边显示的详情信息
/*
* data 选中数据
* type 显示详情内容模板标志
*
* items 配置数据
* */
const GetRenderitem = ({ data, type, items }) => {
  const selectRowItem = () => {
    // console.log('select the item');
  };

  const arr = items[type];

  return (
    <Card bordered={false} style={{overflow:"auto"}} onClick={selectRowItem}>

      <DescriptionList className={styles.headerList} size="small" col="1">
        {
          arr.map(({ key, value, cName, convert ,date}) =>
            <Description key={key} term={key}>
              {
                (date&&data[value])?moment(data[value]).format(date):(convert ? convert[data[value]] : (cName ? data[`${value}Name`] : data[value]))

              }
            </Description>,
          )
        }
      </DescriptionList>
    </Card>
  );
};

export default GetRenderitem;
