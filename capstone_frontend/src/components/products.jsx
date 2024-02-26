import { useGetProductsQuery, useGetUserQuery } from "../api/metalApi";
import { decodeBase64Image } from "../app/encode_decode";
import { useState } from "react";

const GetAllProducts = () => {
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("userId");
  const {
    data: userResponse,
    error: userError,
    isLoading: userLoading,
  } = useGetUserQuery(userId);
  console.log(userResponse);

  return (
    <div>
      {productsData && (
        <div>
          {productsData.map((product) => (
            <div key={product.id}>
              <img
                src={decodeBase64Image(product.image)}
                alt="Product Image"
                style={{ maxWidth: 200 }}
              />
              <p>{product.name}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllProducts;
