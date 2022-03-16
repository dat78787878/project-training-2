const http = require("http");
const host = "localhost";
const port = 8000;
const _ = require("lodash");

const pieChart = JSON.stringify({ iOS: 40, android: 60 });
const rankingChart = JSON.stringify([
  { key: "Day 1", value: _.random(0, 20) },
  { key: "Day 2", value: _.random(0, 20) },
  { key: "Day 3", value: _.random(0, 20) },
  { key: "Day 4", value: _.random(0, 20) },
  { key: "Day 5", value: _.random(0, 20) },
  { key: "Day 6", value: _.random(0, 20) },
  { key: "Day 7", value: _.random(0, 20) },
]);
const heatChart = _.map(
  [
    "Sunday",
    "Saturday",
    "Friday",
    "Thursday",
    "Wednesday",
    "Tuesday",
    "Monday",
  ],
  (day) => ({
    name: day,
    data: _.map(_.range(0, 24), (time) => ({
      x: `${time}`,
      y: _.random(0, 2) !== 2 ? _.random(0, 30) : _.random(0, 50),
    })),
  })
);

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  switch (req.url) {
    case "/hello":
      res.writeHead(200);
      res.end("Hello every");
      break;

    case "/device_summary":
      setTimeout(() => {
        res.writeHead(200);
        res.end(pieChart);
      }, 10000);
      break;

    case "/ranking":
      setTimeout(() => {
        res.writeHead(200);
        res.end(rankingChart);
      }, 5000);
      break;
      
    case "/heat":
      setTimeout(() => {
        res.writeHead(200);
        res.end(JSON.stringify(heatChart));
      }, 1000);
      break;
  }
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
