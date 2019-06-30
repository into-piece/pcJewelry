import React, { Component } from 'react';
import {
  Table,
  Card,
  Row,
  Col,
  Icon,
  Form,
  Select,
  Modal,
  Input,
  Button,
  Divider,
  List,
  message,
} from 'antd';
import styles from './brand.less';
import SvgUtil from './../../../utils/SvgUtil';
import { FormattedMessage } from 'umi-plugin-react/locale';
import formstyles from './BasicForm.less';
import Result from '@/components/Result';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';

const FormItem = Form.Item;
import DescriptionList from '@/components/DescriptionList';
import GridContent from '../../../components/PageHeaderWrapper/GridContent';

const { Description } = DescriptionList;


const clientContentColumns = [

  {
    title: '中文名称',
    dataIndex: 'brandZhName',
    key: 'brandZhName',
  },
  {
    title: '英文名称',
    dataIndex: 'brandEnName',
    key: 'brandEnName',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
];

const paginationProps = {
  // showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 10,
};

@connect(({ loading, basic }) => {
  const { rtnCode, head, rtnMsg } = basic;
  return {
    listLoading: loading.effects['basic/fetchListBrands'],
    addloading: loading.effects['basic/addBrand'],
    deleteloading: loading.effects['basic/deleteBrand'],
    upateloading: loading.effects['basic/updateBrand'],
    freezing: loading.effects['basic/freeBrand'],
    body: basic.body,
    rtnCode,
    head,
    rtnMsg,
  };
})

@Form.create()
class Brand extends Component {

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
      rowHeight: 0,
      isEdit: true,
      update: false,
      // addSuccessData: false,
      isUpdateFrom: false,
      // isAddFrom: false,
      isAdd: true,
      requestState: 'success',
      requestMes: '保存成功！',
      isLoading: false,
      rowData: [],
      rowSelectedData: [],
      selectIndexAt: -1,
    };
  }

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };


  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form, rtnCode = {} } = this.props;


    const { showItem, isAdd } = this.state;

    form.validateFields((err, fieldsValue) => {

      if (err) return;


      if (isAdd) {

        dispatch({
          type: 'basic/addBrand',
          payload: {
            ...fieldsValue,
          },
        });

        this.setState({
          selectedRowKeys: '',
          rowData: [],
          selectIndexAt: -1,
          showItem: false,
          isEdit: true,
        });

        // this.state.addSuccessData = temp;
      } else {
        const temp = { ...fieldsValue };
        const data = { ...showItem };
        data.brandZhName = temp.brandZhName;
        data.brandEnName = temp.brandEnName;
        this.state.current = { ...data };
        if (data.status === '冻结')
          data.status = 2;
        else if (data.status === '使用中')
          data.status = 1;
        else if (data.status === '草稿')
          data.status = 0;


        // console.log('update ' + Object.keys(current));
        dispatch({
          type: 'basic/updateBrand',
          payload: {
            ...data,
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
      type: 'basic/fetchListBrands',
    });

    this.setState({
      visible: false,
      done: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };


  componentDidMount() {
    //
    const { dispatch } = this.props;
    dispatch({
      type: 'basic/fetchListBrands',
    });


  }


  componentWillUnmount() {

  }


  render() {


    const { addSuccessData, selectedRowKeys, current = {}, isEdit, update } = this.state;


    const { listLoading, body = {}, dispatch, addloading, deleteloading, upateloading, freezing } = this.props;


    this.state.isLoading = addloading || deleteloading || upateloading || freezing || listLoading;

    if (addloading || deleteloading || upateloading || freezing) {
      this.state.update = true;
      if (upateloading) {
        this.state.isUpdateFrom = true;
      }

      // if(addloading)
      // {
      //   this.state.isAddFrom = true;
      // }

    } else {
      if (update) {

        // console.log('rntCode=' + body.rtnCode);
        if (body.rtnCode === '000000') {
          this.state.requestState = 'success';
        } else {
          this.state.requestState = 'error';
        }

        this.state.requestMes = body.rtnMsg;
        // console.log('result = ' + this.state.requestMes);
        this.state.update = false;
        this.state.done = true;
        if (this.state.isUpdateFrom) {
          this.state.isUpdateFrom = false;
          this.state.showItem = { ...current };
        }


      }

    }

    if (listLoading && body && body.data && body.data.length > 0) {
      const newdata = body.data.map((value) => {
        const s = value.status;
        if (s == 0) {
          value.status = '草稿';
        } else if (s == 1) {
          value.status = '使用中';
        } else if (s == 2) {
          value.status = '冻结';
        }
        return value;
      });

      this.state.data = newdata;
    }


    // console.log('rntCode=' + body.rtnCode);


    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };


    if (this.state.done) {
      if (this.state.requestState == 'success') {
        message.success(this.state.requestMes);
      } else {
        message.error(this.state.requestMes);
      }
      this.handleDone();
    }

    const getModalContent = () => {

      return (
        <Form
          size={'small'}
          onSubmit={this.handleSubmit}>

          <FormItem label="英文名称" {...this.formLayout}>
            {getFieldDecorator('brandEnName', {
              rules: [{ required: true, message: '请输入品牌编号' }],
              initialValue: current.brandEnName,
            })(
              <Input placeholder="请输入"/>,
            )}
          </FormItem>
          <FormItem label="中文名称" {...this.formLayout}>
            {getFieldDecorator('brandZhName', {
              rules: [{ message: '请输入中文名称' }],
              initialValue: current.brandZhName,
            })(
              <Input placeholder="请输入"/>,
            )}
          </FormItem>
        </Form>
      );
    };

    const rowSelection = {
      selectedRowKeys,
      type: 'checkbox',
      onChange: this.onSelectChange,
      onSelect: this.selectChange,
    };


    const {
      form: { getFieldDecorator },
    } = this.props;


    return (

      <GridContent>
        <Row gutter={24}
             className={styles.row_content}>
          <Col lg={16} md={24}>
            <div
              className={styles.view_left_content}
            >
              <div style={{ fontSize: 25, textAlign: 'vertical-center' }}>
                <Icon
                  style={{ width: 50, height: 50, paddingRight: 10, paddingTop: 10, paddingLeft: 10 }}
                  component={SvgUtil.diamond}/>
                <FormattedMessage id="app.basic.menuMap.brand" defaultMessage="品牌"/>
              </div>
              <Card
                bordered={false}
                loading={false}

              >
                <Table
                  loading={this.state.isLoading}
                  pagination={paginationProps}
                  dataSource={this.state.data}
                  rowSelection={rowSelection}
                  rowKey={record =>
                    record.id
                  }
                  bordered={false}
                  onRow={record => {
                    return {
                      onClick: event => {
                        this.clickRowItem(record);
                      },
                    };
                  }}
                  rowClassName={this.onSelectRowClass}
                  size='middle'
                  columns={clientContentColumns}
                />

                <Modal
                  title={this.state.done ? null : `任务${current.id ? '编辑' : '添加'}`}
                  className={styles.standardListForm}
                  width={640}
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
              <Card
                bordered={false}
              >
                {/*<div style={{ overflow: 'scroll', minHeight: window.innerHeight * 0.7, display: 'inline' }}>*/}
                <div>
              <span
                style={{ marginBottom: 32, paddingLeft: 10, fontSize: 20, fontWeight: 'bold', color: '#35B0F4' }}>
              品牌信息
              </span>
                  <Divider/>
                  {(this.state.showItem) ? this.getRenderitem(this.state.showItem) : ''}

                </div>

              </Card>

              {/*</Card>*/}
              <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5 }}>
                {/*    <Row gutter={2}>
                  <Col lg={6} style={{ textAlign: 'center' }}>
                    <Button type="primary" icon="plus" size={'small'}
                            onClick={this.clickNewFrom}>新增</Button> </Col>
                  <Col lg={6} style={{ textAlign: 'center' }}><Button type="danger" icon="delete" size={'small'}
                                                                      onClick={this.clickDeleteFrom}
                                                                      disabled={isEdit}>删除</Button></Col>
                  <Col lg={6} style={{ textAlign: 'center' }}> <Button type="primary" size={'small'}
                                                                       onClick={this.clickEditFrom}
                                                                       disabled={isEdit} icon="edit">编辑</Button></Col>
                  <Col lg={6} style={{ textAlign: 'center' }}> <Button size={'small'} type="primary" icon="lock"
                                                                       onClick={this.clickFreezeFrom}
                                                                       disabled={isEdit}>冻结</Button></Col>
                </Row>*/}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Button className={styles.buttomControl} type="primary" icon="plus" size={'small'}
                          onClick={this.clickNewFrom}>新增</Button>
                  <Button className={styles.buttomControl} type="danger" icon="delete" size={'small'}
                          disabled={isEdit}>删除</Button>
                  <Button className={styles.buttomControl} type="primary" size={'small'} onClick={this.clickEditFrom}
                          disabled={isEdit} icon="edit">编辑</Button>
                  <Button className={styles.buttomControl} size={'small'} type="primary" icon="lock"
                          onClick={this.clickFreezeFrom}
                          disabled={isEdit}>冻结</Button>
                </div>

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
    return color;
  };


  clickNewFrom = () => {
    this.state.isAdd = true;
    this.setState({ visible: true, current: {} });
  };


  clickRowItem = (record) => {

    const { selectedRowKeys, rowSelectedData } = this.state;
    let rowData = this.state.rowData;
    // const selects = selectedRowKeys ? selectedRowKeys : [];
    const selects = selectedRowKeys ? selectedRowKeys : [];
    const id = record.id;



    if (selects.includes(id)) {
      selects.splice(selects.findIndex(index => index === id), 1);
      if(rowData.includes(record))
        rowData=[]
      if (rowSelectedData.includes(record)) {
        // console.log('includes ' + record.id);
        rowSelectedData.splice(rowSelectedData.findIndex(item => item.id === id), 1);
        // rowData.splice(rowData.findIndex(item => item.id === id), 1);
      }
    } else {

      // console.log("record is ",rowData)
      if (rowData.length > 0) {
        selects.splice(selects.findIndex(index => index === rowData[0].id), 1);
      }
      rowData=[];
      rowData.push({ ...record });
      selects.push(id);
      // rowData.push(record)
      rowSelectedData.push(record);



      // console.log("record puth ",rowData)
    }

    if (selects.length > 0) {
      const recordK = selects[selects.length - 1];
      // const r = rowData.filter(value => value.id == recordK);
      const r = rowSelectedData.filter(value => value.id == recordK);

      this.showSelectItem(r[0]);
    } else {
      this.setState({
        showItem: false,
        isEdit: true,
        current: false,
      });
    }
    this.setState({
      selectedRowKeys: [].concat(selects),
      rowData,
    });

    // this.showSelectItem(record)
  };

  clickDeleteFrom = () => {
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'basic/deleteBrand',
      payload: { 'list': selectedRowKeys },
    });


    this.setState({
      selectedRowKeys: '',
      rowData: [],
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
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'basic/freeBrand',
      payload: { 'list': selectedRowKeys },
    });


  };


  selectChange = (record, index) => {

    // console.log('select brand  ' + Object.keys(record));


  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('onSelectChage');
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);


    if (selectedRowKeys.length > 0) {
      const recordK = selectedRowKeys[selectedRowKeys.length - 1];
      const record = selectedRows.filter(value => value.id == recordK);
      // this.showSelectItem(selectedRows[selectedRows.length-1])
      this.showSelectItem(record[0]);
    } else {
      this.setState({
        showItem: false,
        isEdit: true,
        current: false,
      });
    }
    this.setState({
      selectedRowKeys,
      // rowData:selectedRows
      rowSelectedData: selectedRows,
    });
  };

  showSelectItem = record => {
    let edit = false;
    if (record === '') {
      edit = true;
    }
    this.setState({
      showItem: { ...record },
      isEdit: edit,
      current: record,
      // selectIndexAt: index,
    });
  };

  selectRowItem = () => {
    // console.log('select the item');
  };


  getRenderitem = (item) => {
    return (
      <span style={{ marginLeft: 10, marginTop: 10 }} onClick={this.selectRowItem}>
        <DescriptionList className={styles.headerList} size='small' col='1'>
        <Description term='品牌英文'>{item.brandEnName}</Description>
        <Description term='品牌中文'>{item.brandZhName}</Description>
        </DescriptionList>
        {/* <Divider/>*/}
        </span>

    );
  };


}

export default Brand;
