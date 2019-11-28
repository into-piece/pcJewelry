/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 01:25:53
 * @LastEditTime: 2019-08-17 15:24:31
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { Upload, Icon, Button } from 'antd';
import styles from './index.less';
import HttpFetch from '@/utils/HttpFetch';
import { getCurrentUser } from '../../utils/authority';


class UploadVideo extends Component {

  constructor(props) {
    super(props);

    const defaultFileList = props.defaultFileList || [];
    const dflist = defaultFileList.map((e) => {
      return { url: e.videoPath, thumbUrl: e.videoPath, uid: e.id, status: 'done',name:e.fileName ||e.videoPath.substring(e.videoPath.lastIndexOf('\\')+1,e.videoPath.length) };
    });
    if (props.fileListFun) props.fileListFun(dflist);
    console.log(dflist)
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

    fileList = fileList.filter(e=>e.status==='done').map(e=>{
      if(e.response){
        return {name:e.name,url:e.response.body.records[0].savePath, thumbUrl: e.response.body.records[0].savePath, uid:e.uid, status: 'done'}
      }
        return e
    })
    if (fileListFun) fileListFun(fileList);
  };


  render() {
    const {  handleChange, props, state } = this;
    const { fileList } = state;

    return [
      <Upload
        accept='video/*'
        // beforeUpload={() => {
        //   return false;
        // }}

        name="file"
        action={HttpFetch.uploadVideo}
        method='POST'
        header={{'token': getCurrentUser() ? getCurrentUser().token : '',}}
        withCredentials

        onPreview={(e) => {
          window.open(e.url);
        }}
        key="antdUploadvideo"
        listType='picture'
        className='upload-list-inline'
        defaultFileList={fileList}
        onChange={handleChange}
      >
        {/* <div> */}
        {/* <Icon type={ 'plus'} /> */}
        {/* <div className="ant-upload-text">上传视频</div> */}
        {/* </div> */}
        <Button>
          <Icon type="upload" /> 上传视频
        </Button>
      </Upload>,
    ];

  }
}

export default UploadVideo;
