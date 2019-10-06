import React, { PureComponent } from 'react';
import { Table, Card, Row, Col, Icon, Form, Select, Modal, Input, Button, Divider } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import styles from './Royalty.less';
import GridContent from '../../../components/PageHeaderWrapper/GridContent';
import { currency } from '@/utils/SvgUtil';
import formstyles from './BasicForm.less';
import Result from '@/components/Result';
import DescriptionList from '@/components/DescriptionList';
import {statusConvert} from '@/utils/convert';
import ModalConfirm from '@/utils/modal';

const FormItem = Form.Item;

const currencyContentColumns = [
  {
    title: '货币',
    dataIndex: 'currency',
    key: 'currency',
  },
  {
    title: '买入汇率',
    dataIndex: 'buyingRate',
    key: 'buyingRate',
  },
  {
    title: '现金购买价格',
    dataIndex: 'cashPurchasePrice',
    key: 'cashPurchasePrice',
  },
  {
    title: '现金销售价格',
    dataIndex: 'cashSellingPrice',
    key: 'cashSellingPrice',
  },
  {
    title: '现货销售价格',
    dataIndex: 'spotSellingPrice',
    key: 'spotSellingPrice',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
];



const { Description } = DescriptionList;

@connect(({ loading, currency }) => {
  const { rtnCode, rtnMsg } = currency;
  return {
    listLoading: loading.effects['currency/fetchListCurrency'],
    addloading: loading.effects['currency/addCurrency'],
    deleteloading: loading.effects['currency/deleteCurrency'],
    upateloading: loading.effects['currency/updateCurrency'],
    freezing: loading.effects['currency/freezeCurrency'],
    body: currency.body,
    data: currency.body.data,
    rtnCode,
    rtnMsg,
  };
})
@Form.create()
class Currency extends PureComponent {
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
      pagination:{
        current:1,
        size:10
      }
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { pagination } = this.state;
    dispatch({
      type: 'currency/fetchListCurrency',
      payload:pagination
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form, rtnCode = {} } = this.props;

    const { showItem, isAdd } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      if (isAdd) {
        // console.log('data = '+Object.keys({ ...fieldsValue}))

        dispatch({
          type: 'currency/addCurrency',
          payload: {
            ...fieldsValue,
          },
          callback: () => {
            this.setState({
              visible: false,
            });
          },
        });

        this.setState({
          selectedRowKeys: '',
          selectIndexAt: -1,
          showItem: false,
          isEdit: true,
        });
      } else {
        const temp = { ...fieldsValue };
        const data = { ...showItem };
        data.currency = temp.currency;
        data.bocConversionPrice = temp.bocConversionPrice;
        data.buyingRate = temp.buyingRate;
        data.cashPurchasePrice = temp.cashPurchasePrice;
        data.cashSellingPrice = temp.cashSellingPrice;
        data.spotSellingPrice = temp.spotSellingPrice;
        this.state.current = { ...data };
        if (data.status === '审批') data.status = 2;
        else if (data.status === '使用中') data.status = 1;
        else if (data.status === '输入') data.status = 0;

        // console.log('update ' + Object.keys(current));
        dispatch({
          type: 'currency/updateCurrency',
          payload: {
            ...data,
          },
          callback: () => {
            this.setState({
              visible: false,
            });
          },
        });
      }
      this.setState({
        visible: false,
      });
    });
  };

  handleDone = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'currency/fetchListCurrency',
      payload:{}
    });

    this.setState({
      done: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { selectedRowKeys = [], current = {}, isEdit, update } = this.state;

    const {
      listLoading,
      body = {},
      dispatch,
      addloading,
      deleteloading,
      upateloading,
      freezing,
      form: { getFieldDecorator },
    } = this.props;

    this.state.isLoading = addloading || deleteloading || upateloading || freezing || listLoading;
    if (addloading || deleteloading || upateloading || freezing) {
      this.state.update = true;
      if (upateloading) {
        this.state.isUpdateFrom = true;
      }
    } else if (update) {
      // console.log('rntCode=' + body.rtnCode);
      if (body.rtnCode === '000000') {
        this.state.requestState = 'success';
      } else {
        this.state.requestState = 'error';
      }

      this.state.requestMes = body.rtnMsg;
      // console.log('result = '+this.state.requestMes)
      this.state.update = false;
      this.state.done = true;
      this.state.visible = true;
      if (this.state.isUpdateFrom) {
        this.state.isUpdateFrom = false;
        this.state.showItem = { ...current };
      }
    }

    if (listLoading && body && body.data && body.data.length > 0) {
      const newdata = body.data.map(value => {
        const s = value.status;
        value.status = statusConvert[s];
        return  value;
      });

      this.state.data = newdata;
    }

    // console.log('rntCode=' + body.rtnCode+",data = "+(body.data));

    const rowSelection = {
      selectedRowKeys,
      type: 'radio',
      onChange: this.onSelectChange,
      onSelect: this.selectChange,
    };


    const getModalContent = () => {
      if (this.state.done) {
        return (
          <Result
            type={this.state.requestState}
            title={this.state.requestMes}
            description=""
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={formstyles.formResult}
          />
        );
      }


      return (
        <Form size="small" onSubmit={this.handleSubmit}>
          <FormItem label="币种" {...this.formLayout}>
            {getFieldDecorator('currency', {
              rules: [{ required: true, message: '请输入币种' }],
              initialValue: current.currency,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="买入汇率" {...this.formLayout}>
            {getFieldDecorator('buyingRate', {
              rules: [{ required: true, message: '请输入汇率' }],
              initialValue: current.buyingRate,
            })(<Input placeholder="请输入" type="number" />)}
          </FormItem>
          <FormItem label="现金购买价格" type="integer" {...this.formLayout}>
            {getFieldDecorator('cashPurchasePrice', {
              rules: [{ required: true, message: '请输入现金购买价格' }],
              initialValue: current.cashPurchasePrice,
            })(<Input placeholder="请输入" type="number" />)}
          </FormItem>
          <FormItem label="现金销售价格" {...this.formLayout}>
            {getFieldDecorator('cashSellingPrice', {
              rules: [{ required: true, message: '请输入现金销售价格' }],
              initialValue: current.cashSellingPrice,
            })(<Input placeholder="请输入" type="number" />)}
          </FormItem>
          <FormItem label="现货销售价格" {...this.formLayout}>
            {getFieldDecorator('spotSellingPrice', {
              rules: [{ required: true, message: '请输入现货销售价格' }],
              initialValue: current.spotSellingPrice,
            })(<Input placeholder="请输入" type="number" />)}
          </FormItem>
        </Form>
      );
    };

    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const onChange = (pagination, filters, sorter) => {
      const { current:currentIndex, pageSize } = pagination;
      dispatch({
        type: 'currency/fetchListCurrency',
        payload:{ current:currentIndex, size: pageSize }
      });

    };
    const  paginationProps = {
      showQuickJumper: true,
      pageSize: 10,
      total:body.total
    };
    return (
      <GridContent>
        <Row gutter={24} className={styles.row_content}>
          <Col lg={16} md={24}>
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
                  component={currency}
                />
                <FormattedMessage id="app.basic.menuMap.currency" defaultMessage="业务提成设当" />
              </div>
              <Card bordered={false} loading={false}>
                <Table
                  loading={this.state.isLoading}
                  pagination={paginationProps}
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
                  columns={currencyContentColumns}
                  onChange={onChange}

                />
                <Modal
                  maskClosable={false}
                  title={this.state.done ? null : `任务${current.brandNo ? '编辑' : '添加'}`}
                  width={640}
                  className={styles.standardListForm}
                  bodyStyle={this.state.done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
                  destroyOnClose
                  visible={this.state.visible}
                  {...modalFooter}
                >
                  {getModalContent()}
                </Modal>
              </Card>
            </div>
          </Col>
          <Col lg={8} md={24}>
            <div className={styles.view_right_content}>
              <Card bordered={false}>
                <div>
                  <span
                    title="币种&银价信息"
                    style={{
                      marginBottom: 32,
                      paddingLeft: 10,
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#35B0F4',
                    }}
                  >
                    币种&银价信息
                  </span>
                  <Divider />
                  {this.state.showItem ? this.getRenderitem(this.state.showItem) : ''}
                </div>
              </Card>

              {/* <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5 }}> */}
              {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> */}
              {/* <Button */}
              {/* className={styles.buttomControl} */}
              {/* type="primary" */}
              {/* icon="plus" */}
              {/* size="small" */}
              {/* onClick={this.clickNewFrom} */}
              {/* disabled */}
              {/* > */}
              {/* 新增 */}
              {/* </Button> */}
              {/* <Button */}
              {/* className={styles.buttomControl} */}
              {/* type="danger" */}
              {/* icon="delete" */}
              {/* size="small" */}
              {/* onClick={()=>{ModalConfirm({content:"确定删除吗？",onOk:()=>{this.clickDeleteFrom();}});}} */}
              {/* disabled */}
              {/* > */}
              {/* 删除 */}
              {/* </Button> */}
              {/* <Button */}
              {/* className={styles.buttomControl} */}
              {/* type="primary" */}
              {/* size="small" */}
              {/* onClick={this.clickEditFrom} */}
              {/* disabled */}
              {/* icon="edit" */}
              {/* > */}
              {/* 编辑 */}
              {/* </Button> */}
              {/* <Button */}
              {/* className={styles.buttomControl} */}
              {/* size="small" */}
              {/* type="primary" */}
              {/* icon="lock" */}
              {/* onClick={()=>{ModalConfirm({content:"确定审批吗？",onOk:()=>{this.clickFreezeFrom();}});}} */}
              {/* disabled */}
              {/* > */}
              {/* 审批 */}
              {/* </Button> */}
              {/* </div> */}
              {/* </Card> */}
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

  clickNewFrom = () => {
    this.state.isAdd = true;
    this.setState({ visible: true, current: {} });
  };

  clickDeleteFrom = () => {
    const RoyaltyNo = this.state.showItem;

    const { dispatch } = this.props;
    dispatch({
      type: 'royalty/deleteRoyalty',
      payload: {
        ...RoyaltyNo,
      },
    });

    this.setState({
      selectedRowKeys: '',
      selectIndexAt: -1,
      showItem: false,
      isEdit: true,
    });
  };

  clickEditFrom = () => {
    this.state.isAdd = false;
    this.setState({
      current: this.state.showItem,
      visible: true,
    });
  };

  clickFreezeFrom = () => {
    const royaltyNo = this.state.showItem;

    const { dispatch } = this.props;
    dispatch({
      type: 'royalty/freezeRoyalty',
      payload: {
        ...royaltyNo,
      },
    });
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

  selectRowItem = () => {
    // console.log('select the item');
  };

  getRenderitem = item => {
    return (
      <span style={{ marginLeft: 10, marginTop: 10 }} onClick={this.selectRowItem}>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="币种">{item.currency}</Description>
          <Description term="买入汇率">{item.buyingRate}</Description>
          <Description term="现金购买价格">{item.cashPurchasePrice}</Description>
          <Description term="现金销售价格">{item.cashSellingPrice}</Description>
          <Description term="现货销售价格">{item.spotSellingPrice}</Description>
        </DescriptionList>
        {/* <Divider/> */}
      </span>
    );
  };
}

export default Currency;
