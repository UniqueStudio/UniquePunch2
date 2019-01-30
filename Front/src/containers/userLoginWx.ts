import { connect } from "react-redux";
import { Dispatch } from "redux";

import { login, Login } from "../reducers/action";
import { StoreState } from "../reducers/reducers";

import UserLoginWxView from "../views/userLoginWx";

const mapStateToProps = ({ user: { loginStatus, avatar, username } }: StoreState) => ({
    loginStatus,
    avatar,
    username
});
type DispatchLoginWx = Dispatch<Login>;

const mapDispatchToProps = (dispatch: DispatchLoginWx) => ({
    login: (token: string, isAdmin: boolean, avatar: string, username: string) =>
        dispatch(login(token, isAdmin, avatar, username))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLoginWxView);
