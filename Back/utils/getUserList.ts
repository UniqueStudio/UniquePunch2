import { runtimeUserList } from "../model/runtime";
import * as fs from "fs";

fs.writeFileSync("/var/punch/install.lock", "1");
if (!fs.existsSync("/var/punch/install.lock")) {
    runtimeUserList();
} else {
    require("../server");
}
