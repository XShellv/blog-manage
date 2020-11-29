import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Card, Breadcrumb, Space, Dropdown, Avatar } from "antd";
import {UserOutlined} from "@ant-design/icons"
import Icon from "../images/logo.png";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { service } from "../service";
import { setUser } from "../redux/actions";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default ({ children }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const location = useLocation();
  const  dispatch =  useDispatch();

  useEffect(() => {
    (async () => {
      console.log(233)
      const ret = await service.fetchUser();
      dispatch(setUser(ret.data));
    })();
  }, []);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <Link to="/">
            <img src={Icon} />
            个人博客管理系统
          </Link>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
          >
            <Menu.Item
              key="//www.xshellv.com"
              onClick={() => {
                window.open("//www.xshellv.com", "_blank");
              }}
            >
              我的博客
            </Menu.Item>
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
          <div className="log-options">
            <Dropdown
              overlay={
                <Menu className="login-menu">
                  <Menu.Item>
                    <a href="https://www.xshellv.com/manage" target="_blank">
                      修改密码
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a href={`/api/logout?url=/manage/login`}>退出登录</a>
                  </Menu.Item>
                </Menu>
              }
            >
              <Space>
                <Avatar icon={<UserOutlined />} size={30} src={userInfo["avatar"]} />
                <p className="login-name">{userInfo["username"]}</p>
              </Space>
            </Dropdown>
          </div>
        </div>
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
