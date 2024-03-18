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
import { useGetProductsQuery } from "../../../api/metalApi";
import { useUpdateProductMutation } from "../../../api/metalApi";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  decodeBase64Image,
  encodeImageToBase64,
} from "../../../app/encode_decode";

export default function AllProducts() {
  const initialEditingProductDetails = {
    name: "",
    price: "",
    image: "",
    description: "",
    class: "",
  };
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productContent, setProductContent] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [updateProduct] = useUpdateProductMutation();
  const {
    data: products = [],
    isError,
    isLoading,
    isSuccess,
    isUninitialized,
  } = useGetProductsQuery();

  const [productList] = useState([
    "edit",
    "name",
    "price",
    "quantity",
    "class",
  ]);

  const createColumnHeaders = (productList) => {
    return [
      { id: "edit", label: "Edit", align: "center" },
      { id: "name", label: "Name", align: "center" },
      { id: "price", label: "Price", align: "center" },
      { id: "quantity", label: "Quantity", align: "center" },
      { id: "class", label: "Class", align: "center" },
    ];
  };

  const columns = createColumnHeaders([
    "edit",
    "name",
    "price",
    "quantity",
    "class",
  ]);

  const [editingProductDetails, setEditingProductDetails] = useState(
    initialEditingProductDetails
  );

  const handleEditProduct = (row) => {
    const selectedProduct = products.find((product) => product.id === row.id);
    console.log(selectedProduct);
    setSelectedProductId(row.id);
    setEditingProductDetails({ ...selectedProduct });
  };

  const handleEditProductConfirm = async () => {
    const {
      name,
      price,
      image,
      description,
      class: type,
    } = editingProductDetails;

    try {
      const response = await updateProduct({
        userId: selectedProductId,
        productData: {
          name,
          price,
          image,
          description,
          class: type,
        },
      });

      setProductContent("");
      setSelectedProductId(null);
      setEditingProductDetails(initialEditingProductDetails);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCloseEditForm = () => {
    setSelectedProductId(null);
    setProductContent("");
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
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={products.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={products.id} align={column.align}>
                            {column.label === "Edit" ? (
                              <EditIcon
                                onClick={() => handleEditProduct(row)}
                              />
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
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
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Modal
        open={selectedProductId !== null}
        onClose={handleCloseEditForm}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                  const base64Image = btoa(
                    new Uint8Array(reader.result).buffer
                  );
                  setEditingProductDetails({
                    ...editingProductDetails,
                    image: base64Image,
                  });
                  setEditingProductDetails({
                    ...editingProductDetails,
                    image: `data:image/jpeg;base64,${base64Image}`,
                  });
                };
                reader.readAsArrayBuffer(file);
              }
            }}
          />

          {editingProductDetails.image && (
            <div>
              <img
                src={`data:image/jpeg;base64,${editingProductDetails.image}`}
                alt={editingProductDetails.name}
              />
              <button
                onClick={() =>
                  setEditingProductDetails({
                    ...editingProductDetails,
                    image: undefined,
                  })
                }
              >
                Remove Image
              </button>
            </div>
          )}
          <Typography variant="h5">{`Edit ${editingProductDetails.name}:`}</Typography>
          <TextField
            label="Name"
            value={editingProductDetails.name}
            onChange={(e) =>
              setEditingProductDetails({
                ...editingProductDetails,
                name: e.target.value,
              })
            }
          />
          <TextField
            label="Price"
            value={editingProductDetails.price}
            onChange={(e) =>
              setEditingProductDetails({
                ...editingProductDetails,
                price: e.target.value,
              })
            }
          />
          <TextField
            multiline
            rows={4}
            label="Description"
            value={editingProductDetails.description}
            onChange={(e) =>
              setEditingProductDetails({
                ...editingProductDetails,
                description: e.target.value,
              })
            }
          />
          <TextField
            label="Class"
            value={editingProductDetails.class}
            onChange={(e) =>
              setEditingProductDetails({
                ...editingProductDetails,
                class: e.target.value,
              })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditProductConfirm}
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
}
