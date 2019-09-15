import { Modal } from 'antd';

const onCancel = function onCancel(){
  return Promise.resolve('close');
}
const ModalConfirm =(params)=> {

  const { title, content, okText, cancelText,onOk } = params;
  Modal.confirm({
    title: title||'温馨提示',
    content:content||'请确认您的操作',
    okText: okText || '确认',
    cancelText: cancelText || '取消',
    onOk,
    onCancel
  });
}

export default ModalConfirm;
