/*
*
* 右边详情内容部分
* */
import React, { Component } from 'react';

import {
  Table, Divider, Radio, Button,
} from 'antd';
import SbTable from '@/components/Table';

import moment from 'moment';
import styles from './SplitTable.less';


class SplitTable extends Component {

  columns = [
    {
      title: <div>序号</div>,
      dataIndex: 'piType',
      key: 'indexx',
      render: (d, i, no) => (no + 1),

    },
    {
      title: <div>订单类别</div>,
      dataIndex: 'piType',
      key: 'piType2Name',
      render: (d, i) => (i.piTypeName),

    },
    {
      title: <div>订单号码</div>,
      dataIndex: 'piNo',
      key: 'p2iNo',
    }, {
      title: <div>客户编号</div>,
      dataIndex: 'customerNo',
      key: 'custome2rNo',
    },
    {
      title: <div>终客编号</div>,
      dataIndex: 'endNo',
      key: 'end22No',
    },
    {
      title: <div>要求交货日期</div>,
      dataIndex: 'deliveryTime',
      key: 'deli2veryTime',
      render: data => moment(data || new Date()).format('YYYY-MM-DD'),
    }
    ,
    {
      title: <div>总数</div>,
      dataIndex: 'totalCount',
      key: 'totalC2ount',
    },

    {
      title: <div>总重</div>,
      dataIndex: 'totalWeightQuotation',
      key: 'totalWeightQuotatio2n',
    },
    {
      title: <div>币种</div>,
      dataIndex: 'currency',
      key: 'currency2',
    },
    {
      title: <div>金额</div>,
      dataIndex: 'totalQuotation',
      key: 'totalQuotation2',
    },
    {
      title: <div>主材价</div>,
      dataIndex: 'mainMaterialPrice',
      key: 'mainMaterialPrice2',
    },
    {
      title: <div>客户采购单号</div>,
      dataIndex: 'poNo',
      key: 'poNo2',
    },
    {
      title: <div>操作</div>,
      dataIndex: '',
      key: 'operatecr',
      render: (v, i, index) => {
        return <div
          onClick={() => {
          this.cancelGroup(v, i, index);
        }}
          style={{ cursor: 'pointer', color: '#2eabff' }}
        >取消
        </div>;
      },
    }];

  columnsson = [
    {
      title: <div>产品类型</div>,
      dataIndex: 'productTypeName',
      key: 'productTypeName',

    }, {
      title: <div>产品编号</div>,
      dataIndex: 'productNo',
      key: 'productNo',

    },
    {
      title: <div>产品名称</div>,
      dataIndex: 'zhName',
      key: 'zhName',

    },
    {
      title: <div>客户货号</div>,
      dataIndex: 'custoerProductNo',
      key: 'custoerProductNo',

    },
    {
      title: <div>产品重量</div>,
      dataIndex: 'finishedWeight',
      key: 'finishedWeight',

    },
    {
      title: <div>实际工费</div>,
      dataIndex: 'actualCount',
      key: 'actualCount',

    },
    {
      title: <div>此次工费</div>,
      dataIndex: 'nowCount',
      key: 'nowCount',

    },
    {
      title: <div>字印价</div>,
      dataIndex: 'markingPrice',
      key: 'markingPrice',

    },
    {
      title: <div>包装价</div>,
      dataIndex: 'packPrice',
      key: 'packPrice',

    },
    {
      title: <div>单价</div>,
      dataIndex: 'price',
      key: 'price',

    },
    {
      title: <div>订单数量</div>,
      dataIndex: 'totalCount',
      key: 'totalCount',

    },
    {
      title: <div>订单金额</div>,
      dataIndex: 'totalQuotation',
      key: 'totalQuotation',

    },
    {
      title: <div>订单重量</div>,
      dataIndex: 'totalWeightQuotation',
      key: 'totalWeightQuotation',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      topList: props.data,
      bottomList: [],
      selectedRowKeys: [],
    };
  }

  componentWillReceiveProps(nextprops) {
    this.setState({ topList: nextprops.data, bottomList: [], selectedRowKeys: [] });
  }

  expandedRowRender = (record) => {
    return <Table
      scroll={{ x: 1000 }}
      columns={this.columnsson}
      dataSource={record.sondata}
      pagination={false}
    />;
  };

  clearState = () => {
    this.setState({
      topList: [],
      bottomList: [],
      selectedRowKeys: [],
    });
  };

  cancelGroup = (v, i, index) => {
    const { topList, bottomList } = this.state;
    const tembottom = bottomList.filter(e => e.id !== i.id);
    const temtop = [...topList, ...i.sondata];
    this.setState({ topList: temtop, bottomList: tembottom });
  };

  manualSplit = () => {
    const { topList, bottomList, selectedRowKeys } = this.state;
    const { piData } = this.props;

    const sondata = topList.filter(e => selectedRowKeys.some(s => s === e.id));
    const temTopList = topList.filter(e => selectedRowKeys.every(s => s !== e.id));

    const tembottomItem = { ...piData, sondata };

    const temBottomList = [...bottomList, tembottomItem];

    this.setState({ topList: temTopList, bottomList: temBottomList });

  };

  autoSplit = () => {
    const { topList } = this.state;
    const { piData } = this.props;
    const tempBottomList = [];
    const tempsonlist = {};
    topList.map(e => {
      if (tempsonlist[e.productTypeName]) {
        tempsonlist[e.productTypeName].push(e);
      } else {
        tempsonlist[e.productTypeName] = [e];
      }
    });
    for (const key in tempsonlist) {
      tempBottomList.push({ ...piData, sondata: tempsonlist[key] });
    }
    this.setState({ topList: [], bottomList: tempBottomList });

  };

  onSelectChange = (keys) => {
    this.setState({ selectedRowKeys: keys });
  };

  render() {
    const { onSelectChange, autoSplit, manualSplit } = this;
    const { topList, bottomList, selectedRowKeys } = this.state;
    const { loading, piData } = this.props;


    return (<div className={styles.SplitTable}>
      <span className={styles.tabletitle}>待拆数据</span>
      <div className={styles.mergedivtitle}>共<span>{topList.length}</span>条待拆数据</div>
      <Divider className={styles.divider} />
      <SbTable
        columns={this.columnsson}
        scroll={{ x: 'max-content' }}

        body={{ records: topList }}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={onSelectChange}
        listLoading={loading}
        pagination={false}
      />
      <div className={styles.buttomdiv}>
        <Button
          key="shrink"
          className={styles.buttomControl}
          type="primary"
          icon="fork"
          size="small"
          onClick={autoSplit}
        >
            自动成组
        </Button>
        <Button
          key="arrows-alt"
          className={styles.buttomControl}
          type="primary"
          icon="fork"
          size="small"
          disabled={(selectedRowKeys.length <= 1)}
          onClick={manualSplit}
        >
            成组
        </Button>
      </div>

      <span className={styles.tabletitle}>成组预览</span>
      <Divider className={styles.divider} />

      <Table
        columns={this.columns}
        scroll={{ x: 'max-content' }}
        dataSource={bottomList}
        loading={loading}
        expandedRowRender={(record) => {
            return this.expandedRowRender(record);
          }}
        pagination={false}
      />
            </div>
    );
  }
};

export default SplitTable;
