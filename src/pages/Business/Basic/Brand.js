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

@connect(({ loading, basic }) => {
  const { rtnCode, head } = basic;
  return {
    listLoading: loading.effects['basic/fetchListBrands'],
    addloading: loading.effects['basic/addBrand'],
    deleteloading: loading.effects['basic/deleteBrand'],
    upateloading: loading.effects['basic/updateBrand'],
    freezing: loading.effects['basic/freeBrand'],
    body: basic.body,
    rtnCode,
    head,
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
      showList: [],
      rowHeight: 0,
      isEdit: true,
      update:false,
      isAdd:true,
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

    const { showList, current ,isAdd} = this.state;

    form.validateFields((err, fieldsValue) => {

      if (err) return;


      if (isAdd) {

        dispatch({
          type: 'basic/addBrand',
          payload: {
            ...fieldsValue,
          },
        });
      } else {
        const temp = { ...fieldsValue };
        current.brandNo = temp.brandNo;
        current.brandZhName = temp.brandZhName;
        current.brandEnName = temp.brandEnName;

        // console.log('update ' + Object.keys(current));
        dispatch({
          type: 'basic/updateBrand',
          payload: {
            ...current,
          },
        });
      }
      this.state.showList=[];
      this.state.showList.push(current);
      this.setState({
        visible: false,

      });
    });
  };


  handleDone = () => {
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

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 8,
    };

    const { selectedRowKeys, visible, current = {}, isEdit ,update} = this.state;


    const { listLoading, body = {},dispatch,addloading,deleteloading,upateloading ,freezing} = this.props;


    if(addloading||deleteloading||upateloading||freezing)
    {
      this.state.update=true;
    }else
    {
      if(update)
      {
        dispatch({
          type: 'basic/fetchListBrands',
          payload: {
          },
        });
        this.state.update=false;
      }

    }

    if(listLoading&&body&&body.data&&body.data.length>0)
    {
      const newdata = body.data.map((value)=>{
         const s= value.status;
        if(s==0)
        {
          value.status='草稿'
        }else if(s==1)
        {
          value.status='使用中'
        }else if(s==2)
        {
          value.status='冻结'
        }
        return value;
      })

      this.state.data = newdata;
    }

    const rtnCode = body.rtnCode;

    console.log('rntCode' + rtnCode);


    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };


    // console.log('user = ' + Object.keys(body));
    // console.log('count = ' + body.data);

    const getModalContent = () => {
      if (this.state.done) {
        return (
          <Result
            type="success"
            title="操作成功"
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

                  loading={listLoading}
                  pagination={paginationProps}
                  dataSource={this.state.data}
                  filterMultiple={false}
                  selectedRows={1}
                  type={'radio'}
                  rowSelection={rowSelection}
                  size={'small'}
                  columns={clientContentColumns}
                />

                <Modal
                  title={this.state.done ? null : `任务${current.brandNo ? '编辑' : '添加'}`}
                  className={styles.standardListForm}
                  width={640}
                  bodyStyle={this.state.done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
                  destroyOnClose
                  visible={visible}
                  {...modalFooter}
                >
                  {getModalContent()}
                </Modal>

              </Card>
            </div>
          </Col>
          <Col lg={8} md={24}>
            <div className={styles.view_right_content}>
              <Card>
                {/*<div style={{ overflow: 'scroll', minHeight: window.innerHeight * 0.7, display: 'inline' }}>*/}
                <div>
              <span title="品牌信息"
                    style={{ marginBottom: 32, paddingLeft: 10, fontSize: 20, fontStyle: 'bold', color: '#00f' }}>
              品牌信息
              </span>

                  <Divider/>
                  <List
                    layout={'inline'}
                    itemLayout='vertical'
                    loading={false}
                    pagination={false}
                    size={'small'}
                    rowKey={'list-key'}
                    dataSource={this.state.showList}
                    renderItem={this.getRenderitem}
                    columns={false}
                  />

                </div>

                {/*</div>*/}

              </Card>

              {/*</Card>*/}
              <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5 }}>
                <Row gutter={2} >
                  <Col span={6} style={{textAlign:'center'}}>
                    <Button  type="primary" icon="plus" size={'small'}
                                         onClick={this.clickNewFrom}>新增</Button> </Col>
                  <Col span={6} style={{textAlign:'center'}}><Button type="danger" icon="delete" size={'small'} onClick={this.clickDeleteFrom}
                                        disabled={isEdit}>删除</Button></Col>
                  <Col span={6} style={{textAlign:'center'}}> <Button type="primary" size={'small'} onClick={this.clickEditFrom}
                                         disabled={isEdit} icon="edit">编辑</Button></Col>
                  <Col span={6} style={{textAlign:'center'}}> <Button size={'small'} type="primary" icon="lock" onClick={this.clickFreezeFrom}
                                         disabled={isEdit}>冻结</Button></Col>
                </Row>

              </Card>
            </div>

          </Col>

        </Row>
      </GridContent>


    );
  }

  clickNewFrom = () => {
    this.state.isAdd=true;
    this.setState({ visible: true, current: {} });
  };

  clickDeleteFrom = () => {
    const brandNo = this.state.showList[0];

    const { dispatch } = this.props;
    dispatch({
      type: 'basic/deleteBrand',
      payload: {
        ...brandNo,
      },
    });



    const empty = [];
    this.setState({
      selectedRowKeys: '',
      showList: empty,
      isExit: true,
    });

  };

  clickEditFrom = () => {
    this.state.isAdd=false;
    console.log('edit data');
    this.setState({
      current: this.state.showList[0],
      visible: true,
    });

  };


  clickFreezeFrom = () => {
    const brandNo = this.state.showList[0];

    const { dispatch } = this.props;
    dispatch({
      type: 'basic/freeBrand',
      payload: {
        ...brandNo,
      },
    });


  };


  selectChange = record => {

    console.log('select brand  ' + record.brandNo);
    let showList2 = [];
    let edit = false;
    if (record != '') {
      showList2.push(record);
    } else {
      edit = true;
    }

    this.setState({
      showList: showList2,
      isEdit: edit,
      current: record,
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


  getRenderitem = (item) => {
    return (

      <div style={{ marginLeft: 10, marginTop: 10 }}>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="品牌编号">{item.brandNo}</Description>
          <Description term="品牌英文">{item.brandEnName}</Description>
          <Description term="品牌中文">{item.brandZhName}</Description>
        </DescriptionList>
        {/* <Divider/>*/}
      </div>

    );


  };


}

export default Brand;
