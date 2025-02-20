import { useState } from "react";

import style from "../../assets/repeated.module.scss";
import {onChangeNumChairs} from "../../heplers/changeInput";

export const UpdateChair = ({ setShowModal, addNewChairs }) => {
  const [numChairs, setNumChairs] = useState(0);

  function updateItems(e) {
    e.preventDefault();
    addNewChairs(numChairs)
    setShowModal(false)
  }

  return (
    <form className={style.form}>
      <div className={style.form_input}>
        <input
          type="number"
          value={numChairs}
          min="0"
          onChange={(e) => onChangeNumChairs(e, { setNumChairs })}
        />
      </div>
      <button onClick={updateItems}>Update Chair</button>
      <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
    </form>
  )
}
