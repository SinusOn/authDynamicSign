import crypto from "crypto";

class CryptService {
  encrypt(pass, key) {
    const iv = crypto.randomBytes(8).toString("hex");
    const cipher = crypto.createCipheriv(process.env.ALGORITHM, key, iv);
    let encryptedPass = cipher.update(pass, "utf8", "hex");
    encryptedPass += cipher.final("hex");
    return `${encryptedPass}:${iv}`;
  }
  decrypt(encData, key) {
    const [encPass, iv] = encData.split(":");
    const decipher = crypto.createDecipheriv(process.env.ALGORITHM, key, iv);
    let decryptedPass = decipher.update(encPass, "hex", "utf-8");
    decryptedPass += decipher.final("utf-8");
    return decryptedPass;
  }
}

export default new CryptService();
