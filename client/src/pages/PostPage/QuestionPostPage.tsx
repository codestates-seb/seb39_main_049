import { postQuestion } from '../../api/Question';
import { questionRegisterStore, signInModalStore } from '../../store/store';
import QuestionInfoSelect from './Components/QuestionInfoSelect';

const QuestionPostPage = () => {
  const navigate = useNavigate();
  const { questions, handleContentChange, reset } = questionRegisterStore();
  const { openModal } = signInModalStore();
  const questionPostHandler = async () => {
    try {
      const res = await postQuestion(questions);
      navigate('/');
      reset();
    } catch (err) {
      if (err.message === '403') {
        openModal();
      }
    }
  };
  return (
    <section>
      <PostBox>
        <TextBox>
          <h2>면접 질문 정보를 입력해주세요.</h2>
        </TextBox>
        <QuestionInfoSelect />
        <ContentInput
          onChange={handleContentChange}
          value={questions.content}
          fullWidth
          label="질문 내용을 입력하기 전 해당 질문이 있는지 검색해보세요"
          id="questionContent"
        />
        <Postbtnbox>
          <Link to="/" title="메인페이지로 돌아가기">
            <CancelBtn>취소</CancelBtn>
          </Link>
          <PostBtn type="submit" onClick={questionPostHandler}>
            질문 등록
          </PostBtn>
        </Postbtnbox>
      </PostBox>
    </section>
  );
};

import { Box, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BasicButton from '../../components/BasicButton';
const PostBox = styled(Box)`
  max-width: 1040px;
  display: flex;
  flex-direction: column;
  width: 1024px;
  margin: 0 auto;
  padding: 60px 16px;
`;
const TextBox = styled(Box)`
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 30px;
  border-bottom: 3px solid #f2f2f2;
  > h2 {
    font-weight: 700;
    line-height: 40px;
    margin: 0;
  }
`;
const ContentInput = styled(TextField)`
  margin-top: 65px;
`;

const Postbtnbox = styled(Box)`
  display: flex;
  margin-top: 70px;
  justify-content: center;
  align-items: center;
  grid-gap: 20px;
`;
const CancelBtn = styled(BasicButton)`
  font-size: 1rem;
`;
const PostBtn = styled(BasicButton)`
  font-size: 1rem;
`;

export default QuestionPostPage;
