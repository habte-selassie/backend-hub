/// <reference types="node" />
import * as elliptic from 'elliptic';
export declare class KeyUtils {
    generate_keypair(): elliptic.ec.KeyPair;
    load_keypair(buf: Buffer | string): elliptic.ec.KeyPair;
    get_sin_from_key(kp: elliptic.ec.KeyPair): string;
    signOrig(data: string, kp: elliptic.ec.KeyPair): Buffer;
    sign(data: string, privkey: elliptic.ec.KeyPair): string;
    getPublicKeyFromPrivateKey(privkey: any): string;
    private get_version_from_compressed_key;
    private get_checksum_from_version;
}
