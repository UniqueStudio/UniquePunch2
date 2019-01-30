import { connect } from "react-redux";
import { Dispatch } from "redux";

import InfoView from "../views/info";
import { StoreState } from "src/reducers/reducers";

const mapStateToProps = ({ user: { loginStatus, isAdmin, avatar, username } }: StoreState) => ({
    loginStatus,
    isAdmin,
    avatar,
    username
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfoView);
