import actionTypes from "../action/type";

const initialState = {
  chartData: [],
  chartError: []
}

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHART_SUCCESS:
      return {
        ...state,
        chartData: action.payload
      }
    case actionTypes.CHART_ERROR:
      return {
        ...state,
        chartError: action.payload
      }
    default: return state
  }
}

export default chartReducer;