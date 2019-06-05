import React, { PureComponent } from 'react';

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
  message,
} from 'antd';
import styles from './Royalty.less';
import GridContent from '../../../components/PageHeaderWrapper/GridContent';
import SvgUtil from '../../../utils/SvgUtil';
import formstyles from './BasicForm.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Result from '@/components/Result';
import { connect } from 'dva';
import DescriptionList from '@/components/DescriptionList';

const FormItem = Form.Item;
const clientContentColumns = [

  {
    title: '品质要求中文名称',
    dataIndex: 'qualityZhName',
    key: 'qualityZhName',
  },
  {
    title: '品质要求英文名称',
    dataIndex: 'qualityEnName',
    key: 'qualityEnName',
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
  pageSize: 5,
};
const { Description } = DescriptionList;

@connect(({ loading, requested }) => {
  const { rtnCode, rtnMsg } = requested;
  return {
    listLoading: loading.effects['requested/fetchListRequested'],
    addloading: loading.effects['requested/addRequested'],
    deleteloading: loading.effects['requested/deleteRequested'],
    upateloading: loading.effects['requested/updateRequested'],
    freezing: loading.effects['requested/freezeRequested'],
    body: requested.body,
    rtnCode,
    rtnMsg,
  };
})
@Form.create()
class Requested extends PureComponent {

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
      // multipleData: [],
      rowData:[],
      selectIndexAt: -1,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'requested/fetchListRequested',
    });
  }


  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form, rtnCode = {} } = this.props;


    const { showItem, isAdd } = this.state;

    form.validateFields((err, fieldsValue) => {

      if (err) return;


      if (isAdd) {

        console.log('data = ' + Object.keys({ ...fieldsValue }));

        dispatch({
          type: 'requested/addRequested',
          payload: {
            ...fieldsValue,
          },
        });

        this.setState({
          selectedRowKeys: '',
          rowData:[],
          selectIndexAt: -1,
          showItem: false,
          isEdit: true,
        });

      } else {
        const temp = { ...fieldsValue };
        const data = { ...showItem };
        data.qualityZhName = temp.qualityZhName;
        data.qualityEnName = temp.qualityEnName;
        this.state.current = { ...data };
        if (data.status === '冻结')
          data.status = 2;
        else if (data.status === '使用中')
          data.status = 1;
        else if (data.status === '草稿')
          data.status = 0;


        // console.log('update ' + Object.keys(current));
        dispatch({
          type: 'requested/updateRequested',
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
      type: 'requested/fetchListRequested',
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


  render() {

    const { selectedRowKeys = [], current = {}, isEdit, update } = this.state;


    const { listLoading, body = {}, dispatch, addloading, deleteloading, upateloading, freezing, form: { getFieldDecorator } } = this.props;

    this.state.isLoading = addloading || deleteloading || upateloading || freezing || listLoading;

    if (addloading || deleteloading || upateloading || freezing) {
      this.state.update = true;
      if (upateloading) {
        this.state.isUpdateFrom = true;
      }
    } else {
      if (update) {

        if (body.rtnCode === '000000') {
          this.state.requestState = 'success';
        } else {
          this.state.requestState = 'error';
        }

        this.state.requestMes = body.rtnMsg;
        this.state.update = false;
        this.state.done = true;
        // this.state.visible = true;
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


    console.log('rntCode=' + body.rtnCode + ',data = ' + (body.data));

    const rowSelection = {
      selectedRowKeys,
      type: 'checkbox',
      onChange: this.onSelectChange,
      onSelect: this.selectChange,
    };

    console.log(selectedRowKeys);

    if (this.state.done) {
      if (this.state.requestState == 'success') {
        message.success(this.state.requestMes);
      } else {
        message.error(this.state.requestMes);
      }
      this.handleDone();
    }


    const getModalContent = () => {
      // if (this.state.done) {
      //   return (
      //     <Result
      //       type={this.state.requestState}
      //       title={this.state.requestMes}
      //       description=""
      //       actions={
      //         <Button type="primary" onClick={this.handleDone}>
      //           知道了
      //         </Button>
      //       }
      //       className={formstyles.formResult}
      //     />
      //   );
      // }
      return (
        <Form
          size={'small'}
          onSubmit={this.handleSubmit}>
          <FormItem label="品质要求英文名称" {...this.formLayout}>
            {getFieldDecorator('qualityEnName', {
              rules: [{ required: true, message: '请输入英文名称' }],
              initialValue: current.qualityEnName,
            })(
              <Input placeholder="请输入"/>,
            )}
          </FormItem>
          <FormItem label="品质要求中文名" {...this.formLayout}>
            {getFieldDecorator('qualityZhName', {
              rules: [{ message: '请输入中文名称' }],
              initialValue: current.qualityZhName,
            })(
              <Input placeholder="请输入"/>,
            )}
          </FormItem>
        </Form>
      );
    };

    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };


    return (
      <GridContent>
        <Row gutter={24} className={styles.row_content}>
          <Col lg={16} md={24}>
            <div className={styles.view_left_content}>
              <div style={{ fontSize: 25, textAlign: 'vertical-center' }}>
                <Icon
                  style={{ width: 50, height: 50, paddingRight: 10, paddingTop: 10, paddingLeft: 10 }}
                  component={SvgUtil.award}/>
                <FormattedMessage id="app.basic.menuMap.requested" defaultMessage="品质要求"/>
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
                  // onRow={record => {
                  //   return {
                  //     onClick: event => {
                  //       this.clickRowItem(record);
                  //     },
                  //   };
                  // }}
                  bordered={false}
                  rowClassName={this.onSelectRowClass}
                  size='middle'
                  columns={clientContentColumns}
                />
                <Modal
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
              <Card
                bordered={false}
              >
                <div>
              <span title="品质要求"
                    style={{ marginBottom: 32, paddingLeft: 10, fontSize: 20, fontWeight: 'bold', color: '#35B0F4' }}>
              品质要求信息
              </span>
                  <Divider/>
                  {(this.state.showItem) ? this.getRenderitem(this.state.showItem) : ''}

                </div>
              </Card>


              <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5 }}>

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
    let color = '';
    if (index % 2 == 0) {
      color = styles.row_normal;
    }

    // return index == this.state.selectIndexAt ? styles.row_select : color;
    return color;
    // return index == this.state.selectIndexAt ? styles.row_select :"";
  };

  clickNewFrom = () => {
    this.state.isAdd = true;
    this.setState({ visible: true, current: {} });
  };

  clickDeleteFrom = () => {
    // const requestedNo = this.state.showItem;
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    // const data =  Array.from(multipleData)
    const data = [];
    data.push(selectedRowKeys);

    dispatch({
      type: 'requested/deleteRequested',
      payload:
      // ...requestedNo,
        { 'list': selectedRowKeys }
      ,
    });


    this.setState({
      selectedRowKeys: '',
      selectIndexAt: -1,
      rowData:[],
      showItem: false,
      isEdit: true,
    });

  };

  errorHandler = () => {
    message.warn('报错！');

  };

  clickEditFrom = () => {
    this.state.isAdd = false;
    this.setState({
      current: this.state.showItem,
      visible: true,
    });

  };


  clickRowItem = (record) => {


    const { selectedRowKeys , rowData} = this.state;
    const selects = selectedRowKeys?selectedRowKeys:[];
    const id = record.id
    if (selects.includes(id)) {
      console.log('包含');
      selects.splice(selects.findIndex(index=>index===id),1)
      if(rowData.includes(record))
      {
        console.log('includes '+record.id)
        rowData.splice(rowData.findIndex(item=>item.id===id),1)
      }
    } else {
      console.log('不包');
      selects.push(id)
      rowData.push(record)
    }

    if(selects.length>0)
    {
      const recordK = selects[selects.length - 1];
        const r = rowData.filter(value => value.id == recordK);
      this.showSelectItem(r[0])
    }else
    {
      this.setState({
            showItem: false,
            isEdit: true,
            current: false,
          });
    }

    // if (selects.length > 0) {
    //   const recordK = selectedRowKeys[selects.length - 1];
    //   const record = selectedRows.filter(value => value.id == recordK);
    //   // this.showSelectItem(selectedRows[selectedRows.length-1])
    //   this.setState({
    //     multipleData: selectedRowKeys,
    //   });
    //   this.showSelectItem(record[0]);
    // } else {
    //   this.setState({
    //     showItem: false,
    //     isEdit: true,
    //     current: false,
    //   });
    // }

    this.setState({
      selectedRowKeys: [].concat(selects),
    });

    console.log([].concat(selects))
  };



  clickFreezeFrom = () => {
    const { selectedRowKeys } = this.state;


    const { dispatch } = this.props;
    dispatch({
      type: 'requested/freezeRequested',
      payload: { 'list': selectedRowKeys },
    });


  };

  selectChange = (record, index) => {

    console.log('changle record  ' + Object.keys(record));
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('onSelectChage');
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);


    if (selectedRowKeys.length > 0) {
      const recordK = selectedRowKeys[selectedRowKeys.length - 1];
      const record = selectedRows.filter(value => value.id == recordK);
      // this.showSelectItem(selectedRows[selectedRows.length-1])
      // this.setState({
      //   multipleData: selectedRowKeys,
      // });
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
      rowData:selectedRows
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
    console.log('select the item');
  };


  getRenderitem = (item) => {
    return (
      <span style={{ marginLeft: 10, marginTop: 10 }} onClick={this.selectRowItem}>
        <DescriptionList className={styles.headerList} size='small' col='1'>
        <Description term='品质要求中文名'>{item.qualityZhName}</Description>
        <Description term='品质要求英文名'>{item.qualityEnName}</Description>
        <Description term='状态'>{item.status}</Description>
        </DescriptionList>
        {/* <Divider/>*/}
        </span>

    );
  };

}

export default Requested;
