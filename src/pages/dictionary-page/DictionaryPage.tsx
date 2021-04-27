/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
//  redux
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
//  material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Typography,
  Tooltip,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Switch from '@material-ui/core/Switch';
//  components
import WordItem from '../../components/BookComponents/WordItem';
//  types
import { RootStateType } from '../../reducer/root-reducer';
//  herlpers and services
import AggregateService from '../../services/word-aggregate-service';
//  icons
import learningIcon from '../../assets/images/learning.svg';
import hardIcon from '../../assets/images/hardWord.svg';
import deletedIcon from '../../assets/images/delete.svg';
import gamesIcon from '../../assets/images/games.svg';
import settingsIcon from '../../assets/images/settings.svg';
import { setLevelVisibility } from '../../actions/menu-actions';
import aggregatePage from '../../utils/aggregatePage';
import { wordListLoaded } from '../../actions/word-actions';
import { mainPath } from '../../utils/constants';
import { setResultPageState } from '../../actions/constructor-game-actions';
import { audioGameStart } from '../../actions/audioGame-actions';
import { savannaGameStart } from '../../actions/savanna-game-actions';
import { sprintGameStatusChange } from '../../actions/sprint-game-action';

// update theme object of material ui
const primaryColor = '#FDEBFF';
const secondaryColor = '#5B2467';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    height: '80vh',
    width: '95vw',
    minHeight: '550px',
    maxWidth: 1250,
    margin: '1rem auto',
    paddingTop: '1rem',
    borderRadius: '3rem',
    color: secondaryColor,
    backgroundColor: primaryColor,
  },
  difficultyContainer: {
    position: 'absolute',
    display: 'flex',
    top: 0,
    left: '10px',
  },
  difficultyButton: {
    height: '4.5rem',
    width: '4.5rem',
    display: 'block',
    cursor: 'pointer',
    marginLeft: '0.5rem',
    border: '2px solid transparent',
    borderRadius: '1rem',
    overflow: 'hidden',
    marginTop: '0.5rem',
    paddingBottom: '2px',
  },
  activeButton: {
    border: '2px solid blue',
  },
  difficultyIcon: {
    display: 'inline-block',
    width: '3rem',
    height: '3rem',
    marginTop: '0.5rem',
  },
  difficultyText: {
    display: 'inline-block',
    textAlign: 'center',
    fontSize: '1.6rem',
    width: '10rem',
    marginLeft: '1rem',
  },
  buttonsContainer: {
    position: 'absolute',
    top: '25px',
    right: '8rem',
    display: 'flex',
  },
  button: {
    flexBasis: '3rem',
    height: '3rem',
    flexShrink: 0,
    marginLeft: '1rem',
    marginBottom: '0.5rem',
    cursor: 'pointer',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  buttonGames: {
    backgroundImage: `url(${gamesIcon})`,
  },
  buttonSettings: {
    backgroundImage: `url(${settingsIcon})`,
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '2rem',
    minWidth: '350px',
    backgroundColor: 'white',
  },
  dialog: {
    fontSize: '1.6rem',
  },
  container: {
    position: 'relative',
    display: 'flex',
    marginTop: '2rem',
    alignItems: 'center',
    height: '100%',
    overflow: 'hidden',
  },
  levels: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    marginLeft: '15px',
    alignSelf: 'center',
  },
  level: {
    display: 'flex',
    padding: '2rem 2rem',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px solid transparent',
    outline: 'none',
  },
  levelName: {
    fontSize: '2rem',
    color: secondaryColor,
  },
  levelName__a1: {
    backgroundColor: '#61E9FC',
    borderRadius: '10px 10px 0px 0px',
  },
  levelName__a2: {
    backgroundColor: '#FC5FE3',
  },
  levelName__a2plus: {
    backgroundColor: '#FC5F5F',
  },
  levelName__b1: {
    backgroundColor: '#FCB45F',
  },
  levelName__b2: {
    backgroundColor: '#F9FC5F',
  },
  levelName__b2plus: {
    backgroundColor: '#62FC5F',
    borderRadius: '0px 0px 10px 10px',
  },
  activeLevelName: {
    border: '2px solid blue',
  },
  wordListWrapper: {
    position: 'relative',
    width: '90%',
    marginTop: '1rem',
    maxWidth: '1150px',
  },
  wordList: {
    display: 'flex',
    flexDirection: 'column',
    // alignSelf: 'flex-start',
    width: '100%',
    margin: '1rem',
    maxHeight: '55vh',
    overflowY: 'scroll',
    willChange: 'transform',
  },
  pagination: {
    height: '70px',
    width: '400px',
    margin: '1rem auto',
    marginBottom: '1rem',
    fontSize: '2rem',
    listStyle: 'none',

    '& li': {
      display: 'inline-block',
      marginLeft: '0.5rem',
    },

    '& a': {
      width: '3rem',
      height: '3rem',
      cursor: 'pointer',
      paddingLeft: '0.9rem',
      paddingRight: '1rem',
    },
  },
  activePage: {
    color: 'white',
    backgroundColor: secondaryColor,
    borderRadius: '2rem',
  },
  disabled: {
    color: 'grey',

    '& a': {
      display: 'none',
    },
  },
  activeLink: {
    outline: 'none',
  },
  hidden: {
    display: 'none',
  },
  helperFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  statsTextWrapper: {
    display: 'flex',
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    paddingLeft: '2rem',
    paddingRight: '4.5rem',
    minHeight: '4rem',
    marginBottom: '1rem',
  },

  statsText: {
    margin: 0,
    marginBottom: '0.5rem',
    minHeight: '1.5rem',
    fontSize: '1.4rem',
  },
  tooltip: {
    fontSize: '1.4rem',
    padding: '0.5rem',
  },
});

