import React, { Component } from "react";

function convertCamelCase(string) {
  return string.replace(/^[a-z]|[A-Z]/g, function(v, i) {
    return i === 0 ? v.toUpperCase() : " " + v.toLowerCase();
  });
}

export default class Control extends Component {
  isCheckbox() {
    const { type } = this.props;

    return type === "checkbox";
  }

  onChange = e => {
    const { name, setState } = this.props;

    let value = e.target.value;

    if (this.isCheckbox()) {
      value = e.target.checked;
    }

    setState({
      [name]: value
    });
  };

  render() {
    const { name, label, setState, value, ...props } = this.props;

    return (
      <div className="Control">
        <label htmlFor={name} className="Control-label">
          {label || convertCamelCase(name)}
        </label>
        <div className="Control-inputWrapper">
          <input
            {...props}
            name={name}
            id={name}
            value={value}
            checked={value}
            onChange={this.onChange}
            className="SliderControl"
          />
        </div>
        <div className="Control-value">{value.toString()}</div>
      </div>
    );
  }
}
