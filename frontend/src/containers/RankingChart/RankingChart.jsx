import React from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getData } from '../../redux/rankingChart/actions';
import Error from '../../components/Error/Error';
import { Bar } from 'react-chartjs-2';
import { RingLoader } from 'react-spinners';
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const RankingChart = () => {
  const { rankingData, isLoading, isError } = useSelector((state) => state.rankingChart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

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

  return (
    <div className="rankingChart">
      {isLoading && <RingLoader size={60} />}
      {isError && <Error />}
      {!isError && !isLoading && <Bar data={data} options={options} />}
    </div>
  );
};

export default RankingChart;
