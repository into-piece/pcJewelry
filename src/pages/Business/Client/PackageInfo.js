import React, { PureComponent } from 'react';

import {
  Card,
  Row,
  Col,
  Table,
  Icon,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Tabs,
  Radio,
  Button,
  Input,
  Divider,
  List,
} from 'antd';
import styles from './ClientInfo.less';

import DescriptionList from '@/components/DescriptionList';

const { Description } = DescriptionList;
const listdata = [{

    code: '8009',
    clientName:'App',
   country:'Thailand'

} ,
  {

    code: '8009',
    clientName:'App',
    country:'Thailand'

  },
  {

    code: '8009',
    clientName:'App',
    country:'Thailand'

  } ];

class PackageInfo extends PureComponent {


  componentWillMount() {

    console.log(Object.keys(this.props.location.query));

  }

  render() {
    return (<div className={styles.content}>

      <List
        loading={false}
        dataSource={listdata}
        renderItem={this.getContantItem}
        size="small"
        bordered={false}
        split={true}

      />

    </div>);
  }


  getContantItem = (item) => {
    return (
      <Card
        hoverable
        cover={<img alt="example" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559223238&di=bd3da77adf53b2475750e850b6106117&imgtype=jpg&er=1&src=http%3A%2F%2Fres.cngoldres.com%2Fupload%2F2014%2F1029%2F3c1910541d8059177e7d3f598611c859.jpg%3F_%3D1414568255062" />}
      >
      <div>
        <DescriptionList size='small' col='2'>
          <Description size="small" term='终客编号'>8009-1</Description>
          <Description size="small" term='终客简称'>App-1</Description>
          <Description size="small" term='包装说明编码'>PPK001</Description>
        </DescriptionList>

        <DescriptionList size="small" col="1"><Description term='包装说明'>1,把吊牌挂在产品尾圈上面。'\n'2.把产品连通吊牌放进PP带</Description></DescriptionList>
      </div>
      </Card>
    );
  };

}

export default PackageInfo;
