/**
 * Cria serviços rest para os métodos htttp
 * Atribui regras para requisições http
 * Cria uma nova rota
 */
import { BillingCycle } from './billingCycle';
import { sendErrorOrNext } from './errorsService';

//cria serviços rest para os métodos http
BillingCycle.methods(['get', 'post', 'put', 'delete']);

//aciona um middleware AFTER uma requisiçao POST e PUT
BillingCycle.after('post', sendErrorOrNext).after('put', sendErrorOrNext);

/**
 * faz com que ao atualizar um dado através de requisições, o mesmo retorne o novo dado e não o antigo
 * faz com que toda alteração passe pela validação dos novos dados (por padrão não passa)
 */
BillingCycle.updateOptions({new: true, runValidators: true});

/**
 * BillingCycle abrange tanto metodos do express quando do mongoose (graças ao node-restful) route() é do express
 */
BillingCycle.route('count', (req, res, next) =>{
    BillingCycle.count((error, value) =>{
        if(error){
            res.status(500).json({errors: [error]});
        }else{
            res.json({value});
        }
    });
})


export { BillingCycle };