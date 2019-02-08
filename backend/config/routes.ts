import * as express from 'express';
import { BillingCycle as billingCycleService} from '../api/billingCycle/billingCycleService';
import { getSummary } from '../api/billingSummary/billingSummaryService';
import { auth } from './auth';
import * as authService from '../api/user/authService';

function routes(server) {

    /**
     * Rotas abertas
     */
    const openApi = express.Router();
    server.use('/oapi', openApi);
    
    openApi.post('/login', authService.login);
    openApi.post('/signup', authService.signup);
    openApi.post('/validateToken', authService.validateToken);

    /**
     * Rotas protegidas
     */
    const protectedApi = express.Router();
    server.use('/api', protectedApi);
    protectedApi.use(auth); // todas as requisiçoes de protectedApi passarão por auth

    billingCycleService.register(protectedApi, '/billingCycles');
    protectedApi.route('/billingSummary').get(getSummary);
}

export { routes };