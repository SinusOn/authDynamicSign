import crypto from "crypto";
import fs from "fs";

const { key, algorithm } = JSON.parse(fs.readFileSync("key.json"));
const pass = "123pass";

function encrypt(pass) {
  const iv = crypto.randomBytes(8).toString("hex");
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedPass = cipher.update(pass, "utf8", "hex");
  encryptedPass += cipher.final("hex");
  return `${encryptedPass}:${iv}`;
}
function decrypt(encData) {
  const [encPass, iv] = encData.split(":");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decryptedPass = decipher.update(encPass, "hex", "utf-8");
  decryptedPass += decipher.final("utf-8");
  return decryptedPass;
}
console.log(decrypt(encrypt(pass)));
export { encrypt, decrypt };
