// import React, { PureComponent } from 'react';
// import { Icon, message, Upload, Form, Card, Spin, Select } from 'antd';
// import querystring from 'querystring';
// import { queryTerminalList, queryTerminalNoList } from '../../../../utils/HttpFetch';
// import { getCurrentUser } from '../../../../utils/authority';

// const { Option } = Select;

// const empty = {
//   id: '',
//   endNo: '---请选择---',
//   endShotName: '---请选择---',
// };
// import { connect } from 'dva';

// class TerminalSelected extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: '',
//       isFirst: true,
//       records: [],
//       firstSelected: true,
//     };
//   }

//   componentDidMount() {
//     const { content } = this.props;
//     this.fetchListParams(content);
//   }

//   handleChange = value => {
//     debugger;
//     // console.log('terminalSelected handleChange', value);
//     const { onChange, onSelectEndName } = this.props;
//     const { records } = this.state;
//     this.setState({
//       value,
//       isFirst: false,
//     });
//     onChange(value);
//     if (onSelectEndName) {
//       let endName = '';
//       const r = records.filter((v, index) => {
//         if (v.id === value) {
//           return true;
//         }
//       });
//       if (r.length > 0) endName = r[0];
//       onSelectEndName(endName.customerNo, endName.shotName);
//     }
//   };

//   render() {
//     const { value, isFirst, loading } = this.state;
//     const { content } = this.props;

//     let showValue;
//     if (isFirst) {
//       showValue = content;
//       if (!showValue) showValue = '';
//       // if (!showValue) this.fetchList('');
//       // if (showValue) this.fetchListParams(showValue)
//     } else {
//       showValue = value;

//       // showValue = '';
//     }

//     // console.log('ts ... value ', showValue);
//     return (
//       <Select
//         loading={loading}
//         value={showValue}
//         defaultActiveFirstOption={false}
//         showArrow={false}
//         onChange={this.handleChange}
//         notFoundContent={null}
//         {...this.props}
//       >
//         {this.getEndNo()}
//       </Select>
//     );
//   }

//   getEndNo() {
//     const { records } = this.state;
//     // console.log('endNo is ', records);
//     return this.getOption(records);
//   }

//   getOption = list => {
//     if (!list || list.length < 1) {
//       // console.log('empity');
//       return (
//         <Option key={0} value={0}>
//           没有找到选项
//         </Option>
//       );
//     }

//     if (
//       list.filter(v => {
//         if (v.id == '') return true;
//       }).length == 0
//     )
//       list.unshift(empty);

//     return list.map(item => (
//       // const str = item.name+'/'+item.namePinyin+"/"+item.nameEn
//       <Option key={item.id} value={item.id}>
//         {item.customerNo}
//       </Option>
//     ));
//   };

//   fetchList = item => {
//     let params = {};
//     params.endNo = item;
//     params.size = 10;
//     const mythis = this;
//     // fetch('/server/business/end-customer/listEndCustomer', {
//     fetch(queryTerminalNoList, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         token: getCurrentUser() ? getCurrentUser().token : '',
//       },
//       body: JSON.stringify(params),
//     })
//       .then(response => response.json())
//       .then(d => {
//         const body = d.body;
//         if (body && body.records) {
//           // if (body.records.length > 0) {
//           let records = body.records;
//           // console.log("terminal records ",records)
//           let value = '';
//           if (!records) records = [];

//           // console.log('list update ', records);
//           mythis.setState({
//             records,
//             value,
//             loading: false,
//           });
//           // console.log('image  data ', imageObject);
//           // return;
//         } else {
//           // }
//           mythis.setState({
//             loading: false,
//             records: [],
//           });
//         }
//       })
//       .catch(function(ex) {
//         console.log('parsing failed', ex);
//         // message.error('加载图片失败！');
//         mythis.setState({
//           loading: false,
//           records: [],
//         });
//       });

//     // }
//   };

//   fetchListParams = item => {
//     // console.log(" the fetchListParams ",item)
//     let params = {};
//     if (item) params.id = item;
//     const mythis = this;
//     // fetch('/server/business/end-customer/listEndCustomer', {
//     fetch(queryTerminalNoList, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         token: getCurrentUser() ? getCurrentUser().token : '',
//       },
//       body: JSON.stringify(params),
//     })
//       .then(response => response.json())
//       .then(d => {
//         const body = d.body;
//         if (body && body.records) {
//           let records = body.records;
//           if (!records) records = [];
//           else {
//             const { onSelectEndName } = this.props;
//             const id = records[0].id;
//             if (onSelectEndName) {
//               if (item) {
//                 let endName = '';
//                 const r = records.filter(v => {
//                   if (v.id === id) {
//                     return true;
//                   }
//                 });
//                 if (r.length > 0) endName = r[0];

//                 onSelectEndName(endName.customerNo, endName.shotName);
//               } else {
//                 // console.log("设置默认值 ")
//                 onSelectEndName(empty.endShotName);
//               }
//             }
//           }
//           mythis.setState({
//             records,
//             loading: false,
//           });
//           // console.log('image  data ', imageObject);
//           // return;
//         } else {
//           // }
//           mythis.setState({
//             loading: false,
//             records: [],
//           });
//         }
//       })
//       .catch(function(ex) {
//         console.log('parsing failed', ex);
//         // message.error('加载图片失败！');
//         mythis.setState({
//           loading: false,
//           records: [],
//         });
//       });

//     // }
//   };

//   // shouldComponentUpdate(nextProps, nextState, nextContext) {
//   //   console.log('shouldComponentUpdate');
//   //
//   //   return true;
//   // }
// }

// export default TerminalSelected;

import React, { PureComponent } from 'react';
import { Icon, message, Upload, Form, Card, Spin, Select } from 'antd';
import querystring from 'querystring';

import HttpFetch from '../../../../utils/HttpFetch';
import JewelrySelect from '../../../components/JewelrySelect';

const { Option } = Select;

class BasicMeasureListSelect extends JewelrySelect {
  getUrl = () => {
    return HttpFetch.queryTerminalNoList;
  };

  getOptionList = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }

    return list.map(item => (
      // const str = item.name+'/'+item.namePinyin+"/"+item.nameEn
      <Option key={item.id} value={item.id}>
        {item.customerNo}
      </Option>
    ));
  };
}

export default BasicMeasureListSelect;
