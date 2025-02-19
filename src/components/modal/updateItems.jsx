import style from "../../repeated.module.scss";

export const updateItems = () => {
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
