import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from './user';
import { env } from '../../config/env';

const emailRegex = /\S+@\S+\.\S+/;
/**
 * 1 digito 1 letra min 1 letra mai 1 carac. esp.
 * /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/
 */
const passwordRegex = /((?=.*\d)(?=.*[a-z]).{6,12})/;

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = [];
    _.forIn(dbErrors.errors, error => errors.push(error.message));
    return res.status(400).json({errors});
}

const login = (req, res, next) => {
    const email = req.body.email || '';
    const password = req.body.password || '';

    User.findOne({email}, (err, user) => {
        if(err)
            return sendErrorsFromDB(res, err);
        else if(user && bcrypt.compareSync(password, user.password)){
            const token = jwt.sign(user.toJSON(), env.authSecret, {
                expiresIn: "1 day"
            });
            const { name, email } = user;
            res.json({name, email, token});
        }else{
            return res.status(400).json({errors: ['User/password is invalids']});
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || '';
    jwt.verify(token, env.authSecret, (err, decoded)=>{
        return res.status(200).send({valid: !err});
    })
}

const signup = (req, res, next) => {
    const name = req.body.name || '';
    const email = req.body.email || '';
    const password = req.body.password || '';
    const confirmPassword = req.body.confirm_password || '';

    if(!email.match(emailRegex))
        return res.status(400).send({errors: ['The email is not valid.']});
    
    if(!password.match(passwordRegex))
        return res.status(400).send({errors: ['The password is not valid']});
    
    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);
    if(!bcrypt.compareSync(confirmPassword, passwordHash))
        return res.status(400).send({errors: ['The password does not match.']});

    User.findOne({email}, (err, user) => {
        if(err)
            return sendErrorsFromDB(res, err);
        else if(user)
            return res.status(400).send({errors: ['Email is already in use.']});
        else{
            const newUser = new User({name, email, password: passwordHash});
            newUser.save(err => {
                if(err)
                    return sendErrorsFromDB(res, err);
                else
                    login(req, res, next);
            })
        }
    })
}

export { login, validateToken, signup };