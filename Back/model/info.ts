import { Request, Response } from "express";
import { verifyJWT, md5Calculate, addSaltMd5 } from "./check";
import { PAGESIZE } from "./consts";
import { databaseConnect } from "./db";
import { processPunch } from "./punch";

export const infoProcess = async function(req: Request, res: Response) {
    //Direct upload using Web
    try {
        const { isAdmin } = verifyJWT(req.header("Authorization"));
        if (!isAdmin) {
            res.json({ code: -1, msg: "您不是管理员，无权操作！" });
            return;
        }
        const fileItem = req.file;
        processPunch(fileItem.destination + fileItem.filename);
        res.json({ code: 1 });
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};

export const infoUploadAPIProcess = async function(req: Request, res: Response) {
    //upload using API require check secret key
    try {
        const { isAdmin } = verifyJWT(req.header("Authorization"));
        if (!isAdmin) {
            res.json({ code: -1, msg: "您不是管理员，无权操作！" });
            return;
        }
        const { timestamp, secret } = req.params;
        const nowTimeStamp = new Date().getTime();
        if (Math.abs(nowTimeStamp - +timestamp) > 60 * 60 * 1000) {
            res.json({ code: -1, msg: "Timeout !" });
            return;
        }

        const fileItem = req.file;
        const fileMD5 = md5Calculate(fileItem.destination + fileItem.filename);
        if (addSaltMd5(fileMD5, timestamp) === secret) {
            processPunch(fileItem.destination + fileItem.filename);
            res.json({ code: 1 });
        } else {
            res.json({ code: -1, msg: "Invalid Secret!" });
        }
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};

export const infoList = async function(req: Request, res: Response) {
    try {
        const { isAdmin } = verifyJWT(req.header("Authorization"));
        if (!isAdmin) {
            res.json({ code: -1, msg: "您不是管理员，无权操作！" });
            return;
        }
        const { db, client } = await databaseConnect();
        let { page } = req.params;

        page = +page;

        const result = await db
            .collection("sign")
            .aggregate([
                {
                    $sort: {
                        createDate: -1
                    }
                },
                {
                    $skip: PAGESIZE * (page - 1)
                },
                {
                    $limit: PAGESIZE
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        createDate: 1
                    }
                }
            ])
            .toArray();

        client.close();
        res.json({ code: 1, msg: result });
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};

export const infoDelete = async function(req: Request, res: Response) {
    try {
        const { isAdmin } = verifyJWT(req.header("Authorization"));
        if (!isAdmin) {
            res.json({ code: -1, msg: "您不是管理员，无权操作！" });
            return;
        }
        const { id } = req.params;
        const { db, client } = await databaseConnect();
        db.collection("sign").deleteOne({ _id: id });
        client.close();
        res.json({ code: 1 });
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};

export const infoDetail = async function(req: Request, res: Response) {
    try {
        const { isAdmin } = verifyJWT(req.header("Authorization"));
        if (!isAdmin) {
            res.json({ code: -1, msg: "您不是管理员，无权操作！" });
            return;
        }
        const { db, client } = await databaseConnect();
        const { id } = req.params;
        const detail = await db.collection("sign").findOne({ _id: id });
        const groupRank = await db
            .collection("sign")
            .aggregate([
                {
                    $unwind: "$group"
                },
                {
                    $group: {
                        id: "$group",
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: {
                        count: -1
                    }
                }
            ])
            .toArray();

        client.close();
        res.json({ code: 1, msg: { detail, group: groupRank } });
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};
