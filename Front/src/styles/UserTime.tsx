import { createStyles } from "@material-ui/core/styles";

import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    "@media screen and (min-width:1200px)": {
      container: {
        width: "350px"
      },
      boxGrid: {
        gridTemplateColumns: "24px 30px 76px 106px 90px 24px"
      },
      avatarLargeBackground: {
        width: "108px",
        height: "108px",
        borderRadius: "54px"
      },
      avatarLarge: {
        height: "100px",
        width: "100px",
        borderRadius: "50px",
        top: "4px",
        left: "4px"
      },
      avatarCrown: {
        top: "-32px",
        left: "28px",
        width: "52px",
        height: "40px"
      },
      containerLarge: {
        width: "128px",
        height: "196px"
      },
      boxGridLarge: {
        gridTemplateRows: "128px 48px"
      },
      itemLarge: {
        fontSize: "14px"
      },
      groupLarge: {
        display: "inline-block"
      }
    },
    "@media screen and (max-width:1200px)": {
      container: {
        width: "300px"
      },
      boxGrid: {
        gridTemplateColumns: "24px 30px 76px 71px 89px 0px"
      },
      avatarLargeBackground: {
        width: "72px",
        height: "72px",
        borderRadius: "36px"
      },
      avatarLarge: {
        height: "68px",
        width: "68px",
        borderRadius: "34px",
        top: "2px",
        left: "2px"
      },
      avatarCrown: {
        top: "-32px",
        left: "12px",
        width: "52px",
        height: "40px"
      },
      containerLarge: {
        width: "78px",
        height: "128px"
      },
      boxGridLarge: {
        gridTemplateRows: "88px 36px"
      },
      itemLarge: {
        fontSize: "12px"
      },
      groupLarge: {
        display: "block"
      }
    },
    container: {
      height: "48px",
      borderRadius: "24px",
      backgroundColor: "#f9fcff",
      display: "inline-block",
      userSelect: "none",
      margin: "12px 12px",
      textAlign: "left"
    },
    boxGrid: {
      width: "100%",
      display: "grid",
      height: "100%"
    },
    rank: {
      width: "24px",
      height: "24px",
      fontSize: "14px !important",
      backgroundColor: "#94a7b6",
      color: "white",
      borderRadius: "12px",
      textAlign: "center",
      padding: "2px 0"
    },
    item: {
      margin: "auto 0",
      fontSize: "18px"
    },
    group: {
      minWidth: "24px",
      width: "auto",
      height: "24px",
      fontSize: "14px !important",
      backgroundColor: "#94a7b6",
      color: "white",
      borderRadius: "12px",
      textAlign: "center",
      margin: "auto auto auto 0",
      padding: "2px 6px"
    },
    timeIcon: {
      fontSize: "18px",
      height: "24px",
      width: "24px",
      verticalAlign: "text-bottom",
      padding: "3px"
    },
    containerMiddle: {
      width: "250px",
      height: "72px",
      borderRadius: "36px",
      display: "inline-block",
      userSelect: "none",
      margin: "12px 12px",
      textAlign: "left"
    },
    boxGridMiddle: {
      width: "100%",
      height: "100%",
      display: "grid",
      gridTemplateColumns: "84px 166px"
    },
    avatar: {
      height: "64px",
      width: "64px",
      borderRadius: "32px"
    },
    avatarContainer: {
      padding: "4px 6px"
    },
    groupMiddle: {
      minWidth: "24px",
      width: "auto",
      height: "24px",
      fontSize: "14px !important",
      backgroundColor: "#ec6941",
      color: "white",
      borderRadius: "12px",
      textAlign: "center",
      margin: "auto 9px auto 0",
      padding: "2px 6px",
      display: "inline-block"
    },
    infoFooter: {
      display: "grid",
      gridTemplateColumns: "20px auto"
    },
    rankMiddle: {
      width: "18px",
      height: "18px",
      fontSize: "13px !important",
      backgroundColor: "#94a7b6",
      color: "white",
      borderRadius: "9px",
      textAlign: "center"
    },
    containerLarge: {
      display: "inline-block",
      userSelect: "none",
      margin: "12px 12px",
      textAlign: "center",
      position: "relative"
    },
    boxGridLarge: {
      display: "grid",
      position: "relative"
    },
    itemLarge: {
      margin: "auto 0",
      display: "inline-block"
    },
    infoHeader: {
      margin: "-3px 0 2px 0;"
    },
    infoLargeContainer: {
      textAlign: "center"
    },
    groupLarge: {
      minWidth: "18px",
      width: "auto",
      height: "18px",
      fontSize: "12px !important",
      backgroundColor: "#ec6941",
      color: "white",
      borderRadius: "9px",
      textAlign: "center",
      margin: "auto 4px auto 0",
      padding: "0px 6px"
    },
    timeIconLarge: {
      fontSize: "14px",
      height: "18px",
      width: "18px",
      verticalAlign: "text-bottom",
      padding: "2px"
    },
    rankLarge: {
      width: "16px",
      height: "16px",
      fontSize: "12px !important",
      backgroundColor: "#94a7b6",
      color: "white",
      borderRadius: "9px",
      textAlign: "center",
      margin: "0 3px 0 0"
    },
    avatarLargeBackground: {
      position: "relative",
      display: "inline-block",
      margin: "10px auto"
    },
    avatarLargeContainer: {
      position: "relative"
    },
    avatarLarge: {
      position: "absolute"
    },
    avatarCrown: {
      position: "absolute",
      zIndex: 3
    }
  });

export default styles;
