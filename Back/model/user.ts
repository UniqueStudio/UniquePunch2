import { Request, Response } from "express";
import fetch from "node-fetch";
import fs from "fs";
import { signJWT, verifyJWT } from "./check";
import { databaseConnect } from "./db";
import { ObjectID } from "bson";

export const userLogin = async function(req: Request, res: Response) {
    try {
        const { nickname, pwd } = req.body;
        //Pwd在前端执行一次MD5加密，发给后端的时候，已经是加密过的MD5版本，后端再加盐验证
        //此处的Pwd已经是MD5加密过的密码，不是原始的明文密码！
        const url = `${process.env.SERVER}api/user/login/pwd`;

        const resultRaw = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                nickname,
                pwd
            }),
            headers: { "Content-Type": "application/json" }
        });

        const result = await resultRaw.json();
        if (result.code === 1) {
            // success login logic
            const { uid, isAdmin, avatar, username } = result.msg;
            const localToken = signJWT(uid, isAdmin, username, avatar);
            res.json({
                code: 1,
                msg: {
                    uid,
                    isAdmin,
                    avatar,
                    username,
                    token: localToken
                }
            });
        } else {
            res.json({ code: -1, msg: result.msg });
        }
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};

export const userAvatar = async function(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const { client, db } = await databaseConnect();
        const userInfo = await db.collection("user").findOne({ _id: new ObjectID(id) });
        if (!userInfo) {
            res.json({ code: -1, msg: "该用户不存在！" });
            return;
        }
        const { userid } = userInfo;
        const fileExistence = fs.existsSync(`./avatar/${userid}.avatar`);

        client.close();
        if (fileExistence) {
            res.download(`./avatar/${userid}.avatar`);
        } else {
            res.download(`./utils/defaultAvatar.png`);
        }
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};

export const userLoginQrCode = async function(_req: Request, res: Response) {
    try {
        const url = `${process.env.SERVER}api/user/login/qrcode`;
        const responseRaw = await fetch(url);
        const responseJSON = await responseRaw.json();
        res.json(responseJSON);
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};

export const userInfo = async function(req: Request, res: Response) {
    try {
        const { uid, isAdmin, username, avatar } = verifyJWT(req.header("Authorization"));
        res.json({
            code: 1,
            msg: {
                uid,
                isAdmin,
                username,
                avatar
            }
        });
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};

export const userLoginScan = async function(req: Request, res: Response) {
    try {
        const { key } = req.params;
        const url = `${process.env.SERVER}api/user/login/scan/${key}/status`;
        const responseRaw = await fetch(url);
        const responseJSON = await responseRaw.json();
        res.json(responseJSON);
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};
