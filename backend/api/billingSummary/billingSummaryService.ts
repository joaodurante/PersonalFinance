import * as _ from 'lodash';
import { BillingCycle } from '../billingCycle/billingCycle';

function getSummary(req, res) {
    BillingCycle.aggregate([
        { $project: { credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"} } },
        { $group: { _id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"} } },
        { $project: { _id: 0, credit: 1, debt: 1 } },
    ]).exec((error, result) => {
        if(error){
            res.status(500).json({errors: [error]});
        }else{
            // if(result[0] nao conter credit/debt, credit/debt sera adicionado com valor 0)
            res.json(_.defaults(result[0], {credit: 0, debt: 0}));
        }
    });
}

export { getSummary };