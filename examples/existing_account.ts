import { Account } from '../src/account';

const account = new Account('nothing sister welcome shield process fall gather illness business amused inquiry clock');
console.log(account.getPublicKeyBase58());
console.log(account.getBitcoinAddress());

// LOGS:
// => BC1YLi7rwzYb5r8okqFfmiefucuFeHH2uLRfgiK1ehrZy3QvP5jXzrN
// => 1KtDtLvJW2jcKrLiw1WLKP41eAYugWAkW
