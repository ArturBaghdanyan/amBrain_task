import { useContext, useEffect } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";
import { v4 as uuidv4 } from 'uuid';
import { handleDragOver, handleDragStart, handleDrop } from "../../DnD/dnd";
import { EditItemModal } from "../edit-modal/editModal";
import { Buttons } from "./buttons";

import style from "./style.module.scss";

const TableList = () => {
  const {
    addItem,
    setAddItem,
    setSelectedTableIndex,
    setSelectedChairIndex,
    setChairName,
    setIsModalVisible,
    isModalVisible,
    selectedTableIndex,
    selectedChairIndex,
    chairName
  } = useContext(RestaurantContext);

  const onShowModal = (tableIndex, chairIndex) => {
    setSelectedTableIndex(tableIndex);
    setSelectedChairIndex(chairIndex);
    const selectedChair = addItem[tableIndex]?.chairs[chairIndex] || {};
    setChairName(selectedChair.name || "");
    setIsModalVisible(true);
  };

  const onRemoveItem = (id) => {
    console.log('remove table', id)
    const updatedTables = addItem.filter((table, index) => index !== id);
    setAddItem(updatedTables);
    localStorage.setItem("savedTables", JSON.stringify(updatedTables));
  }

  const savedItems = () => {
    const savedTables = localStorage.getItem("savedTables");

    if (savedTables) {
      setAddItem(JSON.parse(savedTables));
      return;
    }

    const rawItems = localStorage.getItem("restaurantKeys");
    setAddItem(rawItems ? JSON.parse(rawItems) : []);

    if (!rawItems) return;

    const { numTables, numChairs } = JSON.parse(rawItems);

    if (!numTables || !numChairs) {
      setAddItem([]);
      return;
    }

    const tables = Array.from({ length: numTables }, () => ({
      chairs: Array.from({ length: numChairs }, () => ({ id: uuidv4(), name: "" })),
    }));

    setAddItem(tables);
    localStorage.setItem("savedTables", JSON.stringify(tables));
  };

  useEffect(() => {
    savedItems()
  }, []);

  useEffect(() => {
    if(addItem.length) {
      localStorage.setItem('savedTables', JSON.stringify(addItem));
    }
  }, [addItem])

  return (
    <>
      <div className={style.list}>
        {addItem.length === 0 ? (
          <p>No tables to display.</p>
        ) : (
          <div className={style.list_first}>
            {addItem.map((table, tableIndex) => (
              <div key={tableIndex} className={style.list_first_items}>
                <div className={style.list_first_items_column}>

                  <div className={style.list_first_items_column_title}>
                    <div className={style.list_first_items_column_title_row}>
                      <h3>Table {tableIndex + 1}</h3>
                      <div className={style.list_first_items_column_title_row_button}>
                        <span onClick={() => onRemoveItem(tableIndex)}>x</span>
                      </div>
                    </div>
                    <div className={style.list_first_items_column_title_row_border}></div>
                  </div>

                  <div className={style.list_first_items_column_chairs}>
                    <p>Number of chairs: {table.chairs.length}</p>

                    {table.chairs.map((chair, chairIndex) => (
                      <div
                        key={chair.id}
                        className={style.chair}
                        onClick={() => onShowModal(tableIndex, chairIndex)}
                      >
                    <span
                      draggable
                      onDragStart={(event) =>
                        handleDragStart(event, tableIndex, chairIndex)}
                      onDragOver={handleDragOver}
                      onDrop={(event) =>
                        handleDrop({addItem, setAddItem}, event, tableIndex, chairIndex)}
                    >
                      {chairIndex + 1}:
                    </span>
                        <span>{chair.name}</span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
        <Buttons addItem={addItem} setAddItem={setAddItem}/>
      </div>

      <EditItemModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedTableIndex={selectedTableIndex}
        selectedChairIndex={selectedChairIndex}
        setSelectedChairIndex={setSelectedChairIndex}
        addItem={addItem}
        setAddItem={setAddItem}
        chairName={chairName}
      />

    </>
  );
};

export default TableList;
