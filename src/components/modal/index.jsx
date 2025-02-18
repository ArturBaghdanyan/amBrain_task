import { useState} from 'react';
import styles from '../../repeated.module.scss';

const Modal = () => {
  const [numTables, setNumTables] = useState("");
  const [numChairs, setNumChairs] = useState("");


  const createItems = (e) => {
    e.preventDefault();
    const result = { numTables, numChairs };
    localStorage.setItem('restaurantKeys', JSON.stringify(result));

    setNumTables(null);
    setNumChairs(null);
    window.open('/table-list', '_blank', 'noopener,noreferrer');
  };

  return (
    <form className={styles.form} >
      <div className={styles.form_input}>
        <input
          type="number"
          value={numTables}
          onChange={(e) => setNumTables(e.target.value)}
        />
        <input
          type="number"
          value={numChairs}
          onChange={(e) => setNumChairs(e.target.value)}
        />
      </div>
      <button onClick={createItems}>Create list</button>
    </form>
  );
};
export default Modal;
