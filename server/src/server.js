import express from 'express';
import cors from 'cors';
import passport from 'passport';

import accessFileLogger from './middleware/logger.js';
import jwtStrategy from './middleware/passport.js';
import { port } from './lib/config.js';
import router from './routes/index.js'
import connectDB from './lib/database.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(accessFileLogger());

passport.use(jwtStrategy());
app.use(passport.initialize());

app.use(router);

await connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
