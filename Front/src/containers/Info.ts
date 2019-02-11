import { connect } from "react-redux";
import { Dispatch } from "redux";

import InfoView from "../views/Info";
import { StoreState } from "src/reducers/reducers";

const mapStateToProps = ({ user: { loginStatus } }: StoreState) => ({
    loginStatus
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfoView);
