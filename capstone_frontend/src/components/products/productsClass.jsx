import { useParams } from "react-router-dom";

const GetProductsByClass = () => {
  const { classItem } = useParams();

  console.log("Selected class: ", classItem);
};
export default GetProductsByClass;
