import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { editItem, deleteItem, addItem } from "../redux/reducer";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import CreateForm from "../components/CreateForm";
import EditDialog from "../components/EditDialog";
import DeleteDialog from "../components/DeleteDialog";
import "../styles/ListPage.css";

function ListPage({ entity }) {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
  const [selectedRowToDelete, setSelectedRowToDelete] = useState(null);

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/${entity.entityName}`)
      .then((response) => {
        const newData = response.data.results.map((item) => ({
          id: uuid(),
          ...item,
        }));
        setData(newData);
      })
      .catch((error) => console.error(error));
  }, []);

  const openCreateForm = () => {
    setCreateFormOpen(true);
  };
  const closeCreateForm = () => {
    setCreateFormOpen(false);
  };

  const handleCreateItem = (item) => {
    const newItem = {
      id: uuid(),
      ...item,
    };
    dispatch(addItem(newItem));
    setData([...data, newItem]);
    closeCreateForm();
  };

  const openEditDialog = (data) => {
    setSelectedRowToEdit(data);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setSelectedRowToEdit(null);
    setEditDialogOpen(false);
  };

  const openDeleteDialog = (data) => {
    setSelectedRowToDelete(data);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedRowToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleEditItem = (id, updatedData) => {
    const editedItem = {
      id: id,
      ...updatedData,
    };
    dispatch(editItem(editedItem));
    setData(data.map((item) => (item.id === id ? editedItem : item)));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <Box>
      <Paper className="list-page-paper">
        <Typography className="entity-title" variant="h2">
          {entity.title.charAt(0).toUpperCase() + entity.title.slice(1)}
        </Typography>
        <IconButton
          onClick={openCreateForm}
          className="icon-button create-button"
        >
          <Add /> Add
        </IconButton>
        <CreateForm
          open={isCreateFormOpen}
          close={closeCreateForm}
          attributes={entity.attributes}
          handleCreateItem={handleCreateItem}
        />
        <Table className="responsiveTable">
          <TableHead>
            <TableRow>
              {entity.attributes.map((header) => (
                <TableCell key={header} className="table-headers">
                  {header
                    .split("_")
                    .map(
                      (entityHeader) =>
                        entityHeader.charAt(0).toUpperCase() +
                        entityHeader.slice(1)
                    )
                    .join(" ")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((result) => (
              <TableRow key={result.id}>
                {entity.attributes.map((header) => (
                  <TableCell key={header} className="table-cells">
                    {result[header]}
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton
                    onClick={() => openEditDialog(result)}
                    className="icon-button"
                  >
                    <Edit />
                  </IconButton>

                  <IconButton
                    onClick={() => openDeleteDialog(result)}
                    className="icon-button"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <EditDialog
        open={isEditDialogOpen}
        close={closeEditDialog}
        attributes={entity.attributes}
        data={selectedRowToEdit}
        handleEditItem={handleEditItem}
        id={selectedRowToEdit ? selectedRowToEdit.id : null}
      />
      <DeleteDialog
        open={isDeleteDialogOpen}
        close={closeDeleteDialog}
        deleteItem={handleDeleteItem}
        data={selectedRowToDelete}
      />
    </Box>
  );
}

export default ListPage;
