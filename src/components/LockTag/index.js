import React from 'react'
import { Icon } from 'antd';
import { lockTag } from '@/utils/SvgUtil';
import styles from './index.less'

export default ({ children }) => (
  <div className={styles.symbol}>
    {/* <img src={logo} alt='logo' /> */}
    <div className={styles.block}>
      <Icon
        style={{
          width: 20,
          height: 20,
        }}
        component={lockTag}
      />
    </div>
    <span />
    {children}
  </div>
)
