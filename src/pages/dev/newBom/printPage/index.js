import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import {
  Spin,
  Button,
  notification,
  Table,
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
          <th className={styles.maxthwidth}>备注</th>
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
              <td>{i.countModeName}</td>
              <td className={styles.maxthwidth}>{i.remarks}</td>
            </tr>;
          })
        }
      </table>
    );
  }
}

const columns = [  {
  title: '效率',
  dataIndex: 'a',
  key: 'a',
},]
class ComponentToPrint extends Component {
  render() {
    return (
      <Table
        columns={columns}
        data={[{a:1}]}
      />
    )
  }
}

class PrintTable extends Component {
  state = {
    datalist: [],
    loading:false
  };

  componentWillMount() {
    this.setState({loading:true})

    const {args} =this.props;
    servicesConfig.listSupplierNoPage(args).then(res => {
      if (res && res.body && res.body.records ) {
        this.setState({datalist:res.body.records})
      }
      this.setState({loading:false})
    });
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
              loading={this.state.loading}
              className={styles.buttomControl}
            >
              打印
            </Button>}
            content={() => this.componentRef}
          />
          <Button
            className={styles.buttomControl}
            loading={this.state.loading}
            type="primary"
            size="small"
            onClick={this.exportExcel}
            icon="export"
          >
            导出
          </Button>
        </div>
        <Spin spinning={this.state.loading} className={styles.tableOutDiv}>
          <ComponentTable ref={el => {this.componentRef = el}} />
          {/* <ComponentToPrint ref={el => (this.componentRef = el)} list={this.state.datalist} /> */}
        </Spin>
        
      </div>
    );
  }
}


export default PrintTable;

