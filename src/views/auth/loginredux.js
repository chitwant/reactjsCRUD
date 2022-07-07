import { InputField } from "../../components/controls/index";
import { Field, reduxForm } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import * as actions from "../../utils/action";
import { useState } from "react";
import { apipost } from "../../services/http/apiUtils";
import NavigationBar from "../../components/navbar/navbar";
import { toast } from "react-toastify";
const Login = (props) => {
  const [type, setType] = useState(false);
  const dispatch = useDispatch();
  const { handleSubmit, reset } = props;
  const handlesubmit = async (formValues) => {
    const response = await apipost(
      process.env.REACT_APP_API_URL + "User/token",
      "",
      formValues
    );
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: actions.LOGIN_SUCCESS,
        payload: {
          username: formValues.username,
          password: formValues.password,
          token: response.data.result.jwtToken,
        },
      });
   
      localStorage.setItem(
        "_token",
        JSON.stringify(response.data.result.jwtToken)
      );
    } else {
      dispatch({
        type: actions.LOGIN_FAIL,
        payload: {},
      });

      localStorage.removeItem("_token");
    }
    console.log(formValues);
  };

  const onkeypresshandler = (event) => {
    if (event.key === "Enter") {
      handlesubmit();
    }
  };
  return (
    <>
      <NavigationBar />
      <Form noValidate method="POST" onSubmit={handleSubmit(handlesubmit)}>
        <div className="row d-flex justify-content-center mb-4">
          <h2>Login</h2>
          <div className=" col-md-6">
            <Field
              component={InputField}
              name="username"
              id="username"
              placeHolder="Enter Username"
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center mb-4">
          <div className=" col-md-6">
            <Field
              component={InputField}
              name="password"
              id="password"
              placeHolder="Enter Password"
              type={type ? "text" : "password"}
              icon={
                <FontAwesomeIcon
                  icon={faEye}
                  onMouseOver={() => setType(true)}
                  onMouseOut={() => setType(false)}
                />
              }
              onKey={async (e) => onkeypresshandler(e)}
            />
          </div>
        </div>

        <br />

        <div>
          <Button className="me-2" size="lg">
            Submit
          </Button>
          <Button onClick={reset} size="lg">
            Reset
          </Button>
        </div>
      </Form>
    </>
  );
};

export default reduxForm({
  form: "userForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  // values:getFormValues("userForm")
})(Login);
