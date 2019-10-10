/*
*
* 右边详情内容部分
* */

import DescriptionList from '@/components/DescriptionList';
import styles from './GetRenderitem.less';

const { Description } = DescriptionList;

// 右手边显示的详情信息
/*
* data 选中数据
* type 显示详情内容模板标志
*
* items 配置数据
* */
const GetRenderitem = ({ data, type,items}) => {
  const selectRowItem = () => {
    // console.log('select the item');
  };

  const arr = items[type];

  return (
    <div style={{ marginLeft: 10, marginTop: 10 }} className={styles.getRenderitem} onClick={selectRowItem}>
      <DescriptionList className={styles.headerList} size="small" col="1">
        {
          arr.map(({ key, value, cName ,convert}) =>
            <Description key={key} term={key}>
              {
                convert ? convert[data[value]] : (cName ? data[`${value}Name`] : data[value])
              }
            </Description>,
          )
        }
      </DescriptionList>
    </div>
  );
};

export default GetRenderitem;
