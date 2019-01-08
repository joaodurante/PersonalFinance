import * as express from 'express';
import { BillingCycle as billingCycleService} from '../api/billingCycle/billingCycleService';
import { getSummary } from '../api/billingSummary/billingSummaryService';

function routes(server) {
    const router = express.Router();
    server.use('/api', router);

    //rotas da API
    billingCycleService.register(router, '/billingCycles');
    router.route('/billingSummary').get(getSummary);
}

export { routes };