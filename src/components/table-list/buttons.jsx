import style from "./style.module.scss";
import {AddNewTables} from "../addNewTables/addNewTables";
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {UpdateChair} from "../updateChairs/updateChair";

export const Buttons = ({addItem, setAddItem}) => {
  const [showTableModal, setShowTableModal] = useState(false)
  const [showChairModal, setShowChairModal] = useState(false)

  function onTableShow() {
    setShowTableModal(true)
  }
  function onChairShow() {
    setShowChairModal(true)
  }

  const addNewChairs = (numChairs) => {
    if (addItem.length === 0) return;

    const hasNamedChair = addItem.some(table =>
      table.chairs.some(chair => chair.name.trim() !== "")
    );

    if (hasNamedChair) {
      console.warn("Cannot change the number of chairs because a chair has a name.");

      const updatedTables = addItem.map(table => {
        let updatedChairs = [...table.chairs];

        if (numChairs > updatedChairs.length) {
          for (let i = updatedChairs.length; i < numChairs; i++) {
            updatedChairs.push({ id: uuidv4(), name: "" });
          }
        }
        return { ...table, chairs: updatedChairs };
      });

      setAddItem(updatedTables);
      localStorage.setItem("savedTables", JSON.stringify(updatedTables));
    } else {
      const updatedTables = addItem.map(table => {
        let updatedChairs = [...table.chairs];

        if (numChairs > updatedChairs.length) {
          for (let i = updatedChairs.length; i < numChairs; i++) {
            updatedChairs.push({ id: uuidv4(), name: "" });
          }
        } else if (numChairs < updatedChairs.length) {
          updatedChairs = updatedChairs.slice(0, numChairs);
        }

        return { ...table, chairs: updatedChairs };
      });

      setAddItem(updatedTables);
      localStorage.setItem("savedTables", JSON.stringify(updatedTables));
    }
  };


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
      {
        showTableModal &&
        <AddNewTables
          addItem={addItem}
          addNewTables={addNewTables}
          setShowModal={setShowTableModal}
        />
      }
      {
        showChairModal &&
        <UpdateChair
          addNewChairs={addNewChairs}
          setShowModal={setShowChairModal}/>
      }
    </div>
  )
}
