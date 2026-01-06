import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';

export function convertCamelCase(string) {
  return string.replace(/^[a-z]|[A-Z]/g, function (v, i) {
    return i === 0 ? v.toUpperCase() : ' ' + v.toLowerCase();
  });
}

export default class Control extends Component {
  isCheckbox() {
    const { type } = this.props;

    return type === 'checkbox';
  }

  isRange() {
    const { type } = this.props;

    return type === 'range';
  }

  onChange = (e, newValue) => {
    const { name, setState } = this.props;

    let value = e.target.value;

    if (this.isCheckbox()) {
      value = e.target.checked;
    } else if (this.isRange()) {
      value = newValue;
    }

    setState({
      [name]: value,
    });
  };

  render() {
    const { name, label, note, setState, value, ...props } = this.props;

    const Input = this.isRange() ? Slider : 'input';

    const rangeProps = this.isRange()
      ? {
          valueLabelDisplay: 'auto',
        }
      : {};

    return (
      <div className="Control">
        <label htmlFor={name} className="Control-label">
          {label || convertCamelCase(name)}
        </label>
        <div className="Control-inputWrapper">
          <Input
            {...props}
            {...rangeProps}
            name={name}
            id={name}
            value={this.isRange() ? parseFloat(value) : value}
            checked={this.isCheckbox() ? value : undefined}
            onChange={this.onChange}
          />
        </div>
        {props.type !== 'text' && (
          <div className="Control-value">{value.toString()}</div>
        )}
        {note && <div className="Control-note">{note}</div>}
      </div>
    );
  }
}
