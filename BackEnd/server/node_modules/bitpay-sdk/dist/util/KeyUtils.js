"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyUtils = void 0;
const elliptic = require("elliptic");
const bs58 = require("bs58");
const crypto = require("crypto");
const ec = new elliptic.ec('secp256k1');
class KeyUtils {
    generate_keypair() {
        const kp = ec.genKeyPair();
        return kp;
    }
    load_keypair(buf) {
        return ec.keyFromPrivate(buf);
    }
    get_sin_from_key(kp) {
        const pk = Buffer.from(kp.getPublic().encodeCompressed());
        const version = this.get_version_from_compressed_key(pk);
        const checksum = this.get_checksum_from_version(version);
        return bs58.encode(Buffer.concat([version, checksum]));
    }
    signOrig(data, kp) {
        const digest = crypto.createHash('sha256').update(data).digest();
        return Buffer.from(kp.sign(digest).toDER());
    }
    sign(data, privkey) {
        const dataBuffer = Buffer.from(data, 'utf-8');
        const hashBuffer = crypto.createHash('sha256').update(dataBuffer).digest();
        return Buffer.from(privkey.sign(hashBuffer).toDER()).toString('hex');
    }
    getPublicKeyFromPrivateKey(privkey) {
        const ecKey = this.load_keypair(privkey);
        return ecKey.getPublic().encodeCompressed('hex');
    }
    get_version_from_compressed_key(pk) {
        const sh2 = crypto.createHash('sha256').update(pk).digest();
        const rp = crypto.createHash('ripemd160').update(sh2).digest();
        return Buffer.concat([Buffer.from('0F', 'hex'), Buffer.from('02', 'hex'), rp]);
    }
    get_checksum_from_version(version) {
        const h1 = crypto.createHash('sha256').update(version).digest();
        const h2 = crypto.createHash('sha256').update(h1).digest();
        return h2.slice(0, 4);
    }
}
exports.KeyUtils = KeyUtils;
//# sourceMappingURL=KeyUtils.js.map