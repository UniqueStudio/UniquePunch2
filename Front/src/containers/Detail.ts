import { connect } from "react-redux";
import { Dispatch } from "redux";

import DetailView from "../views/Detail";
import { StoreState } from "src/reducers/reducers";

const mapStateToProps = ({ user: { loginStatus, isAdmin, avatar, username } }: StoreState) => ({
    loginStatus,
    isAdmin,
    avatar,
    username
});

const mapDispatchToProps = (disPatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailView);
