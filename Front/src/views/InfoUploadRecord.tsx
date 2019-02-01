import * as React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import style from "../styles/InfoUploadRecord";
import RabbitAjax from "../model/ajax";
import { recordList } from "../model/consts";

interface UploadInfo {
  _id: string;
  MD5: string;
  createDate: string;
  status: string;
}

interface State {
  collection: UploadInfo[];
  total: number;
  pagesize: number;
}

interface RouteProps {
  page: string;
}

class InfoUploadRecordView extends React.PureComponent<RouteComponentProps<RouteProps> & WithStyles> {
  state: State = {
    collection: [],
    total: 0,
    pagesize: 20
  };
  previousPage = "-1";
  handleNext = () => {
    const page = +this.props.match.params.page;
    this.props.history.push({
      pathname: `/info/record/${(page + 1).toString()}`
    });
  };
  handleBack = () => {
    const page = +this.props.match.params.page;
    this.props.history.push({
      pathname: `/info/record/${(page - 1).toString()}`
    });
  };
  render() {
    const { classes } = this.props;
    const page = +this.props.match.params.page;
    const allPages = Math.ceil(this.state.total / this.state.pagesize);
    const collection = this.state.collection.map(item => ({
      ...item,
      createDate: new Date(item.createDate).toLocaleString()
    }));
    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>_id</TableCell>
              <TableCell>MD5</TableCell>
              <TableCell>上传时间</TableCell>
              <TableCell>状态</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collection.map(item => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  {item._id}
                </TableCell>
                <TableCell>{item.MD5}</TableCell>
                <TableCell>{item.createDate}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {allPages > 1 && (
          <div>
            <MobileStepper
              variant="progress"
              steps={allPages}
              position="static"
              activeStep={page - 1}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={page === allPages}>
                  下一页
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={page === 1}>
                  <KeyboardArrowLeft />
                  上一页
                </Button>
              }
            />
          </div>
        )}
      </Paper>
    );
  }
  componentDidUpdate() {
    this.getInfo();
  }
  componentDidMount() {
    this.previousPage = "-1";
    this.getInfo();
  }
  getInfo = async () => {
    const { page } = this.props.match.params;
    if (page === this.previousPage) return;
    this.previousPage = page;
    const responseRaw = await RabbitAjax.get(recordList(page));
    if (responseRaw.data.code === 1) {
      this.setState({
        collection: responseRaw.data.msg.collection,
        total: responseRaw.data.msg.total
      });
    }
  };
}

export default withStyles(style)(InfoUploadRecordView);
