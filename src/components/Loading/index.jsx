import React from 'react'
import { Spin } from 'antd';
import './styles.css'
export const Loading = () => {
  return (
    <div className="loading-spinner">
      <Spin size="large" />
    </div>
  );
}
