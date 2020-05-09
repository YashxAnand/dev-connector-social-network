import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  errors,
  info,
  type,
  onChange,
  disabled,
}) => {
  return (
    <div className='form-group'>
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className='form-text text-muted'>{info}</small>}
      {errors && <div className='invalid-feedback'>{errors}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};

TextFieldGroup.defaultPropTypes = {
  type: "text",
};

export default TextFieldGroup;
