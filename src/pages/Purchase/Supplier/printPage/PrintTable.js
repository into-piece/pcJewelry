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
        <tr>
          <th colSpan="3">标题</th>
        </tr>
        <tr>
          <th>data 1</th>
          <th>data 2</th>
          <th>data 3</th>
        </tr>
        <tr>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
        <tr>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
        <tr>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
        <tr>
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
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}


export default Example;

