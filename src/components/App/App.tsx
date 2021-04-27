import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import GamePage from '../../pages/game-page/Game-page';
import { MainPage } from '../../pages/main-page/main-page';
import WordsList from '../word-list/words-list';
import styles from './App.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import UserPage from '../../pages/auth-page/User-page';
import { mainPath } from '../../utils/constants';
import SprintGame from '../Sprint-game/sprint-game/SprintGame';
import EbookPage from '../../pages/e-book-page/E-book-page';
import LearnPage from '../../pages/learn-page/LearnPage';
import DictionaryPage from '../../pages/dictionary-page/DictionaryPage';
import ProfilePage from '../../pages/profile-page/Profile-page';
import AudioGame from '../../pages/AudioGame/AudioGame';

import ConstructorGame from '../ConstructorGame/ConstructorGame';
import GitLinks from '../GitLinks/GitLinks';
import { QuestionPage } from '../../pages/question-page/Question-page';

import SavannaGame from '../../pages/SavannaGame/SavannaGame';
import { DashboardPage } from '../../pages/dashbord-page/Dashboard-page';
import { StatisticPage } from '../../pages/statistic-page/Statistic-page';
import { AboutUs } from '../../pages/about-us/About-us';
import { StartPage } from '../../pages/start-page/Start-page';

const App: React.FC = () => (
  <Router basename="/">
    <div className={styles.App}>
      <div className={styles.container}>
        <Header />

        <main className={styles.main}>
          <GitLinks />
          <Switch>
            <Route path={mainPath.main} component={MainPage} exact />
            <Route path={mainPath.gamePage} component={GamePage} />
            <Route path={mainPath.wordList} component={WordsList} />
            <Route path={mainPath.auth} component={UserPage} />
            <Route path={mainPath.sprint} component={SprintGame} />
            <Route path={mainPath.ebookPage} component={EbookPage} exact />
            <Route path={mainPath.learnPage} component={LearnPage} />
            <Route path={mainPath.dictionaryPage} component={DictionaryPage} />
            <Route path={mainPath.profilePAge} component={ProfilePage} />
            <Route path={mainPath.audioGame} component={AudioGame} />
            <Route path={mainPath.savannaGame} component={SavannaGame} />

            <Route
              path={mainPath.constructorGame}
              component={ConstructorGame}
            />
            <Route path={mainPath.questionPage} component={QuestionPage} />
            <Route path={mainPath.dashboardPage} component={DashboardPage} />

            <Route path={mainPath.statistic} component={StatisticPage} />
            <Route path={mainPath.aboutUs} component={AboutUs} />
            <Route path={mainPath.startPage} component={StartPage} />
          </Switch>
        </main>

        <Footer />
      </div>
    </div>
  </Router>
);

export default App;
