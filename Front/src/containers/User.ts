import { connect } from "react-redux";
import { Dispatch } from "redux";
import { login } from "../reducers/action";

import { StoreState } from "../reducers/reducers";

import UserView from "../views/User";

const mapStateToProps = ({ user: { loginStatus } }: StoreState) => ({
    loginStatus
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (token: string, isAdmin: boolean, avatar: string, username: string) =>
        dispatch(login(token, isAdmin, avatar, username))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserView);
