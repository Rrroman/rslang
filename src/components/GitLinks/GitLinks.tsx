import React from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { ReactComponent as GitLogo } from '../../assets/images/link-to-the-github-mini.svg';
import classes from './GitLinks.module.css';

export default function GitLinks() {
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
    <aside className={classes.aside}>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        className={classes['git-btn']}
      >
        <GitLogo />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <div className={classes['popover-inner']}>
          <a
            href="https://github.com/juliememe"
            className={classes.aside__link}
          >
            Juliememe
          </a>
          <a
            href="https://github.com/evgeshabond"
            className={classes.aside__link}
          >
            Evgen
          </a>
          <a href="https://github.com/gaziz666" className={classes.aside__link}>
            Gaziz666
          </a>
          <a
            href="https://github.com/general-m"
            className={classes.aside__link}
          >
            General-m
          </a>
          <a href="https://github.com/rrroman" className={classes.aside__link}>
            Rrroman
          </a>
          <a
            href="https://rs.school/js/"
            className={`${classes.aside__link} ${classes['aside__rs-logo']}`}
          >
            Rs School
          </a>
        </div>
      </Popover>
    </aside>
  );
}
