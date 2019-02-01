import * as React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";

import DetailContainer from "../containers/Detail";
import InfoListContainer from "../containers/InfoList";
import InfoUploadRecordContainer from "../containers/InfoUploadRecord";
import style from "../styles/Info";

import { RouteComponentProps } from "react-router";

class InfoView extends React.PureComponent<WithStyles & RouteComponentProps> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.infoRoot}>
        <Switch>
          <Route path="/info/list/:page" component={InfoListContainer} />
          <Route path="/info/record/:page" component={InfoUploadRecordContainer} />
          <Route path="/info/detail/:id" component={DetailContainer} />
        </Switch>
      </div>
    );
  }
}

export default withStyles(style)(InfoView);
