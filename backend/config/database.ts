import * as mongoose from 'mongoose';

const mongo = mongoose.connect('mongodb://localhost/db_finance', {useNewUrlParser: true});

export { mongo };