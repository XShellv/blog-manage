import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Card, Breadcrumb } from "antd";
import Icon from "../images/logo.png";
import "./index.scss";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default ({ children }) => {
  const location = useLocation();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <Link to="/">
            <img src={Icon} />
            个人博客管理系统
          </Link>
        </div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <SubMenu key="/manage" title="文章管理">
            <Menu.Item key="/list">
              <Link to="/list">文章列表</Link>
            </Menu.Item>
            <Menu.Item key="/edit">
              <Link to="/edit">发布文章</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/about">
            <Link to="/about">关于我</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>列表页</Breadcrumb.Item>
          {/* <Breadcrumb.Item>列表页</Breadcrumb.Item> */}
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
