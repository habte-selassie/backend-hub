import React from 'react';
import { Line } from 'react-chartjs-2';
import { CHART_COLORS, getDatesArray, months, numbers } from './chartUtils';
import { Chart, registerables } from 'chart.js';
import { Animation, scales } from 'chart.js';

Chart.register(...registerables);

const ChartComponent = () => {
 
  const inputs = {
    min: 0,
    max: 2900000000,
    ease: 100,
    count: 30,
    decimals: 2,
    continuity: 1
  };

  const generateLabels = () => {
    return months({ count: inputs.count });
  };

  const generateDatesLabels = () =>{
    return getDatesArray(29)
  }

  const generateData = () => numbers(inputs);

  const data = {
    labels: generateDatesLabels(),
    datasets: [
      {
        label: 'Dataset 1',
        data: generateData(),
        borderColor: CHART_COLORS.red,
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        fill: 'start'
      },
      
    ]
  };


  


  const config = {
    type: 'line',
    data: data,
    options: {
      plugins: {
        filler: {
          propagate: false,
        },
        title: {
          display: true,
          text: (ctx) => 'Fill: ' + ctx.chart.data.datasets[0].fill,
          text: (ctx) => 'Tooltip position mode: ' + ctx.chart.options.plugins.tooltip.position,
        },
      },
      scales: {
        y: {
          position: 'right'
        }
      },
      interaction: {
        intersect: false,
      },
      tooltips: {
        position: 'bottom',
        caretSize: 10,
        caretPadding: 5,
        callbacks: {
          label: function(tooltipItem, data) {
            var day = tooltipItem.xLabel.split('-')[2];
            var month = tooltipItem.xLabel.split('-')[1];
            return 'Day ' + day + ', ' + month;
          }
        },
        positioner: function(items) {
          const pos = Chart.Tooltip.positioners.average(items);
          pos.y = this.chart.chartArea.bottom;
          return pos;
        }
      },
    }
  };


  return (
    <div>
      <><h2>Area Chart with Fill in Start</h2><Line data={data} options={config.options}/></>
    </div>
  );
}

export default ChartComponent;
