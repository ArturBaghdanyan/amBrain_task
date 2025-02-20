import { useState } from "react";
import style from "../../assets/repeated.module.scss";
import {onChangeNumTables} from "../../heplers/changeInput";

export const AddNewTables = ({ addItem, addNewTables, setShowModal }) => {
  const [numTables, setNumTables] = useState(0);

  const addItems = (e) => {
    e.preventDefault();

    const existingChairCount = addItem.length ? addItem[0].chairs.length : 0;

    if (numTables > 0) {
      addNewTables(numTables, existingChairCount);
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
          onChange={(e) => onChangeNumTables(e, { setNumTables })}
        />
      </div>
      <button onClick={addItems}>Add table</button>
      <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
    </form>
  )
}
