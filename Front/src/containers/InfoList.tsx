import { connect } from "react-redux";
import { Dispatch } from "redux";

import InfoListView from "../views/InfoList";
import { StoreState } from "../reducers/reducers";

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
)(InfoListView);
