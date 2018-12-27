import * as mongoose from 'mongoose';

module.exports = mongoose.connect('mongodb://localhost/db_finance', {useNewUrlParser: true});