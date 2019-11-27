/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 01:25:53
 * @LastEditTime: 2019-08-17 15:24:31
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import styles from './index.less';
import HttpFetch from '@/utils/HttpFetch';
import { getCurrentUser } from '../../utils/authority';


class UploadVideo extends Component {

  constructor(props) {
    super(props);

    const defaultFileList = props.defaultFileList || [];
    const dflist = defaultFileList.map((e) => {
      return { url: e.videoPath, thumbUrl: e.videoPath, uid: e.id, status: 'done' };
    });
    if (props.fileListFun) props.fileListFun(dflist);

    this.state = {
      loading: false,
      fileList: dflist,
    };
  }

  // Upload变动
  handleChange = info => {
    let fileList = [...info.fileList];
    const { file } = info;
    const {  fileListFun } = this.props;

    // if (file.type) {
    //   const isJPG = file.type.indexOf('image') !== -1;
    //   if (!isJPG) {
    //     message.error('只能上传视频格式的文件');
    //     return;
    //   }
    // }

    fileList = fileList.slice(0, fileList.length - 1);


    if (fileListFun) fileListFun(fileList);

    this.setState({ fileList });
  };


  render() {
    const {  handleChange, props, state } = this;
    const { fileList, loading } = state;

    return [
      <Upload
        // accept='image/*'
        beforeUpload={() => {
          return false;
        }}

        name="file"
        action={HttpFetch.uploadVideo}
        method='POST'
        header={{'token': getCurrentUser() ? getCurrentUser().token : '',}}
        withCredentials

        onPreview={(e) => {
          window.open(e.url);
        }}
        key="antdUploadvideo"
        listType='picture-card'
        fileList={fileList}
        onChange={handleChange}
      >
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">上传视频</div>
        </div>
      </Upload>,
    ];

  }
}

export default UploadVideo;
