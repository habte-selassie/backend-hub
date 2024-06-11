import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const CoinMarketCapData = () => {

    const [coinData, setCoinData] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
        //  const response = await axios.get('http://localhost:3001/api/GlobalMetrics');
        const response = await axios.get('http://localhost:3001/api/CoinDataUpdatedEveryMinutes')   
          console.log(response.data)
          setCoinData(response.data);
        } catch (error) {
          console.error("Error fetching data", error.message);
        }
      };
  
      fetchData();
    }, []);

    if (!coinData) {
      return <div>Loading...</div>;
    }

  return (
    <div>
       <div>
        {/* Total Market Cap Change: {coinData.aggregate}%  */}
      </div>
      <div>
        Total Date for 1 Day : {coinData}
        {/* Total Volume 24h Change: {coinData.TotalVolume24hPercentageChange}% */}
      </div>
    </div>
  )
}

export default CoinMarketCapData