import * as express from 'express';
import { BillingCycle as billingCycleService} from '../api/billingCycle/billingCycleService';

function routes(server: any) {
    const router = express.Router();
    server.use('/api', router);

    //rotas da API
    billingCycleService.register(router, '/billingCycles');
}

export { routes };