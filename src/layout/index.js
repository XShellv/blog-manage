import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Card, Breadcrumb } from "antd";
import "./index.scss";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default ({ children }) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["list"]}>
          <SubMenu key="manage" title="文章管理">
            <Menu.Item key="list">
              <Link to="/list">文章列表</Link>
            </Menu.Item>
            <Menu.Item key="edit">
              <Link to="/edit">发布文章</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="about">
            <Link to="/about">关于我</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Card size="small" bordered={false}>
          {children}
        </Card>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <span>❤️ Copyright © 2020 developed by Xshellv</span>
      </Footer>
    </Layout>
  );
};
