import { Request, Response } from "express";
import { verifyJWT, md5Calculate, addSaltMd5 } from "./check";
import { PAGESIZE } from "./consts";
import { databaseConnect } from "./db";
import { processPunch } from "./punch";
import { ObjectID } from "mongodb";

interface userPunchItem {
    name: string;
    time: number;
    _id: ObjectID;
    group: Array<string>;
}

interface groupTimeStatic {
    [groupName: string]: GroupTimeItem;
}

interface GroupTimeItem {
    time: number;
    count: number;
}

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
        verifyJWT(req.header("Authorization"));
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

        const total = await db.collection("sign").countDocuments();

        client.close();
        res.json({ code: 1, msg: { collection: result, total: total } });
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};

export const infoRecord = async function(req: Request, res: Response) {
    try {
        const { isAdmin } = verifyJWT(req.header("Authorization"));
        let { page } = req.params;
        page = +page;
        if (!isAdmin) {
            res.json({ code: -1, msg: "您不是管理员，无权操作！" });
            return;
        }
        const { db, client } = await databaseConnect();

        const result = await db
            .collection("upload")
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
                }
            ])
            .toArray();

        const total = await db.collection("upload").countDocuments();

        client.close();
        res.json({ code: 1, msg: { collection: result, total: total } });
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
        db.collection("sign").deleteOne({ _id: new ObjectID(id) });
        client.close();
        res.json({ code: 1 });
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};

export const infoDetail = async function(req: Request, res: Response) {
    try {
        verifyJWT(req.header("Authorization"));
        const { db, client } = await databaseConnect();
        const { id } = req.params;
        const detail = await db.collection("sign").findOne({ _id: new ObjectID(id) });

        const groupRankRaw = (detail.data as Array<userPunchItem>).reduce(
            (p, val) => {
                val.group.forEach(groupName => {
                    if (p[groupName]) {
                        p[groupName].time += val.time;
                        p[groupName].count++;
                    } else {
                        p = {
                            ...p,
                            [groupName]: {
                                count: 1,
                                time: val.time
                            }
                        };
                    }
                });
                return p;
            },
            {} as groupTimeStatic
        );

        const groupRank = Object.entries(groupRankRaw)
            .map(([groupName, val]) => ({
                name: groupName,
                avgTime: val.time / val.count
            }))
            .sort(($1, $2) => $2.avgTime - $1.avgTime);

        client.close();
        res.json({ code: 1, msg: { ...detail, group: groupRank } });
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};
