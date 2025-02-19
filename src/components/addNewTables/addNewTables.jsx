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

  function numbers(e) {
    const value = parseInt(e.target.value, 10)
    setNumTables(value > 0 ? value : '')
  }

  return (
    <form className={style.form}>
      <div className={style.form_input}>
        <input
          type="number"
          value={numTables}
          onChange={numbers}
        />
      </div>
      <button onClick={addItems}>Add table</button>
      <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
    </form>
  )
}
