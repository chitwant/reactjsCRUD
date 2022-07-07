import { apipost } from "./apiUtils";

export  const login = async (data) => {
 return await apipost(process.env.REACT_APP_API_URL + "User/token", " ", data);
};
