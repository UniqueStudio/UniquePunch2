export const LOGIN = "LOGIN";
export type LOGIN = typeof LOGIN;
export interface Login {
    type: LOGIN;
    token: string;
    isAdmin: boolean;
    avatar: string;
    username: string;
    loginStatus: true;
}
export const login = function(token: string, isAdmin: boolean, avatar: string, username: string): Login {
    return {
        type: LOGIN,
        token,
        avatar: `https://bbs.hustunique.com` + avatar,
        username,
        isAdmin,
        loginStatus: true
    };
};
export const LOGOUT = "LOGOUT";
export type LOGOUT = typeof LOGOUT;
export interface Logout {
    type: LOGOUT;
    loginStatus: false;
}
export const logout = function(): Logout {
    return {
        type: LOGOUT,
        loginStatus: false
    };
};
