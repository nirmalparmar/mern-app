import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import {addError,removeError} from './error';

// import {configureStore} from '../index';
// const store = configureStore();

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorization(token){
  setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorization(false);
    dispatch(setCurrentUser({}));
  };
}

export function authUser(type, userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `http://localhost:3001/api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          console.log(user)
          // console.log(dispatch)
          setAuthorization(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError())
          // console.log('store',store.getState());
          resolve(); 
        })
        .catch(err => {
          dispatch(addError(err.message))
          reject(); 
        });
    });
  };
}
