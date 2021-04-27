import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { ReactComponent as SettingsIcon } from '../../../assets/images/settings-small.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      padding: theme.spacing(2),
      backgroundColor: '#fdebff',
      minWidth: '200px',
    },
    hotkeys: {
      position: 'absolute',
      top: '20px',
      right: '106px',
      width: '30px',
      minWidth: '30px',
      height: '30px',
      padding: 0,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: '#fdebff',
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: '#fdebff',
        boxShadow: '-8px -8px 16px #ffffff, 8px 8px 16px #b4c1d5',
      },
    },
    list: {
      listStyleType: 'none',
    },
    list__item: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '1.4rem',
      color: '#733999',
      borderRadius: '4px',
      '&:nth-child(2n+1)': {
        backgroundColor: 'pink',
      },
    },
    list__text: {
      padding: '4px',
    },
  })
);

export default function GameHotkeys() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        className={classes.hotkeys}
        onClick={handleClick}
      >
        <SettingsIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.wrapper}>
          <ul className={classes.list}>
            <li className={classes.list__item}>
              <span className={classes.list__text}>Tab:</span>
              <span className={classes.list__text}>следующий</span>
            </li>
            <li className={classes.list__item}>
              <span className={classes.list__text}>Shift+Tab:</span>
              <span className={classes.list__text}>предыдущий</span>
            </li>
            <li className={classes.list__item}>
              <span className={classes.list__text}>Space:</span>
              <span className={classes.list__text}>действие</span>
            </li>
            <li className={classes.list__item}>
              <span className={classes.list__text}>Arrow left:</span>
              <span className={classes.list__text}>лево</span>
            </li>
            <li className={classes.list__item}>
              <span className={classes.list__text}>Arrow right:</span>
              <span className={classes.list__text}>право</span>
            </li>
          </ul>
        </div>
      </Popover>
    </div>
  );
}
