import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getData } from "../../redux/pieChart/actions";
import Error from "../../components/Error";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const pieData = useSelector((state) => state.pieData);
  const isLoading = useSelector((state) => state.isLoading);
  const isError = useSelector((state) => state.isError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);

  const options = {
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  const data = {
    labels: ["Android", "IOS"],
    datasets: [
      {
        data: [pieData.android, pieData.iOS],
        backgroundColor: ["rgb(0, 255, 76)", "rgb(234, 0, 255)"],
        hoverBackgroundColor: ["rgb(0, 255, 76)", "rgb(234, 0, 255)"],
      },
    ],
  };

  return (
    <div className="pieChart">
      {isError && <Error/>}
      {!isError && !isLoading && <Doughnut data={data} options={options} />}
    </div>
  );
};

export default PieChart;
