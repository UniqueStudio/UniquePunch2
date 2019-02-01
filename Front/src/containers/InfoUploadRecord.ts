import { connect } from "react-redux";
import { Dispatch } from "redux";

import InfoUploadRecordView from "../views/InfoUploadRecord";
import { StoreState } from "../reducers/reducers";

const mapStateToProps = ({ user: { loginStatus } }: StoreState) => ({
    loginStatus
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfoUploadRecordView);
