/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 01:25:53
 * @LastEditTime: 2019-08-17 15:24:31
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import Cropper from 'react-cropper';
import styles from './index.less';
import HttpFetch from '@/utils/HttpFetch';
import 'cropperjs/dist/cropper.css';
import { getCurrentUser } from '../../utils/authority';


class UploadImg extends Component {

  constructor(props) {
    super(props);

    const defaultFileList = props.defaultFileList || [];
    const dflist = defaultFileList.map((e) => {
      return { url: e.picPath, thumbUrl: e.picPath, uid: e.id, status: 'done' };
    });
    if (props.fileListFun) props.fileListFun(dflist);

    this.state = {
      loading: false,
      fileList: dflist,
      cropperVisible: false,
    };
  }

  // Upload变动
  handleChange = info => {
    let fileList = [...info.fileList];
    const { file } = info;
    const { maxcount, fileListFun } = this.props;

    if (file.type) {
      const isJPG = file.type.indexOf('image') !== -1;
      if (!isJPG) {
        message.error('只能上传图片格式的文件');
        return;
      }
    }

    // if (maxcount && fileList.length > maxcount) {
    //   message.error(`只能上传${maxcount}张图片`);
    //   return;
    // }

    fileList.map(f => {
      if (f.uid === info.file.uid && !f.url) {
        this.getBase64(f.originFileObj, imageUrl => {
          // fileList[i].url = imageUrl;
          this.setState({
            cropperVisible: true,
            uploadFile: imageUrl,
            uploadFileUid: f.uid,
          });
        });
        fileList = fileList.slice(0, fileList.length - 1);
      }
      return f;
    });

    if (fileListFun) fileListFun(fileList);

    this.setState({ fileList });
  };

  handleCropSubmit = () => {
    const { uploadFileUid, fileList } = this.state;
    const { fileListFun } = this.props;
    this.setState({ loading: true });
    const _this = this;
    const cropImage = this.refs.cropper.getCroppedCanvas().toDataURL();
    this.refs.cropper.getCroppedCanvas().toBlob((b) => {

      const formData = new FormData();
      formData.append('file', b, `img${  Math.random(1)  }.png`);
      fetch(HttpFetch.uploadImg, {
        method: 'POST',
        headers: {
          'token': getCurrentUser() ? getCurrentUser().token : '',
        },
        body: formData,
      })
        .then(response => response.json())
        .then(d => {
          if (d.head && d.head.rtnCode === '000000') {
            fileList.push({url:d.body.records[0].savePath, thumbUrl: d.body.records[0].savePath, uid:`imgid${Math.random(1)}`, status: 'done'});
            _this.setState({ loading: false, fileList });
            if (fileListFun) fileListFun(fileList);

          } else {
            message.error('上传图片失败');
          }
        }).catch(function(ex) {
        message.error('上传图片失败');
        _this.setState({ loading: false });

      });

    });


    if (fileListFun) fileListFun(fileList);

    this.setState({
      cropperVisible: false,
      fileList,
      cropImage,
    });
  };

  handleCropCancle = () => {
    this.setState({
      cropperVisible: false,
      cropImage: '',
      uploadFileUid: '',
    });
  };

  openCutImageModal = () => {

    const { uploadFile } = this.state;

    return (
      <div className={styles.cropper_view}>
        <Cropper
          ref="cropper"
          src={uploadFile}
          className={styles.cropper}
          style={{ height: '400px', width: '400px' }}
          preview=".img-preview"
          cropBoxResizable={false}
          viewMode={0} // 定义cropper的视图模式
          dragMode="move"
          guides
          background
          aspectRatio={1 / 1}
          // crop={this.crop}
        />
        <div className={styles.cropper_preview}>
          <div className="img-preview" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    );
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };


  render() {
    const { openCutImageModal, handleChange, props, state } = this;
    const { fileList, loading, cropperVisible } = state;
    const modalCropperFooter = {
      okText: '保存',
      onOk: this.handleCropSubmit,
      onCancel: this.handleCropCancle,
    };
    return [
      <Upload
        accept='image/*'
        name='avatar'
        beforeUpload={() => {
          return false;
        }}
        onPreview={(e) => {
          window.open(e.url);
        }}
        key="antdUpload"
        listType='picture-card'
        fileList={fileList}
        onChange={handleChange}
      >
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">上传图片</div>
        </div>
      </Upload>,
      <Modal maskClosable={false} {...modalCropperFooter} width={668} destroyOnClose visible={cropperVisible}>
        {openCutImageModal()}
      </Modal>,
    ];

  }
}

export default UploadImg;
