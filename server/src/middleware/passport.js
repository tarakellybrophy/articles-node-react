import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { publicKey } from '../lib/keys.js';

import User from '../models/User.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ['RS256']
};

const verifyCallback = function(payload, done) {
  User.findOne({_id: payload.sub})
    .then((user) => {
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }        
    })
    .catch(err => done(err, null));
};
const jwtStrategy = () => new JwtStrategy(options, verifyCallback);

export default jwtStrategy;