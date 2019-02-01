import * as React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router";

import Typography from "@material-ui/core/Typography";
import UserTimeSmall from "../components/UserTimeSmall";
import UserTimeMiddle from "../components/UserTimeMiddle";
import UserTimeLarge from "../components/UserTimeLarge";
import DetailSubtitle from "../components/DetailSubTitle";
import uniqueBg from "./static/uniqueBg.png";

import { userAvatar, detailInfo } from "../model/consts";
import RabbitAjax from "../model/ajax";

import style from "../styles/Detail";

interface Props extends WithStyles {
  loginStatus: boolean;
  isAdmin: boolean;
  avatar: string;
  username: string;
}

interface ParamProps {
  id: string;
}

interface Data {
  name: string;
  time: number;
  _id: string;
  group: string[];
}

interface Group {
  name: string;
  avgTime: number;
}

interface States {
  data: Data[];
  groupRank: Group[];
  nowId: string;
  title: string;
}

class DetailView extends React.PureComponent<RouteComponentProps<ParamProps> & Props> {
  state: States = {
    data: [],
    groupRank: [],
    nowId: "-1",
    title: ""
  };
  render() {
    if (this.state.data.length < 3) return null;
    const { classes } = this.props;

    const userPunchList = this.state.data.map(item => ({
      name: item.name,
      _id: item._id,
      group: item.group.join("/"),
      time: item.time.toFixed(1).toString(),
      timeRaw: item.time,
      avatar: userAvatar(item._id)
    }));

    const [top1User, top2User, top3User] = userPunchList;
    const top3 = (
      <>
        <UserTimeLarge
          rank="2"
          name={top2User.name}
          group={top2User.group}
          time={top2User.time}
          avatar={top2User.avatar}
        />
        <UserTimeLarge
          rank="1"
          name={top1User.name}
          group={top1User.group}
          time={top1User.time}
          avatar={top1User.avatar}
        />
        <UserTimeLarge
          rank="3"
          name={top3User.name}
          group={top3User.group}
          time={top3User.time}
          avatar={top3User.avatar}
        />
      </>
    );

    const zeroList = userPunchList
      .filter(item => item.timeRaw === 0)
      .map(item => (
        <UserTimeMiddle
          rank="-1"
          key={item._id}
          name={item.name}
          group={item.group}
          time={item.time}
          avatar={item.avatar}
        />
      ));

    const groupList = this.state.groupRank.map((item, index) => (
      <UserTimeSmall
        rank={(index + 1).toString()}
        key={index}
        name=""
        group={item.name}
        time={item.avgTime.toFixed(1).toString()}
      />
    ));

    const bestOtherList: JSX.Element[] = [];
    let offset = 3;
    for (; offset < 9; offset++) {
      bestOtherList.push(
        <UserTimeMiddle
          rank={(offset + 1).toString()}
          name={userPunchList[offset].name}
          group={userPunchList[offset].group}
          time={userPunchList[offset].time}
          avatar={userPunchList[offset].avatar}
          key={offset}
        />
      );
    }

    const normalList: JSX.Element[] = [];
    for (; offset < this.state.data.length; offset++) {
      if (userPunchList[offset].timeRaw === 0) continue;
      normalList.push(
        <UserTimeSmall
          key={offset}
          rank={(offset + 1).toString()}
          name={userPunchList[offset].name}
          group={userPunchList[offset].group}
          time={userPunchList[offset].time}
        />
      );
    }

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
          <div className={classes.time}>{this.state.title}</div>
        </div>
        <div className={classes.special}>
          <div className={classes.best}>
            <div className={classes.bestTop}>
              <DetailSubtitle title="TOP N" backgroundColor="#9df2aa" />
              {top3}
            </div>
            <div className={classes.userContainer}>{bestOtherList}</div>
          </div>
          <div className={classes.worst}>
            <DetailSubtitle title="NULL" backgroundColor="#f29db4" />
            <div className={classes.userContainer}>{zeroList}</div>
          </div>
        </div>
        <div className={classes.group}>
          <DetailSubtitle title="GROUP" backgroundColor="#d9b6ff" />
          <div className={classes.userContainerLg}>{groupList}</div>
        </div>
        <div className={classes.list}>
          <DetailSubtitle title="MORE" backgroundColor="#9dcdf2" />
          <div className={classes.userContainerLg}>{normalList}</div>
        </div>
      </div>
    );
  }
  async componentDidUpdate() {
    const { nowId } = this.state;
    const { id } = this.props.match.params;
    if (nowId === id) return;
    const responseRaw = await RabbitAjax.get(detailInfo(id));
    if (responseRaw.data.code === 1) {
      this.setState({
        data: responseRaw.data.msg.data,
        groupRank: responseRaw.data.msg.group,
        title: responseRaw.data.msg.title
      });
    }
    this.setState({
      nowId: id
    });
  }
}

export default withStyles(style)(DetailView);
