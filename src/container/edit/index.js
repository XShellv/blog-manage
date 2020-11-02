import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Tag, Tooltip, Button, DatePicker } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { service } from "../../service";
import Markdown from "../../components/markdown";
import moment from "moment";
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};
const dateFormat = "YYYY-MM-DD HH:mm:ss";

export default ({ match }) => {
  const params = useParams();
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const history = useHistory();
  console.log(match.params)
  useEffect(() => {
    const { id, status } = params;
    debugger;
    fetchPostOrDraft({ id, status });
  }, []);

  const onFinish = async (values) => {
    const { id } = params;
    setLoading(true);
    values.createdAt = moment(values.createdAt).format(dateFormat);
    const ret = await service.publishPost({ ...values, id, content });
    if (ret) {
      setLoading(false);
      history.push({
        pathname: "/post/result",
        state: {
          id: ret.data.id,
        },
      });
    }
  };

  const fetchPostOrDraft = async (params) => {
    setPageLoading(true);
    let ret;
    debugger;
    if (params.status === "post") {
      ret = await service.fetchPost(params);
    } else {
      ret = await service.fetchDraft(params);
    }
    if (ret.success) {
      setPageLoading(false);
      const data = ret.data;
      data.createdAt = moment(data.createdAt);
      setContent(data.content);
      form.setFieldsValue({
        ...data,
        tags: data.tags.map((tag) => tag.name),
      });
    }
  };

  const checkTags = (rule, value) => {
    if (value.length === 0) {
      return Promise.reject("至少包含一个标签！");
    } else {
      return Promise.resolve();
    }
  };
  const checkContent = (rule, value) => {
    if (value.trim().length === 0) {
      return Promise.reject("文章内容不能为空！");
    } else {
      return Promise.resolve();
    }
  };

  const setContentAndValidate = (value) => {
    setContent(value);
  };

  const { id } = params;

  return (
    <Form
      {...layout}
      form={form}
      onFinish={onFinish}
      initialValues={{
        category: "develop",
        tags: [],
        content: "",
        status: "draft",
        auth: 0,
        createdAt: moment(),
      }}
    >
      <Form.Item
        name="title"
        label="标题"
        rules={[
          {
            required: true,
            message: "标题不可为空！",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="abstract"
        label="摘要"
        rules={[
          {
            required: true,
            message: "摘要不可为空！",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="post"
        label="图片"
        rules={[
          {
            required: true,
            message: "图片链接不可为空",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="category" label="类别">
        <Radio.Group>
          <Radio value="develop">开发类</Radio>
          <Radio value="product">产品类</Radio>
          <Radio value="notes">笔记</Radio>
        </Radio.Group>
      </Form.Item>

      {!isNaN(id * 1) && (
        <Form.Item name="createdAt" label="创建时间">
          <DatePicker
            disabledDate={(current) =>
              current && current > moment().endOf("day")
            }
            allowClear={false}
            style={{ width: 200 }}
            showTime
            format={dateFormat}
          />
        </Form.Item>
      )}

      <Form.Item name="auth" label="开放权限">
        <Radio.Group>
          <Radio value={0}>所有人可见</Radio>
          <Radio value={1}>仅限管理员</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="tags"
        label="标签组"
        rules={[{ validator: checkTags, required: true }]}
      >
        <EditableTagGroup />
      </Form.Item>

      <Form.Item
        name="content"
        label="内容"
        // rules={[{ validator: checkContent, required: true }]}
      >
        <Markdown value={content} setContent={setContentAndValidate} />
      </Form.Item>

      <Form.Item name="status" label="状态">
        <Radio.Group>
          <Radio value="draft">草稿</Radio>
          <Radio value="post">正常</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

class EditableTagGroup extends React.Component {
  state = {
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  };

  handleClose = (removedTag) => {
    const { value: tags } = this.props;
    this.triggerChange(tags.filter((tag) => tag !== removedTag));
  };

  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange([...changedValue]);
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { value: tags } = this.props;
    let temp = tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      temp = [...temp, inputValue];
    }
    this.triggerChange(temp);
    this.setState({
      // tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: "",
      };
    });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  saveEditInputRef = (input) => {
    this.editInput = input;
  };

  render() {
    const {
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
    } = this.state;
    const { value: tags } = this.props;
    return (
      <>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className="edit-tag"
              key={tag}
              closable={true}
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    this.setState(
                      { editInputIndex: index, editInputValue: tag },
                      () => {
                        this.editInput.focus();
                      }
                    );
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined />
            添加标签
          </Tag>
        )}
      </>
    );
  }
}
