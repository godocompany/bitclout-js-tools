import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import bs58check from 'bs58check';
import { ec as EC } from 'elliptic';
import { default as hdkey, default as HDNode } from 'hdkey';

const PUBLIC_KEY_PREFIXES = {
    mainnet: {
        bitcoin: [0x00],
        bitclout: [0xcd, 0x14, 0x0],
    },
    testnet: {
        bitcoin: [0x6f],
        bitclout: [0x11, 0xc2, 0x0],
    },
};

export type Network = 'mainnet' | 'testnet';

export class Crypto {

    public static generateMnemonic(): string {
        return generateMnemonic();
    }
    
    /**
     * Gets the BitClout public key string for the given mnemonic. This is a convenience
     * functions that change several other methods together.
     * @param mnemonic the mnemonic seed phrase
     */
    public static mnemonicToPublicKey(mnemonic: string): string {
        const keychain = Crypto.mnemonicToKeychain(mnemonic);
        const keypair = Crypto.keychainToKeyPair(keychain);
        const pubkey = Crypto.keyPairToBitcloutPublicKey(keypair);
        return pubkey;
    }
    
    /**
     * Gets the hierarchical deterministic keychain for the given mnemonic seed
     * @param mnemonic the mnemonic seed phrase
     */
    public static mnemonicToKeychain(mnemonic: string): HDNode {
        const seed = mnemonicToSeedSync(mnemonic);
        return hdkey.fromMasterSeed(seed).derive('m/44\'/0\'/0\'/0/0');
    }
    
    /**
     * Gets the private key (as a hexadecimal string) from the given keychain
     * @param keychain the keychain to pull the private key from
     */
    public static keychainToSeedHex(keychain: HDNode): string {
        return keychain.privateKey.toString('hex');
    }
    
    /**
     * Gets the key pair from the given hierarchical deterministic keychain
     * @param keychain the keychain to product the keypair from
     */
    public static keychainToKeyPair(keychain: HDNode): EC.KeyPair {
        const seedHex = Crypto.keychainToSeedHex(keychain);
        const ec = new EC('secp256k1');
        return ec.keyFromPrivate(seedHex);
    }
    
    /**
     * Gets the BitClout public key (BC1Y...) from the given keypair
     * @param keypair the keypair to pull the public key from
     * @param network the network to use (mainnet/testnet)
     */
    public static keyPairToBitcloutPublicKey(keypair: EC.KeyPair, network: Network = 'mainnet'): string {
        const prefix = PUBLIC_KEY_PREFIXES[network].bitclout;
        const key = keypair.getPublic().encode('array', true);
        const prefixAndKey = Uint8Array.from([...prefix, ...key]);
        return bs58check.encode(prefixAndKey);
    }
    
    /**
     * Gets the Bitcoin wallet address for the given keychain (and network)
     * @param keychain the keychain to pull from
     * @param network the network to use (mainnet/testnet)
     */
    public static keychainToBtcAddress(keychain: HDNode, network: Network = 'mainnet'): string {
        const prefix = PUBLIC_KEY_PREFIXES[network].bitcoin;
        // @ts-ignore TODO: add "identifier" to type definition
        const identifier = keychain.identifier;
        const prefixAndKey = Uint8Array.from([...prefix, ...identifier]);
        return bs58check.encode(prefixAndKey);
    }    

}
