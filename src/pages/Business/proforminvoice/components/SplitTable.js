/*
*
* 右边详情内容部分
* */

import {
  Table, Divider, Radio, Button,
} from 'antd';
import SbTable from '@/components/Table';

import moment from 'moment';


class SplitTable extends Component {

  columns = [
    {
      title: <div>序号</div>,
      dataIndex: 'piType',
      key: 'indexx',
      render: (d, i,no) => (no+1),

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
      dataIndex: 'poNo',
      key: 'operater',
      render: (v, i) => {
        return <div onClick={this.cancelGroup(i.id)} style={{ color: '#2eabff' }}>取消</div>;
      },
    }];

  columnsson = [
    {
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
    this.state={
      topList:props.data,
      bottomList:[],
      selectedRowKeys:[]
    }
  }

  expandedRowRender = (record, data) => {
    return <Table
      scroll={{ x: 1000 }}
      columns={this.columnsson}
      dataSource={data.sondata || []}
      pagination={false}
    />;
  };

  cancelGroup = (id) => {

  };



  onSelectChange=(keys)=>{
    this.setState({selectedRowKeys:keys});
  }

  render() {
    const {onSelectChange} =this
    const {topList,bottomList,selectedRowKeys} =this.state
    const {loading} =this.props



    return (<div>
        待拆数据
      <Divider />
      <SbTable
        columns={this.columnsson}
        scroll={{ x: 1000 }}
        body={{records:topList}}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={onSelectChange}
        listLoading={loading}
        pagination={false}
      />

      <div>
          自动成组
          成组
      </div>

        成组预览
      <Divider />
      <Table
        columns={this.columns}
        scroll={{ x: 1000 }}
        dataSource={bottomList}
        loading={loading}
        expandedRowRender={(record, index) => {
            this.expandedRowRender(record, bottomList[index]);
          }}
        pagination={false}
      />
    </div>
    );
  }
};

export default SplitTable;
