import { useState } from "react";
import style from "../../assets/repeated.module.scss";

export const AddNewTables = ({ addItem, addNewTables, setShowModal }) => {
  const [numTables, setNumTables] = useState("");

  const addItems = (e) => {
    e.preventDefault();

    const existingChairCount = addItem.length > 0
      ? addItem[0].chairs.length : '';
    if (numTables > 0) {
      addNewTables(parseInt(numTables), existingChairCount);
    }
    setShowModal(false);
  };

  return (
    <form className={style.form}>
      <div className={style.form_input}>
        <input
          type="number"
          min="0"
          value={numTables}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10)
            setNumTables(value > 0 ? value : '')
          }}
        />
      </div>
      <button onClick={addItems}>Add table</button>
      <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
    </form>
  )
}
