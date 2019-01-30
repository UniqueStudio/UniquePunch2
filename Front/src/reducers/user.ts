import * as actions from "./action";

export interface UserStore {
    token: string;
    loginStatus: boolean;
    isAdmin: boolean;
    avatar: string;
    username: string;
}

type Action = actions.Login | actions.Logout;

const initState: UserStore = {
    token: "",
    loginStatus: false,
    isAdmin: false,
    avatar: "",
    username: ""
};

export const userReducer = function(state = initState, action: Action): UserStore {
    switch (action.type) {
        case actions.LOGIN:
            const { token, avatar, username, isAdmin } = action;
            localStorage.setItem("token", token);
            return { ...state, token, avatar, username, isAdmin };
        case actions.LOGOUT:
            localStorage.removeItem("token");
            return { ...state, token: "", avatar: "", username: "", isAdmin: false };
    }
    return state;
};
