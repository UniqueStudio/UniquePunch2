import * as React from "react";

import classnames from "classnames";
import { withStyles, WithStyles } from "@material-ui/core";
import AccessTime from "@material-ui/icons/AccessTime";
import style from "../styles/UserTime";

import goldCrownImg from "./static/goldCrown.png";
import silverCrownImg from "./static/silverCrown.png";
import copperCrownImg from "./static/copperCrown.png";

interface Props extends WithStyles {
  rank: string;
  name: string;
  group: string;
  time: string;
  avatar: string;
}

class UserTimeLarge extends React.PureComponent<Props> {
  render() {
    const { classes, rank } = this.props;

    let index = 0;
    if (rank === "1") {
      index = 0;
    } else if (rank === "2") {
      index = 1;
    } else if (rank === "3") {
      index = 2;
    }

    const styleList = [
      {
        backgroundColor: "#ff8800"
      },
      {
        backgroundColor: "#b0b0b0"
      },
      {
        backgroundColor: "#ff9f3c"
      }
    ];
    const imgList = [goldCrownImg, silverCrownImg, copperCrownImg];

    const renderImg = imgList[index];
    const renderBgStyle = styleList[index];

    return (
      <div className={classes.containerLarge} style={rank === "1" ? { transform: "scale(1.2,1.2)" } : {}}>
        <div className={classes.boxGridLarge}>
          <div className={classes.avatarLargeContainer}>
            <div className={classes.avatarLargeBackground} style={renderBgStyle}>
              <img src={renderImg} alt="crown" className={classes.avatarCrown} />
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
