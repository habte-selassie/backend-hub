import React, { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts';
import axios from 'axios'

const generateDataForDate = (date) => {
  // Function to generate data for a specific date
  // This is a placeholder function, you can replace it with your actual data generation logic
  return Math.floor(Math.random() * 8000); // Generating random data for demonstration
};



const ApexChart = () => {
  const [coinData,setCoinData] = useState([])

  const [series, setSeries] = useState([
    {
      name: 'XYZ MOTORS',
      data: []
    }
  ]);

  useEffect(() => {

    const fetchCoinData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/GlobalMetrics')
      console.log(response.data)
      setCoinData(response.data)

      const TotalMarketCapPercentageChange = coinData.TotalMarketCapPercentageChange
      const TotalVolume24hPercentageChange = coinData.TotalVolume24hPercentageChange
      
      return [TotalMarketCapPercentageChange,TotalVolume24hPercentageChange]



    } catch (error) {
      console.error('Error Fetching Data',error.message)
    }

    }
    const generateDataForDateRange = () => {
      const startDate = new Date('2023-05-01');
      const endDate = new Date('2024-05-01');
      const data = [];

      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const timestamp = currentDate.getTime();
        const value = generateDataForDate(currentDate);
        data.push([timestamp, value]);
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }

      return data;
    };

    // Update the series state with dynamically generated data
    setSeries([
      {
        ...series[0],
        data: generateDataForDateRange()
      },
      fetchCoinData()
    ]);
  }, []); // Run this effect only once when the component mounts

  const options = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0
    },
    title: {
      text: 'Stock Price Movement',
      align: 'left'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    yaxis: {
      labels: {
        formatter: function(value) {
          return value.toFixed(0)
        }
      },
      title: {
        text: 'Price'
      },
      min: 0,
      max: 10000
    },
    xaxis: {
      type: 'datetime',
      min: new Date('2023-05-01').getTime(), // Set the minimum date to May 2023
      max: new Date('2024-06-01').getTime(), // Set the maximum date to May 2024
      labels: {
        formatter: function(value) {
          return new Date(value).toLocaleString('default', { month: 'short' });
        }
      }
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function(val) {
          return new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
      },
      y: {
        formatter: function(val) {
          return val.toFixed(0); // Displaying the data value
        }
      }
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="area" height={350} width={'100%'} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;

// import React, { useState } from "react";
// import ReactApexChart from 'react-apexcharts';

// const generateDataForDate = (date) => {
//     // Function to generate data for a specific date
//     // This is a placeholder function, you can replace it with your actual data generation logic
//     return Math.floor(Math.random() * 100); // Generating random data for demonstration
//   };
  
//   const generateDataForDateRange = () => {
//     const startDate = new Date('2023-05-01');
//     const endDate = new Date('2024-05-01');
//     const data = [];
  
//     let currentDate = new Date(startDate);
//     while (currentDate <= endDate) {
//       const timestamp = currentDate.getTime();
//       const value = generateDataForDate(currentDate); // You need to implement this function
//       data.push([timestamp, value]);
//       currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
//     }
  
//     return data;
//   };
  

// const ApexChart = () => {
//   const dates = [];

//   const [series, setSeries] = useState([
//     {
//       name: 'XYZ MOTORS',
//       data:  generateDataForDateRange()
//     }
//   ]);

//   const [options] = useState({
//     chart: {
//       type: 'area',
//       stacked: false,
//       height: 350,
//       zoom: {
//         type: 'x',
//         enabled: true,
//         autoScaleYaxis: true
//       },
//       toolbar: {
//         autoSelected: 'zoom'
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     markers: {
//       size: 0
//     },
//     title: {
//       text: 'Stock Price Movement',
//       align: 'left'
//     },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         shadeIntensity: 1,
//         inverseColors: false,
//         opacityFrom: 0.5,
//         opacityTo: 0,
//         stops: [0, 90, 100]
//       }
//     },
//     yaxis: {
//       labels: {
//         formatter : function(value) {
//             return value.toFixed(0)
//          }
//         },
      
//       title: {
//         text: 'Price'
//       },

//       min:0,
//       max : 10000
//     },
//     xaxis: {
//       type: 'datetime',
//       min: new Date('2023-05-01').getTime(), // Set the minimum date to May 2023
//       max: new Date('2024-06-01').getTime(), // Set the maximum date to May 2024
      
//       labels: {
//         formatter: function (value) {
//           return new Date(value).toLocaleString('default', { month: 'short' });
//         }
//       },
      
//     },
//     series: [
//         {
//           name: "series-1",
//           data: [30, 40, 45, 50, 49, 60, 70, 91]
//         }
//       ],
//     tooltip: {
//       shared: false,
//       y: {
//         formatter: function (val) {
//           return (val / 1000000).toFixed(0);
//         }
//       }
//     }
//   });

//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart options={options} series={series} type="area" height={350} 
//         width={'100%'} />
//       </div>
//       <div id="html-dist"></div>
//     </div>
//   );
// };

// export default ApexChart;
