import React, { PureComponent } from 'react';
import { Table, Card, Row, Col, Icon, Form, Select, Modal, Input, Button, Divider } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import styles from './Royalty.less';
import GridContent from '../../../components/PageHeaderWrapper/GridContent';
import { realTimeQuotes } from '@/utils/SvgUtil';
import formstyles from './BasicForm.less';
import Result from '@/components/Result';
import DescriptionList from '@/components/DescriptionList';
import { statusConvert } from '@/utils/convert';
import BuildTitle from '@/components/BuildTitle';

const FormItem = Form.Item;

const realTimeQuotesContentColumns = [
  // pName 商品
  // bidprice 回购
  // askprice 销售
  // high 最高
  // low 最低
  // perVal 涨跌
  {
    title: '商品',
    dataIndex: 'pName',
    key: 'pName',
  },
  {
    title: '回购',
    dataIndex: 'bidprice',
    key: 'bidprice',
  },
  {
    title: '销售',
    dataIndex: 'askprice',
    key: 'askprice',
  },
  {
    title: '最高',
    dataIndex: 'high',
    key: 'high',
  },
  {
    title: '最低',
    dataIndex: 'low',
    key: 'low',
  },
  {
    title: '涨跌',
    dataIndex: 'perVal',
    key: 'perVal',
  },
];

const { Description } = DescriptionList;

@connect(({ loading, realTimeQuotes }) => {
  const { rtnCode, rtnMsg } = realTimeQuotes;
  return {
    listLoading: loading.effects['realTimeQuotes/fetchListrealTimeQuotes'],
    body: realTimeQuotes.body,
    data: realTimeQuotes.body.data,
    modals:realTimeQuotes,
    rtnCode,
    rtnMsg,
  };
})
@Form.create()
class RealTimeQuotes extends PureComponent {
  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      visible: false,
      done: false,
      list: [],
      selectedRowKeys: [],
      showItem: false,
      isEdit: true,
      update: false,
      isUpdateFrom: false,
      isAdd: true,
      requestState: 'success',
      requestMes: '保存成功！',
      isLoading: false,
      selectIndexAt: -1,
      pagination: {
        current: 1,
        size: 10,
      },
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { pagination } = this.state;
    dispatch({
      type: 'realTimeQuotes/fetchListrealTimeQuotes',
      payload: {},
    });
  }


  returnTotal = total => (
    <p>
      <FormattedMessage id="app.table.total" defaultMessage="" />
      {total}
      <FormattedMessage id="app.table.totalEnd" defaultMessage="" />
    </p>
  );

  render() {
    const { selectedRowKeys = [], current = {}, isAdd, isEdit, update } = this.state;

    const {
      listLoading,
      body = {},
      dispatch,
      form: { getFieldDecorator },
    } = this.props;

    this.state.isLoading =   listLoading;


    if (listLoading && body && body.data && body.data.length > 0) {

      this.state.data = newdata;
    }

    // console.log('rntCode=' + body.rtnCode+",data = "+(body.data));

    const rowSelection = {
      selectedRowKeys,
      type: 'radio',
      onChange: this.onSelectChange,
      onSelect: this.selectChange,
    };


    const onChange = (pagination, filters, sorter) => {
      const { current: currentIndex, pageSize } = pagination;
      dispatch({
        type: 'realTimeQuotes/fetchListrealTimeQuotes',
        payload: { current: currentIndex, size: pageSize },
      });
    };
    const paginationProps = {
      showQuickJumper: true,
      pageSize: 10,
      showTotal: this.returnTotal,
      total: body.total,
    };
    return (
      <GridContent>
        <Row gutter={24} className={styles.row_content}>
          <Col lg={24} md={24}>
            <div className={styles.view_left_content}>
              <div style={{ fontSize: 25, textAlign: 'vertical-center' }}>
                <Icon
                  style={{
                    width: 50,
                    height: 50,
                    paddingRight: 10,
                    paddingTop: 10,
                    paddingLeft: 10,
                  }}
                  component={realTimeQuotes}
                />
                <FormattedMessage id="app.basic.menuMap.realTimeQuotes" defaultMessage="实时行情" />
              </div>


              <Card bordered={false} loading={false}>
                <Table
                  loading={this.state.isLoading}
                  // pagination={paginationProps}
                  dataSource={this.state.data}
                  filterMultiple={false}
                  bordered={false}
                  selectedRows={1}
                  rowClassName={this.onSelectRowClass}
                  onRow={(record, index) => {
                    return {
                      onClick: event => {
                        this.selectChange(record, index);
                      },
                    };
                  }}
                  size="middle"
                  columns={realTimeQuotesContentColumns}
                  onChange={onChange}
                />
              </Card>
            </div>
          </Col>

        </Row>
      </GridContent>
    );
  }

  onSelectRowClass = (record, index) => {
    let color = '';
    if (index % 2 == 0) {
      color = styles.row_normal;
    }

    return index == this.state.selectIndexAt ? styles.row_select : color;
    // return index == this.state.selectIndexAt ? styles.row_select :"";
  };


  selectChange = (record, index) => {
    let edit = false;
    if (record === '') {
      edit = true;
    }

    this.setState({
      showItem: { ...record },
      isEdit: edit,
      current: record,
      selectIndexAt: index,
    });
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('onSelectChage');
    // console.log('select key = ' + Object.keys(selectedRows));

    this.setState({
      selectedRowKeys,
    });
  };



}

export default RealTimeQuotes;
