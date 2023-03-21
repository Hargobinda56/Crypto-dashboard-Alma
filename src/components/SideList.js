import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SideList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(response => {
        setLoading(false);
        setData(response.data);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {data.map(coin => (
            <div key={coin.id}>
              <img src={coin.image} alt={coin.name} width="25" height="25" />
              <span>{coin.name}</span>
              <span>Market Cap: {coin.market_cap}</span>
              {coin.price_change_percentage_24h>0?<span>up</span>:<span>down</span>}
              {Math.abs(coin.price_change_percentage_24h)}%
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideList;