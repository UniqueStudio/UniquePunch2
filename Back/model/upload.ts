import fs from "fs";
import { verifyJWT } from "./check";

const MODE = process.env.MODE;

export const fileDestination = function(
    _req: Express.Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
) {
    const date = new Date();
    const dirName =
        date.getFullYear().toString() + "_" + (date.getMonth() + 1).toString() + "_" + date.getDate().toString();
    const parentDir = MODE === "DEV" ? `./upload` : `/var/punish/upload`;
    const childDir = `${parentDir}/${dirName}`;
    if (!fs.existsSync(MODE === "DEV" ? `./upload` : "/var/punish/upload")) fs.mkdirSync("/var/punish/upload");
    if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir);
    if (!fs.existsSync(childDir)) fs.mkdirSync(childDir);
    cb(null, `${childDir}/`);
};

export const fileFilter = function(
    req: Express.Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void
) {
    try {
        verifyJWT((req as any)["header"]("Authorization"));
        cb(null, true);
    } catch {
        cb(null, false);
    }
};

export const fileName = function(
    req: Express.Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
) {
    try {
        const { uid } = verifyJWT((req as any)["header"]("Authorization"));
        cb(null, `${uid}_${new Date().getTime()}.punish`);
    } catch {
        cb(null, `ERR_${new Date().getTime()}.punish`);
    }
};

export const fileNameAnonymous = function(
    _req: Express.Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
) {
    cb(null, `Anonymous_${new Date().getTime()}.punish`);
};
