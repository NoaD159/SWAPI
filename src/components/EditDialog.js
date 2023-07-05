import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "../styles/EditDialog.css";

function EditDialog({ open, close, attributes, data, handleEditItem, id }) {
  const [editedData, setEditedData] = useState();

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const handleChange = (attribute, value) => {
    setEditedData({ ...editedData, [attribute]: value });
  };
  const handleEdit = () => {
    handleEditItem(id, editedData);
    close();
  };
  return (
    <div>
      <Dialog open={open} onClose={close}>
        <DialogTitle className="dialog-head">Edit</DialogTitle>
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
              value={editedData ? editedData[attribute] : ""}
              onChange={(e) => handleChange(attribute, e.target.value)}
              sx={{ margin: "0.3rem" }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEdit()} className="submit-button">
            Save
          </Button>
          <Button onClick={() => close()} className="cancel-b utton">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditDialog;
