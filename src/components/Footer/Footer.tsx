import {
  createStyles,
  makeStyles,
  Theme,
  Tooltip,
  Zoom,
} from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/menu-actions';
import teamImg from '../../assets/images/team.svg';
import statisticImg from '../../assets/images/statistic.svg';
import { MenuState } from '../../reducer/menu-reducer';
import { RootStateType } from '../../reducer/root-reducer';
import { mainPath } from '../../utils/constants';
import styles from './Footer.module.css';

type MapDispatchToProps = {
  bottomMenuOpen: (value: boolean) => actions.MenuOpenActionType;
};

type Props = MapDispatchToProps & MenuState;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    customWidth: {
      fontSize: '2rem',
      color: '#5b2467',
      backgroundColor: '#fdebff',
      border: '1px solid #5b2467',
      marginBottom: '50px',
    },
  })
);

const Footer: React.FC<Props> = ({ bottomMenuIsOpen, bottomMenuOpen }) => {
  const bottomMenu = useRef(null);
  const buttonsContainer = useRef(null);
  const classes = useStyles();

  const toggleMenuHandler = () => {
    bottomMenuIsOpen ? bottomMenuOpen(false) : bottomMenuOpen(true);
  };

  useEffect(() => {
    if (bottomMenu && bottomMenuIsOpen) {
      (bottomMenu.current! as HTMLElement).style.bottom = '-1144px';
      (buttonsContainer.current! as HTMLElement).style.opacity = '1';
    }
    if (bottomMenu && !bottomMenuIsOpen) {
      (bottomMenu.current! as HTMLElement).style.bottom = '-1194px';
      (buttonsContainer.current! as HTMLElement).style.opacity = '0';
    }
  }, [bottomMenuIsOpen]);

  return (
    <footer className={styles.footer}>
      <div
        ref={bottomMenu}
        className={styles.wrapper__circle}
        onMouseLeave={() => bottomMenuOpen(false)}
        onMouseEnter={() => bottomMenuOpen(true)}
      >
        <div
          ref={buttonsContainer}
          className={styles['menu-buttons-container']}
        >
          <div
            className={`${styles['up-button']} ${styles['button_margin-big']}`}
          >
            <Tooltip
              placement="top"
              classes={{
                tooltip: classes.customWidth,
              }}
              title="О команде"
              TransitionComponent={Zoom}
            >
              <Link to={mainPath.aboutUs}>
                <img src={teamImg} alt="ebook" />
              </Link>
            </Tooltip>
          </div>
          <div className={styles['up-button']}>
            <Tooltip
              placement="top"
              classes={{
                tooltip: classes.customWidth,
              }}
              title="Статистика"
              TransitionComponent={Zoom}
            >
              <Link to={mainPath.statistic}>
                <img src={statisticImg} alt="stat" />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className={styles.wrapper} onMouseEnter={() => bottomMenuOpen(true)}>
        <ul className={styles.github}>
          <li>
            <a
              href="https://github.com/juliememe"
              className={styles.list__link}
            >
              Juliememe
            </a>
          </li>
          <li>
            <a
              href="https://github.com/evgeshabond"
              className={styles.list__link}
            >
              Evgen
            </a>
          </li>
          <li>
            <a href="https://github.com/gaziz666" className={styles.list__link}>
              Gaziz666
            </a>
          </li>
        </ul>
        <button
          type="button"
          aria-label="Bottom-menu"
          className={styles['menu-btn']}
          onClick={toggleMenuHandler}
          onMouseEnter={() => bottomMenuOpen(true)}
        >
          <div className={styles['menu-btn__inner']} />
        </button>
        <ul className={styles.github}>
          <li>
            <a
              href="https://github.com/general-m"
              className={styles.list__link}
            >
              General-m
            </a>
          </li>
          <li>
            <a href="https://github.com/rrroman" className={styles.list__link}>
              Rrroman
            </a>
          </li>
          <li>
            <a
              href="https://rs.school/js/"
              className={`${styles.list__link} ${styles['link__rs-logo']}`}
            >
              Rs School
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

const mapStateToProps = (state: RootStateType) => state.menuState;

export default connect(mapStateToProps, actions)(Footer);
