import { createStyles } from "@material-ui/core/styles";

import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    "@media screen and (min-width: 800px)": {
      card: {
        width: "600px",
        margin: "72px auto"
      },
      input: {
        width: "450px"
      }
    },
    "@media screen and (max-width: 800px)": {
      card: {
        width: "95%",
        margin: "36px auto"
      },
      input: {
        width: "95%"
      }
    },
    card: {
      textAlign: "center",
      padding: "72px"
    },
    input: {
      margin: "12px auto"
    },
    button: {
      display: "block",
      margin: "24px auto"
    },
    qrcode: {
      margin: "24px auto",
      display: "block",
      maxWidth: "100%"
    },
    title: {
      userSelect: "none"
    }
  });

export default styles;
