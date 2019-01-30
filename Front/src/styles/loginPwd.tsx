import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    card: {
      width: "600px",
      textAlign: "center",
      margin: "36px auto"
    },
    input: {
      width: "450px",
      margin: "12px auto"
    },
    button: {
      display: "block",
      margin: "24px auto"
    }
  });

export default styles;
