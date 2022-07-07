import axios from "axios";

export const apicreateuser = async (url, params, data) => {
  console.log(url,params,data)
  return await axios
    .post(url + params, data)
    .then((response) => {
      console.log(">>>>>>>>>",response)
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const apipost = async (url, params, data) => {
  console.log(url);
  console.log(params);
  console.log(data);
  return await axios
    .post(url + params, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getallusers = async (url, params) => {
  const token = JSON.parse(localStorage.getItem("_token"));
  const header = `Authorization: Bearer ${token}`;
  try {
    return await axios
      .get(url + params, { headers: { header } })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  } catch (err) {
    return err;
  }
};

export const apiupdateuser = async (url, params, data) => {
  console.log(url, params, data);
  const token = JSON.parse(localStorage.getItem("_token"));
  const headers = { Authorization: `Bearer ${token}` };
  return await axios
    .post(url + params, data, { headers: headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const apidel = async (url, params) => {
  const token = JSON.parse(localStorage.getItem("_token"));
  const headers = { Authorization: `bearer ${token}` };
  console.log(url, params);
  return await axios
    .post(url, "", { headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

//static LOGIN API

export const staticLogin = async (url, data) => {
  console.log('--->>>', url);
  console.log(data);
  return await axios
    .post(url , data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};