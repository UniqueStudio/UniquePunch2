import { Request, Response } from "express";
import fetch from "node-fetch";
import * as fs from "fs";
import { signJWT } from "./check";

export const userLogin = async function(req: Request, res: Response) {
    try {
        const { nickname, pwd } = req.body;
        //Pwd在前端执行一次MD5加密，发给后端的时候，已经是加密过的MD5版本，后端再加盐验证
        //此处的Pwd已经是MD5加密过的密码，不是原始的明文密码！
        const url = `${process.env.SERVER}user/login/pwd`;

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
            const localToken = signJWT(uid, isAdmin, username);
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
    const { userid } = req.params;
    try {
        const fileExistence = fs.existsSync(`./avatar/${userid}.avatar`);
        if (fileExistence) {
            res.download(`./avatar/${userid}.avatar`);
        } else {
            res.json({ code: -1, msg: "该用户头像不存在！" });
        }
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};

export const userLoginQrCode = async function(_req: Request, res: Response) {
    try {
        const url = `${process.env.SERVER}user/login/qrcode`;
        const responseRaw = await fetch(url);
        const responseJSON = await responseRaw.json();
        res.json(responseJSON);
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};

export const userLoginScan = async function(req: Request, res: Response) {
    try {
        const { key } = req.params;
        const url = `${process.env.SERVER}user/login/scan/${key}/status`;
        const responseRaw = await fetch(url);
        const responseJSON = await responseRaw.json();
        res.json(responseJSON);
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};
