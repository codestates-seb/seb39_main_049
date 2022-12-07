import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getUsersActivity } from '../../api/User';
import AvatarWrapper from '../../components/AvatarWrapper';
import Pagination from '../../components/Pagination';
import { userStore } from '../../store/store';
import { getUserId } from '../../utils/cookies';
import AnswerComment from './Components/AnswerComment';
import BasicTabs from './Components/BasicTabs';
import UserPageAvatarWrapper from './Components/UserPageAvatarWrapper';
import { UsersActivity } from '../../api/User/activity';
const UserInfoPage = () => {
  const params = useParams();
  const [tab, setTab] = useState('answers');
  const [data, setData] = useState<UsersActivity>({} as UsersActivity);
  const [page, setPage] = useState(1);
  const { getUser, profile, nickname } = userStore();

  useEffect(() => {
    const fetch = async () => {
      const res = await getUsersActivity(tab, getUserId(), page, 10);
      if (res === null) throw new Error('data is null');
      setData(res?.data);
    };
    fetch();
  }, [tab, page]);
  useEffect(() => {
    setTab('answers');
    getUser(getUserId());
  }, []);
  console.log(data);
  return (
    <>
      <UserPageContent>
        <section style={{ flex: '0 1 1024px' }}>
          <ProfileBox>
            <div>
              {params.id === getUserId() ? (
                <UserPageAvatarWrapper src={profile} size="100px" />
              ) : (
                <AvatarWrapper src={profile} size="100px"></AvatarWrapper>
              )}
            </div>
            <UserNickname>{nickname}</UserNickname>
          </ProfileBox>
          <TabWrapper>
            <BasicTabs setTab={setTab}></BasicTabs>
          </TabWrapper>
          <AnswerCommentWrapper>
            {data?.myPosts?.data?.length > 0 ? (
              data?.myPosts.data.map((mypost) => (
                <AnswerComment mypost={mypost} key={mypost.createdAt} />
              ))
            ) : (
              <div>작성글이 없습니다</div>
            )}
          </AnswerCommentWrapper>
          {data?.myPosts && (
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data?.myPosts?.pageInfo?.totalPages}
            ></Pagination>
          )}
        </section>
      </UserPageContent>
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
const UserPageContent = styled(Box)`
  display: flex;
  width: 1024px;
  flex-direction: row;
`;
const NavBar = styled(Box)`
  width: 500px;
  height: 300px;
`;

export default UserInfoPage;
