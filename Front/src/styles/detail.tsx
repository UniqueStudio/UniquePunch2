import { createStyles } from "@material-ui/core/styles";

const styles = createStyles({
  "@media screen and (min-width: 800px)": {
    detail: {
      width: "80%"
    },
    headline: {
      fontSize: "48px"
    }
  },
  "@media screen and (max-width: 800px)": {
    detail: {
      width: "95%"
    },
    headline: {
      fontSize: "22px"
    },
    time: {
      fontSize: "12px"
    }
  },
  detail: {
    margin: "48px auto"
  },
  headline: {
    display: "inline-block",
    textTransform: "uppercase",
    margin: "0 4px",
    fontWeight: 500,
    userSelect: "none"
  },
  headlineContainer: {
    textAlign: "center"
  },
  time: {
    color: "#919191",
    fontSize: "14px",
    margin: "12px auto"
  }
});

export default styles;
