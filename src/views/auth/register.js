import React, { useState } from "react";
import NavigationBar from "../../components/navbar/navbar";
import { apicreateuser } from "../../services/http/apiUtils";
import  validation  from "../../components/controls/joi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import {
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Progress,
} from "reactstrap";
import * as actions from "../../utils/action";
const Register = (props) => {
  const [type, setType] = useState(false);

  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    // profileImage: "",
  });
  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    const tempUser = { ...user };
    tempUser[e.target.name] = e.target.value;
    setUser(tempUser);
  };
  const handlesubmit = async () => {
    const {error}=  validation.validate(user)
    
    if (error){
      
      toast.error(error.message,{
        
        position:toast.POSITION.TOP_RIGHT,
        autoClose:2000,
        hideProgressBar:false,
        draggable:true
      })
    }
    else{
      const response = await apicreateuser(
        process.env.REACT_APP_API_URL + "User",
        "",
        user
      );
      console.log(user,"user")
      if (response.status === 200) {
        toast.success(actions.CREATE_USER);
      } 
      else{
        toast.error(actions.USER_EXIST)
      }
    }
    
  };
  const onkeypresshandler = (event) => {
    if (event.key === "Enter") {
      handlesubmit();
    }
  };

  const handlefile = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      setUser({ ...user, profileImage: e.target.result });
      setProgress((e.loaded / e.total) * 100);
    };
  };

  return (
    <>
      <NavigationBar />
      <Form noValidate method="POST" onSubmit={handlesubmit}>
        <h2>Register</h2>

        <div className="row  mb-4">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="row mb-4">
              <div className=" col-md-6">
                <Input
                  name="firstname"
                  id="firstname"
                  bsSize="md"
                  placeHolder="Enter firstname"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className=" col-md-6">
                <Input
                  name="lastname"
                  id="lastname"
                  bsSize="md"
                  placeHolder="Enter lastname"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className=" col-md-12">
                <Input
                  name="userName"
                  id="userName"
                  bsSize="md"
                  placeHolder="Enter Username"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className=" col-md-12 ">
                <Input
                  name="email"
                  id="email"
                  bsSize="md"
                  placeHolder="Enter Email"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className=" col-md-12">
                <InputGroup>
                  <Input
                    name="password"
                    id="password"
                    bsSize="md"
                    placeHolder="Enter Password"
                    onChange={(e) => handleChange(e)}
                    type={type ? "text" : "password"}
                  />
                  <InputGroupText>
                    <FontAwesomeIcon
                      icon={faEye}
                      onMouseOver={() => setType(true)}
                      onMouseOut={() => setType(false)}
                    />
                  </InputGroupText>
                </InputGroup>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-12">
                <Input type="file" onChange={(e) => handlefile(e)} />
                <Progress animated value={progress}  className="mt-4"/> 
              </div>
            </div> */}
          </div>

          <></>
        </div>
        <div className="col-auto">
          <Button
            color="primary"
            size="lg"
            className="me-2"
            onClick={handlesubmit}
          >
            Register
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Register;
