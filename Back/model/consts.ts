import * as dotenv from "dotenv";
dotenv.config();

export const wxAppID = process.env.APPID as string;
export const wxSECRET = process.env.WXSECRET as string;
export const secret = process.env.SECRET as string;

export const getUserListURL = (accessToken: string, department: number) =>
    `https://qyapi.weixin.qq.com/cgi-bin/user/list?access_token=${accessToken}&department_id=${department.toString()}&fetch_child=0`;
export const getGroupURL = (accessToken: string) =>
    `https://qyapi.weixin.qq.com/cgi-bin/department/list?access_token=${accessToken}&id=ID`;
export const accessTokenURL = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${wxAppID}&corpsecret=${wxSECRET}`;

export const PAGESIZE = 20;
