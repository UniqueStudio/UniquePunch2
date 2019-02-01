import { createStyles } from "@material-ui/core/styles";

const styles = createStyles({
  "@media screen and (min-width:800px)": {
    footer: {
      width: "80%"
    }
  },
  "@media screen and (max-width:800px)": {
    footer: {
      width: "95%"
    }
  },
  footer: {
    userSelect: "none",
    margin: "48px auto"
  }
});

export default styles;
