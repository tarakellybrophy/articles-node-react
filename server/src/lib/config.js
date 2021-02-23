import dotenv from 'dotenv';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));
const approotdir = __dirname;

const filePath = path.join(approotdir, '.env')
dotenv.config({ path: filePath });

const port = process.env.PORT;
const dbConfig = {
    host: process.env.MONGO_DB_HOST,
    port: process.env.MONGO_DB_PORT,
    database: process.env.MONGO_DB_DATABASE,
    username: process.env.MONGO_DB_USERNAME,
    password: process.env.MONGO_DB_PASSWORD
};
const logConfig = {
  file: process.env.REQUEST_LOG_FILE,
  format: process.env.REQUEST_LOG_FORMAT
};

export { port, dbConfig, approotdir, logConfig };