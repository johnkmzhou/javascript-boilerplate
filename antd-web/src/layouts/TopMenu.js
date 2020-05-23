import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

export const TopMenu = () => {
  return (
    <Header>
      <Menu
        className="top-nav"
        mode="horizontal"
        theme="dark"
        selectable={false}
      >
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item style={{ float: 'right' }}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
