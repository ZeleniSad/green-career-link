import React, { FC } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: FC<{ dialog: ConfirmDialogProps }> = ({ dialog }) => (
  <Dialog
    open={dialog.open}
    onClose={dialog.onCancel}
    aria-labelledby='confirm-dialog-title'
    aria-describedby='confirm-dialog-description'>
    <DialogTitle id='confirm-dialog-title'>{dialog.title}</DialogTitle>
    <DialogContent>
      <DialogContentText id='confirm-dialog-description'>{dialog.message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={dialog.onCancel} color='primary'>
        Cancel
      </Button>
      <Button
        onClick={() => {
          dialog.onConfirm();
          dialog.onCancel();
        }}
        color='secondary'
        autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
