import { createStyles } from "@material-ui/core/styles";

const styles = createStyles({
  "@media screen and (min-width: 800px)": {
    detail: {
      width: "80%"
    },
    headline: {
      fontSize: "48px",
      margin: "0 12px"
    },
    uniquebg: {
      left: "calc(50% - 375px)",
      width: "150px",
      height: "136px"
    },
    special: {
      gridTemplateColumns: "50% 50%"
    }
  },
  "@media screen and (max-width: 800px)": {
    detail: {
      width: "95%"
    },
    headline: {
      fontSize: "22px",
      margin: "0 4px"
    },
    time: {
      fontSize: "12px"
    },
    uniquebg: {
      left: "calc(50% - 175px)",
      width: "76px",
      height: "69px"
    },
    special: {
      gridTemplateRows: "50% 50%"
    },
    bestOther: {
      marginTop: "48px"
    }
  },
  "@media screen and (min-width: 1400px)": {
    userContainer: {
      maxWidth: "550px"
    },
    userContainerLg: {
      maxWidth: "1125px"
    }
  },
  "@media screen and (max-width: 1400px)": {
    userContainer: {
      maxWidth: "280px"
    },
    userContainerLg: {
      maxWidth: "760px"
    }
  },
  "@media screen and (max-width: 880px)": {
    userContainerLg: {
      maxWidth: "325px !important"
    }
  },
  userContainer: {
    display: "inline-flex",
    flexFlow: "row wrap"
  },
  userContainerLg: {
    display: "inline-flex",
    flexFlow: "row wrap"
  },
  uniquebg: {
    position: "absolute",
    zIndex: -1
  },
  detail: {
    margin: "48px auto",
    position: "relative"
  },
  headline: {
    display: "inline-block",
    textTransform: "uppercase",
    fontWeight: 600,
    userSelect: "none"
  },
  headlineContainer: {
    textAlign: "center",
    position: "relative"
  },
  time: {
    color: "#919191",
    fontSize: "16px",
    margin: "12px auto",
    userSelect: "none"
  },
  special: {
    margin: "72px 0 0 0",
    width: "100%",
    display: "grid"
  },
  list: {
    padding: "0 18px 36px 18px",
    backgroundColor: "#d8ebfa",
    textAlign: "center"
  },
  best: {
    padding: "0 6px 36px 6px",
    backgroundColor: "#d8fadd",
    textAlign: "center"
  },
  worst: {
    padding: "0 6px 36px 6px",
    backgroundColor: "#fad8e1",
    textAlign: "center"
  },
  bestTop: {
    textAlign: "center"
  },
  group: {
    padding: "0 18px 36px 18px",
    backgroundColor: "#efe3fd",
    textAlign: "center"
  }
});

export default styles;
