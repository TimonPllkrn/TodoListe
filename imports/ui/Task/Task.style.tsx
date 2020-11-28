import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    secondary: {
      
    },
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(2)
    },
    chip: {
      marginRight: "5px",
    },
    paper: {
      margin: theme.spacing(2),
      width: theme.spacing(40),
      // backgroundColor: "#FFFCAC"
     // height: theme.spacing(20),
    },
    section: {
      padding: theme.spacing(1)
    }
  })
);
