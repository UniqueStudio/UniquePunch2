import XLSX from "xlsx";
import * as fs from "fs";
import { databaseConnect } from "./db";

export interface punchDataInfo {
    _id: any;
    name: string;
    time: number;
    group: any;
}

export const handlePunchData = function(workbook: XLSX.WorkBook) {
    const sheet = workbook.Sheets["考勤汇总表"];

    let lineNumber = 5;
    const result = [];
    while (sheet[`B${lineNumber}`] && sheet[`J${lineNumber}`] && sheet[`K${lineNumber}`]) {
        result.push({
            name: sheet[`B${lineNumber}`].v as string,
            time: +sheet[`J${lineNumber}`].v + +sheet[`K${lineNumber}`].v
        });
        lineNumber++;
    }

    return result;
};

export const processPunch = async function(path: string) {
    const { db, client } = await databaseConnect();

    if (!fs.existsSync(path) || !fs.statSync(path).isFile) {
        console.error(`File does not exists: ${path}`);
        return;
    }
    const data = fs.readFileSync(path, { encoding: "binary" });
    const punchDatas = handlePunchData(XLSX.read(data, { type: "binary" }));
    const dateRange = XLSX.read(data, { type: "binary" }).Props!.Comments!;

    punchDatas.sort(($1, $2) => $2.time - $1.time);

    const punchDatasFullRaw = await Promise.all(
        punchDatas.map(async item => {
            const db_info = await db.collection("user").findOne({ name: name });
            if (db_info) {
                return {
                    ...item,
                    _id: db_info._id,
                    name: db_info.name,
                    group: db_info.group
                };
            } else {
                return undefined;
            }
        })
    );

    const punchDatasFull = punchDatasFullRaw.filter(item => item !== undefined) as Array<punchDataInfo>;
    await db.collection("sign").insertOne({
        title: `${dateRange.replace(/ /g, "").replace("~", " - ")}`,
        data: punchDatasFull,
        createDate: new Date()
    });
    try {
        fs.unlinkSync(path);
    } catch {}
    client.close();
};
