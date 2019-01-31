import * as React from "react";

import classnames from "classnames";
import { withStyles, WithStyles } from "@material-ui/core";
import AccessTime from "@material-ui/icons/AccessTime";
import style from "../styles/UserTime";

import goldCrownImg from "./static/goldCrown.png";

interface Props extends WithStyles {
  rank: string;
  name: string;
  group: string;
  time: string;
  avatar: string;
}

class UserTimeLarge extends React.PureComponent<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.containerLarge}>
        <div className={classes.boxGridLarge}>
          <div className={classes.avatarLargeContainer}>
            <div className={classes.avatarLargeBackground}>
              <img src={goldCrownImg} alt="crown" className={classes.avatarCrown} />
              <img src={this.props.avatar} alt="avatar" className={classes.avatarLarge} />
            </div>
          </div>
          <div className={classes.infoLargeContainer}>
            <div className={classnames(classes.infoHeader, classes.itemLarge)}>
              <div className={classes.groupLarge}>{this.props.group}</div>
              {this.props.name}
            </div>
            <div className={classes.infoFooterLarge}>
              <div className={classnames(classes.rankLarge, classes.itemLarge)}>{this.props.rank}</div>
              <div className={classnames(classes.time, classes.itemLarge)}>
                <AccessTime className={classes.timeIconLarge} />
                {this.props.time}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(UserTimeLarge);
