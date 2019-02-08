import * as jwt from 'jsonwebtoken';
import { env } from './env';

function auth(req, res, next){
    console.log(req.method);
    //CORS preflight request (antes de uma requisição, há uma outra do tipo OPTIONS que retorna os metodos disponiveis)
    if(req.method === 'OPTIONS')
        next();
    else{
        const token = req.body.token || req.query.token || req.headers['authorization'];

        if(!token)
            return res.status(403).send({errors: ['No token provided.']});
        
        jwt.verify(token, env.authSecret, (err, decoded) => {
            if(err)
                return res.status(403).send({errors: ['Failed to authenticate token.']});
            else
                next();
        })
    }
}

export { auth };