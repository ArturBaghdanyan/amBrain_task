import { useContext, useEffect } from 'react';
import { RestaurantContext } from "../../context/RestaurantContext";

import style from "./style.module.scss"

export const EditItemModal = () => {
  const {
    isModalVisible,
    setIsModalVisible,
    setSelectedChairIndex,
    selectedTableIndex,
    selectedChairIndex,
    addItem,
    setAddItem,
    chairName,
    setChairName
  } = useContext(RestaurantContext);

  useEffect(() => {
    setChairName(chairName)
  }, [ isModalVisible, chairName ]);

  const onCloseModal = () => {
    setIsModalVisible(false);
    setSelectedChairIndex('');
  };

  const onChangeChairName = (newName) => {
    if (addItem[selectedTableIndex]?.chairs[selectedChairIndex]) {
      setAddItem((prevData) => {
        const updatedTables = [...prevData];
        updatedTables[selectedTableIndex].chairs[selectedChairIndex].name = newName;

        return updatedTables;
      });
    } else {
      console.error('Selected chair not found');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangeChairName(chairName);
    onCloseModal();
  };

  return (
    isModalVisible && (
      <div className={style.change}>
        <form onSubmit={handleSubmit} className={style.change_item}>
          <input
            type="text"
            value={chairName}
            onChange={(e) => setChairName(e.target.value)}
          />
          <div className={style.change_item_button}>
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
