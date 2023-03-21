import actionTypes from "../action/type";

const initialState = {
  portfolioData: [],
  portfolioError: []
}

const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PORTFOLIO_SUCCESS:
      return {
        ...state,
        portfolioData: action.payload
      }
    case actionTypes.PORTFOLIO_ERROR:
      return {
        ...state,
        portfolioError: action.payload
      }
    default: return state
  }
}

export default portfolioReducer;