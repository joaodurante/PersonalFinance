import { BillingCycle } from './billingCycle';

//cria serviços rest para os métodos http
BillingCycle.methods(['get', 'post', 'put', 'delete']);

//faz com que ao atualizar um dado através de requisições, o mesmo retorne o novo dado e não o antigo
//faz com que toda alteração passe pela validação dos novos dados (por padrão não passa)
BillingCycle.updateOptions({new: true, runValidators: true});


export { BillingCycle };