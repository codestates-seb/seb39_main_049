import { useEffect } from 'react';
import styled from 'styled-components';
import { questionStore } from '../../store/store';
import QuestionCard from './QuestionCard';

const SearchedQuestionCards = ({ searchPage, data, sort }) => {
  const { questions, getQuestionsBySearch } = questionStore();

  useEffect(() => {
    getQuestionsBySearch(searchPage, data, sort);
  }, [searchPage, data, sort]);

  return (
    <>
      <CardWrapper>
        {questions.data
          ? questions.data.map((question) => (
              <QuestionCard
                key={question.questionId}
                question={question}
              ></QuestionCard>
            ))
          : null}
      </CardWrapper>
    </>
  );
};
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
export default SearchedQuestionCards;
