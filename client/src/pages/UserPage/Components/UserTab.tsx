import Box from '@mui/material/Box';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { JsxElement } from 'typescript';
import { deleteUser, postLogout } from '../../../api/User';
import AlertDialog from '../../../components/AlertDialog';
import { loginStore } from '../../../store/store';
import { getUserId } from '../../../utils/cookies';

export default function UserTab({
  menu,
  setMenu,
}: {
  menu: string;
  setMenu: Dispatch<SetStateAction<string>>;
}) {
  const { loginHandler } = loginStore();
  const navigate = useNavigate();
  const params = useParams();
  const [active, setActive] = useState('회원정보');
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = async (e: MouseEvent | TouchEvent) => {
    await deleteUser();
    setOpen(false);
    await postLogout();
    navigate('/');
    await loginHandler();
  };
  const handleClick = (e: any) => {
    if (e.target.id !== active) {
      setActive(e.target.id);
    }
    setMenu(e.target.id);
    if (e.target.id === '회원정보') {
      navigate(`/users/${params.id}`);
    }
    if (e.target.id === '내 계정') {
      navigate(`/users/${getUserId()}/modify`);
    }
    if (e.target.id === '회원탈퇴') {
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{ width: '100%', height: '800px', borderRight: '1px solid #e5e7eb' }}
    >
      <Box>
        <Tabs>
          <Tab onClick={handleClick} id="회원정보">
            회원정보
          </Tab>
          {params.id === getUserId() ? (
            <>
              <Tab onClick={handleClick} id="내 계정" title="내 정보 수정">
                내 계정
              </Tab>
              <Tab onClick={handleClick} id="회원탈퇴">
                회원탈퇴
              </Tab>
            </>
          ) : null}
          <AlertDialog open={open} onClose={handleClose}>
            삭제
          </AlertDialog>
        </Tabs>
      </Box>
    </Box>
  );
}
const Tabs = styled.div`
  display: flex;
  flex-direction: column;
`;
const Tab = styled.span`
  margin-right: 20px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    color: black;
  }
  width: 150px;
`;
