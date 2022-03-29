import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { getData } from '../../redux/lineChart/actions';

const LineChart = () => {
  const dispatch = useDispatch();
  const { lineData, isLoading, isError } = useSelector((state) => state.lineChart);
  const { fromDate, toDate } = useSelector((state) => state.dateRange);
  const groupData = ['Day', 'Week', 'Month'];
  const [isActive, setIsActive] = useState(0);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    dispatch(getData([fromDate, toDate]));
  }, [fromDate, toDate]);

  useEffect(() => {
    setSeries(lineData);
    setIsActive(0);
  }, [lineData]);

  const totalData = useMemo(() => {
    const total = lineData.map((val) => val.data.reduce((acc, val) => acc + val.y, 0));
    return total;
  }, [lineData]);

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    legend: {
      show: true,
      horizontalAlign: 'left',
      formatter: (seriesName, opts) => seriesName + ' ' + totalData[opts.seriesIndex]
    },
    colors: ['#00ffc8', '#ea00ff'],
    title: {
      text: 'Decive',
      align: 'left',
      style: {
        fontSize: '18px'
      }
    }
  };

  const handleData = (lineData, formatType) => {
    const newSeries = lineData.map((device) => {
      const data = device.data.map((date) => ({
        x: moment(date.x, 'YYYY-MM-DD').format(formatType),
        y: date.y
      }));

      let obj = {};
      const newData = data.reduce((totalY, date) => {
        if (!obj[date.x]) {
          obj[date.x] = date;
          totalY.push(obj[date.x]);
        } else {
          obj[date.x].y += date.y;
        }
        return totalY;
      }, []);
      return {
        name: device.name,
        data: newData
      };
    });

    return newSeries;
  };

  const handleClick = useCallback(
    (val) => {
      setIsActive(val);
      if (val === 'Day') {
        setSeries(lineData);
      }
      if (val === 'Week') {
        const newSeries = handleData(lineData, 'WW');
        setSeries(newSeries);
      }
      if (val === 'Month') {
        const newSeries = handleData(lineData, 'MM-YYYY');
        setSeries(newSeries);
      }
    },
    [lineData]
  );

  const lineChart = (
    <div className="lineChart-container">
      <div className="lineChart-container-menu">
        {groupData.map((val, index) => {
          return (
            <>
              <span
                key={index}
                style={{ opacity: isActive === val ? 1 : 0.3 }}
                data-testid={val}
                onClick={() => handleClick(val)}>
                <div
                  className={
                    isActive === val
                      ? 'lineChart-container-menu-item'
                      : 'lineChart-container-menu-item none'
                  }></div>
                {val}
              </span>
            </>
          );
        })}
      </div>
      <Chart options={options} series={series} type="line" height={620} />
    </div>
  );
  return (
    <div className="lineChart">
      {isLoading && <Loading />}
      {isError && <Error />}
      {!isLoading && !isError && lineChart}
    </div>
  );
};

export default LineChart;
