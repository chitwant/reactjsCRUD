import { InputField } from "../../components/controls/index";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../utils/action";
import { apipost } from "../../services/http/apiUtils";
import { Button } from "reactstrap";
import NavigationBar from "../../components/navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [isValid, setValid] = useState({ email: false, password: false });
  const [type, setType] = useState(false);
  const onChangeText = (e) => {
    const userData = { ...user };
    const tempValid = { ...isValid };
    userData[e.target.name] = e.target.value;
    if (tempValid[e.target.name] !== "") {
      tempValid[e.target.name] = false;
    }
    setValid(tempValid);
    setUser(userData);
  };
  const userdetail = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const obj = {
    username: user.username,
    password: user.password,
  };
  const onSubmit = async (event) => { 
      const response = await apipost(
        process.env.REACT_APP_API_URL + "User/token",
        "",
        obj
      );
      console.log(response);
      console.log(user);
      if (response.status === 200) {
        dispatch({
          type: actions.LOGIN_SUCCESS,
          payload: {
            username: user.username,
            password: user.password,
            profile: user.username,
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
    
    
  };

  const onkeypresshandler = (event) =>{
    if(event.key==="Enter"){
      onSubmit()
    }
  }
  return (
    <>
      <NavigationBar />
      <form className="m-4" onSubmit={(e) => e.preventDefault()}>
        <div className="row d-flex justify-content-center mb-4">
          <h2>Login</h2>
          <div className=" col-md-6">
            <InputField
              type="text"
              id="staticEmail2"
              bsSize="lg"
              onChangeText={(e) => onChangeText(e)}
              name="username"
              placeHolder="Username"
              errMessage="Field is Required"
              isValid={!isValid.email}
              isRequired={true}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center mb-4">
          <div className=" col-md-6">
            <InputField
              type={type ? "text" : "password"}
              bsSize="lg"
              onChangeText={(e) => onChangeText(e)}
              css="form-control"
              id="inputPassword2"
              placeHolder="Password"
              name="password"
              errMessage="Field is Required"
              isValid={!isValid.password}
              isRequired={true}
              icon={
                <FontAwesomeIcon
                  icon={faEye}
                  onMouseOver={() => setType(true)}
                  onMouseOut={()=>setType(false)}
                />
              }
              
              onKey={async(e)=>onkeypresshandler(e)}
            >
              {" "}
            </InputField>
          </div>
        </div>
        <div className="col-auto">
          <Button onClick={onSubmit} color="primary" size="lg">
            Submit
          </Button>

        </div>
      </form>
    </>
  );
};

export default Login;
