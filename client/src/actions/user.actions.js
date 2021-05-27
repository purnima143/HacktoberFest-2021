import { userConstants, 
    USER_LIST_FAIL, 
    USER_LIST_REQUEST,
     USER_LIST_SUCCESS } from "./constants";
import axios from "../helpers/axios";

export const signup = (user) => {
    console.log(user);

    return async (dispatch) => {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST });
        const res = await axios.post('/signup', {
            ...user
        })

        if ( res.status === 201 ){
            const { message } = res.data;
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: {
                    message
                }
            });
        } else {
            if( res.status === 400 ){
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }

        }
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/admin/users`, config)
  
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }