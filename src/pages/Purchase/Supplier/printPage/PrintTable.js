import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import {
  Button,
} from 'antd';
import styles from './index.less';

class ComponentToPrint extends Component {
  render() {
    return (
      <table border="1" cellSpacing="1" cellPadding="0" className={styles.table}>
        <tr className={styles.title01}>
          <th colSpan="9">供应商明细</th>
        </tr>
        <tr className={styles.title02}>
          <th>序号</th>
          <th>供应商简称</th>
          <th>联系人</th>
          <th>电话</th>
          <th>开户行</th>
          <th>开户人</th>
          <th>账号</th>
          <th>结算方式</th>
          <th>备注</th>
        </tr>
        <tr className={styles.trtd}>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
        <tr className={styles.trtd}>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>

        <tr className={styles.trtd}>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>

      </table>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <Button
            type="primary"
            size="small"
            icon="printer"
          >
            打印
          </Button>}
          content={() => this.componentRef}
        />
        <Button
          type="primary"
          size="small"
          icon="export"
        >
          导出
        </Button>
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}


export default Example;

