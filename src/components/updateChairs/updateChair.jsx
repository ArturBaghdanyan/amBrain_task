import { useState } from "react";

import style from "../../assets/repeated.module.scss";

export const UpdateChair = ({ setShowModal, addNewChairs }) => {
  const [numChairs, setNumChairs] = useState("");

  function updateItems(e) {
    e.preventDefault();
    addNewChairs(parseInt(numChairs))
    setShowModal(false)
  }

  return (
    <form className={style.form}>
      <div className={style.form_input}>
        <input
          type="number"
          value={numChairs}
          min="0"
          onChange={(e) => {
            const value = parseInt(e.target.value, 10)
            setNumChairs(value >= 0 ? value : '')
          }}
        />
      </div>
      <button onClick={updateItems}>Update Chair</button>
      <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
    </form>
  )
}
