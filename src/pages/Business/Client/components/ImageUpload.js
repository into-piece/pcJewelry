import React, { PureComponent } from 'react';
import { Icon, message, Upload ,Form} from 'antd'
import DescriptionList from '@/components/DescriptionList';;
const { Description } = DescriptionList;

@Form.create()
class ImageUpload extends PureComponent {


  constructor(props) {
    super(props);
    this.state={
      loading:false,
      innerFileList:[]
    }
  }


  render() {



    const handleChange = info => {

      console.log('info = ', info);
      let innerFileList = [...info.fileList];
      this.state.imageUrl = false;
      this.state.fileName = false;

      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => {
            let imageName;
            if (info.file)
              imageName = info.file.name;
            this.setState({
              imageUrl,
              imageName,
              loading: false,
            });
            this.state.imageUrl = imageUrl;
            this.state.fileName = imageName;
          },
        );
      }


      const file = info.file;

      const isJPG = (file.type.indexOf('image') != -1);
      if (!isJPG) {
        message.error('只能上传图片格式的文件');
        return;
      }

      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        message.error('上传图片不能大于 3MB!');
        return;
      }

      innerFileList = innerFileList.slice(-1);
      innerFileList = innerFileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });

      this.setState({ innerFileList });

    };


    const getBase64=(img, callback)=>{
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }



    const { fileList ,form: { getFieldDecorator }} = this.props;

    const {loading=false,innerFileList} = this.state;

    const list=fileList?fileList:innerFileList;


    return  (<Form.Item label="包装图片">
      {getFieldDecorator('upload', {
        valuePropName: 'fileList',
        getValueFromEvent: this.normFile,
      })(<Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      fileList={list}
      onChange={handleChange}
    >
      <div>
        <Icon type={loading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">上传图片</div>
      </div>
    </Upload>)}
    </Form.Item>);

  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

}

export  default ImageUpload;
