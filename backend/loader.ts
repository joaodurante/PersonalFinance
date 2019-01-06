import { server } from './config/server';
import './config/database';
import { routes } from './config/routes';

routes(server);