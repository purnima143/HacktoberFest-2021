import { userConstants,
        USER_LIST_FAIL,
        USER_LIST_REQUEST,
        USER_LIST_RESET,
        USER_LIST_SUCCESS 
        } from "../actions/constants";

const initState = {
    error: null,
    message: "",
    loading: false
}

export default ( state = initState, action ) => {
    switch( action.type ) {
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;
        case userConstants.USER_REGISTER_SUCCES:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
        break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        break;
    }
    return state;
} 


export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case USER_LIST_REQUEST:
        return { loading: true }
      case USER_LIST_SUCCESS:
        return { loading: false, users: action.payload }
      case USER_LIST_FAIL:
        return { loading: false, error: action.payload }
        case USER_LIST_RESET:
          return { users: [] }
      default:
        return state
    }
  }
  