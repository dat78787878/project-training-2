const _ = require("lodash");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const host = "localhost";
const moment = require("moment");
app.use(cors());

app.get("/device_summary", (req, res) => {
  const { fromDate, toDate, device_types } = req.query;
  const pieChart = [
    { x: "Android", y: fromDate && toDate ? _.random(0, 100) : 30 },
    { x: "Windows", y: fromDate && toDate ? _.random(0, 100) : 10 },
    { x: "iOS", y: fromDate && toDate ? _.random(0, 100) : 10 },
    { x: "Os X", y: fromDate && toDate ? _.random(0, 100) : 20 },
    { x: "Unknown", y: fromDate && toDate ? _.random(0, 100) : 20 },
    { x: "Linux", y: fromDate && toDate ? _.random(0, 100) : 10 },
  ];
  if (!fromDate || !toDate) {
    res.status(404).send({
      status: 404,
      error: "Not found",
    });
    return;
  }
  !device_types || !device_types.length
    ? setTimeout(() => {
        res.send(pieChart);
      }, 1000)
    : setTimeout(() => {
        res.send(
          _.map(device_types, (os) => ({
            x: os,
            y: _.random(0, 100),
          }))
        );
      }, 1000);
});

app.get("/ranking", (req, res) => {
  const { fromDate, toDate } = req.query;
  const rankingChart = [
    { key: "Day 1", value: fromDate && toDate ? _.random(0, 20) : 9 },
    { key: "Day 2", value: fromDate && toDate ? _.random(0, 20) : 8 },
    { key: "Day 3", value: fromDate && toDate ? _.random(0, 20) : 10 },
    { key: "Day 4", value: fromDate && toDate ? _.random(0, 20) : 12 },
    { key: "Day 5", value: fromDate && toDate ? _.random(0, 20) : 14 },
    { key: "Day 6", value: fromDate && toDate ? _.random(0, 20) : 6 },
    { key: "Day 7", value: fromDate && toDate ? _.random(0, 20) : 7 },
  ];
  if (!fromDate || !toDate) {
    res.status(404).send({
      status: 404,
      error: "Not found",
    });
    return;
  } else {
    setTimeout(() => {
      res.send(rankingChart);
    }, 1000);
  }
});

app.get("/heat", (req, res) => {
  const { fromDate, toDate } = req.query;
  const heatChart = _.map(
    [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    (day) => ({
      name: day,
      data: _.map(_.range(0, 24), (time) => ({
        x: `${time}`,
        y: _.random(0, 2) !== 2 ? _.random(0, 30) : _.random(0, 50),
      })),
    })
  );
  if (!fromDate || !toDate) {
    res.status(404).send({
      status: 404,
      error: "Not found",
    });
    return;
  } else {
    setTimeout(() => {
      res.send(heatChart);
    }, 1000);
  }
});

app.get("/line", (req, res) => {
  const { fromDate, toDate } = req.query;
  const lineChart = _.map(["Android", "iOS"], (device) => {
    const data = [];
    let date = fromDate;
    while (date !== toDate) {
      data.push({ x: date, y: _.random(0, 30) });
      date = moment(date, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD");
    }
    data.push({ x: date, y: _.random(0, 30) });
    return {
      name: device,
      data,
    };
  });

  if (!fromDate || !toDate) {
    res.status(404).send({
      status: 404,
      error: "Not found",
    });
    return;
  } else {
    setTimeout(() => {
      res.send(lineChart);
    }, 1000);
  }
});
function getArrayRandomElement(arr) {
  if (arr && arr.length) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
app.get("/used_time", (req, res) => {
  const { page } = req.query;
  var myArray = ["Android", "iOS"];
  const usedTimeData = [];
  let count = 0;
  while (count < 10) {
    let facebookTimeUse_ = _.random(0, 20);
    let youtubeTimeUse_ = _.random(0, 20);
    let other_ = _.random(0, 20);
    let total = facebookTimeUse_ + youtubeTimeUse_ + other_;
    let data = {
      userName: (Math.random() + 1).toString(36).substring(7),
      oSName: getArrayRandomElement(myArray),
      date: randomDate(new Date(2012, 0, 1), new Date()),
      useTimeNumber: total,
      facebookTimeUse: facebookTimeUse_,
      youtubeTimeUse: youtubeTimeUse_,
      other: other_,
    };
    count += 1;
    usedTimeData.push(data);
  }
  if (!page) {
    res.status(404).send({
      status: 404,
      error: "Not found",
    });
    return;
  } else {
    setTimeout(() => {
      res.send(usedTimeData);
    }, 1000);
  }
});

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
