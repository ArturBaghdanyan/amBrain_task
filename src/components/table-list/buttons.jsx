import style from "./style.module.scss";
import {AddNewTables} from "../addNewTables/addNewTables";
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';

export const Buttons = ({addItem, setAddItem}) => {
  const [showTableModal, setShowTableModal] = useState(false)
  const [showChairModal, setShowChairModal] = useState(false)

  function onTableShow() {
    setShowTableModal(true)
  }
  function onChairShow() {
    setShowChairModal(true)
  }

  const addNewTables = (numTables, numChairs) => {
    const newTables = [];

    for (let i = 0; i < numTables; i++) {
      let table = { chairs: [] };

      for (let j = 0; j < numChairs; j++) {
        table.chairs.push({ id: uuidv4(), name: "" });
      }

      newTables.push(table);
    }

    const updatedTables = [...addItem, ...newTables];
    setAddItem(updatedTables);
    localStorage.setItem('savedTables', JSON.stringify(updatedTables));
  };


  return (
    <div className={style.buttons}>
      <div className={style.buttons_item}>
        <button onClick={onTableShow}>Add table</button>
        <button onClick={onChairShow}>Update chairs</button>
      </div>
      {showTableModal &&
        <AddNewTables
          addItem={addItem}
          addNewTables={addNewTables}
          setShowModal={setShowTableModal}
        />}
    </div>
  )
}
