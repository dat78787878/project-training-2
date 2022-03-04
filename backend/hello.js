const http = require("http");
const host = "localhost";
const port = 8000;

const pieChart = JSON.stringify(
    {iOS: 40, android: 60}
);


const requestListener = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  switch (req.url) {
    case "/hello":
      res.writeHead(200);
      res.end("Hello every");
      break;

    case "/device_summary":
      res.writeHead(200);
      res.end(pieChart);
      break;
  }
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
