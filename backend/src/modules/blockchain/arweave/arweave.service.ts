import {Injectable} from "@nestjs/common";
import * as process from "process";

const Arweave = require("arweave");
const CryptoJS = require("crypto-js");

@Injectable()
export class ArweaveService {
  private initArweave() {
    return Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
      timeout: 20000,
      logging: false,
    });
  }

  async createOrUpdateMainJson(storedJsonLink, userId) {
    let metadata = [];
    if (1 !== 1) {
      // user has main json
      // get old data
    } else {
      metadata = [
        {
          date: new Date(),
          link: storedJsonLink,
        },
      ];
    }

    return this.uploadJson(JSON.stringify(metadata));
  }

  async uploadJson(metadata: string) {
    metadata = metadata.trim();
    const metadataRequest = JSON.parse(JSON.stringify(metadata));
    const arweave = this.initArweave();
    const metadataTransaction = await arweave.createTransaction({
      data: metadataRequest,
    });

    metadataTransaction.addTag("Content-Type", "application/json");

    const jwk = process.env.JWK;

    await arweave.transactions.sign(metadataTransaction, JSON.parse(jwk));

    console.log("https://arweave.net/raw/" + metadataTransaction.id);

    const response = await arweave.transactions.post(metadataTransaction);

    response.data = {
      rawLink: `https://arweave.net/raw/${metadataTransaction.id}`,
      link: `https://arweave.net/${metadataTransaction.id}`,
      metadataTransaction: metadataTransaction.id,
      metadata,
    };

    return response;
  }

  getJsonByOnChainLink = async (link: string, userId: string) => {
    const result = await fetch(link).then((res) => res.json());
    const onChainResponse = JSON.parse(JSON.stringify(result));
    const decryptedJson = this.getDecryptedJson(
      onChainResponse.hash,
      userId,
    );
    return {
      userId,
      metadata: JSON.parse(JSON.parse(decryptedJson)),
      createdAt: onChainResponse.date,
    };
  };

  private initEncryptionProcess = (id: string) => {
    const cryptoSecretKey = process.env.CRYPTO_SECRET_KEY;
    const cryptoIvKey = process.env.CRYPTO_IV_KEY;
    const cryptoSalt = process.env.CRYPTO_SALT;
    const cryptoIterations = process.env.CRYPTO_ITERATIONS;
    const cryptoKeySizeMin = process.env.CRYPTO_KEY_SIZE_MIN;
    const cryptoKeySizeMax = process.env.CRYPTO_KEY_SIZE_MAX;

    const key = CryptoJS.PBKDF2(cryptoSecretKey, cryptoSalt + id, {
      keySize: parseInt(cryptoKeySizeMax) / parseInt(cryptoKeySizeMin),
      iterations: parseInt(cryptoIterations),
    });

    const iv = CryptoJS.enc.Utf8.parse(cryptoIvKey);

    return {key, iv};
  };

  createEncryptedJson = (text: string, id: string) => {
    const {key, iv} = this.initEncryptionProcess(id);
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  };

  getDecryptedJson = (hash: string, id: string) => {
    const {key, iv} = this.initEncryptionProcess(id);
    const decrypted = CryptoJS.AES.decrypt(
      {ciphertext: CryptoJS.enc.Hex.parse(hash)},
      key,
      {iv: iv, mode: CryptoJS.mode.CBC},
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  };
}
