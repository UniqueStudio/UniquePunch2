import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import style from "../styles/subtitle";

interface Props extends WithStyles {
  title: string;
  backgroundColor: string;
}

class DetailSubtitle extends React.PureComponent<Props> {
  render() {
    const { classes } = this.props;
    const renderStyle = { backgroundColor: this.props.backgroundColor };
    return (
      <div className={classes.container}>
        <div className={classes.title} style={renderStyle}>
          {this.props.title}
        </div>
      </div>
    );
  }
}

export default withStyles(style)(DetailSubtitle);
