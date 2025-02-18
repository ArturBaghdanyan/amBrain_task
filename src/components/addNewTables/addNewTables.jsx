import style from "../../repeated.module.scss";
import {useState} from "react";

export const AddNewTables = ({addItem, addNewTables, setShowModal}) => {
  const [numTables, setNumTables] = useState("");

  const addItems = (e) => {
    e.preventDefault();

    if (numTables > 0) {
      const existingChairCount = addItem.length > 0 ? addItem[0].chairs.length : null;
      addNewTables(parseInt(numTables), existingChairCount);
      setShowModal(false);
    }
  };

  return (
    <form className={style.form}>
      <div className={style.form_input}>
        <input
          type="number"
          value={numTables}
          onChange={(e) => setNumTables(e.target.value)}
        />
      </div>
      <button onClick={addItems}>Add table</button>
      <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
    </form>
  )
}
