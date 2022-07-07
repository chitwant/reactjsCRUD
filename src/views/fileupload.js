import { React, useState } from "react";
import axios from "axios";
import NavigationBar from ".././components/navbar/navbar";
import { staticLogin } from "../services/http/apiUtils";
import { Button, Input } from "reactstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
const Fileupload = () => {
  const [token, setToken] = useState();
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState();
  const [fileresponse, setfileresponse] = useState();
  
  // const staticlogin = async () => {
  //   const response = await staticLogin(
  //     "https://cookgiftstageapi.essentialdemo.com/connect/token",
  //     formData
  //   ).then((response) => setToken(response.data.access_token));
  // };

  useEffect(()=>{
    const formData = new FormData();
  formData.append("grant_type", "password");
  formData.append("username", "gurpreet");
  formData.append("password", "Welcome@123");
  formData.append("scope", "openid");
  formData.append("client_id", "ro.angular");
  formData.append("client_secret", "secret");
    const response = staticLogin(
      "https://cookgiftstageapi.essentialdemo.com/connect/token",
      formData
    ).then((response) => setToken(response.data.access_token));
  }
  ,[])
  localStorage.setItem("_token", JSON.stringify(token));

  const handlefile = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(file);

  const uploadfile = async () => {
    if(!token){
      toast.warn("Please Click on Static Login")
    }
    const formData = new FormData();

    console.log("==>", formData);
    formData.append("file", file);
    formData.append("comments", comment);
    return await axios
      .post(
        `https://cookgiftstageapi.essentialdemo.com/api/FileUpload/Upload?comments=${comment}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      )
      .then((response) => setfileresponse(response.data));
  };
  if (fileresponse) {
    toast.success(fileresponse.message);
  }
  
  return (
    <>
      <NavigationBar />
      {/* <Button color="primary" size="lg" className="mt-2" onClick={staticlogin}>
        Static Login
      </Button> */}

      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 mt-2">
          <Input type="file" onChange={(e) => handlefile(e)} />
          <Input
            type="textarea"
            name="text"
            id="exampleText"
            className="mt-3"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          {file ? (
            <div>
              <img
                src={URL.createObjectURL(file)}
                alt="avatar"
                name="file"
                style={{ height: "150px", width: "150px" }}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="col-md-3"></div>
      <Button color="primary" size="lg" className="mt-2" onClick={uploadfile}>
        Upload File
      </Button>
    </>
  );
};
export default Fileupload;
