import { ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const cartItemsCount = useSelector((state) => state.cart.cartItems.length);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px",
        borderRadius: "50%",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
      }}
    >
      <Link to="/cart" style={{ textDecoration: "none" }}>
        <IconButton>
          <Badge badgeContent={cartItemsCount} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Link>
    </div>
  );
};

export default CartIcon;
