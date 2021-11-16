import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

export const MainContainer = props => {
  return (
    <Layout className="main-layout">
      <Content className="main-content">{props.children}</Content>
    </Layout>
  );
};
