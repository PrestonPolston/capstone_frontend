import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetCartItemsQuery } from "../api/metalApi";
import { useDispatch } from "react-redux";
import { setCartItems } from "../slice/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("userId");
  //   const { data, isLoading, error } = useGetCartItemsQuery(id);
  //   const [loadingData, setLoadingData] = useState(true);
  const cartItems = useSelector((state) => state.cart.cartItems);

  //   useEffect(() => {
  // if (isLoading) {
  //   console.log("Loading cart...");
  // } else if (error) {
  //   console.error("Error fetching cart data:", error.message);
  // } else {
  //   dispatch(setCartItems(cartItems.cartItems));
  //   setLoadingData(false);
  // }
  //   }, [cartItems, isLoading, error, dispatch]);
  console.log(cartItems);
  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div>Name: {item.name}</div>
            <div>Price: ${item.price}</div>
            <div>
              <img
                src={item.image}
                alt={item.name}
                style={{ maxWidth: "100px" }}
              />
            </div>
          </li>
        ))}
      </ul>
      : (<p>No items in the cart</p>)
    </div>
  );
};

export default Cart;
