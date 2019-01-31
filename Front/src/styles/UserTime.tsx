import { createStyles } from "@material-ui/core/styles";

import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    "@media screen and (min-width:800px)": {
      container: {
        width: "350px"
      },
      boxGrid: {
        gridTemplateColumns: "24px 30px 76px 106px 90px 24px"
      }
    },
    "@media screen and (max-width:800px)": {
      container: {
        width: "300px"
      },
      boxGrid: {
        gridTemplateColumns: "24px 30px 76px 71px 89px 0px"
      }
    },
    container: {
      height: "48px",
      borderRadius: "24px",
      backgroundColor: "#d8ebfae6",
      display: "inline-block",
      userSelect: "none",
      margin: "12px 12px"
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
      margin: "auto",
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
      backgroundColor: "#d8fadde6"
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
      height: "196px",
      display: "inline-block",
      userSelect: "none",
      margin: "12px 12px",
      width: "128px",
      textAlign: "center",
      position: "relative"
    },
    boxGridLarge: {
      display: "grid",
      gridTemplateRows: "128px 48px",
      position: "relative"
    },
    itemLarge: {
      margin: "auto 0",
      fontSize: "14px",
      display: "inline-block"
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
      padding: "0px 6px",
      display: "inline-block"
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
      margin: "0 6px 0 0"
    },
    avatarLargeBackground: {
      width: "108px",
      height: "108px",
      borderRadius: "54px",
      backgroundColor: "gold",
      position: "relative",
      display: "inline-block",
      margin: "10px auto"
    },
    avatarLargeContainer: {
      position: "relative"
    },
    avatarLarge: {
      height: "100px",
      width: "100px",
      borderRadius: "50px",
      position: "absolute",
      top: "4px",
      left: "4px"
    },
    avatarCrown: {
      position: "absolute",
      top: "-32px",
      left: "28px",
      zIndex: 3,
      width: "52px",
      height: "40px"
    }
  });

export default styles;
