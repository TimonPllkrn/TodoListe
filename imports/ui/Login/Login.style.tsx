import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      gap: "2em",
      marginLeft: "auto",
      marginRight: "auto",
      width: "22em",
      marginTop: "15em",
      textAlign: "center",
    },
  })
);
