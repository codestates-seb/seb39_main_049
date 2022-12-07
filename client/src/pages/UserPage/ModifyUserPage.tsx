import styled from 'styled-components';
import { Box, TextField, Grid, Container, Button } from '@mui/material';
import { userStore } from '../../store/store';
import { getUserId } from '../../utils/cookies';
import ProfileModal from './Components/ProfileModal';
import { useState, useEffect, SetStateAction } from 'react';
import UserPageAvatarWrapper from './Components/UserPageAvatarWrapper';
import CreateIcon from '@mui/icons-material/Create';
import { modifyPassword, modifyUser } from '../../api/User';
import { FieldErrors, useForm } from 'react-hook-form';

const style = {
  border: '1px solid #D9E4EC',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  margin: '40px',
};

const ModifyUserPage = () => {
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const { getUser, profile, nickname } = userStore();
  const [nicknameModify, setNicknameModify] = useState(false);
  const [text, setText] = useState('');
  const handleMouseOver = () => {
    setIsHover(true);
  };
  const handleMouseOut = () => {
    setIsHover(false);
  };
  const handleClick = (e: any) => {
    setOpenProfileModal(true);
  };
  const handleCloseProfileModal = () => {
    setOpenProfileModal(false);
  };
  const handleNicknameModify = () => {
    setNicknameModify(true);
  };
  const handleNicknameSubmit = async (text: string, profile: string) => {
    await modifyUser(text, profile);
    await setNicknameModify(false);
    await getUser(getUserId());
  };
  const onChange = (e: { target: { value: SetStateAction<string> } }) => {
    setText(e.target.value);
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    await modifyPassword(data);
    await location.reload();
  };
  const onError = (errors: FieldErrors): void => {
    if (errors.curPassword) alert(errors.curPassword.message);
    else if (errors.newPassword) alert(errors.newPassword.message);
    else {
      alert(errors.passwordcheck?.message);
    }
  };
  useEffect(() => {
    getUser(getUserId());
  }, []);

  return (
    <>
      <ProfileBox>
        <div style={{ width: '100%', padding: '0 15px 15px 15px' }}>
          <UserNickname>
            <div
              style={{ height: '100%', display: 'flex', alignItems: 'center' }}
            >
              <div style={{ color: 'gray' }}>
                닉네임 &nbsp; &nbsp; &nbsp; &nbsp;
              </div>
              {!nicknameModify && (
                <>
                  <div style={{ fontSize: '40px' }}> {nickname}</div>
                  <CreateIcon onClick={handleNicknameModify}></CreateIcon>
                </>
              )}

              {nicknameModify && (
                <form onSubmit={() => handleNicknameSubmit(text, profile)}>
                  <TextField
                    defaultValue={nickname}
                    onChange={onChange}
                  ></TextField>
                </form>
              )}
            </div>
          </UserNickname>
          <div
            style={{
              width: '100%',
              height: '500px',
              padding: '15px 0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <h3 style={{ color: 'gray' }}>비밀번호 변경</h3>
            <Container
              style={{ width: '300px', margin: '15px 0 0 0', padding: '0px' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit, onError)}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        type="password"
                        label="현재 비밀번호"
                        placeholder="현재 비밀번호"
                        {...register('curPassword')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        type="password"
                        label="새로운 비밀번호"
                        placeholder="영문자,숫자,특수문자 포함 8글자이상"
                        {...register('newPassword')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="새로운 비밀번호 확인"
                        type="password"
                        placeholder="비밀번호를 확인해주세요"
                        {...register('passwordcheck', {
                          validate: {
                            matchesPreviousPassword: (value) => {
                              const { newPassword } = getValues();
                              return (
                                newPassword === value ||
                                '새로운 비밀번호와 새로운 비밀번호 확인이 같아야합니다!'
                              );
                            },
                          },
                        })}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    비밀번호 변경
                  </Button>
                </Box>
              </Box>
            </Container>
          </div>
        </div>
        <div
          style={{
            borderLeft: '1px solid #e5e7eb',
            width: '400px',
            height: '450px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '20px',
          }}
        >
          <UserPageAvatarWrapper
            src={profile}
            size="200px"
            onMouseOver={() => handleMouseOver()}
            onMouseOut={() => handleMouseOut()}
            isHover={isHover}
            handleClick={handleClick}
          />
        </div>
      </ProfileBox>
      <ProfileModal
        open={openProfileModal}
        handleClose={handleCloseProfileModal}
      ></ProfileModal>
    </>
  );
};
export default ModifyUserPage;
const UserNickname = styled(Box)`
  border-bottom: 1px solid #e5e7eb;
  height: 100px;
`;
const ProfileBox = styled(Box)`
  max-width: 1024px;
  display: flex;
  flex-direction: row;
  width: 1024px;
  height: 450px;
  justify-content: space-between;
  border: 1px solid #e5e7eb;
  padding: 0px;
  border-radius: 10px;
`;
