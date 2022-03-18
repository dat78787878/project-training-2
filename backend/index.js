const http = require("http");
const host = "localhost";
const port = 8000;
const _ = require("lodash");
var url = require("url");

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "GET,PUT,POST,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  var params = url.parse(req.url, true).query;
  var stringParams = "";
  if (params.fromDate !== undefined && params.toDate !== undefined) {
    // fromDate = params.fromDate.replaceAll("/", "%2F");
    // toDate = params.toDate.replaceAll("/", "%2F");
    stringParams = "?fromDate=" + params.fromDate + "&toDate=" +  params.toDate;
  }
  switch (req.url) {
    case "/hello" + stringParams:
      res.writeHead(200);
      res.end("Hello every");
      break;

    case "/device_summary" + stringParams:
      const pieChart = JSON.stringify({
        iOS: _.random(0, 100),
        android: _.random(0, 100),
      });
      setTimeout(() => {
        res.writeHead(200);
        res.end(pieChart);
      }, 1000);
      break;

    case "/ranking" + stringParams:
      const rankingChart = JSON.stringify([
        { key: "Day 1", value: _.random(0, 20) },
        { key: "Day 2", value: _.random(0, 20) },
        { key: "Day 3", value: _.random(0, 20) },
        { key: "Day 4", value: _.random(0, 20) },
        { key: "Day 5", value: _.random(0, 20) },
        { key: "Day 6", value: _.random(0, 20) },
        { key: "Day 7", value: _.random(0, 20) },
      ]);
      setTimeout(() => {
        res.writeHead(200);
        res.end(rankingChart);
      }, 1000);
      break;

    case "/heat" + stringParams:
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
