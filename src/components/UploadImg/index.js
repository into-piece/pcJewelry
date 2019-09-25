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
import 'cropperjs/dist/cropper.css';

class UploadImg extends Component {
  state = {
    loading: false,
    fileList: [],
    cropperVisible: false,
  };


  // Upload变动
  handleChange = info => {

    let fileList = [...info.fileList];
    const { file } = info;
    const { maxcount,fileListFun } = this.props;

    if (file.type) {
      const isJPG = file.type.indexOf('image') != -1;
      if (!isJPG) {
        message.error('只能上传图片格式的文件');
        return;
      }
    }

    fileList = fileList.slice(-maxcount);
    fileList = fileList.map(f => {
      // console.log('image is the ', file);
      if (f.response) {
        f.url = f.response.url;
      }
      if (!f.url) {
        this.getBase64(f.originFileObj, imageUrl => {
          fileList.forEach((v, i) => {
            if (v.uid === info.file.uid) {
              fileList[i].url = imageUrl;
              // console.log("change file name =  ", v.name, info.file)
              this.setState({
                fileList,
                cropperVisible: true,
                uploadFile: imageUrl,
                uploadFileUid: v.uid,
              });
            }
          });
        });
      }

      return f;
    });
    if(fileListFun)fileListFun(fileList);
    this.setState({ fileList });
  };

  handleCropSubmit = () => {
    const { uploadFileUid, fileList } = this.state;
    const {  fileListFun } = this.props;

    const cropImage = this.refs.cropper.getCroppedCanvas().toDataURL();

    fileList.forEach((v, i) => {
      if (v.uid === uploadFileUid) {
        fileList[i].name = `crop${  Date.parse(new Date())  }${fileList[i].name}`;
        fileList[i].url = cropImage;
        fileList[i].thumbUrl = cropImage;
      }
    });
    if(fileListFun)fileListFun(fileList);

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
          viewMode={1} // 定义cropper的视图模式
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
        listType='picture-card'
        fileList={fileList || []}
        onChange={handleChange}
      >
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">上传图片</div>
        </div>
      </Upload>,
      <Modal {...modalCropperFooter} width={668} destroyOnClose visible={cropperVisible}>
        {openCutImageModal()}
      </Modal>,
    ];

  }
}

export default UploadImg;
