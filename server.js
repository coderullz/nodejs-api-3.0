const http = require('http');

const port = process.env.PORT || 9080;
const app = require('./app');

const server = http.createServer(app);


server.listen(port, () => console.log(`success: server just successfully started running on the environment port ${port}`));