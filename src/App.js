import React from "react";
import "./App.css";
import ExchangeRate from "./components/ExchangeRate";
import Portfolio from "./components/Portfolio";
import SideList from "./components/SideList";
import CryptoChart from "./components/CryptoChart";


function App() {
  return (
    <div >
      <div className="my-40">
      <CryptoChart />
      </div>
      <Portfolio />
      <ExchangeRate />
      <SideList />



    </ div >
  );
}

export default App;
