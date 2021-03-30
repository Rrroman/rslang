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
import EbookPage from '../../pages/e-book-page/E-book-page';
import ProfilePage from '../../pages/profile-page/Profile-page';
import ConstructorGame from '../ConstructorGame/ConstructorGame';
import GitLinks from '../GitLinks/GitLinks';
import { QuestionPage } from '../../pages/question-page/Question-page';

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
            <Route path={mainPath.ebookPage} component={EbookPage} />
            <Route path={mainPath.profilePAge} component={ProfilePage} />
            <Route
              path={mainPath.constructorGame}
              component={ConstructorGame}
            />
            <Route path={mainPath.questionPage} component={QuestionPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  </Router>
);

export default App;
