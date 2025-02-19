import Modal from "./components/modal";
import TableList from "./components/table-list";
import {useContext, useEffect} from "react";
import {RestaurantContext} from "./context/RestaurantContext";
import {useNavigate} from "react-router-dom";

function App() {
  const {hasSavedTables} = useContext(RestaurantContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (hasSavedTables) {
      navigate("/table-list");
    }
    else {
      navigate("/");
    }
  }, [hasSavedTables, navigate]);

  return hasSavedTables ? <TableList /> : <Modal />;
}

export default App;

