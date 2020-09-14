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

  const onFinish = (values) => {
    debugger
  }
  const checkTags = (values) => {

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
        <Form.Item name="title" label="标题" rules={[{
          required: true,
          message: "标题不可为空！"
        }]}>
          <Input />
        </Form.Item>

        <Form.Item name="abstract" label="摘要" rules={[{
          required: true,
          message: "摘要不可为空！"
        }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="post" label="图片" rules={[{
          required: true,
          message: "图片链接不可为空"
        }]}>
          <Input />
        </Form.Item>

        <Form.Item name="category" label="类别">
          <Radio.Group>
            <Radio value="develop">开发类</Radio>
            <Radio value="product">产品类</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="tags" label="标签组" rules={[{ validator: checkTags }]}>
          <EditableTagGroup />
        </Form.Item>

        <Form.Item name="content" label="内容">
          <Markdown />
        </Form.Item>

        <Form.Item name="status" label="状态">
          <Radio.Group>
            <Radio value="draft">草稿</Radio>
            <Radio value="post">正常</Radio>
          </Radio.Group>
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

class EditableTagGroup extends React.Component {
  state = {
    tags: this.props.value,
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  };

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag);
    this.triggerChange(tags);
    this.setState({ tags });
  };

  triggerChange = (changedValue) => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange([...value, ...changedValue]);
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
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.triggerChange(tags);
    this.setState({
      tags,
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
      tags,
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
    } = this.state;
    console.log(this.props);
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
