import * as bodyParser from 'body-parser';
import * as express from 'express';
import { allowCors } from './cors';

const port = 3000;
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);

server.listen(port, () => {
    console.log(`Backend is running on port ${port}.`)
});

export { server };