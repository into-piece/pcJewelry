import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import {
  Spin,
  Button,
  notification,
  Select
} from 'antd';
import moment from 'moment';
import JsBarcode from 'jsbarcode';
import styles from './index.less';
import servicesConfig from '@/services/purchase';
import HttpFetch from '../../../../utils/HttpFetch';

import logoImg from '../../../../assets/logo1.png';
import barCodeImg from '../../../../assets/bar-code.png';


class ComponentToPrint extends Component {

  state = {
    data: {},
    details: []
  }

  componentWillReceiveProps(nextProps) {
    var list = nextProps.list;
    if (list.length !== 0) {
      var details = this.detailIntegration(list[0]);
      this.setState({ data: list[0], details: details });

      // 生产条形码
      JsBarcode(this._barcodeSVG, list[0].productNo.substring(0, 9),
        {
          format: "CODE39",
          height: 55,
          width: 1
        }
      );
    }
  }

  detailIntegration = data => {
    var coslength = data.costDetails.length;
    var materiallength = data.materialDetails.length;
    let length = 0;
    let list = [];
    if (coslength > materiallength) {
      length = coslength;
    } else {
      length = materiallength;
    }
    for (var i = 0; i < length; i++) {
      var obj = { ...data.materialDetails[i], ...data.costDetails[i] };
      list.push(obj);
    }
    return list;
  }

  render() {
    const { data, details } = this.state;

    return (
      <div>
        <table border="1" cellSpacing="1" cellPadding="0" className={styles.table}>
          <tr>
            <th colSpan="2"><img style={{ width: '118px', height: '106px' }} src={logoImg} /></th>
            <th colSpan="7">
              <div className={styles.titleTh}>
                <span className={styles.title}>成本清单</span>
                <span className={styles.barCode}>
                  <svg ref={(ref) => this._barcodeSVG = ref}></svg>
                </span>
              </div>
            </th>
            <th colSpan="2" rowsPan="3"><img style={{ width: '150px', height: '150px' }} src={data.productPic} /></th>
          </tr>

          <tr className={styles.trtd}>
            <td style={{ width: '9%' }}>客户</td>
            <td style={{ width: '9%' }}>{data.customerNo}</td>
            <td style={{ width: '9%' }}>产品编号</td>
            <td colSpan="2" style={{ width: '18%' }}>{data.productNo}</td>
            <td style={{ width: '9%' }}>客户货号</td>
            <td colSpan="3" style={{ width: '27%' }}>{data.customerProductNo}</td>
          </tr>

          <tr className={styles.trtd}>
            <td>重量</td>
            <td>{data.finishedWeight}</td>
            <td>产品说明</td>
            <td colSpan="6">{data.productDesc}</td>
          </tr>

          <tr className={styles.title01}>
            <th colSpan="9">物料明细</th>
            <th colSpan="2">工费明细</th>
          </tr>

          <tr className={styles.title02}>
            <th style={{ width: '9%' }}>类别</th>
            <th style={{ width: '27%' }} colSpan="3">名称</th>
            <th style={{ width: '9%' }}>用量</th>
            <th style={{ width: '9%' }}>单价</th>
            <th style={{ width: '9%' }}>损耗</th>
            <th style={{ width: '11%' }}>银重</th>
            <th style={{ width: '9%' }}>物料总价</th>
            <th style={{ width: '9%' }}>流程</th>
            <th style={{ width: '9%' }}>工费</th>
          </tr>

          {
            details.length !== 0 ? details.map((i, k) => {
              return <tr className={styles.trtd} key={k}>
                <td>{i.materialType}</td>
                <td colSpan="3">{i.zhName}</td>
                <td>{i.singleDosage}</td>
                <td>{i.price}</td>
                <td>{i.attritionRate}</td>
                <td>{i.silverW}</td>
                <td>{i.materialTP}</td>
                <td>{i.flowName}</td>
                <td>{i.cost}</td>
              </tr>;
            }) :
              null
          }

          <tr className={styles.title03}>
            <th colSpan="7">合计：</th>
            <th>{data.silverTW}</th>
            <th>{data.materialTP}</th>
            <th>总工费：</th>
            <th>{data.wageTC}</th>
          </tr>

          <tr className={styles.title03}>
            <th colSpan="6">产品总价：</th>
            <th>{data.productTP}</th>
            <th>工费(PCS)：</th>
            <th>{data.costPCS}</th>
            <th>工费(G)：</th>
            <th>{data.costG}</th>
          </tr>
        </table>
        <div className={styles.motivatingWords}>
          <span className={styles.words}>心态：把自己当老板来工作！ 方法：用心做好每一件事！ 坚持：习惯成自然！ 愿景：活在希望中！</span>
          <span className={styles.date}>{moment(new Date()).format('YYYY/MM/DD hh:mm')}</span>
        </div>
      </div>
    );
  }
}

class PrintTable extends Component {
  state = {
    bomList: [],
    datalist: [],
    selectLoading: false,
    loading: false,
    selectValue: false
  };

  componentWillMount() {
    const { id } = this.props;
    this.getBomDropDown(id).then(() => {
      const { bomList } = this.state;
      var id = bomList[0].id;
      this.setState({ selectValue: id });
      this.handelSelectBom(id);
    });

  }

  handelSelectBom = value => {
    this.setState({ selectValue: value });
    this.getProductBillCost(value);
  }

  getBomDropDown = (id) => {
    return new Promise((resolve) => {
      const _this = this;
      _this.setState({ selectLoading: true });
      const params = {
        'key': id
      };
      fetch(HttpFetch.getBomDropDown, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
      })
        .then(response => response.json())
        .then(d => {
          const { body } = d;
          var records = body.records;
          _this.setState({ bomList: records, selectLoading: false });
          resolve();
        })
        .catch((ex) => {
          _this.setState({ selectLoading: false })
        });
    })
  }

  getProductBillCost = id => {
    this.setState({ loading: true })
    const params = {
      'key': id
    };
    fetch(HttpFetch.getProductBillCost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const { body } = d;
        var records = body.records;
        this.setState({ datalist: records, loading: false });
      })
      .catch((ex) => {
        this.setState({ loading: false })
      });
  }

  exportExcel = () => {
    const { selectValue } = this.state;

    let bomid = selectValue;
    let url = `${HttpFetch.getBillOfCostExcel}?key=${bomid}`
    location.href = url;
  };


  render() {
    const { bomList, selectValue } = this.state;
    const { Option } = Select;

    return (
      <div>
        <div className={styles.btnDiv}>

          <span className={styles.spanLabel}>BOM名称</span>
          <Select
            className={styles.selectControl}
            showSearch
            value={selectValue}
            style={{ width: 150 }}
            placeholder="请选择"
            optionFilterProp="children"
            size="small"
            onSelect={this.handelSelectBom}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              bomList.map(d => (
                <Option key={d.id} value={d.id}>{d.bName}</Option>
              ))
            }
          </Select>

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

