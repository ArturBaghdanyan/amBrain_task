import { useEffect, useState } from "react";
import style from "./style.module.scss";
import {EditItemModal} from "../edit-modal/editModal";
import { v4 as uuidv4 } from 'uuid';
import {handleDragOver, handleDragStart, handleDrop} from "../../DnD/dnd";
import {Buttons} from "./buttons";

const TableList = () => {
  const [addItem, setAddItem] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChairIndex, setSelectedChairIndex] = useState(null);
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);
  const [chairName, setChairName] = useState(null);

  const onShowModal = (tableIndex, chairIndex) => {
    setSelectedTableIndex(tableIndex);
    setSelectedChairIndex(chairIndex);
    const selectedChair = addItem[tableIndex].chairs[chairIndex];
    setChairName(selectedChair.name || "");
    setIsModalVisible(true);
  };

  const savedItems = () => {
    const savedTables = localStorage.getItem("savedTables");

    if (savedTables) {
      setAddItem(JSON.parse(savedTables));
      return;
    }

    const rawItems = localStorage.getItem("restaurantKeys");

    if (!rawItems) {
      setAddItem([]);
      return;
    }

    const { numTables, numChairs } = JSON.parse(rawItems);

    if (!numTables || !numChairs) {
      setAddItem([]); // Ensure no undefined behavior
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
    if(addItem.length > 0) {
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
              <h3>Table {tableIndex + 1}</h3>
              <p>Number of chairs: {table.chairs.length}</p>
              <div className={style.list_first_items_chairs}>
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
                      handleDrop({ addItem, setAddItem }, event, tableIndex, chairIndex)}
                    >
                      {chairIndex + 1}:
                    </span>
                    <span>{chair.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
        )}
        <Buttons addItem={addItem} setAddItem={setAddItem} />

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
