import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function DeleteDialog({ open, close, deleteItem, data }) {
  const handleDelete = () => {
    deleteItem(data.id);
    close();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          close();
        }}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={() => close()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;
