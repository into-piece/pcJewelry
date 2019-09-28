import React, { Component } from 'react';

class TableSortView extends Component {
  state = {
    sort: 'normal',
  }

  sortAscend = () => {
    const { sort } = this.state;
    // console.log(' sort asc ', sort);
    const sorter = sort === 'ascend' ? 'normal' : 'ascend';

    this.setState({
      sort: sorter,
    });
  };

  sortDescend = () => {
    const { sort } = this.state;
    // console.log(' sort desc ', sort);
    const sorter = sort === 'descend' ? 'normal' : 'descend';
    this.setState({
      sort: sorter,
    });
  };

  sortNormal = () => {

  };

  toggleSort = () => {

    // console.log("toggleSort")

    const { sortChange, field } = this.props;

    const { sort } = this.state;
    let sorter;
    if (sort === 'ascend') {
      sorter = 'normal';
    } else if (sort === 'normal') {
      sorter = 'descend';
    } else if (sort === 'descend') {
      sorter = 'ascend';
    }

    this.setState({
      sort: sorter,
    });

    if (sortChange)
      sortChange(field, sorter)

  };


  render() {
    const { sort } = this.state;
    const { column, titleFontSize } = this.props;
    // ant-table-column-has-actions ant-table-column-has-sorters ant-table-column-sort
    // backgroundColor:sort==='normal'?'':'#ccc'
    return (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', height: '100%', width: '100%' }} onClick={this.toggleSort}>

      <span className={titleFontSize === 'small' ? " ant-table-column-title antd-pro-pages-business-business-small_font" : "ant-table-column-title "} style={{ fontSize: '0.9em!important' }}>{column} </span>

      <span className="ant-table-column-sorter">
        <div title="排序" className="ant-table-column-sorter-inner ant-table-column-sorter-inner-full">

          <i
            aria-label="图标: caret-up"
            className={sort === 'ascend' ? 'anticon anticon-caret-up ant-table-column-sorter-up  on' : 'anticon anticon-caret-up ant-table-column-sorter-up off'}
          ><svg
            viewBox="0 0 1024 1024"
            className=""
            data-icon="caret-up"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
              <path
                d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
              />
            </svg>
          </i>
          <i
            aria-label="图标: caret-down"
            className={sort === 'descend' ? 'anticon anticon-caret-down ant-table-column-sorter-down on' : 'anticon anticon-caret-down ant-table-column-sorter-down off'}
          ><svg
            viewBox="0 0 1024 1024"
            className=""
            data-icon="caret-down"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
              <path
                d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
              />
            </svg>
          </i>
        </div>
      </span>
    </div>
    );
  }

}

export default TableSortView;
