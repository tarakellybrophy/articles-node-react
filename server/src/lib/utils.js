import { pbkdf2Sync, randomBytes } from 'crypto';
import jsonwebtoken from 'jsonwebtoken';

import { privateKey } from './keys.js';

function passwordVerify(password, hash, salt) {
    var hashVerify = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

function passwordHash(password) {
    var salt = randomBytes(32).toString('hex');
    var genHash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

function issueJWT(user) {
  const _id = user._id;
  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, privateKey, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: signedToken,
    expires: expiresIn
  }
}

export { passwordVerify,  passwordHash, issueJWT };