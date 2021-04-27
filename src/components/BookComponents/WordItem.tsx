/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import Fade from '@material-ui/core/Fade';
import { Typography, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { CurrentWordListType } from '../../actions/word-actions';
import deleteIcon from '../../assets/images/delete.svg';

//  icons
import hardIcon from '../../assets/images/hardWord.svg';
import playIcon from '../../assets/images/play-big.svg';
import returnIcon from '../../assets/images/return.svg';
import { RootStateType } from '../../reducer/root-reducer';
import UserWordsService from '../../services/user-words-service';
import { serverUrl } from '../../utils/constants';
//  helpers
import getColor from '../../utils/getColor';
import { removeTagsFromString } from '../../utils/removeTagsFromString'

type Params = {
  group: number;
  word: CurrentWordListType;
};

const useStyles = makeStyles({
  wordContainer: {
    display: 'flex',
    width: '95%',
    paddingRight: '10px',
    margin: 0,
    marginLeft: '1rem',
    marginBottom: '1rem',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    backgroundColor: (params: any) => getColor(params.group),
  },
  firstContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '14rem',
    flexShrink: 0,
    justifyContent: 'center',

  },
  statusIconContainer: {
    width: '1.5rem',
    height: '1.5rem',
    flexShrink: 0,
    marginTop: '1.5rem',
    marginLeft: '1rem',
  },
  icon: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${hardIcon})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    filter: 'contrast(20%)',
  },
  imageContainer: {
    width: '5rem',
    height: '5rem',
    flexShrink: 0,
    marginTop: '1rem',
    marginLeft: '1rem',
    backgroundImage: (params: Params) =>
      `url(${serverUrl}${params.word.image})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  playButton: {
    flexBasis: '2.5rem',
    height: '2.5rem',
    flexShrink: 0,
    marginTop: '1.6rem',
    marginLeft: '1rem',
    cursor: 'pointer',
    backgroundImage: `url(${playIcon})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: '50%'
  },
  textContainerWrapper: {
    display: 'flex',
    flexBasis: '60rem',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  wordNameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    textAlign: 'left'
  },
  textContainer: {
    display: 'flex',
    flexBasis: '24rem',
    flexShrink: 15,
    flexDirection: 'column',
    marginTop: '1.5rem',
    marginLeft: '1rem',
    alignItems: 'flex-start',
  },
  infoContainer: {
    display: 'flex',
    flexBasis: '16rem',
    flexShrink: 10,
    flexWrap: 'wrap',
    marginTop: '1.5rem',
    marginLeft: '1.5rem',
    alignItems: 'flex-start',
  },
  buttonsBox: {
    display: 'flex',
    flexWrap: 'wrap',
    flexBasis: '15rem',
  },
  statsBox: {
    display: 'block',
    paddingRight: '10px',
    paddingBottom: '10px',
    marginTop: '1.5rem',
    width: '50px',
    color: 'green',
    fontSize: '14px'
  },
  button: {
    flexBasis: '2.5rem',
    height: '2.5rem',
    flexShrink: 0,
    marginLeft: '1rem',
    marginBottom: '0.5rem',
    cursor: 'pointer',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  buttonHard: {
    backgroundImage: `url(${hardIcon})`,
  },
  buttonDelete: {
    backgroundImage: `url(${deleteIcon})`,
  },
  buttonReturn: {
    backgroundImage: `url(${returnIcon})`,
  },
  helperMarginLeft: {
    marginLeft: '1rem',
  },
  tooltip: {
    fontSize: '1.4rem',
    padding: '0.5rem',
  },
  '@media (max-width: 600px)': {
    firstContainer: {
      flexDirection: 'column-reverse',
      justifyContent: 'flex-end',
      alignItems: 'space-between',
      width: '7rem',
    },
    playButton: {
      marginLeft: 0
    },
    wordNameWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alingItems: 'flex-start',
      gap: 0
    }
  },

});

type Props = {
  word: any;
  group: number;
  forseFetch: any;
  settings: {
    showTranslate: boolean;
    showButtons: boolean;
  };
};

