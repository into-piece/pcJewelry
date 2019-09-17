import { Select } from 'antd';

const { Option } = Select;



const  EducationSelect = (props)=>{
  return <Select
    {...props}
    placeholder="请选择"
    defaultValue="0"
  >
    <Option value="0">请选择</Option>
    <Option value="1">小学</Option>
    <Option value="2">初中</Option>
    <Option value="3">专科</Option>
    <Option value="4">本科</Option>
    <Option value="5">研究生</Option>
  </Select>
}


export default EducationSelect;
