import { combineReducers } from "redux";
import portfolioReducer from "./portfolioReducer";
import exchangeReducer from "./exchangeReducer";
import chartReducer from './chartReducer';

const rootReducer = combineReducers ({
    portfolio: portfolioReducer,
    exchangeRate: exchangeReducer,
    chart: chartReducer
})


export default rootReducer