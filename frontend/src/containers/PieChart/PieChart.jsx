import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getData } from '../../redux/pieChart/actions';
import Error from '../../components/Error/Error';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import Loading from '../../components/Loading/Loading';

Chart.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const { pieData, isLoading, isError } = useSelector((state) => state.pieChart);
  const { fromDate, toDate } = useSelector((state) => state.dateRange);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData([fromDate, toDate, pieData.map((val) => val.x)]));
  }, [fromDate, toDate]);

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
          size: 16
        },
        padding: 10
      }
    }
  };

  const data = {
    labels: pieData.map((val) => val.x),
    datasets: [
      {
        data: pieData.map((val) => val.y),
        backgroundColor: ['#00ffc8', '#ea00ff', '#e02b2b', '#2600ff', '#00d9ff', '#00ff0d'],
        hoverBackgroundColor: ['#00ffc8', '#ea00ff', '#e02b2b', '#2600ff', '#00d9ff', '#00ff0d']
      }
    ]
  };

  return (
    <div className="pieChart padding-title">
      {isLoading && <Loading />}
      {isError && <Error />}
      {!isError && !isLoading && <Doughnut data={data} options={options} />}
    </div>
  );
};

export default PieChart;
