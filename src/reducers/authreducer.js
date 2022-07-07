import * as actions from '../utils/action'
import { toast } from 'react-toastify';

const initialState={
    isAuthenticated:false,
    username:"",
    password:"",
    profile:"",
    token:""
   
}

const authReducer = (state,action)=>{
    state = state|| initialState;

    switch(action.type){
        case actions.LOGIN_SUCCESS:{
            toast.success(actions.LOGIN_SUCCESS,{
                position:toast.POSITION.TOP_RIGHT,
                autoClose:2000,
                hideProgressBar:false,
                draggable:true
              })
            return Object.assign({},state,{
                ...state,
                isAuthenticated:true,
                username:action.payload.username,
                password:action.payload.password,
                profile:action.payload.profile,
                token:action.payload.token
             
              
            })

          
        }
       

        case actions.LOGIN_FAIL:{
            toast.error(actions.LOGIN_FAIL,{
                position:toast.POSITION.TOP_RIGHT,
                autoClose:2000,
                hideProgressBar:false,
                draggable:true
              })
            return Object.assign({},state,{
                ...state,
                isAuthenticated:false,
                username:"",
                password:"",
                profile:'null',
                token:action.payload.token
            })
        }

        case actions.LOGOUT:{
            toast.info(actions.LOGOUT,{
                position:toast.POSITION.TOP_RIGHT,
                autoClose:2000,
                hideProgressBar:false,
                draggable:true
              })
           
            return Object.assign({},state,{
                ...state,
                isAuthenticated:false,
                username:"",
                password:"",
                profile:'null',
                token:action.payload.token
            })
           
        }
        default: return state;
        
    }

     
}
export default authReducer;