import { Box } from '@mui/material';
import AvatarWrapper from '../../components/AvatarWrapper';
import styled from 'styled-components';
import BasicTabs from '../../components/Tab/BasicTabs';
import { useState } from 'react';
import AnswerComment from './AnswerComment';
const UserPage = () => {
  const [tab, setTab] = useState(0);
  return (
    <>
      <section>
        <ProfileBox>
          <AvatarWrapper
            src={
              'https://saview-dev.s3.ap-northeast-2.amazonaws.com/Saview/logo_circle.png'
            }
            size={100}
          />
          <UserNickname>{'colagom'}</UserNickname>
        </ProfileBox>
        <TabWrapper>
          <BasicTabs setTab={setTab}></BasicTabs>
        </TabWrapper>
        <AnswerCommentWrapper>
          <AnswerComment></AnswerComment>
          <AnswerComment></AnswerComment>
          <AnswerComment></AnswerComment>
          <AnswerComment></AnswerComment>
          <AnswerComment></AnswerComment>
        </AnswerCommentWrapper>
      </section>
    </>
  );
};

const ProfileBox = styled(Box)`
  max-width: 1024px;
  display: flex;
  flex-direction: row;
  width: 1024px;
  height: 150px;
  margin: 0 auto;
  align-items: center;
  border: 1px solid #e5e7eb;
  padding: 30px;
  border-bottom: 0px;
  border-radius: 10px 10px 0 0;
`;
const UserNickname = styled(Box)`
  font-size: 60px;
  margin-left: 20px;
`;
const TabWrapper = styled(ProfileBox)`
  height: 50px;
  border-left: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0 0 10px 10px;
  background: rgb(249 250 251);
`;
const AnswerCommentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 1024px;
  margin: 50px auto;
`;
export default UserPage;
