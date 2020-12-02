import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    secondary: {},
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(2),
    },
    chip: {
      marginRight: "5px",
    },
    paper: {
      margin: theme.spacing(2),
      width: theme.spacing(40),
    },
    paper2: {
      margin: theme.spacing(2),
      width: theme.spacing(60),
    },
    section: {
      padding: theme.spacing(1),
    },
    titleSection: {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },
    userName: {
      marginTop: theme.spacing(1),
    },
    grid: {
      display: "grid",
      justifyContent: "end",
    },
    button: {
      margin: theme.spacing(2),
    },
    flex: {
      display: "flex",
    },
    flexGrow: {
      flexGrow: 1,
    },
  })
);
