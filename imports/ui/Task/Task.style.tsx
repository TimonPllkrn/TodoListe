import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    secondary: {
      display: "flex",
      flexFlow: "row",
      margin: "5px",
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    chip: {
      marginRight: "5px",
    },
  })
);
