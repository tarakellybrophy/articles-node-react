import { generateKeyPairSync } from 'crypto';
import fs from 'fs';
import path from 'path';
import { approotdir } from './config.js';

const pathToPublicKey = path.join(approotdir, 'id_rsa_pub.pem');
const pathToPrivateKey = path.join(approotdir, 'id_rsa_priv.pem');

const publicKey = fs.readFileSync(pathToPublicKey, 'utf8');
const privateKey = fs.readFileSync(pathToPrivateKey, 'utf8');

export { publicKey, privateKey };