import crypto from "crypto";
import fs from "fs";

const key = crypto.randomBytes(16).toString("hex");
const algorithm = "aes256";
fs.writeFileSync(`key.json`, JSON.stringify({ key, algorithm }));
