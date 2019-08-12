import React from 'react';
import { Breadcrumb } from 'antd';

const { Item } = Breadcrumb;

export default ({ data }) => (
  <Breadcrumb>
    {
      data.map(({ name, link }) => (
        <Item key={name}>
          {link ? <a href={link}>{name}</a> : name}
        </Item>
      ))
    }
  </Breadcrumb>
)
