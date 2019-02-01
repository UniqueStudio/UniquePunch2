import * as React from "react";

import classnames from "classnames";
import { withStyles, WithStyles } from "@material-ui/core";
import AccessTime from "@material-ui/icons/AccessTime";
import style from "../styles/UserTime";

interface Props extends WithStyles {
  rank: string;
  name: string;
  group: string;
  time: string;
}
class UserTimeSmall extends React.PureComponent<Props> {
  render() {
    const { classes, time } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.boxGrid}>
          <div />
          <div
            className={classnames(classes.rank, classes.item)}
            style={+time < 30 ? { backgroundColor: "orangered" } : {}}
          >
            {this.props.rank}
          </div>
          <div className={classnames(classes.group, classes.item)}>{this.props.group}</div>
          <div className={classnames(classes.name, classes.item)}>{this.props.name}</div>
          <div className={classnames(classes.time, classes.item)}>
            <AccessTime className={classes.timeIcon} />
            {this.props.time}
          </div>
          <div />
        </div>
      </div>
    );
  }
}

export default withStyles(style)(UserTimeSmall);
