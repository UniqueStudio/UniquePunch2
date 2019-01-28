import * as crypto from "crypto";
import * as fs from "fs";

const file = fs.readFileSync("./utils/test.xls");
const hash = crypto
    .createHash("md5")
    .update(file)
    .digest("hex");
console.log(hash);
