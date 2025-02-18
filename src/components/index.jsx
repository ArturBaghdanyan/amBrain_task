import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import style from "./style.module.scss";
import {EditItemModal} from "./edit-modal/editModal";
import { v4 as uuidv4 } from 'uuid';

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

  useEffect(() => {
    const savedTables = localStorage.getItem("savedTables");

    if(savedTables) {
      setAddItem(JSON.parse(savedTables))
    } else {
      const rawItems = localStorage.getItem("restaurantKeys") || "{}";
      const {numTables, numChairs} = JSON.parse(rawItems);

      if (!numTables || !numChairs) return;

      const tables = [];
      for (let i = 0; i < numTables; i++) {
        let table = {chairs: []};
        for (let j = 0; j < numChairs; j++) {
          table.chairs.push({id: uuidv4(), name: ""});
        }
        tables.push(table);
      }
      setAddItem(tables);
    }
  }, []);

  useEffect(() => {
    if(addItem.length > 0) {
      localStorage.setItem('savedTables', JSON.stringify(addItem));
    }
  }, [addItem])

  const handleDragStart = (event, tableIndex, chairIndex) => {
    event.dataTransfer.setData("tableIndex", tableIndex);
    event.dataTransfer.setData("chairIndex", chairIndex);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetTableIndex, targetChairIndex) => {
    event.preventDefault();

    const sourceTableIndex = parseInt(event.dataTransfer.getData("tableIndex"));
    const sourceChairIndex = parseInt(event.dataTransfer.getData("chairIndex"));

    if (isNaN(sourceTableIndex) || isNaN(sourceChairIndex)) return;

    if (sourceTableIndex === targetTableIndex && sourceChairIndex === targetChairIndex) return;

    const updatedTables = [...addItem];

    // Remove chair from source table
    const tempChair = updatedTables[targetTableIndex].chairs[targetChairIndex];
    updatedTables[targetTableIndex].chairs[targetChairIndex] = updatedTables[sourceTableIndex].chairs[sourceChairIndex];
    updatedTables[sourceTableIndex].chairs[sourceChairIndex] = tempChair;

    setAddItem(updatedTables);
  };
  return (
    <>
      <div className={style.list}>
        {addItem.length === 0 ? (
          <p>No tables to display.</p>
        ) : (
          addItem.map((table, tableIndex) => (
            <div key={tableIndex} className={style.list_items}>
              <h3>Table {tableIndex + 1}</h3>
              <p>Number of chairs: {table.chairs.length}</p>
              <div className={style.list_items_chairs}>
                {table.chairs.map((chair, chairIndex) => (
                  <div
                    key={chair.id}
                    className={style.chair}
                    draggable
                    onDragStart={(event) => handleDragStart(event, tableIndex, chairIndex)}
                    onDragOver={handleDragOver}
                    onClick={() => onShowModal(tableIndex, chairIndex)}
                    onDrop={(event) => handleDrop(event, tableIndex, chairIndex)}
                  >
                    {chairIndex + 1}: {chair.name}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

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
