import * as restful from 'node-restful';
const mongoose = restful.mongoose;

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, min: 6, max: 12, required: true
    }
});

const User = restful.model('User', userSchema);

export { User };
