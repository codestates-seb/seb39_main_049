import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
interface Props {
  open: boolean;
  onClose: (e: any) => void;
  children?: string;
}
export default function AlertDialog({ open, onClose, children }: Props) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">삭제하시겠습니까?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            삭제하면 되돌릴 수 없습니다
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} value="삭제">
            삭제
          </Button>
          <Button onClick={onClose} value="취소">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
