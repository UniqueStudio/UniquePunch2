import RabbitAjax from "./ajax";
import { userInfo } from "./consts";

export interface UserInfoType {
    uid: string;
    isAdmin: boolean;
    username: string;
    avatar: string;
}

export const checkLoginStatus = async function() {
    const responseRaw = await RabbitAjax.post(userInfo);
    if (responseRaw.data.code === 1) {
        return {
            status: true,
            data: responseRaw.data.msg
        };
    } else {
        return {
            status: false,
            data: {}
        };
    }
};
