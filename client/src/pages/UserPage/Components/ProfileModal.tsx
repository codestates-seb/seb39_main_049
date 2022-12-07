import {
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  Stack,
  Input,
  Button,
} from '@mui/material';
import Slider from '@mui/material/Slider';
import { useCallback, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import S3 from 'react-aws-s3-typescript';
import { v4 as uuidv4 } from 'uuid';
import { modifyUser } from '../../../api/User';
import { userStore } from '../../../store/store';
import { getUserId } from '../../../utils/cookies';

const ProfileModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [previewImage, setPreviewImage] = useState<string>('');
  const { nickname, getUser } = userStore();
  const [croppedImage, setCroppedImage] = useState('');
  const avatarEditorRef = useRef<HTMLInputElement>();
  const [blob, setBlob] = useState<Blob>();
  const [ImageSize, setImageSize] = useState(20);
  const config = {
    bucketName: 'saview-dev',
    region: 'ap-northeast-2',
    dirName: 'users',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY as string,
  };
  const ReactS3Client = new S3(config);

  const handleChange = useCallback((event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        setPreviewImage(reader.result);
      }
    });

    if (file.size >= 1 * 1024 * 1024) {
      alert('1mb 이하의 파일만 업로드 가능합니다.');
      event.target.value = null;
    }
  }, []);

  const handleCropImage = useCallback(() => {
    avatarEditorRef!.current!.getImageScaledToCanvas().toBlob((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      console.log(imageUrl, blob);
      console.log(typeof imageUrl, typeof blob);
      setCroppedImage(imageUrl);
      setBlob(blob);
    });
  }, []);

  const handleSubmit = async () => {
    const data = await ReactS3Client.uploadFile(blob as File, uuidv4());
    await modifyUser(nickname, data.location);
    handleClose();
    setPreviewImage('');
    setCroppedImage('');
    setImageSize(20);
    getUser(getUserId());
  };
  const handleChangeSize = (event: Event, value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setImageSize(newValue);
  };

  const closeModal = useCallback(() => {
    handleClose();
    setPreviewImage('');
    setCroppedImage('');
  }, [handleClose]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>새 프로필 이미지</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={3}>
          <Input
            type="file"
            onChange={handleChange}
            inputProps={{
              accept: 'image/jpeg, image/jpg, image/png, image/svg',
            }}
          />
          {previewImage && (
            <div>
              <span>zoom</span>
              <Slider
                defaultValue={ImageSize}
                value={ImageSize}
                valueLabelDisplay="auto"
                onChange={handleChangeSize}
              />
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {previewImage && (
              <AvatarEditor
                ref={avatarEditorRef}
                image={previewImage}
                width={100}
                height={100}
                border={20}
                scale={ImageSize / 20}
                style={{ display: 'inline' }}
              />
            )}
            {croppedImage && (
              <img
                alt="cropped"
                style={{ marginLeft: '50px' }}
                width={100}
                height={100}
                src={croppedImage}
              />
            )}
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>취소</Button>
        {previewImage && <Button onClick={handleCropImage}>이미지 Crop</Button>}
        {croppedImage && <Button onClick={handleSubmit}>확인</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default ProfileModal;
