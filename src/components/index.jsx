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
    const rawItems = localStorage.getItem("items") || "{}";
    const { input1, input2 } = JSON.parse(rawItems);

    const tables = [];
    for (let i = 0; i < input1; i++) {
      let table = { chairs: [] };
      for (let j = 0; j < input2; j++) {
        table.chairs.push({ id: uuidv4(), name: "" });
      }
      tables.push(table);
    }

    setAddItem(tables);
  }, []);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }

    const srcTableIndex = parseInt(source.droppableId);
    const destTableIndex = parseInt(destination.droppableId);
    const updatedTables = [...addItem];

    const [movedChair] = updatedTables[srcTableIndex].chairs.splice(source.index, 1);
    updatedTables[destTableIndex].chairs.splice(destination.index, 0, movedChair);

    setAddItem(updatedTables);
  };

  return (
    <>
      <div className={style.list}>
      {addItem.length === 0 ? (
        <p>No tables to display.</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          {addItem.map((table, tableIndex) => (
            <Droppable key={tableIndex} droppableId={tableIndex.toString()} type="chair">
              {(provided) => (
                <div className={style.list_items} ref={provided.innerRef} {...provided.dragHandleProps}
                     {...provided.droppableProps}>
                  <h3>Table {tableIndex + 1}</h3>
                  <p>Number of chairs: {table.chairs.length}</p>
                  <div className={style.list_items_chairs} ref={provided.innerRef}>
                    {table.chairs.map((chair, chairIndex) => (
                      <Draggable
                        key={chair.id}
                        draggableId={chair.id}
                        index={chairIndex}
                      >
                        {(provided) => (
                          <div
                            className={style.chair}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => onShowModal(tableIndex, chairIndex)}
                          >
                            {chairIndex + 1}: {chair.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
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
