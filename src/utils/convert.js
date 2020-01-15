import { formatMessage } from 'umi/locale';

export const statusConvert = {
  0:'输入',
  1:'使用中',
  2:'已审批',
};

export const YoNConvert = {
  0:'否',
  1:'是',
};
export const HasConvert = {
  0:'无',
  1:'有',
};
export const genderConvert = {
  0:'女',
  1:'男',
};


export const ableConvert = {
  0:'禁用',
  2:'启用',
};


export const numberConvert = (i,n=2)=>{
  return  i.toFixed(n);
}
