import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Radio, Tag, Tooltip, Button } from "antd";
import "./index.scss";
import Markdown from "../../components/markdown";
import { service } from "../../service";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

export default () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const history = useHistory();
  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    const ret = await service.fetchAbout();
    if (ret.success) {
      setContent(ret.data.content);
      form.setFieldsValue({
        ...ret.data,
      });
    }
  };
  const checkContent = (rule, value) => {
    if (value.trim().length === 0) {
      return Promise.reject("自我介绍不能为空！");
    }
    return Promise.resolve();
  };
  const setContentAndValidate = (value) => {
    setContent(value);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const ret = await service.updateAbout(values);
    if (ret) {
      setLoading(false);
      history.push({
        pathname: "/about/result",
      });
    }
  };
  return (
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        initialValues={{ content: "" }}
      >
        <Form.Item
          name="motto"
          label="格言"
          rules={[
            {
              required: true,
              message: "格言不可为空！",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="content"
          label="自我介绍"
          //   rules={[{ validator: checkContent, required: true }]}
        >
          <Markdown value={content} setContent={setContentAndValidate} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            提交
          </Button>
        </Form.Item>
      </Form>
  );
};
