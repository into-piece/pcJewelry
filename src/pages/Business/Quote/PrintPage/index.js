import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import {
  Spin,
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
          <th colSpan="9">报价单</th>
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
            return <tr className={styles.trtd} key={k}>
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

    servicesConfig.purchaseExport(args).then(data => {
      if (!data) {
        console.log(1)
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'excel.xlsx')

      document.body.appendChild(link)
      link.click()
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
          <ComponentToPrint ref={el => (this.componentRef = el)} list={this.state.datalist} />
        </Spin>
      </div>
    );
  }
}


export default PrintTable;

