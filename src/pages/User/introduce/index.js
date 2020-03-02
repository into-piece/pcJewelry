import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage,getLocale} from 'umi-plugin-react/locale';
import router from 'umi/router';
import {getMenuPath} from '@/utils/utils';
import styles from './index.less';
import {getFlowMenu} from '@/services/user'

// const testArr1 = [{key:'1',value:"1",text:'one'},{key:'2',value:"2",text:'two'},{key:'3',value:"3",text:'three'}];
// const testArr2 = [{key:'1',value:"1",text:'one'}];
// const testArr3 = [{key:'1',value:"1",text:'one'},{key:'2',value:"2",text:'two'}];
// const testArr4 = [{key:'1',value:"1",text:'one'},{key:'2',value:"2",text:'two'},{key:'3',value:"3",text:'three'},{key:'4',value:"4",text:'four'}];
// const testArr5 = [{key:'1',value:"1",text:'one'}];

// const menuArr = [
//   { key: 'menu.erp.business.product', value: ['/erp/business/product','/erp/business/product','/erp/business/product'], text: '123123sdfsdf',arr:testArr1 },
//   { key: 'menu.erp.business.quote', value: ['/erp/business/quote'], text: '123' ,arr:testArr2},
//   { key: 'menu.erp.business.proforminvoice', value: ['/erp/business/proforminvoice','/erp/business/proforminvoice'], text: '123123sdfsdf' ,arr:testArr3},
//   { key: 'menu.erp.business.deliver', value: ['/erp/business/deliver','/erp/business/deliver'], text: '123123sdfsdf',arr:testArr4 },
//   { key: 'menu.erp.business.receiving', value: ['/erp/business/receiving'], text: '123123sdfsdf',arr:testArr5 }
// ]


const LOCALE_HEAD = 'menu.erp.user.'

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class Introduct extends Component {
  state = {
    contentText: '',
    showText: true,
    menuData:[]
  };

  componentDidMount(){
    this.getMenu()
  }

  onMouseEnter = (contentText) => {
    this.setState({
      // showText: true,
      contentText,
    });
  };

  onMouseLeave = () => {
    // this.setState({
    //   showText: false
    // })
  };

  getMenu = () => {
    getFlowMenu().then((res)=>{
      console.log(res)
      if(res.body.records&&res.body.records.length>0){
        this.setState({
          menuData:res.body.records
        })
      }
    })  
  }


  render() {
    const { onMouseEnter, onMouseLeave } = this;
    const { login, submitting } = this.props;
    const { showText, contentText,menuData} = this.state;
    const isZh = getLocale() === 'zh-CN'
    // console.log(" logi response  ",login)

    return (
      <div className={styles.main}>
        <p className={styles.title}>业务部流程</p>
        <div className={styles.cotent}>
          <ul className={styles.menu}>
            {menuData&&menuData.length>0&&menuData.map(({name,list }) =>
              <div className={styles.menu_title}>
                <li
                  key={name}
                  onMouseEnter={() => {
                  onMouseEnter(name);
                }}
                  onMouseLeave={() => {
                  onMouseLeave();
                }}
                
                >
                  <div className={styles.menu_li_content}>
                    <FormattedMessage id={`${LOCALE_HEAD}${name}`} />
                  </div>
                </li>
                <div className={styles.menu_line} style={list.length === 1?{margin:0}:{}} />
                <div className={styles.menu2_group} style={list.length === 1?{margin:0}:{}}>

                  <ul className={styles.menu2} style={list.length === 1?{padding:0}:{}}>
                    {list.map(({  zhName,path,enName,locale }) =>
                    {
                     return( 
                       <li
                         className={list.length === 1?styles.oneData:''}
                         key={zhName}
                         onMouseEnter={() => {
                           onMouseEnter(isZh?zhName:enName);
                          }}
                         onMouseLeave={() => {
                            onMouseLeave();
                          }}
                         onClick={()=>{
                            router.push(path);
                          }}
                       >
                         <FormattedMessage id={locale} />
                         {/* {zhName} */}
                       </li>
                     )
                      }
                    )}
                  </ul>
                </div>
              </div>
            )}
          </ul>


          {showText && <section className={styles.contentText}>
            {contentText}
          </section>}
        </div>
      </div>
    );
  }

}


export default Introduct;
