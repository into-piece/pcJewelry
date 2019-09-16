import { Radio } from 'antd';

const  SexRadio = (props)=>{
  return <Radio.Group {...props}>
    <Radio.Button value={1}>男</Radio.Button>
    <Radio.Button value={0}>女</Radio.Button>
  </Radio.Group>
}


export default SexRadio;
