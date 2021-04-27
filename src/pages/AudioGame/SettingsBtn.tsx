import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { RootStateType } from '../../reducer/root-reducer';
import styles from './AudioGame.module.css';
import { audioGameStart, isAnswerSelected, isFullScreen } from '../../actions/audioGame-actions';
import { CloseButton } from '../../components/button-icons/close-button/close-button';
import { QuestionButton } from '../../components/button-icons/question-button/question-button';
import { ReactComponent as CatAudio } from '../../assets/images/cat-audio-game.svg';


const SettingsBtn: React.FC = () => {
  const dispatch = useDispatch();
  const fullScreen = useSelector((state: RootStateType) =>
    state.audioGameState.isFullScreen);

  function fullScreenEnterHandler() {
    dispatch(isFullScreen(true));
  }

  function fullScreenExitHandler() {
    dispatch(isFullScreen(false));
  }

  const closeHandler = () => {
    dispatch(audioGameStart(false));
    dispatch(isAnswerSelected(false));
    if (fullScreen) {
      dispatch(isFullScreen(false));
    }
  }

  return (
    <div className={styles.btn__container}>
      <div className={styles.hint} data-title="Выберите перевод услышанного слова">
        <QuestionButton buttonClick={() => console.log('')} />
      </div>
      {fullScreen ? (
        <button
          className={styles['full-screen__button']}
          type="button"
          onClick={() => fullScreenExitHandler()}
        >
          <FullscreenExitIcon
            className={styles['full-screen__icon']}
            width="24px"
            height="24px"
          />
        </button>
      ) : (
        <button
          className={styles['full-screen__button']}
          type="button"
          onClick={() => fullScreenEnterHandler()}
        >
          <FullscreenIcon
            className={styles['full-screen__icon']}
            width="24px"
            height="24px"
          />
        </button>
      )}

      <CloseButton buttonClick={() => closeHandler()} />
    </div>
  )
}

export default SettingsBtn;