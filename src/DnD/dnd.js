export const handleDragStart = (event, tableIndex, chairIndex) => {
  event.dataTransfer.setData("tableIndex", tableIndex);
  event.dataTransfer.setData("chairIndex", chairIndex);
};

export const handleDragOver = (event) => {
  event.preventDefault();
};

export const handleDrop = ({addItem, setAddItem}, event, targetTableIndex, targetChairIndex) => {
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
