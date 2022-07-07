import { compose ,createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistReducer } from 'redux-persist'
import appReducer from "../reducers/index";
import LocalStorage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage:LocalStorage
  }

  const persistedReducer = persistReducer(persistConfig, appReducer)
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose

export default createStore(persistedReducer,composeEnhancer(applyMiddleware(thunk,logger)))