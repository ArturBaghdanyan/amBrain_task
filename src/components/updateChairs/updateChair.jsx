import style from "../../repeated.module.scss";
import {useState} from "react";

export const UpdateChair = ({setShowModal, addNewChairs}) => {
  const [numChairs, setNumChairs] = useState("");

  function updateItems(e) {
    e.preventDefault();
    addNewChairs(parseInt(numChairs))
  }

  return (
    <form className={style.form}>
      <div className={style.form_input}>
        <input
          type="number"
          value={numChairs}
          onChange={(e) => setNumChairs(e.target.value)}
        />
      </div>
      <button onClick={updateItems}>Update Chair</button>
      <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
    </form>
  )
}
