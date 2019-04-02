import { databaseConnect } from "./db";
import { accessTokenURL, getUserListURL, getGroupURL } from "../model/consts";
import { verifyJWT } from "./check";
import { Request, Response } from "express";
import fetch from "node-fetch";
import fs from "fs";

async function downloadImg(url: string, path: string) {
    try {
        const result = await fetch(encodeURI(url));
        const bufferImg = await result.buffer();
        fs.writeFileSync(path, bufferImg);
        return bufferImg.length;
    } catch (e) {
        console.log(e);
        return 0;
    }
}

function processJoinTime(user: any): number {
    const attrArray: any[] = user.extattr.attrs;
    let result: string = new Date().getFullYear().toString() + "1";
    attrArray.some(item => {
        const testResult = /加入时间/g.test(item.name);
        if (testResult) {
            let year = +item.value.substr(0, 4);
            let period = "0";

            if (/春/.test(item.value)) {
                period = "1";
            } else if (/夏/.test(item.value)) {
                period = "2";
            } else if (/秋/.test(item.value)) {
                period = "3";
            }

            if (!Object.is(year, NaN) && period) {
                result = year + period;
            }
        }
        return testResult;
    });

    return +result;
}

export const runtimeUserList = async function() {
    const { client, db } = await databaseConnect();

    //<-- get access token
    console.log("Getting access token");
    const accessTokenResponse = await fetch(accessTokenURL);
    const accessTokenData = await accessTokenResponse.json();
    if (accessTokenData.errcode !== 0) {
        console.log(`Error getting token: ${accessTokenData}`);
        return;
    }
    const accessToken = accessTokenData.access_token;
    //<-- get group list
    console.log("Getting group list");
    const groupMap = new Map<number, string>();
    const groupListResponse = await fetch(getGroupURL(accessToken));
    const groupListData = await groupListResponse.json();
    if (groupListData.errcode !== 0) {
        console.log(`Error getting group list: ${groupListData}`);
        return;
    }
    const groupList: Array<{ id: number; name: string }> = (groupListData.department as any[])
        .map((item: any) => ({
            id: item.id,
            name: item.name
        }))
        .filter(item => item.id < 14);
    groupListData.department.forEach((item: any) => {
        if (+item.id < 14) {
            groupMap.set(item.id, item.name);
        }
    });

    const avatarList: Array<{ userid: string; avatarUrl: string }> = [];
    //<-- get user list
    for (const group of groupList) {
        const allGroupMemberList: any[] = await db
            .collection("user")
            .find({ group: `${group.name}` })
            .toArray();

        const allGroupMemberActive: { [userid: string]: boolean } = allGroupMemberList.reduce(
            (p, { userid }) => ({
                ...p,
                [userid]: false
            }),
            {}
        );

        const dataURL = getUserListURL(accessToken, group.id);
        const userListResponse = await fetch(dataURL);
        const userListData = await userListResponse.json();
        if (userListData.errcode !== 0) {
            console.log(`Error getting user list: ${userListData}`);
            return;
        }
        for (const userInfo of userListData.userlist) {
            console.log(`Processing Data: ${userInfo.name}`);

            const nowResult = await db.collection("user").findOne({ userid: userInfo.userid });
            if (
                !nowResult ||
                !nowResult.avatar ||
                nowResult.avatar !== userInfo.avatar ||
                !fs.existsSync(`./avatar/${userInfo.userid}.avatar`)
            ) {
                avatarList.push({ userid: userInfo.userid, avatarUrl: userInfo.avatar });
            }

            allGroupMemberActive[userInfo.userid] = true;
            await db.collection("user").updateOne(
                { userid: userInfo.userid },
                {
                    $set: {
                        userid: userInfo.userid,
                        name: userInfo.name,
                        group: (userInfo.department as any[])
                            .map((item: number) => groupMap.get(item))
                            .filter(item => !!item),
                        join: processJoinTime(userInfo),
                        avatar: userInfo.avatar
                    }
                },
                { upsert: true }
            );
        }

        for (const [k, v] of Object.entries(allGroupMemberActive)) {
            if (!v) {
                console.log(`Kick User: ${k}`);
                await db.collection("user").deleteOne({ userid: k });
            }
        }
    }
    //<-- Download Avatar
    console.log(`Downloading Avatars...`);
    if (!fs.existsSync(`./avatar`)) fs.mkdirSync(`./avatar`);
    for (const avatar of avatarList) {
        console.log(`Downloading Avatar: ${avatar.userid} \n ${avatar.avatarUrl}`);
        if (fs.existsSync(`./avatar/${avatar.userid}.avatar`)) fs.unlinkSync(`./avatar/${avatar.userid}.avatar`);
        await downloadImg(avatar.avatarUrl, `./avatar/${avatar.userid}.avatar`);
    }
    //<-- Create Index
    console.log("Creating indexes ... ");
    const userIDIndex = await db.collection("user").indexExists("userID");
    if (!userIDIndex) {
        await db.collection("user").createIndex(
            {
                userid: 1
            },
            {
                unique: true,
                name: "userID"
            }
        );
    }
    console.log("All Done , thank you!");
    client.close();
};

export const runtimeExec = async function(req: Request, res: Response) {
    try {
        const { isAdmin } = verifyJWT(req.header("Authorization"));
        if (!isAdmin) {
            res.json({ code: -1, msg: "您不是管理员，无权操作！" });
            return;
        }
        runtimeUserList();
        res.json({ code: 1 });
    } catch (e) {
        res.json({ code: -1, msg: e.message });
    }
};