const WordItem: React.FC<Props> = ({ word, group, forseFetch, settings }) => {
  const service = new UserWordsService();
  const user = useSelector((state: RootStateType) => state.userState.user);
  const classes = useStyles({ group, word });
  type WordStats = {
    correctCount: number,
    inCorrectCount: number,
    summ: number,
    correctPercent: number
  }
  const [wordStats, setWordStats] = React.useState<WordStats>({
    correctCount: -1,
    inCorrectCount: -1,
    summ: -2,
    correctPercent: 0,
  })

  React.useEffect(() => {
    if (word?.userWord?.optional) {
      const correctCount = word?.userWord?.optional.correctCount;
      const inCorrectCount = word?.userWord?.optional.inCorrectCount;
      const summ = correctCount + inCorrectCount;
      let correctPercent = 0;
      if (summ > 0) {
        if (correctCount > 0) {
          correctPercent = Math.round(correctCount / summ * 100);
        }
      }

      setWordStats({
        correctCount,
        inCorrectCount,
        summ,
        correctPercent,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickAudio = () => {
    const audio = new Audio(`${serverUrl}${word.audioMeaning}`);
    audio.play();
  };

  const addItemToHard = async () => {
    const params = {
      /* eslint-disable */
      userId: user.userId,
      wordId: word._id || word.id,
      token: user.token,
      body: {
        difficulty: 'hard',
        optional: {
          learning: true,
        },
      },
      /* eslint-enable */
    };
    try {
      await service.updateWord(params, {
        difficulty: 'hard',
        optional: {
          learning: true,
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    forseFetch();
  };

  const deleteItem = async () => {
    const params = {
      /* eslint-disable */
      userId: user.userId,
      wordId: word._id || word.id,
      token: user.token,
      body: {
        difficulty: 'deleted',
        optional: {
          learning: false,
        },
      },
      /* eslint-enable */
    };
    try {
      await service.updateWord(params, {
        difficulty: 'deleted',
        optional: {
          learning: false,
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    forseFetch();
  };

  const returnItem = async () => {
    const params = {
      /* eslint-disable */
      userId: user.userId,
      wordId: word._id || word.id,
      token: user.token,
      body: {
        difficulty: 'easy',
        optional: {
          learning: true,
        },
      },
      /* eslint-enable */
    };
    try {
      await service.updateWord(params, {
        difficulty: 'easy',
        optional: {
          learning: true,
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    forseFetch();
  };

  return (
    <div key={word.id} className={classes.wordContainer}>
      <div className={classes.firstContainer}>
        <div className={classes.statusIconContainer}>
          {word?.userWord?.difficulty === 'hard' && (
            <div className={classes.icon} />
          )}
        </div>
        <div className={classes.imageContainer} />
        <Tooltip classes={{ tooltip: classes.tooltip }} TransitionComponent={Fade} title='Воспроизвести'>
          <div className={classes.playButton}
            aria-hidden={true}
            onClick={handleClickAudio}
          />
        </Tooltip>
      </div>
      <div className={classes.textContainerWrapper}>
        <div className={classes.textContainer}>
          <div className={classes.wordNameWrapper}>
            <Typography variant="h4" component="span">
              {word.word}
            </Typography>
            <Typography
              variant="h4"
              component="span"
            >
              {removeTagsFromString(word.transcription)}
            </Typography>
          </div>
          <div>
            <Typography align="left" variant="body1" component="p">
              {removeTagsFromString(word.textMeaning)}
            </Typography>
            <Typography align="left" variant="body1" component="p">
              {removeTagsFromString(word.textExample)}
            </Typography>
          </div>
        </div>
        <div className={classes.textContainer}>
          {settings.showTranslate && (
            <>
              <div>
                <Typography align="left" variant="h4" component="span">
                  {removeTagsFromString(word.wordTranslate)}
                </Typography>
              </div>
              <div>
                <Typography align="left" variant="body1" component="p">
                  {removeTagsFromString(word.textMeaningTranslate)}
                </Typography>
                <Typography align="left" variant="body1" component="p">
                  {removeTagsFromString(word.textExampleTranslate)}
                </Typography>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={classes.infoContainer}>
        {settings.showButtons && (
          <div className={classes.buttonsBox}>
            <Tooltip classes={{ tooltip: classes.tooltip }} TransitionComponent={Fade} title='Добавить в сложные'>
              <div
                className={clsx(classes.button, classes.buttonHard)}
                onClick={() => addItemToHard()}
                aria-hidden={true}
              />
            </Tooltip>
            {word.userWord.difficulty !== 'deleted' && (
              <Tooltip classes={{ tooltip: classes.tooltip }} TransitionComponent={Fade} title='Добавить в удаленные'><div
                className={clsx(classes.button, classes.buttonDelete)}
                onClick={() => deleteItem()}
                aria-hidden={true}
              /></Tooltip>)}
            <Tooltip classes={{ tooltip: classes.tooltip }} TransitionComponent={Fade} title='Вернуть в простые'>
              <div
                className={clsx(classes.button, classes.buttonReturn)}
                onClick={() => returnItem()}
                aria-hidden={true}
              />
            </Tooltip>
            {/* className={clsx({[classes.difficultyButton]: true, [classes.activeButton]: difficulty === 'all'})} */}
          </div>
        )}
        <div className={classes.statsBox}>
          {wordStats.summ > 0 && `${wordStats.correctPercent}`}
        </div>

      </div>

      {/* {item?.word}
    <span>  </span>
    {item?.userWord?.difficulty} */}
    </div>
  );
};

export default WordItem;
