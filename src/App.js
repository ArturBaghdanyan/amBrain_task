import Modal from "./components/modal";
import TableList from "./components/table-list";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router";

// function App() {
//   const [hasSavedTables, setHasSavedTables] = useState(false);
//
//   // Check localStorage for savedTables when the app loads
//   useEffect(() => {
//     const savedTables = localStorage.getItem("savedTables");
//     if (savedTables) {
//       setHasSavedTables(true);
//     }
//   }, []);
//
//   return hasSavedTables ? <TableList setHasSavedTables={setHasSavedTables} /> : <Modal />;
// }

// export default App;

function App() {
  const [hasSavedTables, setHasSavedTables] = useState(false);
  const navigate = useNavigate()

  // Check localStorage for() savedTables when the app loads
  useEffect(() => {
    const savedTables = localStorage.getItem("savedTables");
    if (savedTables) {
      navigate('/table-list')
      setHasSavedTables(true);
    }
  }, []);

  return hasSavedTables ? <TableList /> : <Modal />;
}

export default App;

