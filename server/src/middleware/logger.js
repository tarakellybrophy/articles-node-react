import { default as logger } from 'morgan';
import { default as rfs } from 'rotating-file-stream';
import { logConfig } from '../lib/config.js';

const accessFileLogger = () => logger(logConfig.format, {
    stream: logConfig.file ?
        rfs.createStream(logConfig.file, {
            size: '10M',
            interval: '1d',
            compress: 'gzip'
        }) : 
        process.stdout
});

export default accessFileLogger;