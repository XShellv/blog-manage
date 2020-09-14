import React from "react";
import { Form, Input, Radio, Tag, Tooltip, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Markdown from "../../components/markdown";


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

export default () => {
    const [form] = Form.useForm();

    const checkContent = (rule, value) => {
        if (value.trim().length === 0) {
            return Promise.reject("自我介绍不能为空！");
        }
    }

    const onFinish = (values) => {
        debugger
    }
    return (
        <div>
            <Form
                {...layout}
                form={form}
                onFinish={onFinish}
                initialValues={{
                    category: "develop",
                    tags: [],
                    content: "",
                    status: "draft",
                }}
            >
                <Form.Item name="motoo" label="格言" rules={[{
                    required: true,
                    message: "格言不可为空！"
                }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="content" label="自我介绍" rules={[{ validator: checkContent, required: true }]}>
                    <Markdown />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" >
                        提交
          </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
