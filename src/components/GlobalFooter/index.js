import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const GlobalFooter = ({ className, links, copyright }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <footer className={clsString}>
      <div className={styles.desc}>心态：把自己当做老板来工作！方法：用心做好每一件事！坚持：习惯成为自然！愿景：活在希望中！</div>
      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </footer>
  );
  //2019广州格尚珠宝有限公司
};

export default GlobalFooter;
