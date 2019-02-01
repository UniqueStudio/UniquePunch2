import { createStyles } from "@material-ui/core/styles";

const styles = createStyles({
  "@media screen and (min-width:800px)": {
    paper: {
      width: "80%"
    }
  },
  "@media screen and (max-width:800px)": {
    paper: {
      width: "95%"
    }
  },
  paper: {
    margin: "36px auto"
  }
});

export default styles;
