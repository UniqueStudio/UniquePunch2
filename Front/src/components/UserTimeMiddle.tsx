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
  avatar: string;
}
class UserTimeMiddle extends React.PureComponent<Props> {
  render() {
    const { classes, rank } = this.props;
    const renderBgStyle = rank === "-1" ? { backgroundColor: "#fceaef" } : { backgroundColor: "#eafcec" };
    return (
      <div className={classes.containerMiddle} style={renderBgStyle}>
        <div className={classes.boxGridMiddle}>
          <div className={classnames(classes.avatarContainer, classes.item)}>
            <img src={this.props.avatar} alt="AVATAR" className={classes.avatar} />
          </div>
          <div className={classnames(classes.infosContainer, classes.item)}>
            <div className={classes.infoHeader}>
              <div className={classes.groupMiddle}>{this.props.group}</div>
              {this.props.name}
            </div>
            <div className={classes.infoFooter}>
              <div
                className={classnames(classes.rankMiddle, classes.item)}
                style={rank === "-1" ? { backgroundColor: "orangered" } : {}}
              >
                {this.props.rank}
              </div>
              <div className={classnames(classes.time, classes.item)}>
                <AccessTime className={classes.timeIcon} />
                {this.props.time}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(UserTimeMiddle);
