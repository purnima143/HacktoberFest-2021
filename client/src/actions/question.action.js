import { 
      USER_QUESTION_FAIL,
      USER_QUESTION_REQUEST,
      USER_QUESTION_SUCCESS, 
      USER_UPDATE_QUESTION_FAIL, 
      USER_UPDATE_QUESTION_REQUEST,
      USER_UPDATE_QUESTION_SUCCESS
    } from "./constants"

export const listQuestions = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_QUESTION_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(`/api/user/question`, config)

      dispatch({
        type: USER_QUESTION_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_QUESTION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  

  export const updateUserQuestion = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_QUESTION_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(`/api/user/question/${id}`, user, config)

      dispatch({
        type: USER_UPDATE_QUESTION_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_UPDATE_QUESTION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  } 