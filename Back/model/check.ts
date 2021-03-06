import crypto from "crypto";
import jwt from "jsonwebtoken";
import fs from "fs";
import { secret } from "./consts";

export interface JWTContent {
    uid: string;
    isAdmin: boolean;
    username: string;
    avatar: string;
}

export const addSaltMd5 = function(firstMD5: string, timestamp: string) {
    return crypto
        .createHash("md5")
        .update(firstMD5 + timestamp + secret)
        .digest("hex");
};

export const md5Calculate = function(path: string) {
    const file = fs.readFileSync(path);
    return crypto
        .createHash("md5")
        .update(file)
        .digest("hex");
};

export const signJWT = function(uid: string, isAdmin: boolean, username: string, avatar: string) {
    return jwt.sign(
        {
            uid: uid,
            isAdmin: isAdmin,
            username: username,
            avatar: avatar
        },
        secret,
        {
            expiresIn: 86400
        }
    );
};

export const verifyJWT = function(token?: string) {
    if (!token) {
        throw new Error("No token provided");
    }
    if (token.indexOf("Bearer ") === 0) {
        token = token.replace("Bearer ", "");
    }
    return jwt.verify(token, secret) as JWTContent;
};
