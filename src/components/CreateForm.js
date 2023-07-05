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
        <DialogTitle className="dialog-head">Create New Item</DialogTitle>
        <DialogContent className="dialog-content">
          {attributes.map((attribute) => (
            <TextField
              required
              key={attribute}
              className="text-field-form"
              label={attribute
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              inputProps={{ maxLength: 15 }}
              value={newItem[attribute]}
              onChange={(e) => handleChange(attribute, e.target.value)}
              sx={{ margin: "0.3rem" }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} className="submit-button">
            Save
          </Button>
          <Button onClick={() => close()} className="cancel-button">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateForm;
