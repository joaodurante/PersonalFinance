import * as _ from 'lodash';

function sendErrorOrNext(req, res, next){
    const bundle = res.locals.bundle;

    if(bundle.errors){
        let errors = parseErrors(bundle.errors);
        res.status(500).json({errors});
    }else{
        next();
    }
}

function parseErrors(nodeRestfulErrors): string[]{
    let errors: Array<string> = [];
    
    //lodash percorre os objetos pegando apenas a MESSAGE do erro e colocando no array
    _.forIn(nodeRestfulErrors, (error) => errors.push(error.message));
    return errors;
}

/**
 * Classe com as mensagens de erro para o mongoose
 */
class Messages {
    required: string = "The '{PATH}' field is required";
    min: string = "The value '{VALUE}' is less than the minimum accepted";
    max: string = "The value '{VALUE}' is greater than the maximum accepted";
    enum: string = "The value '{VALUE}' is not valid for the field '{PATH}'";
}

const messages = new Messages();

export { sendErrorOrNext, messages };