import axios from "axios";
import actionTypes from "./type";


//chart
export const chartFetch = (coin, intervalValue, targetCurrency) => {
  return (dispatch) => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${targetCurrency}&days=${intervalValue.day}&interval=${intervalValue.value}`)
      .then(response => {
        const data = response.data
        dispatch({
          type: actionTypes.CHART_SUCCESS,
          payload: data
        })
      }).catch(error => {
        const errorMessage = error.message
        dispatch({
          type: actionTypes.CHART_ERROR,
          payload: errorMessage
        })
      })
  }
}



// exchange rate 
export const exchangeRateFetch = () => {
  return (dispatch) => {
    axios.get('https://api.coingecko.com/api/v3/exchange_rates')
      .then(response => {
        const data = response.data
        dispatch({
          type: actionTypes.EXCHANGE_SUCCESS,
          payload: data
        })
      }).catch(error => {
        const errorMessage = error.message
        dispatch({
          type: actionTypes.EXCHANGE_ERROR,
          payload: errorMessage
        })
      })
  }
}

//portfolio
export const portfolioFetch = () => {
  return (dispatch) => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(response => {
        const data = response.data
        dispatch({
          type: actionTypes.PORTFOLIO_SUCCESS,
          payload: data
        })
      }).catch(error => {
        const errorMessage = error.message
        dispatch({
          type: actionTypes.PORTFOLIO_ERROR,
          payload: errorMessage
        })
      })
  }
}