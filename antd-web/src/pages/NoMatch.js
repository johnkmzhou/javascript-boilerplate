import React from "react";
import { Layout, Result } from "antd";
const { Content } = Layout;

export const NoMatch = () => {
  return (
    <Content style={{ maxWidth: 1012, margin: "0 auto", padding: 16 }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </Content>
  );
};
