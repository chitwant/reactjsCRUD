import authReducer from "./authreducer";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
const appReducer=combineReducers({
  auth:authReducer,
  form:formReducer
})
export default appReducer;