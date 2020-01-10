import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import {
  Button,
  notification,
} from 'antd';
import styles from './index.less';
import servicesConfig from '@/services/purchase';


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

        {
          this.props.list.map((i, k) => {
            return <tr className={styles.trtd}>
              <td>{k + 1}</td>
              <td>{i.shotName}</td>
              <td>{i.contactName}</td>
              <td>{i.telphone}</td>
              <td>{i.openBank}</td>
              <td>{i.accountName}</td>
              <td>{i.accountNum}</td>
              <td>{i.countMode}</td>
              <td>{i.remarks}</td>
            </tr>;
          })
        }
      </table>
    );
  }
}

class PrintTable extends Component {
  state = {
    datalist: [],
  };

  componentWillMount() {
    const {args} =this.props;
    servicesConfig.listSupplierNoPage(args).then(res => {
      if (res && res.body && res.body.records ) {
        this.setState({datalist:res.body.records})
      }
    });
    console.log('print', args);
  }


  exportExcel = () => {
    const { args } = this.props;

    servicesConfig.purchaseExport(args).then(res => {
      const { rtnCode, rtnMsg } = res.head;
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
      }
    });

  };


  render() {
    return (
      <div>
        <div className={styles.btnDiv}>

          <ReactToPrint
            trigger={() => <Button
              type="primary"
              size="small"
              icon="printer"
              className={styles.buttomControl}
            >
              打印
            </Button>}
            content={() => this.componentRef}
          />
          <Button
            className={styles.buttomControl}

            type="primary"
            size="small"
            onClick={this.exportExcel}
            icon="export"
          >
            导出
          </Button>
        </div>
        <div className={styles.tableOutDiv}>
          <ComponentToPrint ref={el => (this.componentRef = el)} list={this.state.datalist} />
        </div>
      </div>
    );
  }
}


export default PrintTable;

