import style from "../../repeated.module.scss";
import {useState} from "react";

export const AddNewTables = ({addItem, addNewTables, setShowModal}) => {
  const [numTables, setNumTables] = useState("");

  const addItems = (e) => {
    e.preventDefault();

    if (numTables > 0) {
      const existingChairCount = addItem.length > 0 ? addItem[0].chairs.length : '';
      addNewTables(parseInt(numTables), existingChairCount);
      setShowModal(false);
    }
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
