import { createStyles } from "@material-ui/core/styles";

import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "block",
      marginBottom: "36px",
      userSelect: "none"
    },
    title: {
      display: "inline-block",
      width: "auto",
      margin: "0 auto",
      textTransform: "capitalize",
      color: "white",
      fontSize: "18px",
      fontWeight: 600,
      letterSpacing: "8px",
      padding: "6px 12px 6px 20px"
    }
  });

export default styles;
