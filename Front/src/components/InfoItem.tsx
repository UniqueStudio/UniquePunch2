import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { withStyles, WithStyles } from "@material-ui/core";
import style from "../styles/InfoItem";

interface Props extends WithStyles {
  title: string;
  createDate: Date;
  id: string;
  isAdmin: boolean;
}

class InfoItem extends React.PureComponent<Props & RouteComponentProps> {
  handleBtnClick = () => {
    const { id } = this.props;
    this.props.history.push({
      pathname: `/info/detail/${id}`
    });
  };
  handleDelete = () => {
    console.log("DELETE!");
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
