import React from 'react';
import { Result } from 'antd';
import 'antd/dist/antd.min.css';

const NotFound = () => (
  <Result
    status='404'
    title='页面不存在'
    subTitle='您访问的页面不存在'
  />
);

export default NotFound;