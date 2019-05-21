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
} from 'antd';

class Mark extends PureComponent {


  componentWillMount() {

    console.log(Object.keys(this.props.location.query))

  }

  render() {
    return (<div>
      这个是字印页面
    </div>);
  }


}

export default Mark;
