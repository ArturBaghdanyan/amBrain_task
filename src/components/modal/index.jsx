import { useState } from 'react';

import styles from '../../assets/repeated.module.scss';
import {onChangeNumChairs, onChangeNumTables} from "../../heplers/changeInput";

const Modal = () => {
  const [numTables, setNumTables] = useState("");
  const [numChairs, setNumChairs] = useState("");

  const createItems = (e) => {
    e.preventDefault();
    const result = { numTables, numChairs };
    localStorage.setItem('restaurantKeys', JSON.stringify(result));

    setNumTables('');
    setNumChairs('');
    window.open('/table-list', '_blank', 'noopener,noreferrer');
  };

  return (
    <form className={styles.form}>
      <div className={styles.form_input}>
        <input
          type="number"
          value={numTables}
          min="0"
          onChange={(e) => onChangeNumTables(e, { setNumTables })}
        />
        <input
          type="number"
          value={numChairs}
          min="0"
          onChange={(e) => onChangeNumChairs(e, { setNumChairs })}
        />
      </div>
      <button onClick={createItems}>Create list</button>
    </form>
  );
};
export default Modal;
