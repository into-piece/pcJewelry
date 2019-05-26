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
} from 'antd';
import styles from './brand.less';
import SvgUtil from './../../../utils/SvgUtil';
import { FormattedMessage } from 'umi-plugin-react/locale';
import formstyles from './BasicForm.less';
import Result from '@/components/Result';
import { connect } from 'dva';

const FormItem = Form.Item;
import DescriptionList from '@/components/DescriptionList';
import GridContent from '../../../components/PageHeaderWrapper/GridContent';

const { Description } = DescriptionList;


const clientContentColumns = [
  {
    title: '产品编号',
    dataIndex: 'brandNo',
    key: 'brandNo',
  },
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
  showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 10,
};

@connect(({ loading, basic }) => {
  const { rtnCode, head,rtnMsg } = basic;
  return {
    listLoading: loading.effects['basic/fetchListBrands'],
    addloading: loading.effects['basic/addBrand'],
    deleteloading: loading.effects['basic/deleteBrand'],
    upateloading: loading.effects['basic/updateBrand'],
    freezing: loading.effects['basic/freeBrand'],
    body: basic.body,
    rtnCode,
    head,
    rtnMsg
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
      requestState:'success',
      requestMes:'保存成功！',
      isLoading:false,
      selectIndexAt:-1,
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
         ...fieldsValue ,
          },
        });

        this.setState({
          selectedRowKeys: '',
          selectIndexAt:-1,
          showItem: false,
          isEdit: true,
        });

        // this.state.addSuccessData = temp;
      } else {
        const temp = { ...fieldsValue };
        const data = { ...showItem };
        data.brandNo = temp.brandNo;
        data.brandZhName = temp.brandZhName;
        data.brandEnName = temp.brandEnName;
        this.state.current ={...data};
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



    const { addSuccessData,selectedRowKeys,  current = {}, isEdit, update } = this.state;


    const { listLoading, body = {}, dispatch, addloading, deleteloading, upateloading, freezing } = this.props;


    this.state.isLoading = addloading || deleteloading || upateloading || freezing ||listLoading;

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

        console.log('rntCode=' + body.rtnCode);
        if(body.rtnCode==='000000')
        {
          this.state.requestState='success';
        }else {
          this.state.requestState='error';
        }

        this.state.requestMes =body.rtnMsg;
        console.log('result = '+this.state.requestMes)
        this.state.update = false;
        this.state.done = true;
        this.state.visible = true;
        if (this.state.isUpdateFrom) {
          this.state.isUpdateFrom = false;
          this.state.showItem = {...current};
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



    console.log('rntCode=' + body.rtnCode);


    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };



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
        <Form
          size={'small'}
          onSubmit={this.handleSubmit}>
          <FormItem label="品牌编号" {...this.formLayout}>
            {getFieldDecorator('brandNo', {
              rules: [{ required: true, message: '品牌编号' }],
              initialValue: current.brandNo,
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem label="中文名称" {...this.formLayout}>
            {getFieldDecorator('brandZhName', {
              rules: [{ required: true, message: '请输入中文名称' }],
              initialValue: current.brandZhName,
            })(
              <Input placeholder="请输入"/>,
            )}
          </FormItem>
          <FormItem label="英文名称" {...this.formLayout}>
            {getFieldDecorator('brandEnName', {
              rules: [{ required: true, message: '请输入品牌编号' }],
              initialValue: current.brandEnName,
            })(
              <Input placeholder="请输入"/>,
            )}
          </FormItem>
        </Form>
      );
    };

    const rowSelection = {
      selectedRowKeys,
      type: 'radio',
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
          <Col lg={16} md={24} className={styles.view_left_content}>
            <div>
              <div style={{ fontSize: 25, textAlign: 'vertical-center' }}>
                <Icon
                  style={{ width: 50, height: 50, paddingRight: 10, paddingTop: 10, paddingLeft: 10 }}
                  component={SvgUtil.award}/>
                <FormattedMessage id="app.client.menuMap.brand" defaultMessage="品牌"/>
              </div>
              <Card
                bordered={false}
                loading={false}

              >
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
                        this.selectChange(record,index)

                      }
                    };
                  }}
                  size='small'
                  columns={clientContentColumns}
                />

                <Modal
                  title={this.state.done ? null : `任务${current.brandNo ? '编辑' : '添加'}`}
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
              <span title="品牌信息"
                    style={{ marginBottom: 32, paddingLeft: 10, fontSize: 20, fontWeight: 'bold', color: '#35B0F4' }}>
              品牌信息
              </span>
                  <Divider/>
                  {(this.state.showItem) ? this.getRenderitem(this.state.showItem) : ''}

                </div>

                {/*</div>*/}

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
                          onClick={this.clickDeleteFrom}
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
    return index == this.state.selectIndexAt ? styles.row_select :"";
  };

  clickNewFrom = () => {
    this.state.isAdd = true;
    this.setState({ visible: true, current: {} });
  };

  clickDeleteFrom = () => {
    const brandNo = this.state.showItem;

    const { dispatch } = this.props;
    dispatch({
      type: 'basic/deleteBrand',
      payload: {
        ...brandNo,
      },
    });


    this.setState({
      selectedRowKeys: '',
      selectIndexAt:-1,
      showItem: false,
      isEdit: true,
    });

  };

  clickEditFrom = () => {
    this.state.isAdd = false;
    console.log('edit data');
    this.setState({
      current: this.state.showItem,
      visible: true,
    });

  };


  clickFreezeFrom = () => {
    const brandNo = this.state.showItem;

    const { dispatch } = this.props;
    dispatch({
      type: 'basic/freeBrand',
      payload: {
        ...brandNo,
      },
    });


  };


  selectChange = (record,index) => {

    console.log('select brand  ' + Object.keys(record));
    // let showList2 = [];
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
    console.log('select key = ' + Object.keys(selectedRows));
    // this.setState({ selectedRowKeys });

    this.setState({
      selectedRowKeys,
    });
  };

  selectRowItem = () => {
    console.log('select the item');
  };


  getRenderitem = (item) => {
    return (
      <span style={{ marginLeft: 10, marginTop: 10 }} onClick={this.selectRowItem}>
        <DescriptionList className={styles.headerList} size='small' col='1'>
        <Description term='品牌编号'>{item.brandNo}</Description>
        <Description term='品牌英文'>{item.brandEnName}</Description>
        <Description term='品牌中文'>{item.brandZhName}</Description>
        </DescriptionList>
        {/* <Divider/>*/}
        </span>

    );
  };


}

export default Brand;
