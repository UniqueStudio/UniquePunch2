import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RouteComponentProps, withRouter } from "react-router";

import { StoreState } from "../reducers/reducers";

import Bar from "../components/AppBar";

const mapStateToProps = (
    { user: { loginStatus, isAdmin, username, avatar } }: StoreState,
    ownProps: RouteComponentProps
) => ({
    loginStatus,
    isAdmin,
    username,
    avatar,
    ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Bar)
);
