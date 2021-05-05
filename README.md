# bitclout-js-tools

This repo contains utilities for interacting with the BitClout blockchain. The goal is to take the more complicated parts of BitClout (like cryptography) and wrap it with a simple, easy-to-use interface.

## Example

Generating a new BitClout account is simple:

```ts
import { Account } from '../src/account';

const account = Account.generate();
console.log(account.getMnemonic());
console.log(account.getPublicKeyBase58());
console.log(account.getBitcoinAddress());

// LOGS:
// => nothing sister welcome shield process fall gather illness business amused inquiry clock
// => BC1YLi7rwzYb5r8okqFfmiefucuFeHH2uLRfgiK1ehrZy3QvP5jXzrN
// => 1KtDtLvJW2jcKrLiw1WLKP41eAYugWAkW

```
