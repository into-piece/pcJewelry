import { Radio } from 'antd';

const  YoNRadio = (props)=>{
  return <Radio.Group {...props}>
    <Radio.Button value="1">是</Radio.Button>
    <Radio.Button value="0">否</Radio.Button>
  </Radio.Group>
}


export default YoNRadio;
