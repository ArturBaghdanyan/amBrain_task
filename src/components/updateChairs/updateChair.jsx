import style from "../../repeated.module.scss";
import {useState} from "react";

export const UpdateChair = ({setShowModal, addNewChairs}) => {
  const [numChairs, setNumChairs] = useState("");

  function updateItems(e) {
    e.preventDefault();
    addNewChairs(parseInt(numChairs))
    setShowModal(false)
  }

  function numbers(e) {
    const value = parseInt(e.target.value, 10)
    setNumChairs(value > 0 ? value : '')
  }

  return (
    <form className={style.form}>
      <div className={style.form_input}>
        <input
          type="number"
          value={numChairs}
          onChange={numbers}
        />
      </div>
      <button onClick={updateItems}>Update Chair</button>
      <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
    </form>
  )
}
