import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { Spin, Button, notification } from 'antd';
import styles from './index.less';
import logo from '../../../../assets/baojia.png';
import servicesConfig from '@/services/quote';


class ComponentToPrint extends Component {
  render() {
    const { list } = this.props;
    const data = list.length !== 0 ? list[0] : {};

    return (
      <div className={styles.wrap}>
        <div>
          <div className={styles.titleBale}>
            <div className={styles.logo}><img src={logo} /></div>
            <div className={styles.spans}>
              <span className={styles.title}>YIHENG JEWELRY CO.,LIMITED. </span>
              <span className={styles.text}>Website:http://www.yh925999.com  Email: sale@yh925999.com</span>
              <span className={styles.text}>Tel:+86 20-8482 4869   Fax:+86 20-8482 4859  Mobile:+86 013923093693</span>
              <span className={styles.text}>Add:2/F,Baoming Building ,Minli Industrial Area, Lanhe Town, Panyu, Guangzhou,China</span>
            </div>
          </div>
          <div className={styles.titleHint}>Silver Price= {data.sliverPrice} usd/g</div>
          <div className={styles.titleName}>Proforma Invoice</div>
          <div className={styles.line0}>
            <div className={styles.one}><span className={styles.textFontW}>Customer</span></div>
            <div className={styles.two}></div>
            <div className={styles.three}></div>
            <div className={styles.four}><span className={styles.textFontW}>Misc</span></div>
            <div className={styles.five}></div>
          </div>
          <div className={styles.line1}>
            <div className={styles.one}><span className={styles.textFontN}>Name</span></div>
            <div className={styles.two}><span className={styles.textFontN}>{data.customerName}</span></div>
            <div className={styles.three}></div>
            <div className={styles.four}><span className={styles.textFontN}>Date</span></div>
            <div className={styles.five}><span className={styles.textFontN}>{data.quoteDate}</span></div>
          </div>
          <div className={styles.line2}>
            <div className={styles.one}><span className={styles.textFontN}>Address</span></div>
            <div className={styles.two}><span className={styles.textFontN}>{data.address}</span></div>
            <div className={styles.three}></div>
            <div className={styles.four}><span className={styles.textFontN}>P.I.#</span></div>
            <div className={styles.five}><span className={styles.textFontN}>{data.quoteNumber}</span></div>
          </div>
          <div className={styles.line3}>
            <div className={styles.one}><span className={styles.textFontN}>City</span></div>
            <div className={styles.two}>
              <div className={styles.text}>
                <span className={styles.left}>{data.city}</span>
                <span className={styles.right}><span className={styles.lable}>Country</span>{data.country}</span>
              </div>
            </div>
            <div className={styles.three}></div>
            <div className={styles.four}><span className={styles.textFontN}>Shipper</span></div>
            <div className={styles.five}></div>
          </div>
          <div className={styles.line3}>
            <div className={styles.one}><span className={styles.textFontN}>Phone</span></div>
            <div className={styles.two}>
              <div className={styles.text}>
                <span className={styles.left}>{data.phone}</span>
                <span className={styles.right}><span className={styles.lable}>Fax</span>{data.fax}</span>
              </div>
            </div>
            <div className={styles.three}></div>
            <div className={styles.four}><span className={styles.textFontN}>customer Po</span></div>
            <div className={styles.five}></div>
          </div>
        </div>
        <div className={styles.info}>{data.remark}</div>
        <table border="1" cellSpacing="1" cellPadding="0" className={styles.table}>
          <tbody>
            <tr className={styles.tableTitle}>
              <th>No.</th>
              <th>Cus. Item#</th>
              <th>Picture</th>
              <th>Silver Net Wt(g)</th>
              <th>Stone Net Wt(g)</th>
              <th>Total Wt(g)</th>
              <th>Silver Price (usd/g)</th>
              <th>Labor Price (usd/g)</th>
              <th>Stone cost</th>
              <th>laser cost/pcs</th>
              <th>Packing cost/pcs</th>
              <th colSpan="2">Unit Price </th>
              <th>Color</th>
              <th>Qty</th>
              <th>Stone TLWt(g)</th>
              <th>TL Wt(G)</th>
              <th>Amount (USD)</th>
              <th className={styles.maxthwidth}>Remarks</th>
            </tr>

            {
              data.dts ? data.dts.map((i, k) => {
                return <tr className={styles.tableTrtd} key={k}>
                  <td>{i.seq}</td>
                  <td><span className={styles.spanw}>{i.cusItem}</span></td>
                  <td><img className={styles.imgw} src={i.picture} /></td>
                  <td>{i.silverNetWt}</td>
                  <td>{i.stoneNetWt}</td>
                  <td>{i.totalWt}</td>
                  <td>{i.silverPrice}</td>
                  <td>{i.laborPrice}</td>
                  <td>{i.stoneCost}</td>
                  <td>{i.laserCost}</td>
                  <td>{i.packingCost}</td>
                  <td>{i.unitPrice}</td>
                  <td>{i.currency}</td>
                  <td>{i.color}</td>
                  <td>{i.qty}</td>
                  <td>{i.stoneTLWt}</td>
                  <td>{i.tLWt}</td>
                  <td>{i.amount}</td>
                  <td className={styles.maxthwidth}>{i.remarks}</td>
                </tr>;
              }) :
                null
            }

            <tr className={styles.tableTitle}>
              <th colSpan="14" className={styles.total}>Subtotal:</th>
              <th>{data.totalQty}</th>
              <th>{data.totalStoneWt}</th>
              <th>{data.totalTLWt}</th>
              <th>{data.totalAmountName}</th>
              <th className={styles.maxthwidth}></th>
            </tr>

            <tr className={styles.tableTitle}>
              <th colSpan="14" className={styles.wu}></th>
              <th colSpan="3" className={styles.deposit}>Deposit:</th>
              <th colSpan="2" className={styles.deposit}>{data.advanceName}</th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class PrintTable extends Component {
  state = {
    datalist: [],
    loading: false
  };

  componentWillMount() {
    this.setState({ loading: true })

    const { id } = this.props;
    const params = { 'key': id };
    servicesConfig.getPrintInfo(params).then(res => {
      if (res && res.body && res.body.records) {
        this.setState({ datalist: res.body.records })
      }
      this.setState({ loading: false })
    });
  }


  exportExcel = () => {
    const { id } = this.props;
    var url = servicesConfig.getPrintInfoExcel({ 'key': id });
    window.location.href = url;
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

