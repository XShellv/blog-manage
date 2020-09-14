import React from "react";
import Vditor from "vditor";
import "./index.scss";

class Markdown extends React.Component {
  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };
  componentDidMount() {
    const vditor = new Vditor("vditor", {
      height: 360,
      tab: '      ',
      mode: 'sv',
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      input: (value, previewElement) => {
        this.triggerChange(value);
      },
      after: () => {
        vditor.setValue(this.props.value);
      },
    });
  }

  render() {
    return <div id="vditor"></div>;
  }
}

export default Markdown;
