import React from 'react';
import { connect } from 'react-redux';
import Auth from '../../components/auth/Auth';
import Spinner from '../../components/Spinner/Spinner';
import { RootStateType } from '../../reducer/root-reducer';
import { UserState } from '../../reducer/user-reducer';

type Props = UserState;

const UserPage: React.FC<Props> = ({ isLogin, isLoaded }) => {
  const renderContent = () => {
    if (isLoaded) {
      return <Spinner />;
    }
    return <Auth />;
  };

  return renderContent();
};

const mapStateToProps = (state: RootStateType) => state.userState;

export default connect(mapStateToProps)(UserPage);
