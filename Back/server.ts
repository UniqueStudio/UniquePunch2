require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import { infoProcess, infoList, infoDelete, infoDetail, infoUploadAPIProcess, infoRecord } from "./model/info";
import { userLogin, userAvatar, userLoginQrCode, userLoginScan, userInfo } from "./model/user";
import { runtimeExec } from "./model/runtime";
import { fileDestination, fileFilter, fileName, fileNameAnonymous } from "./model/upload";

const SERVER_VERSION = "1.02";
const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(
    bodyParser.json({
        limit: "1mb"
    })
);

const storage = multer.diskStorage({
    destination: fileDestination,
    filename: fileName
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 20971520 },
    fileFilter: fileFilter
}); //20MB

const storageAnonymous = multer.diskStorage({
    destination: fileDestination,
    filename: fileNameAnonymous
});

const uploadAnonymous = multer({
    storage: storageAnonymous,
    limits: { fileSize: 20971520 }
}); //20MB

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("X-Powered-By", `Rabbit/${SERVER_VERSION}`);
    next();
});

// Sign Info
app.get("/info/list/:page", infoList);
app.get("/info/record/:page", infoRecord);
app.get("/info/detail/:id", infoDetail);
app.post("/info/delete/:id", infoDelete);
app.post("/info/process", upload.single("data"), infoProcess);

//User
app.post("/user/login", userLogin);
app.post("/user/info", userInfo);
app.get("/user/avatar/:id", userAvatar);
app.get("/user/qrcode", userLoginQrCode);
app.get("/user/scan/:key", userLoginScan);

//Upload API
app.post("/upload/:timestamp/:secret", uploadAnonymous.single("data"), infoUploadAPIProcess);

//Runtime API
app.get("/runtime", runtimeExec);

app.listen(7012, () => {
    console.log(`Rabbit WebServer / ${SERVER_VERSION} is running on port 7012.`);
});
