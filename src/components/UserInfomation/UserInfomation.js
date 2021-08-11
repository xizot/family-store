import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing(5)}px 20px`,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    marginBottom: theme.spacing(1),
  },
}));

const UserInfomation = ({ avatar, name, position }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={avatar} alt={name} className={classes.avatar} />
      <Typography variant="subtitle1">{name}</Typography>
      <Typography variant="caption" color="primary">
        {position}
      </Typography>
    </div>
  );
};

export default UserInfomation;
