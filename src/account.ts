import { ec } from 'elliptic';
import HDNode from 'hdkey';
import { Crypto, Network } from './crypto';

export class Account {

    /**
     * Generates a new BitClout account
     * @returns the generated BitClout account
     */
    public static generate(): Account {
        return new Account(
            Crypto.generateMnemonic(),
        );
    }

    /**
     * The hierarchical deterministic keychain for the account, based on
     * the private key encoded in the mnemonic seed phrase
     */
    private readonly keychain: HDNode;

    public constructor(
        private readonly mnemonic: string,
        private readonly network: Network = 'mainnet',
    ) {

        // Create the keychain
        this.keychain = Crypto.mnemonicToKeychain(mnemonic);

    }

    /**
     * Gets the mnemonic seed phrase for the account
     */
    public getMnemonic(): string {
        return this.mnemonic;
    }

    /**
     * Gets the public key for the account
     */
    public getPublicKeyBase58(): string {
        const keypair = this.getKeyPair();
        return Crypto.keyPairToBitcloutPublicKey(keypair, this.network);
    }

    /**
     * Gets the elliptic curve keypair object from the mnemonic seed
     */
    private getKeyPair(): ec.KeyPair {
        return Crypto.keychainToKeyPair(this.keychain);
    }

    /**
     * Gets the Bitcoin wallet address associated with this account
     */
    public getBitcoinAddress(): string {
        return Crypto.keychainToBtcAddress(this.keychain, this.network);
    }

}
