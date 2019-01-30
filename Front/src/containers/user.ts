import { connect } from "react-redux";
import { Dispatch } from "redux";

import { StoreState } from "../reducers/reducers";

import UserView from "../views/user";

const mapStateToProps = ({ user: { loginStatus } }: StoreState) => ({
    loginStatus
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserView);
