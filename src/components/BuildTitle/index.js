import React, { PureComponent } from 'react';
import DragM from 'dragm';
import 'antd/dist/antd.css';

class BuildTitle extends PureComponent {
  updateTransform = transformStr => {
    // this.modalDom && this.modalDom.forEach(e => {
    //   e.style.transform = transformStr;
    // });
    Array.prototype.forEach.call(this.modalDom, function(element) {
      element.style.transform = transformStr;
    });
  };

  componentDidMount() {
    this.modalDom = document.getElementsByClassName('ant-modal-wrap');
  }

  render() {
    const { title } = this.props;
    return (
      <DragM updateTransform={this.updateTransform}>
        <div>{title}</div>
      </DragM>
    );
  }
}

export default BuildTitle;
