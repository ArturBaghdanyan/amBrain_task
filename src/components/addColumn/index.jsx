import {useState} from 'react';
import styles from './style.module.scss';

const Modal = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const createItems = (e) => {
    e.preventDefault();
    const result = { input1, input2 };
    localStorage.setItem('items', JSON.stringify(result));
    setInput1(null);
    setInput2(null);
    window.open('/table-list', '_blank', 'noopener,noreferrer');
  };

  return (
    <form className={styles.form} >
      <div className={styles.form_input}>
        <input
          type="number"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
        <input
          type="number"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
      </div>
      <button onClick={createItems}>Create list</button>
    </form>
  );
};
export default Modal;
