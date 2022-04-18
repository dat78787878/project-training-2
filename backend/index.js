const _ = require("lodash");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const host = "192.168.50.133";
const moment = require("moment");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
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
app.get("/used_time_test", (req, res) => {
  const { page } = req.query;
  var myArray = ["Android", "iOS"];
  const usedTimeData = [];
  let count = 0;
  while (count < 20) {
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
const data = [
  {
    userName: "7hfub",
    oSName: "Android",
    date: "2022-04-13",
    useTimeNumber: 42,
    facebookTimeUse: 20,
    youtubeTimeUse: 5,
    other: 17,
  },
  {
    userName: "8336q",
    oSName: "iOS",
    date: "2022-04-14",
    useTimeNumber: 17,
    facebookTimeUse: 4,
    youtubeTimeUse: 12,
    other: 1,
  },
  {
    userName: "uu1mz",
    oSName: "Android",
    date: "2022-04-15",
    useTimeNumber: 15,
    facebookTimeUse: 2,
    youtubeTimeUse: 10,
    other: 3,
  },
  {
    userName: "76xmi",
    oSName: "Android",
    date: "2022-04-16",
    useTimeNumber: 25,
    facebookTimeUse: 1,
    youtubeTimeUse: 5,
    other: 19,
  },
  {
    userName: "nlnez",
    oSName: "iOS",
    date: "2022-04-17",
    useTimeNumber: 35,
    facebookTimeUse: 5,
    youtubeTimeUse: 17,
    other: 13,
  },
  {
    userName: "gps2o",
    oSName: "iOS",
    date: "2022-04-18",
    useTimeNumber: 22,
    facebookTimeUse: 5,
    youtubeTimeUse: 17,
    other: 0,
  },
  {
    userName: "2ldz8",
    oSName: "Android",
    date: "2022-04-19",
    useTimeNumber: 28,
    facebookTimeUse: 4,
    youtubeTimeUse: 7,
    other: 17,
  },
  {
    userName: "e6eoo",
    oSName: "Android",
    date: "2022-04-20",
    useTimeNumber: 38,
    facebookTimeUse: 17,
    youtubeTimeUse: 7,
    other: 14,
  },
  {
    userName: "zigic",
    oSName: "iOS",
    date: "2022-04-21",
    useTimeNumber: 34,
    facebookTimeUse: 1,
    youtubeTimeUse: 19,
    other: 14,
  },
  {
    userName: "2dw3dh",
    oSName: "iOS",
    date: "2022-04-22",
    useTimeNumber: 37,
    facebookTimeUse: 19,
    youtubeTimeUse: 9,
    other: 9,
  },
  {
    userName: "vsep9",
    oSName: "iOS",
    date: "2022-04-23",
    useTimeNumber: 25,
    facebookTimeUse: 2,
    youtubeTimeUse: 5,
    other: 18,
  },
  {
    userName: "ojfny",
    oSName: "iOS",
    date: "2019-01-11T20:26:30.268Z",
    useTimeNumber: 17,
    facebookTimeUse: 0,
    youtubeTimeUse: 3,
    other: 14,
  },
  {
    userName: "cr2bfg",
    oSName: "Android",
    date: "2014-04-03T10:43:20.516Z",
    useTimeNumber: 42,
    facebookTimeUse: 16,
    youtubeTimeUse: 6,
    other: 20,
  },
  {
    userName: "1qxuf",
    oSName: "iOS",
    date: "2019-07-15T10:53:35.555Z",
    useTimeNumber: 34,
    facebookTimeUse: 16,
    youtubeTimeUse: 16,
    other: 2,
  },
  {
    userName: "aco3k",
    oSName: "iOS",
    date: "2015-03-08T22:43:43.064Z",
    useTimeNumber: 26,
    facebookTimeUse: 15,
    youtubeTimeUse: 2,
    other: 9,
  },
  {
    userName: "p8yji",
    oSName: "Android",
    date: "2013-01-24T18:00:49.941Z",
    useTimeNumber: 21,
    facebookTimeUse: 3,
    youtubeTimeUse: 11,
    other: 7,
  },
  {
    userName: "vnhoh",
    oSName: "Android",
    date: "2012-07-22T23:18:36.415Z",
    useTimeNumber: 37,
    facebookTimeUse: 14,
    youtubeTimeUse: 14,
    other: 9,
  },
  {
    userName: "30elp",
    oSName: "Android",
    date: "2015-04-24T17:37:35.009Z",
    useTimeNumber: 31,
    facebookTimeUse: 18,
    youtubeTimeUse: 13,
    other: 0,
  },
  {
    userName: "bq4zs",
    oSName: "iOS",
    date: "2012-06-22T07:20:57.018Z",
    useTimeNumber: 36,
    facebookTimeUse: 19,
    youtubeTimeUse: 4,
    other: 13,
  },
  {
    userName: "d7tt2",
    oSName: "Android",
    date: "2020-03-25T02:25:22.372Z",
    useTimeNumber: 27,
    facebookTimeUse: 15,
    youtubeTimeUse: 1,
    other: 11,
  },
];

app.get("/used_time", (req, res) => {
  const { page } = req.query;
  if (!page) {
    res.status(404).send({
      status: 404,
      error: "Not found",
    });
    return;
  } else {
    const usedTimeData = data.slice((page - 1) * 5, page * 5);
    setTimeout(() => {
      res.send(usedTimeData);
    }, 1000);
  }
});

app.post("/used_time", (req, res) => {
  data.unshift(req.body.params.newUsedTimeData);
  const usedTimeData = data.slice(0, 5);
  setTimeout(() => {
    res.send(usedTimeData);
  }, 1000);
});

app.put("/used_time", (req, res) => {
  data[req.body.params.positonEdit] = req.body.params.newUsedTimeData
  const usedTimeData = data.slice(0, 5);
  setTimeout(() => {
    res.send(usedTimeData);
  }, 1000);
  // res.json({
  //   susses: 200,
  // });
});

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
