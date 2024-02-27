import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  // Function to increase quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to decrease quantity with minimum value set to 1
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div>
      <IconButton onClick={decreaseQuantity}>
        <RemoveIcon />
      </IconButton>
      <TextField
        type="number"
        value={quantity}
        InputProps={{ inputProps: { min: 1 } }}
      />
      <IconButton onClick={increaseQuantity}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default QuantitySelector;
