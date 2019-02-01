import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import style from "../styles/Footer";

class Footer extends React.PureComponent<WithStyles> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.footer}>
        Code By Rabbit @ 811
        <br />
        Design By Penguin @ 811
      </div>
    );
  }
}

export default withStyles(style)(Footer);
