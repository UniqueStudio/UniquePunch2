import { createStyles } from "@material-ui/core/styles";

const styles = createStyles({
  "@media screen and (min-width: 800px)": {
    listRoot: {
      width: "40%"
    }
  },
  "@media screen and (max-width: 800px)": {
    listRoot: {
      width: "95%"
    }
  },
  listRoot: {
    margin: "36px auto"
  }
});

export default styles;
