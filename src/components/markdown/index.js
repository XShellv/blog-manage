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
    this.vditor = new Vditor("vditor", {
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
        this.vditor.setValue('Hello, Vditor + React!')
        // this.vditor.setValue(this.props.value);
      },
    });
  }

  render() {
    console.log(this.props)
    return <div id="vditor"></div>;
  }
}

export default Markdown;
