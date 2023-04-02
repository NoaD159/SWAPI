import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "../styles/EditDialog.css";

function CreateForm({ attributes, open, close, handleCreateItem }) {
  const initialState = Object.fromEntries(attributes.map((attr) => [attr, ""]));

  const [newItem, setNewItem] = useState(initialState);

  const handleChange = (attribute, value) => {
    setNewItem((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  const handleSubmit = () => {
    handleCreateItem(newItem);
    setNewItem(initialState);
  };

  return (
    <div>
      <Dialog open={open} onClose={close}>
        <DialogTitle className="dialogHead">Create New Item</DialogTitle>
        <DialogContent className="dialogContent">
          {attributes.map((attribute) => (
            <TextField
              required
              key={attribute}
              className="textField"
              label={attribute}
              inputProps={{ maxLength: 15 }}
              value={newItem[attribute]}
              onChange={(e) => handleChange(attribute, e.target.value)}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} className="submitButton">
            Save
          </Button>
          <Button onClick={() => close()} className="cancelButton">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateForm;
