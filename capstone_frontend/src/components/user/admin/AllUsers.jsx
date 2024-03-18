import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import { useGetUsersQuery } from "../../../api/metalApi";
import { useUpdateUserMutation } from "../../../api/metalApi";
import EditIcon from "@mui/icons-material/Edit";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const AllUsers = () => {
  const initialEditingUserDetails = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    admin: false,
  };
  const [page, setPage] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userContent, setUserContent] = useState("");
  const [updateUser] = useUpdateUserMutation();

  const [userList] = useState([
    "edit",
    "username",
    "firstName",
    "lastName",
    "email",
    "admin",
  ]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    data: users = [],
    isError,
    isLoading,
    isSuccess,
    isUninitialized,
  } = useGetUsersQuery();

  const createColumnHeaders = (userList) => {
    return [
      { id: "edit", label: "Edit", align: "center" },
      { id: "username", label: "Username", align: "center" },
      { id: "firstName", label: "Firstname", align: "center" },
      { id: "lastName", label: "Lastname", align: "center" },
      { id: "email", label: "Email", align: "center" },
      { id: "admin", label: "Admin", align: "center" },
    ].filter((header) => userList.includes(header.id));
  };

  const columns = createColumnHeaders([
    "edit",
    "username",
    "firstName",
    "lastName",
    "email",
    "admin",
  ]);
  const [editingUserDetails, setEditingUserDetails] = useState(
    initialEditingUserDetails
  );
  const handleEditUser = (row) => {
    const selectedUser = users.find((user) => user.id === row.id);
    setSelectedUserId(row.id);
    setEditingUserDetails({ ...selectedUser });
  };

  const handleEditUserConfirm = async () => {
    const { username, password, firstName, lastName, admin } =
      editingUserDetails;

    try {
      const response = await updateUser({
        userId: selectedUserId,
        userData: {
          username,
          password,
          firstName,
          lastName,
          admin,
        },
      });

      setUserContent("");
      setSelectedUserId(null);
      setEditingUserDetails(initialEditingUserDetails);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleCloseEditForm = () => {
    setSelectedUserId(null);
    setUserContent("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 200 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead sx={{ position: "sticky", top: 0 }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.label === "Admin") {
                          return (
                            <TableCell key={row.id} align="center">
                              {row.admin ? <CheckIcon /> : <ClearIcon />}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell align="center" key={row.id}>
                              {column.label === "Edit" ? (
                                <EditIcon onClick={() => handleEditUser(row)} />
                              ) : column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        open={selectedUserId !== null}
        onClose={handleCloseEditForm}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            padding: "1rem",
          }}
        >
          <Typography variant="h5">{`Edit ${editingUserDetails.username}:`}</Typography>
          <TextField
            label="Username"
            value={editingUserDetails.username}
            onChange={(e) =>
              setEditingUserDetails({
                ...editingUserDetails,
                username: e.target.value,
              })
            }
          />
          <TextField
            label="First Name"
            value={editingUserDetails.firstName}
            onChange={(e) =>
              setEditingUserDetails({
                ...editingUserDetails,
                firstName: e.target.value,
              })
            }
          />
          <TextField
            label="Last Name"
            value={editingUserDetails.lastName}
            onChange={(e) =>
              setEditingUserDetails({
                ...editingUserDetails,
                lastName: e.target.value,
              })
            }
          />
          <TextField
            label="Email"
            value={editingUserDetails.email}
            onChange={(e) =>
              setEditingUserDetails({
                ...editingUserDetails,
                email: e.target.value,
              })
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editingUserDetails.admin}
                onChange={(e) =>
                  setEditingUserDetails({
                    ...editingUserDetails,
                    admin: e.target.checked,
                  })
                }
              />
            }
            label="Admin"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditUserConfirm}
          >
            Update Review
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseEditForm}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AllUsers;
