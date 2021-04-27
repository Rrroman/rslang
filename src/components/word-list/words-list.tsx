import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  CurrentWordListType,
  fetchWordsList,
  wordListLoaded,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import { WordStateType } from '../../reducer/word-reducer';
import Spinner from '../Spinner/Spinner';
import { WordItem } from '../word-item/word-item';

type Props = WordStateType & ReturnType<typeof mapDispatchToProps>;

const WordsList: React.FC<Props> = ({
  currentWordList,
  loading,
  fetchErr,
  pageNumber,
  groupNumber,
  fetchList,
  listLoaded,
}) => {
  useEffect(() => {
    fetchList({ page: 0, group: 0 });
  }, [fetchList]);

  const renderWordCard = () =>
    currentWordList.map((word: CurrentWordListType) => (
      <WordItem key={word.id} word={word} />
    ));

  return <>{loading ? <Spinner /> : <div>{renderWordCard()}</div>}</>;
};

const mapStateToProps = (state: RootStateType) => state.wordState;

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators<any, any>(
    {
      fetchList: fetchWordsList,
      listLoaded: wordListLoaded,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);
