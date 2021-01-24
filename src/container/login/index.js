import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Input,
  Button,
  Form,
  Checkbox,
  Card,
  Avatar,
  notification,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { service } from "../../service";
import "./index.scss";
import { setUser } from "../../redux/actions";

export default () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    const ret = await service.login(values);
    setLoading(false);
    if (ret.success && ret.code === 0) {
      dispatch(setUser(ret.data));
      history.push(location.state ? location.state.from.pathname :"/");
    } else {
      notification["error"]({
        message: "错误提示",
        description: ret.message,
      });
    }
  };

  return (
    <div className="login-bg">
      <div className="login-content">
        <div className="avatar">
          <Avatar src="https://cdn.xshellv.com/avatar" size={50} />
        </div>
        <h1>个人博客管理系统</h1>
        <Form
          name="normal_login"
          layout="vertical"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: "请输入用户名！" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              autoComplete="off"
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "请输入管理员密码！" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入管理员密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
