import { generateKeyPairSync } from 'crypto';
import { writeFileSync } from 'fs';
import { approotdir } from './lib/config.js';

function genKeyPair() {
    // Generates an object where the keys are stored in properties 
    // `privateKey` and `publicKey`
    const keyPair = generateKeyPairSync('rsa', {
        modulusLength: 4096,    // bits - standard for RSA keys
        publicKeyEncoding: {
            type: 'pkcs1',      // "Public Key Cryptography Standards 1" 
            format: 'pem'       // Most common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1',      // "Public Key Cryptography Standards 1"
            format: 'pem'       // Most common formatting choice
        }
    });

    // Create the public key file
    writeFileSync(approotdir + '/id_rsa_pub.pem', keyPair.publicKey); 
    
    // Create the private key file
    writeFileSync(approotdir + '/id_rsa_priv.pem', keyPair.privateKey);

}

// Generate the keypair
genKeyPair();
