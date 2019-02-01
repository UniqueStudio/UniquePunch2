import * as React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router-dom";

import InfoItem from "../components/InfoItem";

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
}

class InfoListView extends React.PureComponent<Props & RouteComponentProps<ParamProps>> {
  state: State = {
    itemCollection: []
  };
  public render() {
    const { classes } = this.props;

    const items = this.state.itemCollection.map(item => (
      <InfoItem
        {...this.props}
        title={item.title}
        createDate={new Date(item.createDate)}
        id={item._id}
        key={item._id}
      />
    ));

    return <div className={classes.listRoot}>{items}</div>;
  }
  async componentDidMount() {
    const { page } = this.props.match.params;
    const responseRaw = await RabbitAjax.get(infoList(page));
    if (responseRaw.data.code === 1) {
      this.setState({
        itemCollection: responseRaw.data.msg
      });
    }
  }
}

export default withStyles(style)(InfoListView);
