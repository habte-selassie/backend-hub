import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const ChartA = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'White', 'Black'],
                    datasets: [{
                        label: '# of votes',
                        data: [12, 10, 3, 9, 10],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Cleanup function to destroy the chart
            return () => {
              myChart.destroy();
          };
        }
    }, []);

    return (
        <div>
            <canvas ref={chartRef} width={400} height={400}></canvas>
        </div>
    );
};

export default ChartA;