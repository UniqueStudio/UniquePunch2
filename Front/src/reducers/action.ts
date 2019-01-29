export const LOGIN = 'LOGIN';
export type LOGIN = typeof LOGIN;
export interface Login {
    type: LOGIN;
    token: string;
    avatar: string;
    username: string;
    isAdmin: boolean;
}
export const login = function(token: string, avatar: string, username: string, isAdmin: boolean) {
    return {
        type: 'LOGIN',
        token,
        avatar,
        username,
        isAdmin
    };
};
export const LOGOUT = 'LOGOUT';
export type LOGOUT = typeof LOGOUT;
export interface Logout {
    type: LOGOUT;
}
export const logout = function() {
    return {
        type: 'LOGOUT'
    };
};
