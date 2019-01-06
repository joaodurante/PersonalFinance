/**
 * Schemas para o mongoose, junto com as respostas de possíveis erros
 */

import * as restful from 'node-restful';
import { messages } from './messages';
const mongoose = restful.mongoose;

const reqTrue = [ true, messages.required ];

//mapeamento das informaçoes para o mongoose
const creditSchema = new mongoose.Schema({
    name: { type: String, required: reqTrue },
    value: { type: Number, min: [0, messages.min], required: reqTrue }
});

const debtSchema = new mongoose.Schema({
    name: { type: String, required: reqTrue },
    value: { type: Number, min: [0, messages.min], required: reqTrue },
    status: { type: String, required: reqTrue, uppercase: true, enum: ['PAID', 'PENDING', 'SCHEDULED'] }
});

const billingCycleSchema = new mongoose.Schema({
    name: { type: String, required: reqTrue },
    month: { type: Number, min: [1, messages.min], max: [12, messages.max], required: reqTrue },
    year: { type: Number, min: [1970, messages.min], max: [2100, messages.min], required: reqTrue },
    credits: [creditSchema],
    debts: [debtSchema]
});

const BillingCycle = restful.model('BillingCycle', billingCycleSchema);

export { BillingCycle };