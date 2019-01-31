import { connect } from "react-redux";
import { Dispatch } from "redux";

import { login, Login } from "../reducers/action";
import { StoreState } from "../reducers/reducers";

import UserLoginPwdView from "../views/UserLoginPwd";

const mapStateToProps = ({ user: { loginStatus, avatar, username } }: StoreState) => ({
    loginStatus,
    avatar,
    username
});

type DispatchLoginPwd = Dispatch<Login>;

const mapDispatchToProps = (dispatch: DispatchLoginPwd) => ({
    login: (token: string, isAdmin: boolean, avatar: string, username: string) =>
        dispatch(login(token, isAdmin, avatar, username))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLoginPwdView);
