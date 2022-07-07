import React from "react";
import PropTypes from "prop-types";
import {
  UncontrolledTooltip,
  Input,
  InputGroupText,
  InputGroup,
} from "reactstrap";
const InputField = (props) => {
  const isValidate = () => {
    if (props.isValid && props.isRequired) {
      return "error";
    }
    return null;
  };
  // const onChangeText = (e) => {
  //   if (props.onChangeText) {
  //     props.onChangeText(e);
  //   }
  // };

  return (
    <>
      <InputGroup>
        <Input
        {...props.input}
          name={props.name}
          type={props.type}
          id={props.id}
          bsSize={props.bsSize}
          placeholder={props.placeHolder}
          errmessage={props.errMessage}
          className={`${props.css} ${isValidate()}`}
          // onChange={(e) => onChangeText(e)}
          // onKeyPress={(e)=>props.onKey(e)}
         
        ></Input>
        {props.icon ? <InputGroupText>{props.icon}</InputGroupText> : null}
      </InputGroup>

      {props.isValid && props.isRequired && (
        <UncontrolledTooltip placement="right" target={props.id}>
          {props.errMessage}
        </UncontrolledTooltip>
      )}
    </>
  );
};
InputField.propTypes = {
  input:PropTypes.object.isRequired,
  meta:PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeHolder: PropTypes.string,
  onChangeText: PropTypes.func,
  css: PropTypes.string,
  isValid: PropTypes.bool,
  errMessage: PropTypes.string,
  isRequired: PropTypes.bool,
};
export default InputField;
