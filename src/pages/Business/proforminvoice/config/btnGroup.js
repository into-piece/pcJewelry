import { piDetail, piHead } from './showItem';

const btnGroup = {
  piHead:[
    { name: '审批', tag: 'lock' ,icon:'lock'},
    { name: '合并', tag: 'merge' ,icon:"shrink"},
    { name: '拆分', tag: 'split' ,icon:"arrows-alt"},
  ],
  piDetail:[
    { name: '修改', tag: 'edit' },
  ],


}



export default btnGroup;
