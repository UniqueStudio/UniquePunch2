import * as React from "react";
import * as H from "history";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { deleteInfo } from "../model/consts";
import RabbitAjax from "../model/ajax";

import { withStyles, WithStyles } from "@material-ui/core";
import style from "../styles/InfoItem";

interface Props extends WithStyles {
  title: string;
  createDate: Date;
  id: string;
  isAdmin: boolean;
  refresh: () => void;
  history: H.History<any>;
}

class InfoItem extends React.PureComponent<Props> {
  handleBtnClick = () => {
    const { id } = this.props;
    this.props.history.push({
      pathname: `/info/detail/${id}`
    });
  };
  handleDelete = () => {
    if (confirm("您是否要删除这次的打卡记录？一经删除将无法恢复！")) {
      this.deleteThis();
    }
  };
  deleteThis = async () => {
    const { id, refresh } = this.props;
    const responseRaw = await RabbitAjax.post(deleteInfo(id));
    if (responseRaw.data.code === 1) {
      refresh();
    } else {
      alert(responseRaw.data.msg);
    }
  };
  render() {
    const { classes, title, createDate, isAdmin } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {createDate.toLocaleString()}
          </Typography>
          <Typography variant="h5">{title}</Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={this.handleBtnClick}>
            查看统计
          </Button>
          {isAdmin && (
            <Button color="secondary" variant="contained" onClick={this.handleDelete}>
              删除
            </Button>
          )}
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(style)(InfoItem);
