import * as bodyParser from 'body-parser';
import * as express from 'express';

const port = 3000;
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(port, () => {
    console.log(`Backend is running on port ${port}.`)
});

export { server };