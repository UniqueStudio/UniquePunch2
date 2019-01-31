import * as React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router";

import Typography from "@material-ui/core/Typography";
import UserTimeSmall from "../components/UserTimeSmall";
import UserTimeMiddle from "../components/UserTimeMiddle";
import UserTimeLarge from "../components/UserTimeLarge";
import DetailSubtitle from "../components/detailSubTitle";
import uniqueBg from "./static/uniqueBg.png";

import style from "../styles/detail";

interface Props extends WithStyles {
  loginStatus: boolean;
  isAdmin: boolean;
  avatar: string;
  username: string;
}

class DetailView extends React.PureComponent<RouteComponentProps & Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.detail}>
        <div className={classes.headlineContainer}>
          <img src={uniqueBg} alt="unique bg" className={classes.uniquebg} />
          <Typography gutterBottom className={classes.headline} style={{ color: "#555555" }}>
            Unique
          </Typography>
          <Typography gutterBottom className={classes.headline} style={{ color: "#ffbb5b" }}>
            Studio
          </Typography>
          <Typography gutterBottom className={classes.headline} style={{ color: "#ff855b" }}>
            公开处刑
          </Typography>
          <div className={classes.time}>20181201~20181215</div>
        </div>
        <div className={classes.special}>
          <div className={classes.best}>
            <div className={classes.bestTop}>
              <DetailSubtitle title="TOP N" backgroundColor="#9df2aa" />
              <UserTimeLarge
                rank="2"
                name="洪志远"
                group="Design"
                time="188.8"
                avatar="https://p.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs95s34PVsmgbG36Ol5EBfgvh4dDWNeKfRLW8tWnSiaUVbkpsLB2oJe9U/0"
              />
              <UserTimeLarge
                rank="1"
                name="洪志远"
                group="Design"
                time="188.8"
                avatar="https://p.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs95s34PVsmgbG36Ol5EBfgvh4dDWNeKfRLW8tWnSiaUVbkpsLB2oJe9U/0"
              />
              <UserTimeLarge
                rank="3"
                name="洪志远"
                group="Design"
                time="188.8"
                avatar="https://p.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs95s34PVsmgbG36Ol5EBfgvh4dDWNeKfRLW8tWnSiaUVbkpsLB2oJe9U/0"
              />
            </div>
            <div className={classes.bestOther}>
              <UserTimeMiddle
                rank="1"
                name="洪志远"
                group="Design"
                time="188.8"
                avatar="https://p.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs95s34PVsmgbG36Ol5EBfgvh4dDWNeKfRLW8tWnSiaUVbkpsLB2oJe9U/0"
              />
              <UserTimeMiddle
                rank="1"
                name="洪志远"
                group="Design"
                time="188.8"
                avatar="https://p.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs95s34PVsmgbG36Ol5EBfgvh4dDWNeKfRLW8tWnSiaUVbkpsLB2oJe9U/0"
              />
              <UserTimeMiddle
                rank="1"
                name="洪志远"
                group="Design"
                time="188.8"
                avatar="https://p.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs95s34PVsmgbG36Ol5EBfgvh4dDWNeKfRLW8tWnSiaUVbkpsLB2oJe9U/0"
              />
              <UserTimeMiddle
                rank="1"
                name="洪志远"
                group="Design"
                time="188.8"
                avatar="https://p.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs95s34PVsmgbG36Ol5EBfgvh4dDWNeKfRLW8tWnSiaUVbkpsLB2oJe9U/0"
              />
            </div>
          </div>
          <div className={classes.worst}>
            <DetailSubtitle title="NULL" backgroundColor="#f29db4" />
            <UserTimeMiddle
              rank="-1"
              name="洪志远"
              group="Design"
              time="188.8"
              avatar="https://p.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs95s34PVsmgbG36Ol5EBfgvh4dDWNeKfRLW8tWnSiaUVbkpsLB2oJe9U/0"
            />
            <UserTimeMiddle
              rank="-1"
              name="洪志远"
              group="Design"
              time="188.8"
              avatar="https://p.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs95s34PVsmgbG36Ol5EBfgvh4dDWNeKfRLW8tWnSiaUVbkpsLB2oJe9U/0"
            />
            <UserTimeMiddle
              rank="-1"
              name="洪志远"
              group="Design"
              time="188.8"
              avatar="https://p.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs95s34PVsmgbG36Ol5EBfgvh4dDWNeKfRLW8tWnSiaUVbkpsLB2oJe9U/0"
            />
            <UserTimeMiddle
              rank="-1"
              name="洪志远"
              group="Design"
              time="188.8"
              avatar="https://p.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs95s34PVsmgbG36Ol5EBfgvh4dDWNeKfRLW8tWnSiaUVbkpsLB2oJe9U/0"
            />
          </div>
        </div>
        <div className={classes.group}>
          <DetailSubtitle title="GROUP" backgroundColor="#d9b6ff" />
          <UserTimeSmall rank="1" name="" group="Design" time="188.8" />
          <UserTimeSmall rank="1" name="" group="Web" time="188.8" />
          <UserTimeSmall rank="1" name="" group="PM" time="188.8" />
          <UserTimeSmall rank="1" name="" group="Lab" time="188.8" />
          <UserTimeSmall rank="1" name="" group="AI" time="188.8" />
          <UserTimeSmall rank="1" name="" group="Android" time="188.8" />
        </div>
        <div className={classes.list}>
          <DetailSubtitle title="MORE" backgroundColor="#9dcdf2" />
          <UserTimeSmall rank="1" name="洪志远" group="Design" time="188.8" />
          <UserTimeSmall rank="1" name="洪志远" group="Design" time="188.8" />
          <UserTimeSmall rank="1" name="洪志远" group="Design" time="188.8" />
          <UserTimeSmall rank="1" name="洪志远" group="Design" time="188.8" />
          <UserTimeSmall rank="1" name="洪志远" group="Design" time="188.8" />
          <UserTimeSmall rank="1" name="洪志远" group="Design" time="188.8" />
        </div>
      </div>
    );
  }
}

export default withStyles(style)(DetailView);
