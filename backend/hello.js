const http = require("http");
const host = 'localhost';
const port = 8000;
const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    switch (req.url) {
        case "/hello":
            res.writeHead(200);
            res.end("Hello every");
            break
        }
  
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});