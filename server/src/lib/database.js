import mongoose from 'mongoose';
import { default as createDebug } from 'debug';

import { dbConfig } from './config.js';

const debug = createDebug('rest-api:debug');

const dbString = 
    'mongodb://' + 
    dbConfig.username + ':' + 
    dbConfig.password + '@' +
    dbConfig.host + ':' + 
    dbConfig.port + '/' + 
    dbConfig.database +
    '?authSource=' + dbConfig.database;

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

var db;

const connectDB = async () => {
    try {
        if (db !== undefined && db.readyState === 1) {
            return;
        }
        const client = await mongoose.connect(dbString, dbOptions);
        db = client.connection; 
        
        mongoose.connection.on('connected', () => {
            debug('Database connected');
        });
    }
    catch (error) {
        debug("Error connecting to database: " + error);
        throw new Error("Could not connect to the database server.");
    }
}

export default connectDB;