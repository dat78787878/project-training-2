import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getData } from '../../redux/pieChart/actions';
import Error from '../../components/Error/Error';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const { pieData, isLoading, isError } = useSelector((state) => state.pieChart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);

  const options = {
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'right'
      },
      title: {
        display: true,
        text: 'Decive Type',
        align: 'start',
        font: {
          size: 18
        },
        padding: {
          top: 20
        }
      }
    }
  };

  const data = {
    labels: ['Android', 'IOS'],
    datasets: [
      {
        data: [pieData.android, pieData.iOS],
        backgroundColor: ['rgb(0, 255, 200)', 'rgb(234, 0, 255)'],
        hoverBackgroundColor: ['rgb(0, 255, 200)', 'rgb(234, 0, 255)']
      }
    ]
  };

  return (
    <div className="pieChart">
      {isError && <Error />}
      {!isError && !isLoading && <Doughnut data={data} options={options} />}
    </div>
  );
};

export default PieChart;
