import actionTypes from "../action/type";

const initialState = {
  exchangeRateData: [],
  exchangeRateError: []
}

const exchangeReducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.EXCHANGE_SUCCESS:
            return {
                ...state,
              exchangeRateData: action.payload
            }
    case actionTypes.EXCHANGE_ERROR:
      return {
        ...state,
        exchangeRateError: action.payload
      }
    default: return state
    }
}

export default exchangeReducer;