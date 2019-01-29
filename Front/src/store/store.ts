import * as actions from './action';

export interface Store {
    token: string;
    loginStatus: boolean;
    isAdmin: boolean;
    avatar: string;
    username: string;
}

type Action = actions.Login | actions.Logout;

const initState: Store = {
    token: '',
    loginStatus: false,
    isAdmin: false,
    avatar: '',
    username: ''
};

export const reducers = function(state = initState, action: Action): Store {
    switch (action.type) {
        case actions.LOGIN:
            const { token, avatar, username, isAdmin } = action;
            localStorage.setItem('token', token);
            return { ...state, token, avatar, username, isAdmin };
        case actions.LOGOUT:
            localStorage.removeItem('token');
            return { ...state, token: '', avatar: '', username: '', isAdmin: false };
    }
};
