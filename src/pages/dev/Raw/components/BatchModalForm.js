import React, { Component } from 'react';
import { Col, Form, Row } from 'antd';
import UploadImg from '@/components/UploadImg';

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: {
    span: 13,
  },
};


@Form.create()
class ModalForm extends Component {


  render() {
    const { dev, returnElement, fileListFun } = this.props;
    let { arr } = this.props;
    let arrtemp = []
    arr = arr.filter(e => ['materialNo', 'zhName', 'enName'].indexOf(e.value) < 0);

    arrtemp = arr.map(e => {
      const  aa = {...e}
      if (['shape', 'cut', 'color', 'quality'].indexOf(e.value) >= 0) {
        aa.type = 6;
        aa.dfv = [];
      }
      return aa;
    });



    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form size="small" key="batchform">
        {arrtemp.map(({ key, value, noNeed, type, list, dfv, span, disable, noedit, number }) => {
          const col = !noedit ? <Col span={span || 12} key={`batch-${key}=${dfv}`}>
            <FormItem label={key} {...formLayout}>
              {
                getFieldDecorator(value, {
                  rules: [{
                    required: !noNeed,
                    message: `请${type && (type === 2 || type === 3 || type === 4) ? '选择' : '输入'}${key}`,
                  }],
                  initialValue: (dfv || ''),
                })(returnElement({ type, dev, list, disable, number }))
              }
            </FormItem>
          </Col> : null;
          if (type === 9) {
            return <Row key={`${key}=${dfv}`}>{col}</Row>;
          }
          return (col);
        })}
        {<Col span={18}>
          <FormItem
            label="上传图片"
            key="uploadPic"
            labelCol={{ span: 3 }}
            wrapperCol={{
              span: 20,
            }
            }
          >
            <UploadImg
              key="ucimg"
              maxcount={10}
              defaultFileList={[]}
              fileListFun={fileListFun}
            />
          </FormItem>
        </Col>}
      </Form>
    );
  }


}

export default ModalForm;
