import { connect } from "react-redux";
import { Dispatch } from "redux";

import { login } from "../reducers/action";
import InfoView from "../views/Info";
import { StoreState } from "src/reducers/reducers";

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
)(InfoView);
