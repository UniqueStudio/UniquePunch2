import * as React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router-dom";

import InfoItem from "../components/InfoItem";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import style from "../styles/InfoList";
import RabbitAjax from "../model/ajax";
import { infoList } from "../model/consts";

interface Props extends WithStyles {
  loginStatus: boolean;
  isAdmin: boolean;
  avatar: string;
  username: string;
}

interface ParamProps {
  page: string;
}

interface ItemType {
  _id: string;
  title: string;
  createDate: string;
}

interface State {
  itemCollection: ItemType[];
  total: number;
  pagesize: number;
}

class InfoListView extends React.PureComponent<Props & RouteComponentProps<ParamProps>> {
  state: State = {
    itemCollection: [],
    total: 0,
    pagesize: 20
  };
  previousPage = "-1";
  handleRefresh = () => {
    location.reload();
  };
  handleNext = () => {
    const page = +this.props.match.params.page;
    this.props.history.push({
      pathname: `/info/list/${(page + 1).toString()}`
    });
  };
  handleBack = () => {
    const page = +this.props.match.params.page;
    this.props.history.push({
      pathname: `/info/list/${(page - 1).toString()}`
    });
  };
  public render() {
    const { classes } = this.props;
    const page = +this.props.match.params.page;
    const items = this.state.itemCollection.map(item => (
      <InfoItem
        history={this.props.history}
        isAdmin={this.props.isAdmin}
        title={item.title}
        createDate={new Date(item.createDate)}
        id={item._id}
        key={item._id}
        refresh={this.handleRefresh}
      />
    ));
    const allPages = Math.ceil(this.state.total / this.state.pagesize);
    return (
      <div className={classes.listRoot}>
        {items}
        {allPages > 1 && (
          <div className={classes.pagination}>
            <MobileStepper
              variant="progress"
              steps={allPages}
              position="static"
              activeStep={page - 1}
              className={classes.root}
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
      </div>
    );
  }
  async getInfo() {
    const { page } = this.props.match.params;
    if (page === this.previousPage) return;
    this.previousPage = page;
    const responseRaw = await RabbitAjax.get(infoList(page));
    if (responseRaw.data.code === 1) {
      this.setState({
        itemCollection: responseRaw.data.msg.collection,
        total: responseRaw.data.msg.total
      });
    }
  }
  componentDidUpdate() {
    this.getInfo();
  }
  componentDidMount() {
    this.previousPage = "-1";
    this.getInfo();
  }
}

export default withStyles(style)(InfoListView);
