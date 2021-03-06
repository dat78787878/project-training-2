import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getData } from '../../redux/heatChart/actions';
import Chart from 'react-apexcharts';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { Col, Row } from 'react-bootstrap';

const HeatChart = () => {
  const { heatData, isLoading, isError } = useSelector((state) => state.heatChart);
  const { fromDate, toDate } = useSelector((state) => state.dateRange);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData([fromDate, toDate]));
  }, [fromDate, toDate]);

  const dataBarChart = heatData.map((value) => {
    return value.data.reduce((sum, currentVal) => {
      return sum + currentVal.y;
    }, 0);
  });
  const optionsBar = {
    chart: {
      offsetX: -30,
      toolbar: {
        show: false
      },
      stacked: true
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 10,
        barHeight: '90%'
      }
    },
    colors: '#0aff01',
    yaxis: {
      labels: {
        show: false
      }
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    xaxis: {
      axisTicks: {
        show: false
      },
      min: 0,
      categories: [
        'Sunday',
        'Saturday',
        'Friday',
        'Thursday',
        'Wednesday',
        'Tuesday',
        'Monday'
      ].reverse(),
      labels: {
        show: true,
        hideOverlappingLabels: true,
        formatter: (value) => {
          return value.toFixed(0);
        },
        style: {
          fontSize: '14px'
        }
      }
    },

    grid: {
      show: false
    }
  };

  const seriesBar = [
    {
      data: dataBarChart.reverse()
    }
  ];

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },

    colors: ['#b700ff'],
    xaxis: {
      labels: {
        formatter: (value) => {
          return value % 12;
        },
        style: {
          fontSize: '14px'
        }
      }
    },
    yaxis: {
      opposite: true,
      labels: {
        align: 'center',
        offsetX: 5,
        formatter: (value) => {
          return value.toString().substring(0, 3);
        },
        style: {
          fontSize: '14px'
        }
      }
    }
  };

  const heatChart = (
    <div className="heatChart-container padding-title">
      <h5 className="">Device By Hour</h5>
      <div className="heatChart-container-detail">
        <Chart options={options} series={heatData} type="heatmap" height={240} />
      </div>
      <div className="d-flex justify-content-between heatChart-container-time">
        <span>am</span>
        <span>pm</span>
      </div>
      <div className="heatChart-container-line"></div>
      <div className="d-flex justify-content-between heatChart-container-number">
        <span>0</span>
        <span>5</span>
        <span>10</span>
        <span>15</span>
      </div>
    </div>
  );

  const barChart = (
    <div className="barChart">
      <Chart options={optionsBar} series={seriesBar} type="bar" height={230} />
    </div>
  );

  return (
    <div className="heatChart">
      {isLoading && <Loading />}
      {isError && <Error />}
      {!isError && !isLoading && (
        <Row>
          <Col md={9} sm={12}>
            {heatChart}
          </Col>
          <Col md={3} sm={12}>
            {barChart}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default HeatChart;
