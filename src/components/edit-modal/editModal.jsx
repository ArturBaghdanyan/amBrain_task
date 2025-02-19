import {useContext, useEffect, useState} from 'react';
import style from "./style.module.scss"
import {RestaurantContext} from "../../context/RestaurantContext";

export const EditItemModal = () => {
  const {
    isModalVisible,
    setIsModalVisible,
    setSelectedChairIndex,
    selectedTableIndex,
    selectedChairIndex,
    addItem,
    setAddItem,
    chairName
  } = useContext(RestaurantContext);

  const [name, setName] = useState(chairName);


  useEffect(() => {
    setName(chairName);
  }, [isModalVisible, chairName]);

  const onCloseModal = () => {
    setIsModalVisible(false);
    setSelectedChairIndex(null);
  };

  const onChangeChairName = (newName) => {
    const updatedTables = [...addItem];
    const selectedChair = updatedTables[selectedTableIndex]?.chairs[selectedChairIndex];

    if (selectedChair) {
      setAddItem((prevData) =>
        prevData.map((table, tableIndex) =>
          tableIndex === selectedTableIndex
            ? {
              ...table,
              chairs: table.chairs.map((chair, chairIndex) =>
                chairIndex === selectedChairIndex
                  ? { ...chair, name: newName }
                  : chair
              ),
            }
            : table
        )
      );
      console.log(selectedChair);
    } else {
      console.error('Selected chair not found');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangeChairName(name);
    onCloseModal();
  };

  return (
    isModalVisible && (
      <div style={{ width: '300px', margin: '0 auto', marginTop: '50px' }}>
        <form onSubmit={handleSubmit} className={style.changeItem}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className={style.changeItem_button}>
            <button type="submit">Add item</button>
            <button type="button" onClick={onCloseModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    )
  );
};
