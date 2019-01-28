require("dotenv").config();
import { MongoClient } from "mongodb";
import { accessTokenURL, getUserListURL, getGroupURL } from "../model/consts";
import fetch from "node-fetch";
import * as fs from "fs";

const mongoURL = process.env.MODE === "DEV" ? "localhost" : "mongo";

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

(async function() {
    const client = await MongoClient.connect(
        `mongodb://${mongoURL}:27017/unique`,
        {
            useNewUrlParser: true
        }
    );
    const db = client.db("unique");

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
    const groupList: Array<{ id: number; name: string }> = groupListData.department.map((item: any) => ({
        id: item.id,
        name: item.name
    }));
    groupListData.department.forEach((item: any) => {
        groupMap.set(item.id, item.name);
    });
    const avatarList: Array<{ userid: string; avatarUrl: string }> = [];
    //<-- get user list
    for (const group of groupList) {
        const dataURL = getUserListURL(accessToken, group.id);
        const userListResponse = await fetch(dataURL);
        const userListData = await userListResponse.json();
        if (userListData.errcode !== 0) {
            console.log(`Error getting user list: ${userListData}`);
            return;
        }
        for (const userInfo of userListData.userlist) {
            console.log(`Processing Data: ${userInfo.name}`);
            avatarList.push({ userid: userInfo.userid, avatarUrl: userInfo.avatar });

            await db.collection("user").updateOne(
                { userid: userInfo.userid },
                {
                    $set: {
                        userid: userInfo.userid,
                        name: userInfo.name,
                        group: userInfo.department.map((item: number) => groupMap.get(item))
                    }
                },
                { upsert: true }
            );
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
    console.log("All Done , thank you!");
})();
