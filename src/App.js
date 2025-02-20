import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RestaurantContext } from "./context/RestaurantContext";
import Modal from "./components/modal";
import TableList from "./components/table-list";

function App() {
  const navigate = useNavigate()

  const { hasSavedTables } = useContext(RestaurantContext)

  useEffect(() => {
    if (hasSavedTables) {
      navigate("/table-list");

      return
    }

    navigate("/")
  }, [hasSavedTables, navigate]);

  return hasSavedTables ? <TableList /> : <Modal />;
}

export default App;
