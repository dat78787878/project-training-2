import React from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getData } from '../../redux/rankingChart/actions';
import Error from '../../components/Error/Error';
import { Bar } from 'react-chartjs-2';
import Loading from '../../components/Loading/Loading';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, ChartDataLabels);

const RankingChart = () => {
  const { rankingData, isLoading, isError } = useSelector((state) => state.rankingChart);
  const { fromDate, toDate } = useSelector((state) => state.dateRange);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData([fromDate, toDate]));
  }, [fromDate, toDate]);

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        display: false
      },
      y: {
        ticks: {
          display: true,
          padding: 10,
          mirror: true,
          font: {
            size: 16
          }
        }
      }
    },
    elements: {
      bar: {
        borderWidth: 0
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Ranking',
        align: 'start',
        font: {
          size: 18,
          weight: 0
        },
        padding: {
          bottom: 20
        }
      },
      datalabels: {
        // This code is used to display data values
        anchor: 'end',
        align: 'center',
        formatter: Math.round,
        font: {
          weight: 'bold',
          size: 16
        }
      }
    }
  };

  const data = {
    labels: rankingData.map((val) => val.key),
    datasets: [
      {
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        data: rankingData.map((val) => val.value),
        backgroundColor: '#683da85c'
      }
    ]
  };

  const plugins = {
    plugins: [ChartDataLabels]
  };

  return (
    <div className="rankingChart">
      {isLoading && <Loading />}
      {isError && <Error />}
      {!isError && !isLoading && <Bar data={data} options={options} plugins={plugins} />}
    </div>
  );
};

export default RankingChart;