const DictionaryPage: React.FC = () => {
  const dispatch = useDispatch();
  const historyCopy = useHistory();
  const searchParams = new URLSearchParams(historyCopy.location.search);
  const user = useSelector((state: RootStateType) => state.userState.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWordListLoaded, setIsWordListLoaded] = useState(false);
  const [settings, setSettings] = useState({
    showTranslate: true,
    showButtons: true,
  });
  const [pagesCount, setPagesCount] = useState(1);
  const getGroup = (): number => {
    const group = searchParams.get('group');
    let groupNumber = 0;
    if (typeof group === 'string') {
      groupNumber = parseFloat(group);
      if (groupNumber < 0) groupNumber = 0;
      if (groupNumber > 5) groupNumber = 5;
    }
    return groupNumber;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getPage = (): any => {
    const page = searchParams.get('page');
    let pageNumber = 0;
    if (typeof page === 'string') {
      pageNumber = parseFloat(page) - 1;
      if (pageNumber < 0) pageNumber = 0;
      if (pageNumber > 30) pageNumber = 29;
      if (pageNumber > pagesCount) pageNumber = pagesCount;
    }
    return pageNumber;
  };
  const getDifficulty = (): string => {
    const difficulty = searchParams.get('difficulty');
    let newDifficulty = 'learning';
    if (typeof difficulty === 'string') newDifficulty = difficulty;
    return newDifficulty;
  };
  const [modalOpened, setModalOpened] = useState(false);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [difficulty, setDifficulty] = useState(getDifficulty());
  const [currentGroup, setCurrentGroup] = useState(getGroup());
  const [currentPage, setCurrentPage] = useState(getPage());
  const currentWordsPerPage = 20;
  const [wordsToRender, setWordsToRender] = useState([
    {
      id: '',
      group: 0,
      page: 0,
      word: '',
      image: '',
      audio: '',
      audioMeaning: '',
      audioExample: '',
      textMeaning: '',
      textExample: '',
      transcription: '',
      wordTranslate: '',
      textMeaningTranslate: '',
      textExampleTranslate: '',
      userWord: {
        difficulty: '',
        optional: {
          learned: false,
        },
      },
    },
  ]);
  const [allLearningWords, setAllLearningWords] = useState([
    {
      id: '',
      group: 0,
      page: 0,
      word: '',
      image: '',
      audio: '',
      audioMeaning: '',
      audioExample: '',
      textMeaning: '',
      textExample: '',
      transcription: '',
      wordTranslate: '',
      textMeaningTranslate: '',
      textExampleTranslate: '',
      userWord: {
        difficulty: '',
        optional: {
          learned: false,
        },
      },
    },
  ]);
  const [reRender, setRerender] = useState(true);

  const service = new AggregateService();
  const classes = useStyles({ group: currentGroup });

  const forseRender = () => {
    setRerender(!reRender);
  };

  const handleGamesButtonClick = () => {
    setDialogOpened(true);
  };

  const handleGameChoose = async (gamePath: string) => {
    /* eslint-disable */
    let gameWordList = [...wordsToRender];
    //  add more words
    if (currentPage > 0) {
      //  add words from previous pages of dictinary
      try {
        const wordsToAdd: any = await getUpdatedWords({
          page: currentPage - 1,
          group: currentGroup,
          wordsPerPage: currentWordsPerPage,
          searchString: difficulty,
        });
        wordsToAdd.forEach((wordToAdd: any) => {
          const dublicateWord = gameWordList.find(
            (word: any) => word.id === wordToAdd.id
          );
          if (dublicateWord) {
          } else {
            gameWordList.push(wordToAdd);
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      // add words from 3 first pages of the group
      for (let i = 0; i < 3; i++) {
        const wordsToAdd: any = await aggregatePage({
          page: i,
          group: currentGroup,
          user,
        });
        //  if word is already in list dont add
        wordsToAdd.forEach((wordToAdd: any) => {
          const dublicateWord = gameWordList.find(
            (word: any) => word.id === wordToAdd.id
          );
          if (dublicateWord) {
          } else {
            gameWordList.push(wordToAdd);
          }
        });
      }
    }

    // //  remove deleted words if called not from deleted difficulty
    if (difficulty !== 'deleted' && !!difficulty) {
      gameWordList = gameWordList.filter((word: any) => {
        if (!word?.userWord?.difficulty) return true;
        if (word?.userWord?.difficulty === 'deleted') return false;
        return true;
      });
    } else {
      gameWordList = gameWordList.filter((word) => {
        if (word?.userWord?.difficulty === 'deleted') return true;
        return false;
      });
    }
    // //  remove all elements after 20th
    gameWordList.length = 20;
    gameWordList = gameWordList.filter((item) => item);
    dispatch(setResultPageState(false));
    dispatch(setLevelVisibility(false));
    dispatch(wordListLoaded(gameWordList));
    dispatch(audioGameStart(false));
    dispatch(savannaGameStart(false));
    dispatch(sprintGameStatusChange('start'));
    historyCopy.push(gamePath);
    /* eslint-enable */
  };

  const handleDifficultyChoose = (value: string) => {
    historyCopy.replace({
      pathname: '/ebookpage/dictionary/',
      search: `?group=${getGroup()}&page=${getPage()}&difficulty=${value}`,
    });
    setDifficulty(value);
  };

  const handleSettingsButtonClick = () => {
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = (data: any) => {
    historyCopy.replace({
      pathname: '/ebookpage/dictionary/',
      search: `?group=${getGroup()}&page=${
        data.selected + 1
      }&difficulty=${getDifficulty()}`,
    });
    setCurrentPage(data.selected);
  };

  type Params = {
    page: number;
    group: number;
    wordsPerPage: number;
    searchString: string;
  };

  //  fetch words from backend
  const getWords = async ({
    page,
    group,
    wordsPerPage,
    searchString,
  }: Params): Promise<Array<Object>> => {
    const params = {
      userId: user.userId,
      token: user.token,
      page,
      group,
      wordsPerPage,
    };
    try {
      const response = await service.getAggregatedWordsList(
        params,
        searchString
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newWords: any = await response[0].paginatedResults.flat();
      const totalCount: number = await response[0]?.totalCount[0]?.count;
      if (!totalCount || totalCount < 1) setPagesCount(1);
      else await setPagesCount(Math.ceil(totalCount / currentWordsPerPage));
      setIsWordListLoaded(true);
      return newWords;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    return [];
  };

  //  fetch words and rename _id to id
  const getUpdatedWords = async ({
    page,
    group,
    wordsPerPage,
    searchString,
  }: Params) => {
    try {
      const words = await getWords({ page, group, wordsPerPage, searchString });
      if (words.length < 1) {
        return [];
      }
      /* eslint-disable */
      const updatedWords = words.map((item: any) => {
        if (item?._id) return { ...item, id: item._id };
        return item;
      });
      return updatedWords;
      /* eslint-enable */
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    return [];
  };

  //  get words from API depending on difficulty, group, page
  useEffect(() => {
    getUpdatedWords({
      page: currentPage,
      group: currentGroup,
      wordsPerPage: currentWordsPerPage,
      searchString: difficulty,
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((updatedWords: any) => {
        if (updatedWords.length < 1) {
          setCurrentPage(0);
        }
        setWordsToRender(updatedWords);
        setIsLoaded(true);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, currentGroup, currentPage, reRender, currentWordsPerPage]);

  //  get all learning words from group for stats if current difficulty is learning
  useEffect(() => {
    if (difficulty !== 'learning') return;
    const wordsPromise = getUpdatedWords({
      page: 0,
      group: currentGroup,
      wordsPerPage: 600,
      searchString: 'learning',
    });
    wordsPromise.then((data) => {
      setAllLearningWords(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroup, reRender, difficulty]);

  const handleGroupChange = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const target = e.target as Element;
    let newGroup = 0;
    switch (target.textContent) {
      case 'A1':
        newGroup = 0;
        break;
      case 'A2':
        newGroup = 1;
        break;
      case 'A2+':
        newGroup = 2;
        break;
      case 'B1':
        newGroup = 3;
        break;
      case 'B2':
        newGroup = 4;
        break;
      case 'B2+':
        newGroup = 5;
    }
    historyCopy.replace({
      pathname: '/ebookpage/dictionary/',
      search: `?group=${newGroup}&page=${
        getPage() + 1
      }&difficulty=${getDifficulty()}`,
    });
    setCurrentGroup(newGroup);
  };

  if (!isLoaded) return <CircularProgress />;
  return (
    <Paper className={classes.root}>
      <span className={classes.hidden}>{currentPage}</span>
      <Typography variant="h4" component="h3">
        Словарь
      </Typography>
      <Box className={classes.difficultyContainer}>
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          TransitionComponent={Fade}
          title="Изучаемые"
        >
          <div
            className={clsx({
              [classes.difficultyButton]: true,
              [classes.activeButton]: difficulty === 'learning',
            })}
            onClick={() => handleDifficultyChoose('learning')}
            aria-hidden={true}
          >
            <img
              className={classes.difficultyIcon}
              src={learningIcon}
              alt="Иконка"
              aria-hidden="true"
            />
          </div>
        </Tooltip>
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          TransitionComponent={Fade}
          title="Сложные"
        >
          <div
            className={clsx({
              [classes.difficultyButton]: true,
              [classes.activeButton]: difficulty === 'hard',
            })}
            onClick={() => handleDifficultyChoose('hard')}
            aria-hidden={true}
          >
            <img
              className={classes.difficultyIcon}
              src={hardIcon}
              alt="Иконка"
              aria-hidden="true"
            />
          </div>
        </Tooltip>
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          TransitionComponent={Fade}
          title="Удаленные"
        >
          <div
            className={clsx({
              [classes.difficultyButton]: true,
              [classes.activeButton]: difficulty === 'deleted',
            })}
            onClick={() => handleDifficultyChoose('deleted')}
            aria-hidden={true}
          >
            <img
              className={classes.difficultyIcon}
              src={deletedIcon}
              alt="Иконка"
              aria-hidden="true"
            />
            {/* <div className={classes.difficultyText}>Удаленные слова</div> */}
          </div>
        </Tooltip>
      </Box>
      <Box className={classes.buttonsContainer}>
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          TransitionComponent={Fade}
          title="Игры"
        >
          <div
            className={clsx(classes.button, classes.buttonGames)}
            onClick={() => handleGamesButtonClick()}
            aria-hidden={true}
          />
        </Tooltip>
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          TransitionComponent={Fade}
          title="Настройки"
        >
          <div
            className={clsx(classes.button, classes.buttonSettings)}
            onClick={() => handleSettingsButtonClick()}
            aria-hidden={true}
          />
        </Tooltip>
      </Box>
      <Modal
        open={modalOpened}
        onClose={handleModalClose}
        aria-labelledby="settings-modal"
        aria-describedby="settings-modal"
      >
        <Paper className={classes.modal}>
          <div className={classes.helperFlex}>
            <Typography align="left" variant="h4" component="span">
              Показывать перевод
            </Typography>
            <div>
              <Switch
                checked={settings.showTranslate}
                color="secondary"
                onChange={() => {
                  setSettings({
                    ...settings,
                    showTranslate: !settings.showTranslate,
                  });
                }}
              />
            </div>
          </div>
          <div className={classes.helperFlex}>
            <Typography align="left" variant="h4" component="span">
              Показывать кнопки
            </Typography>
            <div>
              <Switch
                checked={settings.showButtons}
                color="secondary"
                onChange={() => {
                  setSettings({
                    ...settings,
                    showButtons: !settings.showButtons,
                  });
                }}
              />
            </div>
          </div>
        </Paper>
      </Modal>
      <Dialog
        open={dialogOpened}
        onClose={() => setDialogOpened(false)}
        classes={{
          root: classes.dialog,
        }}
      >
        <DialogTitle id="simple-dialog-title">
          <Typography align="left" variant="h3" component="p">
            Выберите игру
          </Typography>
        </DialogTitle>
        <List>
          <ListItem
            button
            onClick={() => handleGameChoose('/savannagame')}
            key="savannah"
          >
            <Typography align="center" variant="h4" component="p">
              Саванна
            </Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => handleGameChoose('/audiogame')}
            key="audiocall"
          >
            <Typography align="center" variant="h4" component="p">
              Аудиовызов
            </Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => handleGameChoose('/sprint')}
            key="sprint"
          >
            <Typography align="center" variant="h4" component="p">
              Спринт
            </Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => handleGameChoose(mainPath.constructorGame)}
            key="constructor"
          >
            <Typography align="center" variant="h4" component="p">
              Конструктор слов
            </Typography>
          </ListItem>
        </List>
      </Dialog>
      <div className={classes.container}>
        <Box className={classes.levels} role="menu">
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            TransitionComponent={Fade}
            title="Изменить раздел учебника"
          >
            <div
              className={clsx({
                [classes.level]: true,
                [classes.levelName__a1]: true,
                [classes.activeLevelName]: currentGroup === 0,
              })}
              role="button"
              tabIndex={0}
              onClick={(e) => handleGroupChange(e)}
              aria-hidden="true"
            >
              <span className={classes.levelName}>A1</span>
            </div>
          </Tooltip>
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            TransitionComponent={Fade}
            title="Изменить раздел учебника"
          >
            <div
              className={clsx({
                [classes.level]: true,
                [classes.levelName__a2]: true,
                [classes.activeLevelName]: currentGroup === 1,
              })}
              role="button"
              tabIndex={0}
              onClick={(e) => handleGroupChange(e)}
              aria-hidden="true"
            >
              <span className={classes.levelName}>A2</span>
            </div>
          </Tooltip>
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            TransitionComponent={Fade}
            title="Изменить раздел учебника"
          >
            <div
              className={clsx({
                [classes.level]: true,
                [classes.levelName__a2plus]: true,
                [classes.activeLevelName]: currentGroup === 2,
              })}
              role="button"
              tabIndex={0}
              onClick={(e) => handleGroupChange(e)}
              aria-hidden="true"
            >
              <span className={classes.levelName}>A2+</span>
            </div>
          </Tooltip>
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            TransitionComponent={Fade}
            title="Изменить раздел учебника"
          >
            <div
              className={clsx({
                [classes.level]: true,
                [classes.levelName__b1]: true,
                [classes.activeLevelName]: currentGroup === 3,
              })}
              role="button"
              tabIndex={0}
              onClick={(e) => handleGroupChange(e)}
              aria-hidden="true"
            >
              <span className={classes.levelName}>B1</span>
            </div>
          </Tooltip>
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            TransitionComponent={Fade}
            title="Изменить раздел учебника"
          >
            <div
              className={clsx({
                [classes.level]: true,
                [classes.levelName__b2]: true,
                [classes.activeLevelName]: currentGroup === 4,
              })}
              role="button"
              tabIndex={0}
              onClick={(e) => handleGroupChange(e)}
              aria-hidden="true"
            >
              <span className={classes.levelName}>B2</span>
            </div>
          </Tooltip>
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            TransitionComponent={Fade}
            title="Изменить раздел учебника"
          >
            <div
              className={clsx({
                [classes.level]: true,
                [classes.levelName__b2plus]: true,
                [classes.activeLevelName]: currentGroup === 5,
              })}
              role="button"
              tabIndex={0}
              onClick={(e) => handleGroupChange(e)}
              aria-hidden="true"
            >
              <span className={classes.levelName}>B2+</span>
            </div>
          </Tooltip>
        </Box>
        <div className={classes.wordListWrapper}>
          <div className={classes.wordList}>
            {isWordListLoaded &&
              wordsToRender.length > 0 &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              wordsToRender.map((item: any, index) => (
                <WordItem
                  word={item}
                  group={currentGroup}
                  key={item.word}
                  forseFetch={() => forseRender()}
                  settings={settings}
                />
              ))}
          </div>
          <div className={classes.statsTextWrapper}>
            {difficulty === 'learning' && (
              <div>
                <Typography align="left" variant="h4" component="div">
                  <p className={classes.statsText}>
                    Cлов на странице: {wordsToRender.length}
                  </p>
                  <p className={classes.statsText}>
                    Изучено:{' '}
                    {
                      wordsToRender.filter(
                        (x) => x.userWord.optional.learned === true
                      ).length
                    }
                  </p>
                </Typography>
              </div>
            )}
            {difficulty === 'learning' && (
              <div>
                <Typography align="left" variant="h4" component="div">
                  <p className={classes.statsText}>
                    Cлов в группе: {allLearningWords.length}
                  </p>
                  <p className={classes.statsText}>
                    Изучено:{' '}
                    {
                      allLearningWords.filter(
                        (x) => x.userWord.optional.learned === true
                      ).length
                    }
                  </p>
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        breakClassName="breakMe"
        pageCount={pagesCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={classes.pagination}
        activeClassName={classes.activePage}
        initialPage={currentPage}
        disabledClassName={classes.disabled}
        activeLinkClassName={classes.activeLink}
      >
        <span className={classes.hidden}>{currentPage}</span>
      </ReactPaginate>
    </Paper>
  );
};

export default DictionaryPage;
